from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml

from .config import QUESTION_BANK_PATH


def load_question_bank(path: Path | None = None) -> dict[str, Any]:
    bank_path = path or QUESTION_BANK_PATH
    with bank_path.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


def format_interview_script(industry: str | None = None) -> str:
    bank = load_question_bank()
    lines: list[str] = [
        "# AI Assessment — Interview Script",
        "",
        f"Target duration: {bank['meta']['interview_duration_minutes']} minutes",
        "",
    ]

    for key, cat in bank["categories"].items():
        lines.append(f"## {cat['label']}")
        for q in cat["questions"]:
            lines.append(f"- {q}")
        lines.append("")

    if industry and industry in bank.get("industries", {}):
        ind = bank["industries"][industry]
        lines.append(f"## Industry: {ind['label']}")
        for q in ind["questions"]:
            lines.append(f"- {q}")
        lines.append("")

    lines.append("## Follow-up probes (when answers are vague)")
    for q in bank.get("follow_up_probes", []):
        lines.append(f"- {q}")

    return "\n".join(lines)


def industry_questions_for_retell(industry: str | None = None) -> str:
    bank = load_question_bank()
    if not industry or industry not in bank.get("industries", {}):
        return (
            "Ask 2–3 questions about their biggest manual workflows and "
            "where leads or client communication slow down."
        )

    ind = bank["industries"][industry]
    return "\n".join(f"- {q}" for q in ind["questions"])
