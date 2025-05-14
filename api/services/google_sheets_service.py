import json
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from api.config import Config
from api.domain.call_model import FIELD_MAPPING

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
    
    def find_row_by_value(self, sheet_name: str, column_name: str, value: str):
        """
        Find the row that contains a specific value in a column.

        :param sheet_name: Name of the Google Sheets sheet.
        :param column_name: Name of the column to search in.
        :param value: Value to search for.
        :return: Row index (1-based) or None if not found.
        """
        sheet = self.client.open(sheet_name).sheet1
        data = sheet.get_all_records()

        if column_name not in data[0]:
            raise ValueError(f"Column '{column_name}' not found in the sheet.")

        for index, row in enumerate(data, start=2):  # start=2 content data
            if row.get(column_name) == value:
                return index

        return None
    
    def update_row(self, sheet_name: str, row_index: int, updated_fields: dict):
        """
        Updates a specific row in Google Sheets.

        :param sheet_name: Name of the Google Sheets sheet.
        :param row_index: Index of the row to update (1-based).
        :param updated_fields: Dictionary with the fields and values to update.
        """
        sheet = self.client.open(sheet_name).sheet1
        headers = sheet.row_values(1)  # Get the headers of the sheet

        # Translate field names using the mapping
        translated_fields = {
            FIELD_MAPPING.get(key, key): value for key, value in updated_fields.items()
        }

        # Build the updated row
        current_row = sheet.row_values(row_index)
        updated_row = [
            translated_fields.get(header, current_row[i]) if i < len(current_row) else ""
            for i, header in enumerate(headers)
        ]

        print('Updated row:', updated_row)
        # Update the row in Google Sheets
        sheet.update(f"A{row_index}", [updated_row])