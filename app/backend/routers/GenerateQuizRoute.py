from fastapi import APIRouter,HTTPException
from fastapi.responses import JSONResponse
from schemas.user_query import user_query
from schemas.quiz_schema import Quiz
from agent.graph import InvokeQuizAgent

router = APIRouter()

@router.post('/generate-quiz',response_model=Quiz)
async def generateQuiz(query: user_query):
    try:
        agent_output = InvokeQuizAgent(query.topic,query.intensity)
        quiz_json = agent_output["quiz_json"]
        if not quiz_json:
            return HTTPException(status_code=500,detail="Unable to generate quiz!")
        quiz_response = Quiz(**quiz_json)
        return JSONResponse(status_code=200,
                            content=quiz_response.model_dump())
    except:
        HTTPException(status_code=500,detail="Something went wrong")