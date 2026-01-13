from datetime import datetime, timedelta
import jwt
from fastapi import HTTPException
from core.config import jwtconfig

def create_access_token(subject: str):
    payload = {
        'sub':subject,
        'exp': datetime.now() + timedelta(minutes=jwtconfig.EXPIRE_MIN),
        'iat':datetime.now()
    }
    return jwt.encode(payload,jwtconfig.SECRET,algorithm=jwtconfig.ALGO)

def decode_token(token:str):
    try:
        return jwt.decode(token,jwtconfig.SECRET,algorithms=[jwtconfig.ALGO])
    except jwt.ExpiredSignatureError:
        raise HTTPException(401,'Token expired')
    except jwt.InvalidTokenError:
        raise HTTPException(401,'Invalid token')