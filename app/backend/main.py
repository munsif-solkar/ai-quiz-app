from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from routers.GenerateQuizRoute import router as GenereateQuizRouter

app = FastAPI(
    title="Ai Quiz Generator",
    version="1.0.0"
)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request,exc: RequestValidationError):
    for error in exc.errors():
        error["message"] = error.pop('msg')
    
    return JSONResponse(
        status_code=422,
        content=jsonable_encoder({
            "detail":exc.errors(),
        })
    )

app.include_router(GenereateQuizRouter)
