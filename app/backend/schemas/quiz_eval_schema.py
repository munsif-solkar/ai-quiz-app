from pydantic import BaseModel,Field
from typing import List

class quiz_evaluation(BaseModel):
    topic: str = Field('Topic of the quiz')
    score: float = Field('Score of quiz in percentage')
    incorrect_answers_index: List[int] = Field("Quenstion indexes for incorrect answers should match total number of incorrect answers by lengths should be in [1,2,3,4,5,.....] format")
    correct_answers_index: List[int] = Field("Quenstion indexes for correct answers should match total number of correct answers by length should be in [1,2,3,4,5,.....] format")
    improvement_tips: str = Field("Improvement learning tips for user based on quiz in brief with resources tips in brief tell user what they did wrong show comaparsion explananiton in 400-500 chars")
    links: List[str] = Field("List of resources links for user to improve on the topic minimum 1 link and maximum 5 links",min_length=1,max_length=5)