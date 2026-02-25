from fastapi import APIRouter,HTTPException
from fastapi.responses import JSONResponse
from schemas.user_query import solved_quiz_query
from schemas.quiz_eval_schema import quiz_evaluation
from agent.graph import EvaluateQuizAgent

router = APIRouter()

@router.post('/generate-quiz',response_model=quiz_evaluation)
async def generateQuiz(solved_quiz: solved_quiz_query):
    try:
        agent_output = await EvaluateQuizAgent(solved_quiz)
        quiz_reults = agent_output["quiz_evaluation"]
        if not quiz_reults:
            return HTTPException(status_code=500,detail="Unable to generate quiz!")
        evaluation_response = quiz_evaluation(**quiz_reults)
        return JSONResponse(status_code=200,
                            content=quiz_reults.model_dump())
    except:
        HTTPException(status_code=500,detail="Something went wrong")

