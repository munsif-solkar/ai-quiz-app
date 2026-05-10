from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from schemas.user_query import input_validation_response
from agent.state import State
from core.config import GROQ_API_KEY

llm = ChatGroq(model="llama-3.3-70b-versatile")

structured_llm = llm.with_structured_output(input_validation_response)

async def validate_input_node(state: State):
    print("--- VALIDATING INPUT ---")
    topic = state['topic']
    prompt = "Validate the user input for quiz generation, check if the topic is appropriate and not some inappropriate content like vulgur words or random characters or something demanding that is not related to quiz dont proceed without a valid quiz topic"
    try:
        response = await structured_llm.ainvoke([
            SystemMessage(content=prompt),
            HumanMessage(content=topic)
        ],timeout=10)
        res = response.model_dump();
        return {"error":res['error']}
        
    except Exception as e:

        return {"error":"Something went wrong, try again!"}
        