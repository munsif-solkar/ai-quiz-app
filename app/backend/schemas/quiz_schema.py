from pydantic import BaseModel
from typing import List
from schemas.question_schema import Question
from schemas.constants import IntensityType,QuizLengthConstraints,QuizIntensityConstraints,QuizTopicConstraints,QuizIdConstraints

class Quiz(BaseModel):
    quiz_id: str = QuizIdConstraints
    topic: str = QuizTopicConstraints
    intensity: IntensityType = QuizIntensityConstraints
    length: int = QuizLengthConstraints
    questions: List[Question]

class QuizAnswers(BaseModel):
    question_index: int
    selected_option: int 

    