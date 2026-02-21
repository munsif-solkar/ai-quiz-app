from langgraph.graph import StateGraph, START, END
from agent.nodes.generate_quiz import gen_quiz_node
from agent.nodes.validate_quiz import validate_quiz_node
from agent.nodes.evaluate_quiz import evaluate_quiz
from agent.nodes.quiz_router import quiz_router
from agent.state import State
from schemas.user_query import user_query,solved_quiz_query
from langgraph.checkpoint.memory import MemorySaver
import uuid

def create_state() -> State:
    return {
        "topic":None,
        "quiz_json": None,
        "error":None,
        "length":5,
        "intensity": "easy",
        "quiz_id":None,
        "quiz_solved": False,
        "quiz_answers":None,
        "quiz_evaluation":None
    }

memory_saver = MemorySaver()

workflow = StateGraph(State)

workflow.add_node("generate",gen_quiz_node)
workflow.add_node("validate",validate_quiz_node)
workflow.add_node("evaluate",evaluate_quiz)


workflow.add_edge("generate","validate")
workflow.add_conditional_edges(START,quiz_router,{"generate":"generate","evaluate":"evaluate"})

workflow.add_edge("validate",END)
workflow.add_edge("evaluate",END)





quiz_agent = workflow.compile(checkpointer=memory_saver)



def InvokeQuizAgent(query: user_query):
    quiz_id = str(uuid.uuid4())
    print("quiz id",quiz_id)
    print(query)
    initial_state = create_state()
    initial_state['topic'] = query.topic.capitalize()
    initial_state['intensity'] = query.intensity.lower()
    initial_state["length"] = str(query.length)
    initial_state["quiz_id"] = quiz_id 

    config = {"configurable":{"thread_id":quiz_id}}
    response = quiz_agent.invoke(initial_state,config=config)
    print('eternal resp',response)
    return response



  
def EvaluateQuizAgent(solved_quiz: solved_quiz_query):

    quiz_id = solved_quiz.quiz_id
    quiz_answers = solved_quiz.quiz_answers
    state_snapshot = quiz_agent.get_state({"configurable":{"thread_id":quiz_id}})

    partial_state = {
        "quiz_answers":quiz_answers,
        "quiz_solved":True
    }
    config = {"configurable":{"thread_id":quiz_id}}
    response = quiz_agent.invoke(partial_state,config=config)

    return response




