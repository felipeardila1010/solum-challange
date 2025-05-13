from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    GOOGLE_CREDENTIALS_JSON = os.getenv("GOOGLE_CREDENTIALS_JSON", "{}")