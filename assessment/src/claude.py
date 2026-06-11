from __future__ import annotations

from anthropic import Anthropic

from .config import Settings
from .prompts import load_template, render


def analyze_transcript(
    settings: Settings,
    *,
    transcript: str,
    client_name: str,
    industry: str = "Not specified",
    team_size: str = "Not specified",
) -> str:
    template = load_template("analyze_transcript.txt")
    prompt = render(
        template,
        transcript=transcript.strip(),
        client_name=client_name,
        industry=industry,
        team_size=team_size,
        hourly_rate=settings.hourly_rate,
    )

    client = Anthropic(api_key=settings.anthropic_api_key)
    response = client.messages.create(
        model=settings.claude_model,
        max_tokens=8192,
        messages=[{"role": "user", "content": prompt}],
    )
    return _text_from_response(response)


def generate_report(
    settings: Settings,
    *,
    analysis: str,
    client_name: str,
    industry: str = "Not specified",
    assessment_date: str,
) -> str:
    template = load_template("generate_report.txt")
    prompt = render(
        template,
        analysis=analysis.strip(),
        client_name=client_name,
        industry=industry,
        assessment_date=assessment_date,
        hourly_rate=settings.hourly_rate,
        booking_url=settings.booking_url,
    )

    client = Anthropic(api_key=settings.anthropic_api_key)
    response = client.messages.create(
        model=settings.claude_model,
        max_tokens=8192,
        messages=[{"role": "user", "content": prompt}],
    )
    return _text_from_response(response)


def _text_from_response(response) -> str:
    parts: list[str] = []
    for block in response.content:
        if block.type == "text":
            parts.append(block.text)
    return "\n".join(parts).strip()
