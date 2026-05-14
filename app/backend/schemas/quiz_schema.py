from pydantic import BaseModel,Field
from typing import List,Annotated
from schemas.question_schema import Question
from schemas.constants import IntensityType,QuizLengthConstraints,QuizIntensityConstraints,QuizTopicConstraints,QuizIdConstraints,RelatedTopicsConstraints


class Quiz(BaseModel):
    quiz_id: str = QuizIdConstraints
    topic: str = QuizTopicConstraints
    intensity: IntensityType = QuizIntensityConstraints
    length: int = QuizLengthConstraints
    questions: List[Question]
    related_topics: List[str] = RelatedTopicsConstraints

class QuizAnswers(BaseModel):
    question_index: int
    selected_option: int 

    