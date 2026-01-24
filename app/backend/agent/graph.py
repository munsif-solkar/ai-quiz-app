from langgraph.graph import StateGraph, START, END
from agent.nodes.generate_quiz import gen_quiz_node
from agent.nodes.validate_quiz import validate_quiz_node
from agent.state import State
from schemas.user_query import user_query


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

quiz_agent = workflow.compile()



def InvokeQuizAgent(query: user_query):
    initial_state = create_state()
    initial_state['topic'] = query.topic.capitalize()
    initial_state['intensity'] = query.intensity.lower()
    initial_state["length"] = str(query.length)
    response = quiz_agent.invoke(initial_state)
    return response


