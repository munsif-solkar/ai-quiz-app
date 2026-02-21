from typing import TypedDict
from schemas.constants import IntensityType

class State(TypedDict):
    topic: str
    intensity: IntensityType
    length: int
    quiz_json: dict
    quiz_id:str
    error: str | None
    quiz_solved: bool
    quiz_answers: list
    quiz_evaluation: dict