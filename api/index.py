from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import calls, metrics

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(calls.router)
app.include_router(metrics.router)