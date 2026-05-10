from langgraph.graph import StateGraph, START, END
from agent.nodes.generate_quiz import gen_quiz_node
from agent.nodes.validate_quiz import validate_quiz_node
from agent.nodes.evaluate_quiz import evaluate_quiz
from agent.nodes.validate_input import validate_input_node
from agent.routers.quiz_router import quiz_router
from agent.routers.post_input_validation_router import post_input_validation_router
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

# 1. Add all nodes
workflow.add_node("generate", gen_quiz_node)
workflow.add_node("validate_quiz", validate_quiz_node)
workflow.add_node("evaluate", evaluate_quiz)
workflow.add_node("validate_input", validate_input_node)

# 2. Add Conditional Edges (Branching)
# START routes to either validate_input or evaluate
workflow.add_conditional_edges(
    START, 
    quiz_router, 
    {"generate": "validate_input", "evaluate": "evaluate"}
)

# validate_input routes to either generate or END
workflow.add_conditional_edges(
    "validate_input", 
    post_input_validation_router, 
    {"generate": "generate", END: END}
)

# 3. Add Standard Edges (Linear paths)
workflow.add_edge("generate", "validate_quiz")
workflow.add_edge("validate_quiz", END)
workflow.add_edge("evaluate", END)


quiz_agent = workflow.compile(checkpointer=memory_saver)



async def InvokeQuizAgent(query: user_query):
    quiz_id = str(uuid.uuid4())
    print("quiz id",quiz_id)
    print(query)
    initial_state = create_state()
    initial_state['topic'] = query.topic.capitalize()
    initial_state['intensity'] = query.intensity.lower()
    initial_state["length"] = str(query.length)
    initial_state["quiz_id"] = quiz_id 
  
    config = {"configurable":{"thread_id":quiz_id}}
    response = await quiz_agent.ainvoke(initial_state,config=config)
    return response



  
async def EvaluateQuizAgent(solved_quiz: solved_quiz_query):

    quiz_id = solved_quiz.quiz_id
    quiz_answers = solved_quiz.quiz_answers
    state_snapshot = quiz_agent.get_state({"configurable":{"thread_id":quiz_id}})

    partial_state = {
        "quiz_answers":quiz_answers,
        "quiz_solved":True
    }
    config = {"configurable":{"thread_id":quiz_id}}
    response = await quiz_agent.ainvoke(partial_state,config=config)

    return response




