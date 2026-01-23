from typing import TypedDict,Literal

class State(TypedDict):
    topic: str
    intensity: Literal['easy','medium','hard']
    quiz_json: dict
    error: str | None