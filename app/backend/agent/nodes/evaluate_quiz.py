from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from schemas.quiz_eval_schema import quiz_evaluation
from agent.state import State
from core.config import GROQ_API_KEY

llm = ChatGroq(model="llama-3.3-70b-versatile")

structured_llm = llm.with_structured_output(quiz_evaluation)

def evaluate_quiz(state: State):
    prompt = f"Check the quiz, User selected this options {state['quiz_answers']}"
    print('fucking state',state)
    try:
        response = structured_llm.invoke([
            SystemMessage(content=f"Quiz: {state['quiz_json']}"),
            HumanMessage(content=prompt)
        ],timeout=10)
       
        return {"quiz_evaluation":response.model_dump()}
    except Exception as e:

        return {"error":"Something went wrong, try again!"}