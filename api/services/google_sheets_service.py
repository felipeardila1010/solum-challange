import json
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from api.config import Config

class GoogleSheetsService:
    def __init__(self):
        scope = [
            "https://spreadsheets.google.com/feeds",
            "https://www.googleapis.com/auth/drive",
        ]
        # Load the JSON string from the environment variable
        credentials_dict = json.loads(Config.GOOGLE_CREDENTIALS_JSON)
        creds = ServiceAccountCredentials.from_json_keyfile_dict(
            credentials_dict, scope
        )
        self.client = gspread.authorize(creds)

    def get_sheet_data(self, sheet_name: str):
        sheet = self.client.open(sheet_name).sheet1
        return sheet.get_all_records()