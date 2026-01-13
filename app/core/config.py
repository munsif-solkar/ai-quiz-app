import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings


load_dotenv()

GROK_API_KEY = os.getenv("GROK_API_KEY")
PSQL_PASSWORD = os.getenv("PSQL_PASSWORD")

class JwtConfig(BaseSettings):
    SECRET: str = os.getenv("JWT_SECRET")
    ALGO: str = "HS256"
    EXPIRE_MIN: int = 180

jwtconfig = JwtConfig()
