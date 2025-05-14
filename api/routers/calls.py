from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from api.services.google_sheets_service import GoogleSheetsService
from api.domain.call_model import UpdateCallRequest

router = APIRouter()
google_sheets_service = GoogleSheetsService()
sheetName = "Copy of Technical Challenge Solum Health"

@router.get("/api/calls")
async def get_calls(
    offset: int = Query(0, ge=0),  # Default offset is 0, must be >= 0
    limit: int = Query(10, gt=0),  # Default limit is 10, must be > 0
    search: Optional[str] = Query(None)  # Optional search parameter for filtering by call_id
):
    # data = google_sheets_service.get_sheet_data(sheetName)  # Fetch all data from Google Sheets

    # # Apply search filter if search parameter is provided
    # if search:
    #     data = [record for record in data if search.lower() in record.get("call_id", "").lower()]

    # # Apply pagination
    # paginated_data = data[offset:offset + limit]
    # new_offset = offset + limit if offset + limit < len(data) else None

    # return {
    #     "calls": paginated_data,
    #     "newOffset": new_offset,
    #     "totalCalls": len(data)
    # }

    # Mock data for testing
    return {
        "calls": [
            {
                "call_id": "d5a86034-181c-4132-a476-bbcaa490cbda",
                "ended_reason": "customer-ended-call",
                "assistant": "653fe3ea-5c24-439a-9a4b-0b17d78e3577",
                "customer_phone_number": 15717818433,
                "call_start_time": "2025-02-10T18:13:24.660Z",
                "duration": 68.454,
                "call_ended_time": "2025-02-10T18:14:33.114Z",
                "summary": "summaryyyyy",
                "recording_url": "https://storage.vapi.ai/d5a86034-181c-4132-a476-bbcaa490cbda-1739211275619-18f56a63-27e7-41dc-ad00-3d70ea4e8460-mono.wav",
                "reviewer": "Esthefany",
                "evaluation": "TRUE",
                "qa_check": "QA Done",
                "feedback_qa": "N/A",
                "status_feedback_engineer": "",
                "comments_engineer": ""
            },
        ],
        "newOffset": None,
        "totalCalls": 1
    }
    
@router.put("/api/calls/{call_id}")
async def update_call(call_id: str, update_data: UpdateCallRequest):
    """
    Updates the data of a specific call in Google Sheets.

    :param call_id: ID of the call to update.
    :param update_data: Data to update.
    """
    try:
        updated_fields = update_data.dict(exclude_unset=True)

        row_index = google_sheets_service.find_row_by_value(sheetName, "call_id", call_id)
        if row_index is None:
            raise HTTPException(status_code=404, detail=f"Call ID '{call_id}' not found.")

        # Update the row
        google_sheets_service.update_row(sheetName, row_index, updated_fields)

        return {"message": "Call updated successfully", "updatedFields": updated_fields}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while updating the call.")