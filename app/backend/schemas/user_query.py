from pydantic import BaseModel
from schemas.constants import IntensityType,QuizLengthConstraints,QuizTopicConstraints

class user_query(BaseModel):
    topic: str = QuizTopicConstraints
    intensity: IntensityType
    length: int = QuizLengthConstraints