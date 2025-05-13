from fastapi import APIRouter
from api.services.google_sheets_service import GoogleSheetsService

router = APIRouter()
google_sheets_service = GoogleSheetsService()

@router.get("/api/records")
async def get_records():
    data = google_sheets_service.get_sheet_data("Copy of Technical Challenge Solum Health")
    return data