from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROMPTS_DIR = ROOT / "prompts"
OUTPUT_DIR = ROOT / "output"
QUESTION_BANK_PATH = ROOT / "question_bank.yaml"


@dataclass
class Settings:
    anthropic_api_key: str
    claude_model: str
    hourly_rate: int
    booking_url: str
    company_name: str

    @classmethod
    def from_env(cls) -> Settings:
        api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
        if not api_key:
            raise ValueError(
                "ANTHROPIC_API_KEY is not set. Copy .env.example to .env and add your key."
            )
        return cls(
            anthropic_api_key=api_key,
            claude_model=os.environ.get("CLAUDE_MODEL", "claude-sonnet-4-20250514"),
            hourly_rate=int(os.environ.get("HOURLY_RATE", "100")),
            booking_url=os.environ.get(
                "BOOKING_URL", "https://calendly.com/your-link/assessment-followup"
            ),
            company_name=os.environ.get("COMPANY_NAME", "MV Forge"),
        )
