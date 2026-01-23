from pydantic import BaseModel, Field
from typing import List
from schemas.question_schema import Question
from schemas.constants import IntensityType

class Quiz(BaseModel):
    topic: str
    intensity: IntensityType = Field(description="Intensity of quiz easy,medium or hard")
    questions: List[Question]

    