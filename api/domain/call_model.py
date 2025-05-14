from typing import Optional
from pydantic import BaseModel

class UpdateCallRequest(BaseModel):
    call_id: str
    evaluation: Optional[str]
    qa_check: Optional[str]
    feedback_qa: Optional[str]

FIELD_MAPPING = {
    "evaluation": "Evaluation",
    "qa_check": "QA Check",
    "feedback_qa": "Feedback QA",
}