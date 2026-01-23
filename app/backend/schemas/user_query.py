from pydantic import BaseModel,Field
from schemas.constants import IntensityType

class user_query(BaseModel):
    topic: str = Field(max_length=150,min_length=50)
    intensity: IntensityType