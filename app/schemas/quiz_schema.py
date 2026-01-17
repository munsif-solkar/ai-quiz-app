from pydantic import BaseModel, Field
from typing import List
from app.schemas.question_schema import Question

class Quiz(BaseModel):
    topic: str
    questions: List[Question]

    