"""
Advanced MCP Client for Google Workspace (G Suite) Integration.
This client provides a sophisticated interface for interacting with Google services
through the Model Context Protocol (MCP).
"""

import json
import logging
import asyncio
from typing import Dict, Any, List, Optional, Union, Tuple, Callable, Awaitable
from functools import wraps
from datetime import datetime, timedelta

import base64

from django.conf import settings

from services.service_utils.integration_utils import get_google_credentials
from googleapiclient.discovery import build
# Import MCP functions directly
from services.tools.integrations.gsuite_tools import (
    # Google Drive functions
    gdrive_search as mcp_gdrive_search,
    gdrive_read_file as mcp_gdrive_read_file,
    gdrive_list_files as mcp_gdrive_list_files,
    
    # Google Calendar functions
    gcal_list_events as mcp_gcal_list_events,
    gcal_create_event as mcp_gcal_create_event,
    gcal_get_availability as mcp_gcal_get_availability,
    

)

logger = logging.getLogger(__name__)

# Type definitions for better type hinting
MCPResult = Dict[str, Any]
MCPToolFunction = Callable[..., Union[str, Dict[str, Any]]]
AsyncMCPToolFunction = Callable[..., Awaitable[Union[str, Dict[str, Any]]]]

class GSuiteServerError(Exception):
    """Exception raised for GSuite server errors."""
    pass

