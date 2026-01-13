from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from core.config import PSQL_PASSWORD
from urllib.parse import quote_plus

DB_URL = f'postgresql://postgres:{quote_plus(PSQL_PASSWORD)}@localhost:5432/seadiary'

engine = create_engine(DB_URL)

SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()