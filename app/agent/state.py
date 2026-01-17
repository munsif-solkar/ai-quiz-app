from langgraph.graph import StateGraph

class State(StateGraph):
    topic: str
    quiz_json: dict
    error: str | None