def handle_result(func):
    """
    Decorator to standardize result handling for MCP tool functions.
    Parses JSON strings and handles errors consistently.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            result = func(*args, **kwargs)
            
            # Parse the result if it's a string (JSON)
            if isinstance(result, str):
                try:
                    return json.loads(result)
                except json.JSONDecodeError:
                    # If it's not JSON, return it as is in a result field
                    return {"result": result, "success": True}
            else:
                # If it's already a dict or other object, return it as is
                return {"result": result, "success": True}
                
        except Exception as e:
            logger.exception(f"Error in MCP tool {func.__name__}: {e}")
            return {"error": str(e), "success": False}
    
    return wrapper


class GoogleDriveServer:
    """
    Server for interacting with Google Drive through MCP.
    Provides methods for searching, reading, and listing files.
    """
    
    def __init__(self, user_id: Optional[str] = None):
        """
        Initialize the Google Drive server.
        
        Args:
            user_id: Optional user ID to use for all requests
        """
        self.user_id = user_id
        logger.debug(f"Initialized Google Drive server for user_id: {user_id}")
    
    @handle_result
    def search(self, query: str, user_id: Optional[str] = None) -> MCPResult:
        """
        Search for files in Google Drive.
        
        Args:
            query: Search query string
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with search results
        """
        effective_user_id = user_id or self.user_id
        return mcp_gdrive_search(user_id=effective_user_id, query=query)
    
    @handle_result
    def read_file(self, file_id: str, user_id: Optional[str] = None) -> MCPResult:
        """
        Read the contents of a Google Drive file.
        
        Args:
            file_id: ID of the file to read
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with file contents
        """
        effective_user_id = user_id or self.user_id
        return mcp_gdrive_read_file(user_id=effective_user_id, file_id=file_id)
    
    @handle_result
    def list_files(self, folder_id: str = "root", max_files: int = 20, user_id: Optional[str] = None) -> MCPResult:
        """
        List files in a Google Drive folder.
        
        Args:
            folder_id: ID of the folder to list files from (default: "root")
            max_files: Maximum number of files to return
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with list of files
        """
        effective_user_id = user_id or self.user_id
        return mcp_gdrive_list_files(
            user_id=effective_user_id, 
            folder_id=folder_id, 
            max_files=max_files
        )

class GoogleCalendarServer:
    """
    Server for interacting with Google Calendar through MCP.
    Provides methods for listing events, creating events, and checking availability.
    """
    
    def __init__(self, user_id: Optional[str] = None):
        """
        Initialize the Google Calendar server.
        
        Args:
            user_id: Optional user ID to use for all requests
        """
        self.user_id = user_id
        logger.debug(f"Initialized Google Calendar server for user_id: {user_id}")
    
    @handle_result
    def list_events(
        self, 
        start_date: str, 
        end_date: str, 
        calendar_id: str = "primary",
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        List events from a Google Calendar.
        
        Args:
            start_date: Start date for the events (ISO format YYYY-MM-DD)
            end_date: End date for the events (ISO format YYYY-MM-DD)
            calendar_id: ID of the calendar to list events from (default: "primary")
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with list of events
        """
        effective_user_id = user_id or self.user_id
        return mcp_gcal_list_events(
            user_id=effective_user_id,
            start_date=start_date,
            end_date=end_date,
            calendar_id=calendar_id
        )
    
    @handle_result
    def create_event(
        self,
        summary: str,
        start_datetime: str,
        end_datetime: str,
        description: str = "",
        location: str = "",
        calendar_id: str = "primary",
        add_video_conferencing: bool = False,
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Create a new event in Google Calendar.
        
        Args:
            summary: Event title/summary
            start_datetime: Start date and time in ISO format (YYYY-MM-DDTHH:MM:SS)
            end_datetime: End date and time in ISO format (YYYY-MM-DDTHH:MM:SS)
            description: Optional event description
            location: Optional event location
            calendar_id: Calendar ID (default: "primary")
            add_video_conferencing: Whether to add Google Meet video conferencing
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with created event details
        """
        effective_user_id = user_id or self.user_id
        return mcp_gcal_create_event(
            user_id=effective_user_id,
            summary=summary,
            start_datetime=start_datetime,
            end_datetime=end_datetime,
            description=description,
            location=location,
            calendar_id=calendar_id,
            add_video_conferencing=add_video_conferencing
        )
    
    @handle_result
    def get_availability(
        self,
        start_date: str,
        end_date: str,
        min_duration_minutes: int = 30,
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Get the user's availability within a time range.
        
        Args:
            start_date: Start date in ISO format (YYYY-MM-DD)
            end_date: End date in ISO format (YYYY-MM-DD)
            min_duration_minutes: Minimum duration in minutes for available slots
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with available time slots
        """
        effective_user_id = user_id or self.user_id
        return mcp_gcal_get_availability(
            user_id=effective_user_id,
            start_date=start_date,
            end_date=end_date,
            min_duration_minutes=min_duration_minutes
        )


class GoogleGmailServer:
    """
    Server for interacting with Gmail through MCP.
    Provides methods for searching, reading, and sending emails.
    """
    
    def __init__(self, user_id: Optional[str] = None):
        """
        Initialize the Gmail server.
        
        Args:
            user_id: Optional user ID to use for all requests
        """
        self.user_id = user_id
        logger.debug(f"Initialized Gmail server for user_id: {user_id}")
    
    @handle_result
    def list_messages(
        self, 
        query: str = "", 
        max_results: int = 10, 
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        List Gmail messages matching a query.
        
        Args:
            query: Gmail search query (same format as Gmail search box)
            max_results: Maximum number of messages to return
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with list of messages
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            return {"error": "User ID is required but not provided.", "success": False}
            
        credentials = get_google_credentials(effective_user_id, "gmail")
        if not credentials:
            return {"error": "Gmail is not authenticated for this account.", "success": False}
            
        try:
            # Initialize the Gmail API service
            service = build('gmail', 'v1', credentials=credentials)
            
            # Get messages matching the query
            result = service.users().messages().list(
                userId='me',
                q=query,
                maxResults=max_results
            ).execute()
            
            messages = result.get('messages', [])
            
            if not messages:
                return {
                    "result": f"No messages found matching '{query}'.",
                    "messages": [],
                    "success": True
                }
                
            # Get detailed information for each message
            detailed_messages = []
            for msg in messages:
                message = service.users().messages().get(
                    userId='me', 
                    id=msg['id'],
                    format='metadata',
                    metadataHeaders=['Subject', 'From', 'To', 'Date']
                ).execute()
                
                # Extract headers
                headers = message.get('payload', {}).get('headers', [])
                subject = next((h['value'] for h in headers if h['name'] == 'Subject'), 'No Subject')
                sender = next((h['value'] for h in headers if h['name'] == 'From'), 'Unknown')
                recipient = next((h['value'] for h in headers if h['name'] == 'To'), 'Unknown')
                date = next((h['value'] for h in headers if h['name'] == 'Date'), 'Unknown')
                
                # Format the message
                detailed_messages.append({
                    'id': message['id'],
                    'threadId': message['threadId'],
                    'subject': subject,
                    'from': sender,
                    'to': recipient,
                    'date': date,
                    'snippet': message.get('snippet', ''),
                    'labelIds': message.get('labelIds', [])
                })
                
            return {
                "messages": detailed_messages,
                "success": True
            }
            
        except Exception as e:
            logger.exception(f"Error listing Gmail messages: {e}")
            return {"error": f"Error listing messages: {str(e)}", "success": False}
    
    @handle_result
    def read_message(self, message_id: str, user_id: Optional[str] = None) -> MCPResult:
        """
        Read the contents of a Gmail message.
        
        Args:
            message_id: ID of the message to read
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with message contents
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            return {"error": "User ID is required but not provided.", "success": False}
            
        credentials = get_google_credentials(effective_user_id, "gmail")
        if not credentials:
            return {"error": "Gmail is not authenticated for this account.", "success": False}
            
        try:
            # Initialize the Gmail API service
            service = build('gmail', 'v1', credentials=credentials)
            
            # Get the full message
            message = service.users().messages().get(
                userId='me', 
                id=message_id,
                format='full'
            ).execute()
            
            # Extract headers
            headers = message.get('payload', {}).get('headers', [])
            subject = next((h['value'] for h in headers if h['name'] == 'Subject'), 'No Subject')
            sender = next((h['value'] for h in headers if h['name'] == 'From'), 'Unknown')
            recipient = next((h['value'] for h in headers if h['name'] == 'To'), 'Unknown')
            date = next((h['value'] for h in headers if h['name'] == 'Date'), 'Unknown')
            
            # Extract message body
            payload = message.get('payload', {})
            body = ""
            
            # Handle multipart messages
            if 'parts' in payload:
                for part in payload['parts']:
                    if part.get('mimeType') == 'text/plain' and 'body' in part and 'data' in part['body']:
                        body_data = part['body']['data']
                        body += base64.urlsafe_b64decode(body_data).decode('utf-8')
            # Handle single part messages
            elif 'body' in payload and 'data' in payload['body']:
                body_data = payload['body']['data']
                body = base64.urlsafe_b64decode(body_data).decode('utf-8')
            
            return {
                "message": {
                    'id': message['id'],
                    'threadId': message['threadId'],
                    'subject': subject,
                    'from': sender,
                    'to': recipient,
                    'date': date,
                    'body': body,
                    'labelIds': message.get('labelIds', [])
                },
                "success": True
            }
            
        except Exception as e:
            logger.exception(f"Error reading Gmail message: {e}")
            return {"error": f"Error reading message: {str(e)}", "success": False}
    
    @handle_result
    def send_message(
        self, 
        to: str, 
        subject: str, 
        body: str, 
        cc: str = "", 
        bcc: str = "", 
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Send a Gmail message.
        
        Args:
            to: Recipient email address(es), comma-separated
            subject: Email subject
            body: Email body (plain text)
            cc: CC recipients, comma-separated
            bcc: BCC recipients, comma-separated
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with send result
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            return {"error": "User ID is required but not provided.", "success": False}
            
        credentials = get_google_credentials(effective_user_id, "gmail")
        if not credentials:
            return {"error": "Gmail is not authenticated for this account.", "success": False}
            
        try:
            # Initialize the Gmail API service
            service = build('gmail', 'v1', credentials=credentials)
            
            # Create the message
            message = f"From: me\nTo: {to}\n"
            if cc:
                message += f"CC: {cc}\n"
            if bcc:
                message += f"BCC: {bcc}\n"
            message += f"Subject: {subject}\n\n{body}"
            
            # Encode the message
            encoded_message = base64.urlsafe_b64encode(message.encode('utf-8')).decode('utf-8')
            
            # Send the message
            sent_message = service.users().messages().send(
                userId='me',
                body={'raw': encoded_message}
            ).execute()
            
            return {
                "result": "Message sent successfully",
                "messageId": sent_message['id'],
                "threadId": sent_message.get('threadId', ''),
                "success": True
            }
            
        except Exception as e:
            logger.exception(f"Error sending Gmail message: {e}")
            return {"error": f"Error sending message: {str(e)}", "success": False}

class GoogleDocsServer:
    """
    Server for interacting with Google Docs through MCP.
    Provides methods for creating, reading, and updating documents.
    """
    
    def __init__(self, user_id: Optional[str] = None):
        """
        Initialize the Google Docs server.
        
        Args:
            user_id: Optional user ID to use for all requests
        """
        self.user_id = user_id
        logger.debug(f"Initialized Google Docs server for user_id: {user_id}")
    
    @handle_result
    def create_document(
        self, 
        title: str, 
        content: str = "", 
        folder_id: Optional[str] = None,
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Create a new Google Doc.
        
        Args:
            title: Document title
            content: Initial document content (optional)
            folder_id: ID of the folder to create the document in (optional)
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with created document details
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            return {"error": "User ID is required but not provided.", "success": False}
            
        credentials = get_google_credentials(effective_user_id, "docs")
        if not credentials:
            return {"error": "Google Docs is not authenticated for this account.", "success": False}
            
        try:
            # Initialize the Google Docs and Drive API services
            docs_service = build('docs', 'v1', credentials=credentials)
            drive_service = build('drive', 'v3', credentials=credentials)
            
            # Create an empty document
            doc = docs_service.documents().create(body={'title': title}).execute()
            doc_id = doc.get('documentId')
            
            # If content is provided, add it to the document
            if content:
                docs_service.documents().batchUpdate(
                    documentId=doc_id,
                    body={
                        'requests': [
                            {
                                'insertText': {
                                    'location': {
                                        'index': 1
                                    },
                                    'text': content
                                }
                            }
                        ]
                    }
                ).execute()
            
            # If folder_id is provided, move the document to that folder
            if folder_id:
                # First get the file
                file = drive_service.files().get(
                    fileId=doc_id, 
                    fields='parents'
                ).execute()
                
                # Remove from previous parents and add to new folder
                previous_parents = ",".join(file.get('parents', []))
                drive_service.files().update(
                    fileId=doc_id,
                    addParents=folder_id,
                    removeParents=previous_parents,
                    fields='id, parents'
                ).execute()
            
            # Get the document link
            doc_link = f"https://docs.google.com/document/d/{doc_id}/edit"
            
            return {
                "document": {
                    "id": doc_id,
                    "title": title,
                    "link": doc_link
                },
                "success": True
            }
            
        except Exception as e:
            logger.exception(f"Error creating Google Doc: {e}")
            return {"error": f"Error creating document: {str(e)}", "success": False}
    
    @handle_result
    def read_document(self, document_id: str, user_id: Optional[str] = None) -> MCPResult:
        """
        Read the contents of a Google Doc.
        
        Args:
            document_id: ID of the document to read
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with document contents
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            return {"error": "User ID is required but not provided.", "success": False}
            
        credentials = get_google_credentials(effective_user_id, "docs")
        if not credentials:
            return {"error": "Google Docs is not authenticated for this account.", "success": False}
            
        try:
            # Initialize the Google Docs API service
            docs_service = build('docs', 'v1', credentials=credentials)
            
            # Get the document
            document = docs_service.documents().get(documentId=document_id).execute()
            
            # Extract document content
            content = ""
            for content_item in document.get('body', {}).get('content', []):
                if 'paragraph' in content_item:
                    for element in content_item['paragraph'].get('elements', []):
                        if 'textRun' in element:
                            content += element['textRun'].get('content', '')
            
            return {
                "document": {
                    "id": document_id,
                    "title": document.get('title', 'Untitled'),
                    "content": content,
                    "link": f"https://docs.google.com/document/d/{document_id}/edit"
                },
                "success": True
            }
            
        except Exception as e:
            logger.exception(f"Error reading Google Doc: {e}")
            return {"error": f"Error reading document: {str(e)}", "success": False}
    
    @handle_result
    def update_document(
        self, 
        document_id: str, 
        content: str, 
        append: bool = False,
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Update the contents of a Google Doc.
        
        Args:
            document_id: ID of the document to update
            content: New content to add
            append: Whether to append content (True) or replace (False)
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with update result
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            return {"error": "User ID is required but not provided.", "success": False}
            
        credentials = get_google_credentials(effective_user_id, "docs")
        if not credentials:
            return {"error": "Google Docs is not authenticated for this account.", "success": False}
            
        try:
            # Initialize the Google Docs API service
            docs_service = build('docs', 'v1', credentials=credentials)
            
            requests = []
            
            if append:
                # Get the current document to find the end index
                document = docs_service.documents().get(documentId=document_id).execute()
                end_index = document.get('body', {}).get('content', [])[-1].get('endIndex', 1)
                
                # Append content at the end
                requests.append({
                    'insertText': {
                        'location': {
                            'index': end_index - 1
                        },
                        'text': content
                    }
                })
            else:
                # Replace all content
                # First, delete all content
                requests.append({
                    'deleteContentRange': {
                        'range': {
                            'startIndex': 1,
                            'endIndex': 10000  # A large number to ensure all content is deleted
                        }
                    }
                })
                
                # Then insert new content
                requests.append({
                    'insertText': {
                        'location': {
                            'index': 1
                        },
                        'text': content
                    }
                })
            
            # Execute the update
            result = docs_service.documents().batchUpdate(
                documentId=document_id,
                body={'requests': requests}
            ).execute()
            
            return {
                "result": "Document updated successfully",
                "documentId": document_id,
                "link": f"https://docs.google.com/document/d/{document_id}/edit",
                "success": True
            }
            
        except Exception as e:
            logger.exception(f"Error updating Google Doc: {e}")
            return {"error": f"Error updating document: {str(e)}", "success": False}

class GoogleSheetsServer:
    """
    Server for interacting with Google Sheets through MCP.
    Provides methods for creating, reading, and updating spreadsheets.
    """
    
    def __init__(self, user_id: Optional[str] = None):
        """
        Initialize the Google Sheets server.
        
        Args:
            user_id: Optional user ID to use for all requests
        """
        self.user_id = user_id
        logger.debug(f"Initialized Google Sheets server for user_id: {user_id}")
    
    @handle_result
    def create_spreadsheet(
        self, 
        title: str, 
        data: Optional[List[List[Any]]] = None,
        folder_id: Optional[str] = None,
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Create a new Google Sheet.
        
        Args:
            title: Spreadsheet title
            data: Initial data as a 2D array (optional)
            folder_id: ID of the folder to create the spreadsheet in (optional)
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with created spreadsheet details
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            return {"error": "User ID is required but not provided.", "success": False}
            
        credentials = get_google_credentials(effective_user_id, "sheets")
        if not credentials:
            return {"error": "Google Sheets is not authenticated for this account.", "success": False}
            
        try:
            # Initialize the Google Sheets and Drive API services
            sheets_service = build('sheets', 'v4', credentials=credentials)
            drive_service = build('drive', 'v3', credentials=credentials)
            
            # Create an empty spreadsheet
            spreadsheet = sheets_service.spreadsheets().create(
                body={
                    'properties': {'title': title},
                    'sheets': [{'properties': {'title': 'Sheet1'}}]
                }
            ).execute()
            
            spreadsheet_id = spreadsheet.get('spreadsheetId')
            
            # If data is provided, add it to the spreadsheet
            if data:
                sheets_service.spreadsheets().values().update(
                    spreadsheetId=spreadsheet_id,
                    range='Sheet1',
                    valueInputOption='RAW',
                    body={'values': data}
                ).execute()
            
            # If folder_id is provided, move the spreadsheet to that folder
            if folder_id:
                # First get the file
                file = drive_service.files().get(
                    fileId=spreadsheet_id, 
                    fields='parents'
                ).execute()
                
                # Remove from previous parents and add to new folder
                previous_parents = ",".join(file.get('parents', []))
                drive_service.files().update(
                    fileId=spreadsheet_id,
                    addParents=folder_id,
                    removeParents=previous_parents,
                    fields='id, parents'
                ).execute()
            
            # Get the spreadsheet link
            spreadsheet_link = f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}/edit"
            
            return {
                "spreadsheet": {
                    "id": spreadsheet_id,
                    "title": title,
                    "link": spreadsheet_link
                },
                "success": True
            }
            
        except Exception as e:
            logger.exception(f"Error creating Google Sheet: {e}")
            return {"error": f"Error creating spreadsheet: {str(e)}", "success": False}
    
    @handle_result
    def read_spreadsheet(
        self, 
        spreadsheet_id: str, 
        range_name: str = 'Sheet1',
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Read data from a Google Sheet.
        
        Args:
            spreadsheet_id: ID of the spreadsheet to read
            range_name: Range to read (e.g., 'Sheet1', 'Sheet1!A1:C10')
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with spreadsheet data
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            return {"error": "User ID is required but not provided.", "success": False}
            
        credentials = get_google_credentials(effective_user_id, "sheets")
        if not credentials:
            return {"error": "Google Sheets is not authenticated for this account.", "success": False}
            
        try:
            # Initialize the Google Sheets API service
            sheets_service = build('sheets', 'v4', credentials=credentials)
            
            # Get spreadsheet metadata
            spreadsheet = sheets_service.spreadsheets().get(
                spreadsheetId=spreadsheet_id
            ).execute()
            
            # Get spreadsheet data
            result = sheets_service.spreadsheets().values().get(
                spreadsheetId=spreadsheet_id,
                range=range_name
            ).execute()
            
            values = result.get('values', [])
            
            return {
                "spreadsheet": {
                    "id": spreadsheet_id,
                    "title": spreadsheet.get('properties', {}).get('title', 'Untitled'),
                    "data": values,
                    "link": f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}/edit"
                },
                "success": True
            }
            
        except Exception as e:
            logger.exception(f"Error reading Google Sheet: {e}")
            return {"error": f"Error reading spreadsheet: {str(e)}", "success": False}
    
    @handle_result
    def update_spreadsheet(
        self, 
        spreadsheet_id: str, 
        range_name: str,
        data: List[List[Any]],
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Update data in a Google Sheet.
        
        Args:
            spreadsheet_id: ID of the spreadsheet to update
            range_name: Range to update (e.g., 'Sheet1', 'Sheet1!A1:C10')
            data: New data as a 2D array
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with update result
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            return {"error": "User ID is required but not provided.", "success": False}
            
        credentials = get_google_credentials(effective_user_id, "sheets")
        if not credentials:
            return {"error": "Google Sheets is not authenticated for this account.", "success": False}
            
        try:
            # Initialize the Google Sheets API service
            sheets_service = build('sheets', 'v4', credentials=credentials)
            
            # Update the spreadsheet
            result = sheets_service.spreadsheets().values().update(
                spreadsheetId=spreadsheet_id,
                range=range_name,
                valueInputOption='USER_ENTERED',
                body={'values': data}
            ).execute()
            
            return {
                "result": "Spreadsheet updated successfully",
                "updatedCells": result.get('updatedCells', 0),
                "updatedRange": result.get('updatedRange', ''),
                "spreadsheetId": spreadsheet_id,
                "link": f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}/edit",
                "success": True
            }
            
        except Exception as e:
            logger.exception(f"Error updating Google Sheet: {e}")
            return {"error": f"Error updating spreadsheet: {str(e)}", "success": False}