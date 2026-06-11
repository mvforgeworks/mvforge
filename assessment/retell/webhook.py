"""
Retell.ai webhook server — receives call_ended events and runs the assessment pipeline.

Setup in Retell dashboard:
  1. Create agent with system prompt from: python -m assessment.src retell-prompt -o agent_prompt.txt
  2. Set webhook URL to: https://your-domain.com/webhook/retell
  3. Pass client metadata via Retell dynamic variables: client_name, industry, team_size

Run locally:
  python -m assessment.retell.webhook

Use ngrok for local testing: ngrok http 8080
"""

from __future__ import annotations

import hashlib
import hmac
import json
import logging
import os
from http import HTTPStatus

from dotenv import load_dotenv
from flask import Flask, request

from assessment.src.config import ROOT, Settings
from assessment.src.pipeline import run_assessment

load_dotenv(ROOT.parent / ".env")

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

app = Flask(__name__)


def _verify_retell_signature(payload: bytes, signature: str | None) -> bool:
    secret = os.environ.get("RETELL_WEBHOOK_SECRET", "").strip()
    if not secret:
        log.warning("RETELL_WEBHOOK_SECRET not set — skipping signature verification")
        return True
    if not signature:
        return False
    expected = hmac.new(secret.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/webhook/retell")
def retell_webhook():
    raw = request.get_data()
    if not _verify_retell_signature(raw, request.headers.get("X-Retell-Signature")):
        return {"error": "invalid signature"}, HTTPStatus.UNAUTHORIZED

    event = request.get_json(silent=True) or {}
    event_type = event.get("event")

    if event_type != "call_ended":
        return {"status": "ignored", "event": event_type}

    call = event.get("call", {})
    transcript = call.get("transcript", "")
    if not transcript:
        log.warning("call_ended with no transcript: call_id=%s", call.get("call_id"))
        return {"status": "no_transcript"}, HTTPStatus.OK

    metadata = call.get("metadata") or {}
    dynamic = call.get("retell_llm_dynamic_variables") or {}
    client_name = (
        metadata.get("client_name")
        or dynamic.get("client_name")
        or call.get("from_number")
        or "Unknown Client"
    )
    industry = metadata.get("industry") or dynamic.get("industry") or ""
    team_size = metadata.get("team_size") or dynamic.get("team_size") or ""

    try:
        settings = Settings.from_env()
        paths = run_assessment(
            settings,
            transcript=transcript,
            client_name=client_name,
            industry=industry,
            team_size=team_size,
        )
        log.info("Pipeline complete for %s: %s", client_name, paths["report"])
        return {
            "status": "processed",
            "client": client_name,
            "report": str(paths["report"]),
            "analysis": str(paths["analysis"]),
        }
    except Exception as exc:
        log.exception("Pipeline failed for %s", client_name)
        return {"status": "error", "message": str(exc)}, HTTPStatus.INTERNAL_SERVER_ERROR


def main():
    port = int(os.environ.get("WEBHOOK_PORT", "8080"))
    app.run(host="0.0.0.0", port=port, debug=os.environ.get("FLASK_DEBUG") == "1")


if __name__ == "__main__":
    main()
