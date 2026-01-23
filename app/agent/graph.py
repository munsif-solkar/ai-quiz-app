from langgraph.graph import StateGraph, START, END
from app.agent.nodes.generate_quiz import gen_quiz_node
from app.agent.nodes.validate_quiz import validate_quiz_node
from app.agent.state import State


def create_state() -> State:
    return {
        "topic":None,
        "quiz_json": None,
        "error":None,
        "intensity": "easy"
    }

workflow = StateGraph(State)
workflow.add_node("generate",gen_quiz_node)
workflow.add_node("validate",validate_quiz_node)
workflow.add_edge("generate","validate")
workflow.set_entry_point("generate")
workflow.set_finish_point("validate")

agent = workflow.compile()

initial_state = create_state()
initial_state['topic'] = "Fundamentels of data science in python"


res = agent.invoke(initial_state)
print(res)



