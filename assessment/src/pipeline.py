from __future__ import annotations

import re
from datetime import date
from pathlib import Path

from .claude import analyze_transcript, generate_report
from .config import OUTPUT_DIR, Settings


def slugify(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return slug or "client"


def run_assessment(
    settings: Settings,
    *,
    transcript: str,
    client_name: str,
    industry: str = "",
    team_size: str = "",
    assessment_date: str | None = None,
    output_dir: Path | None = None,
) -> dict[str, Path]:
    """Two-step pipeline: analyze transcript, then generate client report."""
    out = output_dir or OUTPUT_DIR
    out.mkdir(parents=True, exist_ok=True)

    day = assessment_date or date.today().isoformat()
    slug = slugify(client_name)
    prefix = f"{day}_{slug}"

    analysis = analyze_transcript(
        settings,
        transcript=transcript,
        client_name=client_name,
        industry=industry or "Not specified",
        team_size=team_size or "Not specified",
    )
    analysis_path = out / f"{prefix}_analysis.md"
    analysis_path.write_text(analysis, encoding="utf-8")

    report = generate_report(
        settings,
        analysis=analysis,
        client_name=client_name,
        industry=industry or "Not specified",
        assessment_date=day,
    )
    report_path = out / f"{prefix}_report.md"
    report_path.write_text(report, encoding="utf-8")

    return {
        "analysis": analysis_path,
        "report": report_path,
    }
