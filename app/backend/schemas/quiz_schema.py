from pydantic import BaseModel
from typing import List
from schemas.question_schema import Question
from schemas.constants import IntensityType,QuizLengthConstraints,QuizIntensityConstraints,QuizTopicConstraints

class Quiz(BaseModel):
    topic: str = QuizTopicConstraints
    intensity: IntensityType = QuizIntensityConstraints
    length: int = QuizLengthConstraints
    questions: List[Question]

    