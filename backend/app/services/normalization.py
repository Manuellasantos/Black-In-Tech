import re
import unicodedata


SKILL_ALIASES = {
    "css3": "css",
    "html5": "html",
    "js": "javascript",
    "node": "nodejs",
    "nodejs": "nodejs",
    "postgres": "postgresql",
    "py": "python",
    "reactjs": "react",
    "ts": "typescript",
}

LEVEL_ALIASES = {
    "estagiario": "junior",
    "jr": "junior",
    "junior": "junior",
    "mid": "pleno",
    "pl": "pleno",
    "pleno": "pleno",
    "senior": "senior",
    "sr": "senior",
}

REGION_ALIASES = {
    "biguacu": "grande florianopolis",
    "florianopolis": "grande florianopolis",
    "grande florianopolis": "grande florianopolis",
    "palhoca": "grande florianopolis",
    "regiao metropolitana de florianopolis": "grande florianopolis",
    "sao jose": "grande florianopolis",
}

MODALITY_ALIASES = {
    "hibrida": "hibrido",
    "hibrido": "hibrido",
    "hybrid": "hibrido",
    "onsite": "presencial",
    "presencial": "presencial",
    "remote": "remoto",
    "remota": "remoto",
    "remoto": "remoto",
}


def normalize_text(value: str) -> str:
    decomposed = unicodedata.normalize("NFKD", value)
    ascii_value = "".join(character for character in decomposed if not unicodedata.combining(character))
    return re.sub(r"\s+", " ", re.sub(r"[^a-zA-Z0-9]+", " ", ascii_value)).strip().lower()


def normalize_skill(value: str) -> str:
    compact = normalize_text(value).replace(" ", "")
    return SKILL_ALIASES.get(compact, compact)


def normalize_level(value: str) -> str:
    normalized = normalize_text(value)
    return LEVEL_ALIASES.get(normalized, normalized)


def normalize_region(value: str) -> str:
    normalized = normalize_text(value)
    return REGION_ALIASES.get(normalized, normalized)


def normalize_modality(value: str) -> str:
    normalized = normalize_text(value)
    return MODALITY_ALIASES.get(normalized, normalized)
