from fastapi import FastAPI
from api.routers import records

app = FastAPI()

app.include_router(records.router)