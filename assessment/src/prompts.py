from __future__ import annotations

from pathlib import Path

from .config import PROMPTS_DIR


def load_template(name: str) -> str:
    path = PROMPTS_DIR / name
    if not path.exists():
        raise FileNotFoundError(f"Prompt template not found: {path}")
    return path.read_text(encoding="utf-8")


def render(template: str, **kwargs: str | int) -> str:
    result = template
    for key, value in kwargs.items():
        result = result.replace("{{" + key + "}}", str(value))
    return result
