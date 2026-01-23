from pydantic import BaseModel, Field
from typing import List

class Question(BaseModel):
    question: str = Field(description="The quiz question")
    options: List[str] = Field(description="List of 4 options")
    correct_answer: int = Field(description="Index 1,2,3,4 of Correct answer for the question from options")
    short_explanation: str = Field(description="short explanation on why the answer is correct")