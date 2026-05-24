from typing import Literal
from pydantic import Field


    

IntensityType = Literal['easy','medium','hard']

QuizLengthConstraints = Field(ge=5,le=15,description="Number of questions in the quiz should be between 5 and 15")

QuizTopicConstraints = Field(max_length=150,min_length=10)

QuizIntensityConstraints = Field(description="Intensity of quiz easy,medium or hard")

QuizIdConstraints = Field(description="Unique uuid4 id for quiz")

RelatedTopicsConstraints =  Field(description="List of related topics for the quiz, should be relevant to the core quiz topic and can be used for recommending similar quizzes to users. Each topic must be a full descriptive phrase (not abbreviations). Avoid single words like 'API', 'ML', 'AI'. Use educational titles like 'API Design Fundamentals'.",min_length=3,max_length=3)   