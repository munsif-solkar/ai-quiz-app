from typing import TypedDict

class State(TypedDict):
    topic: str
    quiz_json: dict
    error: str | None