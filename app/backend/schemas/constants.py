from typing import Literal
from pydantic import Field

IntensityType = Literal['easy','medium','hard']

QuizLengthConstraints = Field(ge=5,le=20)

QuizTopicConstraints = Field(max_length=150,min_length=10)

QuizIntensityConstraints = Field(description="Intensity of quiz easy,medium or hard")

QuizIdConstraints = Field(description="Unique uuid4 id for quiz")

RelatedTopicsConstraints = Field(description="List of related topics for the quiz, should be relevant to the core quiz topic and can be used for recommending similar quizzes to users.",min_length=3,max_length=3)   