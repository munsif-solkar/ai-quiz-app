from fastapi import APIRouter,HTTPException
from fastapi.responses import JSONResponse
from schemas.user_query import solved_quiz_query
from schemas.quiz_eval_schema import quiz_evaluation
from agent.graph import EvaluateQuizAgent

router = APIRouter()

@router.post('/evaluate-quiz',response_model=quiz_evaluation)
async def evaluateQuiz(solved_quiz: solved_quiz_query):
    try:
        agent_output = await EvaluateQuizAgent(solved_quiz)
       
        quiz_reults = agent_output["quiz_evaluation"]
        error = agent_output.get("error")
        if error:
            raise HTTPException(status_code=400,detail=error)
        if not quiz_reults:
            raise HTTPException(status_code=500,detail="Unable to evaluate quiz!")
        evaluation_response = quiz_evaluation(**quiz_reults)
        return evaluation_response.model_dump()
    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))

