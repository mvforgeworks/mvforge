from __future__ import annotations

import argparse
import sys
from pathlib import Path

from dotenv import load_dotenv

from .config import ROOT, Settings
from .pipeline import run_assessment
from .question_bank import format_interview_script, industry_questions_for_retell
from .prompts import load_template, render


def _load_transcript(path: Path) -> str:
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        raise ValueError(f"Transcript file is empty: {path}")
    return text


def cmd_run(args: argparse.Namespace) -> int:
    load_dotenv(ROOT.parent / ".env")
    settings = Settings.from_env()
    transcript = _load_transcript(Path(args.transcript))
    paths = run_assessment(
        settings,
        transcript=transcript,
        client_name=args.client,
        industry=args.industry or "",
        team_size=args.team_size or "",
        output_dir=Path(args.output) if args.output else None,
    )
    print("Assessment complete.")
    print(f"  Analysis: {paths['analysis']}")
    print(f"  Report:   {paths['report']}")
    print("\nNext: upload the report .md content to Gamma (audittemplate.ai) for final formatting.")
    return 0


def cmd_script(args: argparse.Namespace) -> int:
    script = format_interview_script(industry=args.industry)
    if args.output:
        out = Path(args.output)
        out.write_text(script, encoding="utf-8")
        print(f"Interview script written to {out}")
    else:
        print(script)
    return 0


def cmd_retell_prompt(args: argparse.Namespace) -> int:
    load_dotenv(ROOT.parent / ".env")
    company = args.company or "MV Forge"
    industry_q = industry_questions_for_retell(args.industry)
    template = load_template("retell_agent_system.txt")
    prompt = render(template, company_name=company, industry_questions=industry_q)
    if args.output:
        out = Path(args.output)
        out.write_text(prompt, encoding="utf-8")
        print(f"Retell agent prompt written to {out}")
    else:
        print(prompt)
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="MV Forge AI Business Assessment pipeline",
    )
    sub = parser.add_subparsers(dest="command", required=True)

    run_p = sub.add_parser("run", help="Process a transcript into analysis + report")
    run_p.add_argument("--transcript", "-t", required=True, help="Path to transcript .txt")
    run_p.add_argument("--client", "-c", required=True, help="Client business name")
    run_p.add_argument("--industry", "-i", help="Industry key from question_bank.yaml")
    run_p.add_argument("--team-size", help="Team size if known")
    run_p.add_argument("--output", "-o", help="Output directory")
    run_p.set_defaults(func=cmd_run)

    script_p = sub.add_parser("script", help="Print interview question script")
    script_p.add_argument("--industry", "-i", help="Industry key for extra questions")
    script_p.add_argument("--output", "-o", help="Write script to file")
    script_p.set_defaults(func=cmd_script)

    retell_p = sub.add_parser("retell-prompt", help="Generate Retell.ai agent system prompt")
    retell_p.add_argument("--industry", "-i", help="Industry key")
    retell_p.add_argument("--company", help="Your company name")
    retell_p.add_argument("--output", "-o", help="Write prompt to file")
    retell_p.set_defaults(func=cmd_retell_prompt)

    args = parser.parse_args(argv)
    try:
        return args.func(args)
    except (ValueError, FileNotFoundError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
