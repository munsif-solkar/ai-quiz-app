from typing import TypedDict,Literal
from schemas.constants import IntensityType

class State(TypedDict):
    topic: str
    intensity: IntensityType
    length: int
    quiz_json: dict
    error: str | None