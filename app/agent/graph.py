from langgraph.graph import StateGraph, START, END
from app.agent.nodes.generate_quiz import gen_quiz_node
from app.agent.state import State


def create_state() -> State:
    return {
        "topic":None,
        "quiz_json":[],
        "error":None
    }

initial_state = create_state()
initial_state["topic"] = "Python pandas library"

print(gen_quiz_node(initial_state))


