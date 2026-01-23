from pydantic import BaseModel, Field
from typing import List,Literal
from app.schemas.question_schema import Question

class Quiz(BaseModel):
    topic: str
    intensity: Literal['easy','medium','hard'] = Field(description="Intensity of quiz easy,medium or hard")
    questions: List[Question]

    