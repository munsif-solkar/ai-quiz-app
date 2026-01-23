from fastapi import APIRouter,HTTPException

router = APIRouter()

@router.get('/generate-quiz')
def generateQuiz():
    return {"message":"hello"}