from pydantic import BaseModel,Field
from typing import List

class quiz_evaluation(BaseModel):
    topic: str = Field('Topic of the quiz')
    score: float = Field('Score of quiz in percentage')
    incorrect_answers_index: List[int] = Field("Quenstion indexes for incorrect answers")
    correct_answer_index: List[int] = Field("Quenstion indexes for correct answers")
    improvement_tips: str = Field("Improvement learning tips for user based on quiz in short")