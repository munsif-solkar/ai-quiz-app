import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings


load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
