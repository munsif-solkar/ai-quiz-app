from pydantic import BaseModel,field_validator
from schemas.constants import IntensityType,QuizLengthConstraints,QuizTopicConstraints
from schemas.quiz_schema import QuizAnswers
from typing import List

class user_query(BaseModel):
    topic: str = QuizTopicConstraints
    intensity: IntensityType
    length: int = QuizLengthConstraints

    @field_validator('intensity',mode='before')
    @classmethod
    def validate_command(cls,v:str) -> str:
        return v.lower()
    
class solved_quiz_query(BaseModel):
    quiz_id: str
    quiz_answers: List[QuizAnswers]