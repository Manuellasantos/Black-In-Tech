import json
from functools import lru_cache
from pathlib import Path

from app.schemas.candidate import CandidateProfile


DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "candidates.json"


@lru_cache
def load_candidates() -> tuple[CandidateProfile, ...]:
    with DATA_FILE.open(encoding="utf-8") as source:
        records = json.load(source)
    return tuple(CandidateProfile.model_validate(record) for record in records)
