from typing import Dict
from fastapi import APIRouter, HTTPException
from api.domain.call_model import FIELD_MAPPING
from api.services.google_sheets_service import GoogleSheetsService

router = APIRouter()
google_sheets_service = GoogleSheetsService()
sheetName = "Copy of Technical Challenge Solum Health"

@router.get("/api/metrics/evaluation_status")
async def evaluation_status() -> Dict[str, float]:
    """
    Returns the percentage of calls with evaluations completed and not completed.
    """
    try:
        data = google_sheets_service.get_sheet_data(sheetName)

        # Ensure data is not empty
        if not data or len(data) < 1:
            raise HTTPException(status_code=500, detail="Sheet data is empty or invalid")

        # Calculate the percentages
        total_calls = len(data)
        print("Total calls:", total_calls)
        completed_evaluations = sum(1 for row in data if row.get(FIELD_MAPPING['evaluation'], "").strip().upper() == "TRUE")
        not_completed_evaluations = total_calls - completed_evaluations

        if total_calls == 0:
            completed_percentage = 0.0
            not_completed_percentage = 0.0
        else:
            completed_percentage = (completed_evaluations / total_calls) * 100
            not_completed_percentage = (not_completed_evaluations / total_calls) * 100

        return {
            "percentage_evaluation_completed": completed_percentage,
            "percentage_evaluation_not_completed": not_completed_percentage
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")