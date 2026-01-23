from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from app.schemas.quiz_schema import Quiz
from app.agent.state import State
from app.core.config import GROQ_API_KEY

llm = ChatGroq(model="llama-3.3-70b-versatile")

structured_llm = llm.with_structured_output(Quiz)

def gen_quiz_node(state: State):
    prompt = f"Generate a 10 question multiple choice quiz about {state["topic"]}"
    try:
        response = structured_llm.invoke([
            SystemMessage(content="You are a quiz creator who generates quiz based on user topic each with a structure of question, 4 options, correct_answer, short_explnation"),
            HumanMessage(content=prompt)
        ])
        
       
        return {"quiz_json":response.model_dump()}
    except Exception as e:
        return {"error":"Something went wrong, try again!"}
    

