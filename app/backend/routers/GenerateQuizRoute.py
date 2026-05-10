from fastapi import APIRouter,HTTPException
from fastapi.responses import JSONResponse
from schemas.user_query import user_query
from schemas.quiz_schema import Quiz
from agent.graph import InvokeQuizAgent

router = APIRouter()

@router.post('/generate-quiz',response_model=Quiz)
async def generateQuiz(query: user_query):
    try:
        agent_output = await InvokeQuizAgent(query)
        error = agent_output.get("error")
        print(error)
        if error:
            raise HTTPException(status_code=400,detail=error)
        quiz_json = agent_output.get("quiz_json")
        if not quiz_json:
            raise HTTPException(status_code=500,detail="Unable to generate quiz!")
        print(f'Quiz JSON: {quiz_json}')
        quiz_response = Quiz(**quiz_json)
        return quiz_response
    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))

@router.get("/health")
async def health_check():
    return JSONResponse(status_code=200, content={"status": "ok", "message": "Server is running"})