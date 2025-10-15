"""
Tool descriptions for Google Suite integration tools.

These tools provide comprehensive integration with Google Workspace services
including Drive, Calendar, Gmail, Sheets, and other Google applications.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
GSUITE_TOOLS_DESCRIPTIONS = {
    "google_drive_search": """
    <tool>
        <name>google_drive_search</name>
        <use_case>Search for files and documents in Google Drive using natural language queries and advanced search filters.</use_case>
        <behavior>
            Searches Google Drive for files and documents using natural language queries
            and advanced search capabilities. Supports file type filtering, date ranges,
            ownership filters, and content-based search. Returns comprehensive file
            metadata including permissions, sharing status, and content previews.
        </behavior>
        <when_to_use>
            Use when searching for specific documents, finding files by content,
            locating shared resources, or conducting comprehensive document
            discovery across Google Drive storage.
        </when_to_use>
        <intent>
            To provide powerful search capabilities for Google Drive enabling
            efficient document discovery, content-based file finding, and
            comprehensive resource location across organizational storage.
        </intent>
        <side_effects>None. This is a read-only search operation.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - query: Search query string for Google Drive (required)
        </args>
        <returns>
            Dictionary with search results including file metadata, content
            previews, sharing information, and comprehensive file details
            for discovered documents and resources.
        </returns>
        <raises>
            - ValueError: If query is not specified or invalid
            - GoogleDriveError: If Google Drive search cannot be performed
            - AuthenticationError: If Google credentials are invalid or expired
        </raises>
        <schema_constraints>
            - query must be a non-empty string
            - query should be meaningful and specific for better results
        </schema_constraints>
    </tool>
    """,
    
    "google_drive_read_files": """
    <tool>
        <name>google_drive_read_files</name>
        <use_case>Read and extract content from Google Drive files including documents, spreadsheets, PDFs, and other file types.</use_case>
        <behavior>
            Reads and extracts content from Google Drive files including Google Docs,
            Sheets, Slides, PDFs, and other supported file types. Supports multiple
            file formats and provides structured content extraction with metadata
            and formatting preservation where possible.
        </behavior>
        <when_to_use>
            Use when extracting content from Google Drive files, analyzing
            document content, processing file data, or accessing information
            from various file types stored in Google Drive.
        </when_to_use>
        <intent>
            To provide comprehensive file reading capabilities for Google Drive
            enabling content extraction, document analysis, and data processing
            from various file formats and types.
        </intent>
        <side_effects>None. This is a read-only file access operation.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - file_ids: List of Google Drive file IDs to read (required)
            - range_name: Sheet range for spreadsheet files (optional, default: "Sheet1")
        </args>
        <returns>
            Dictionary with file content including extracted text, metadata,
            formatting information, and structured data from the specified
            Google Drive files.
        </returns>
        <raises>
            - ValueError: If file_ids is empty or invalid
            - GoogleDriveError: If files cannot be read or accessed
            - AuthenticationError: If Google credentials are invalid or expired
            - PermissionError: If user lacks access to specified files
        </raises>
        <schema_constraints>
            - file_ids must be a non-empty list of valid Google Drive file IDs
            - range_name must be a valid sheet range if provided
        </schema_constraints>
    </tool>
    """,
    
    "google_drive_list_files": """
    <tool>
        <name>google_drive_list_files</name>
        <use_case>List files and folders in Google Drive with metadata and organizational information.</use_case>
        <behavior>
            Lists files and folders in Google Drive with comprehensive metadata
            including file names, types, sizes, modification dates, sharing status,
            and organizational structure. Supports folder-based listing and
            hierarchical navigation.
        </behavior>
        <when_to_use>
            Use when browsing Google Drive contents, exploring folder structures,
            getting file inventories, or conducting systematic file discovery
            and organization analysis.
        </when_to_use>
        <intent>
            To provide comprehensive file listing capabilities for Google Drive
            enabling systematic file discovery, organization analysis, and
            efficient navigation of stored resources.
        </intent>
        <side_effects>None. This is a read-only listing operation.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - folder_id: Google Drive folder ID to list (optional, default: "root")
            - max_files: Maximum number of files to return (optional, default: 20)
        </args>
        <returns>
            Dictionary with file listing including file metadata, folder
            structure, organizational information, and comprehensive
            details about stored resources.
        </returns>
        <raises>
            - GoogleDriveError: If file listing cannot be performed
            - AuthenticationError: If Google credentials are invalid or expired
            - PermissionError: If user lacks access to specified folder
        </raises>
        <schema_constraints>
            - folder_id must be a valid Google Drive folder ID if provided
            - max_files must be a positive integer if provided
        </schema_constraints>
    </tool>
    """,
    
    "google_calendar_list_events": """
    <tool>
        <name>google_calendar_list_events</name>
        <use_case>List calendar events from Google Calendar with filtering by date range and calendar selection.</use_case>
        <behavior>
            Lists calendar events from Google Calendar with support for date range
            filtering, calendar selection, and comprehensive event metadata.
            Provides detailed event information including attendees, locations,
            descriptions, and scheduling details.
        </behavior>
        <when_to_use>
            Use when retrieving calendar events, analyzing scheduling patterns,
            conducting calendar audits, or accessing event information for
            planning and coordination purposes.
        </when_to_use>
        <intent>
            To provide comprehensive calendar event access enabling scheduling
            analysis, event management, and calendar-based planning and
            coordination activities.
        </intent>
        <side_effects>None. This is a read-only calendar access operation.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - start_date: Start date for event filtering (optional, default: None)
            - end_date: End date for event filtering (optional, default: None)
            - calendar_id: Google Calendar ID to query (optional, default: "primary")
        </args>
        <returns>
            Dictionary with calendar events including event details, attendees,
            scheduling information, and comprehensive metadata for
            calendar analysis and planning.
        </returns>
        <raises>
            - GoogleCalendarError: If calendar events cannot be retrieved
            - AuthenticationError: If Google credentials are invalid or expired
            - PermissionError: If user lacks access to specified calendar
        </raises>
        <schema_constraints>
            - start_date must be a valid ISO date string if provided
            - end_date must be a valid ISO date string if provided
            - calendar_id must be a valid Google Calendar ID if provided
        </schema_constraints>
    </tool>
    """,
    
    "google_calendar_get_availability": """
    <tool>
        <name>google_calendar_get_availability</name>
        <use_case>Check calendar availability and free time slots for scheduling and meeting coordination.</use_case>
        <behavior>
            Checks calendar availability for specified time periods and returns
            free time slots suitable for scheduling meetings. Analyzes existing
            events and commitments to identify available time windows with
            configurable minimum duration requirements.
        </behavior>
        <when_to_use>
            Use when scheduling meetings, finding available time slots,
            coordinating appointments, or planning events that require
            calendar availability checking.
        </when_to_use>
        <intent>
            To provide calendar availability checking capabilities enabling
            efficient meeting scheduling, time slot identification, and
            calendar-based coordination activities.
        </intent>
        <side_effects>None. This is a read-only availability check operation.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - start_date: Start date for availability check (required)
            - end_date: End date for availability check (required)
            - min_duration_minutes: Minimum duration for available slots (optional, default: 30)
        </args>
        <returns>
            Dictionary with availability information including free time slots,
            busy periods, and scheduling recommendations for meeting
            coordination and planning.
        </returns>
        <raises>
            - ValueError: If start_date or end_date are not specified or invalid
            - GoogleCalendarError: If availability cannot be checked
            - AuthenticationError: If Google credentials are invalid or expired
        </raises>
        <schema_constraints>
            - start_date must be a valid ISO date string
            - end_date must be a valid ISO date string
            - min_duration_minutes must be a positive integer if provided
        </schema_constraints>
    </tool>
    """,
    
    "gmail_search_messages": """
    <tool>
        <name>gmail_search_messages</name>
        <use_case>Search Gmail messages using advanced search queries and filters for email discovery and analysis.</use_case>
        <behavior>
            Searches Gmail messages using advanced search capabilities including
            content-based search, sender filtering, date ranges, and label-based
            filtering. Returns comprehensive message metadata including headers,
            content previews, and attachment information.
        </behavior>
        <when_to_use>
            Use when searching for specific emails, conducting email analysis,
            finding messages by content or sender, or performing comprehensive
            email discovery and research.
        </when_to_use>
        <intent>
            To provide powerful Gmail search capabilities enabling efficient
            email discovery, content-based message finding, and comprehensive
            email analysis and research.
        </intent>
        <side_effects>None. This is a read-only email search operation.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - query: Gmail search query string (optional, default: "")
            - max_results: Maximum number of results to return (optional, default: 10)
        </args>
        <returns>
            Dictionary with Gmail search results including message metadata,
            content previews, sender information, and comprehensive
            email details for discovered messages.
        </returns>
        <raises>
            - GmailError: If Gmail search cannot be performed
            - AuthenticationError: If Google credentials are invalid or expired
            - PermissionError: If user lacks Gmail access
        </raises>
        <schema_constraints>
            - query must be a valid Gmail search string if provided
            - max_results must be a positive integer if provided
        </schema_constraints>
    </tool>
    """,
    
    "gmail_read_full_messages": """
    <tool>
        <name>gmail_read_full_messages</name>
        <use_case>Read full Gmail messages including content, attachments, and complete message details.</use_case>
        <behavior>
            Reads complete Gmail messages including full content, headers,
            attachments, and metadata. Provides comprehensive message access
            with formatting preservation and complete information retrieval
            for detailed email analysis and processing.
        </behavior>
        <when_to_use>
            Use when reading complete email content, analyzing message details,
            processing email attachments, or conducting comprehensive
            email content analysis and review.
        </when_to_use>
        <intent>
            To provide comprehensive Gmail message reading capabilities enabling
            complete email content access, detailed message analysis, and
            full-featured email processing and review.
        </intent>
        <side_effects>None. This is a read-only email access operation.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - message_ids: List of Gmail message IDs to read (optional, default: None)
        </args>
        <returns>
            Dictionary with full Gmail messages including complete content,
            headers, attachments, metadata, and comprehensive message
            details for analysis and processing.
        </returns>
        <raises>
            - GmailError: If Gmail messages cannot be read
            - AuthenticationError: If Google credentials are invalid or expired
            - PermissionError: If user lacks access to specified messages
        </raises>
        <schema_constraints>
            - message_ids must be a list of valid Gmail message IDs if provided
        </schema_constraints>
    </tool>
    """,
    
    "google_sheets_create_spreadsheet": """
    <tool>
        <name>google_sheets_create_spreadsheet</name>
        <use_case>Create new Google Sheets spreadsheets with specified titles and folder organization.</use_case>
        <behavior>
            Creates new Google Sheets spreadsheets with specified titles and
            optional folder organization. Provides spreadsheet creation with
            initial setup, sharing permissions, and organizational structure
            for collaborative data management and analysis.
        </behavior>
        <when_to_use>
            Use when creating new spreadsheets for data collection, analysis,
            reporting, or collaborative work that requires Google Sheets
            functionality and sharing capabilities.
        </when_to_use>
        <intent>
            To provide Google Sheets creation capabilities enabling efficient
            spreadsheet setup, data management, and collaborative
            document creation and organization.
        </intent>
        <side_effects>Creates new Google Sheets spreadsheet in specified location.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - title: Title for the new spreadsheet (optional, default: None)
            - folder_id: Google Drive folder ID for organization (optional, default: None)
        </args>
        <returns>
            Dictionary with created spreadsheet information including
            spreadsheet ID, sharing URL, folder location, and
            comprehensive creation details.
        </returns>
        <raises>
            - GoogleSheetsError: If spreadsheet cannot be created
            - AuthenticationError: If Google credentials are invalid or expired
            - PermissionError: If user lacks access to specified folder
        </raises>
        <schema_constraints>
            - title must be a valid string if provided
            - folder_id must be a valid Google Drive folder ID if provided
        </schema_constraints>
    </tool>
    """,
    
    "google_meet_list_conference_records": """
    <tool>
        <name>google_meet_list_conference_records</name>
        <use_case>Find the record for a given meeting code or calendar event.</use_case>
        <behavior>
            Uses the Google Meet REST API to list conference records for a given meeting code or calendar event ID.
        </behavior>
        <when_to_use>
            Use when you need to find conference records for a specific Google Meet meeting
            using either the meeting code or calendar event ID.
        </when_to_use>
        <intent>
            To retrieve conference records from Google Meet for analysis, review, or further processing.
        </intent>
        <side_effects>None. This is a read-only operation.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - calendar_event_id: The Google Calendar event ID (optional)
            - meeting_code: The Google Meet meeting code (optional)
        </args>
        <returns>
            A JSON string containing a list of conferenceRecord objects.
        </returns>
        <raises>
            - MissingCredentialsError: If Google credentials are not configured
            - APIError: If the Google Meet API call fails
        </raises>
        <schema_constraints>
            - At least one of calendar_event_id or meeting_code must be provided
            - Both parameters are optional but at least one is required
        </schema_constraints>
    </tool>
    """,
    
    "google_meet_list_transcripts": """
    <tool>
        <name>google_meet_list_transcripts</name>
        <use_case>See all transcript objects for a conference record.</use_case>
        <behavior>
            Retrieves all transcript objects associated with a specific conference record
            from Google Meet using the conference record ID.
        </behavior>
        <when_to_use>
            Use when you need to access transcripts from a Google Meet conference record
            for analysis, review, or processing.
        </when_to_use>
        <intent>
            To retrieve transcript objects from a Google Meet conference record for
            further analysis or processing.
        </intent>
        <side_effects>None. This is a read-only operation.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - conference_record_id: The ID of the conference record
        </args>
        <returns>
            A JSON string containing a list of transcript objects.
        </returns>
        <raises>
            - MissingCredentialsError: If Google credentials are not configured
            - APIError: If the Google Meet API call fails
        </raises>
        <schema_constraints>
            - conference_record_id must be a valid conference record ID
        </schema_constraints>
    </tool>
    """,
    
    "google_meet_list_transcript_entries": """
    <tool>
        <name>google_meet_list_transcript_entries</name>
        <use_case>Pull speaker-segmented text, timestamps, language codes for a transcript.</use_case>
        <behavior>
            Retrieves detailed transcript entries including speaker-segmented text,
            timestamps, and language codes for a specific transcript from a conference record.
        </behavior>
        <when_to_use>
            Use when you need detailed transcript data including speaker segmentation,
            timestamps, and language information for analysis or processing.
        </when_to_use>
        <intent>
            To retrieve detailed transcript entries with speaker segmentation and
            timing information for comprehensive meeting analysis.
        </intent>
        <side_effects>None. This is a read-only operation.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - conference_record_id: The ID of the conference record
            - transcript_id: The ID of the transcript
            - page_token: Optional page token for pagination
            - page_size: Number of entries per page (default 100)
        </args>
        <returns>
            A JSON string containing a list of transcriptEntry objects.
        </returns>
        <raises>
            - MissingCredentialsError: If Google credentials are not configured
            - APIError: If the Google Meet API call fails
        </raises>
        <schema_constraints>
            - conference_record_id and transcript_id are required
            - page_size must be a positive integer
        </schema_constraints>
    </tool>
    """,
    
    "google_meet_download_file": """
    <tool>
        <name>google_meet_download_file</name>
        <use_case>Download a raw file (recording, caption VTT, etc.) from Google Drive.</use_case>
        <behavior>
            Downloads raw files from Google Drive associated with Google Meet,
            such as recordings, caption VTT files, or other meeting-related files.
        </behavior>
        <when_to_use>
            Use when you need to download raw files from Google Meet conferences,
            such as recordings or caption files for offline processing.
        </when_to_use>
        <intent>
            To download raw files from Google Drive associated with Google Meet
            conferences for offline analysis or processing.
        </intent>
        <side_effects>None. This is a read-only download operation.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - file_id: The ID of the file to download
        </args>
        <returns>
            The raw file content as bytes (file stream)
        </returns>
        <raises>
            - MissingCredentialsError: If Google credentials are not configured
            - APIError: If the Google Drive API call fails
        </raises>
        <schema_constraints>
            - file_id must be a valid Google Drive file ID
        </schema_constraints>
    </tool>
    """,
    
    "google_form_create_and_append_questions": """
    <tool>
        <name>google_form_create_and_append_questions</name>
        <use_case>Create a blank Google Form and append questions.</use_case>
        <behavior>
            Creates a new Google Form with the specified title and optionally
            appends questions to the form in a single operation.
        </behavior>
        <when_to_use>
            Use when you need to create a new Google Form and add questions
            programmatically for surveys, feedback collection, or data gathering.
        </when_to_use>
        <intent>
            To create Google Forms with questions programmatically for
            automated form creation and data collection workflows.
        </intent>
        <side_effects>Creates a new Google Form and optionally adds questions to it.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - title: The form title
            - document_title: The document title (optional)
            - questions: Array of question requests (optional)
        </args>
        <returns>
            The created form's ID and metadata.
        </returns>
        <raises>
            - MissingCredentialsError: If Google credentials are not configured
            - APIError: If the Google Forms API call fails
        </raises>
        <schema_constraints>
            - title is required
            - questions must be a valid array of question request objects if provided
        </schema_constraints>
    </tool>
    """,
    
    "google_form_list_responses": """
    <tool>
        <name>google_form_list_responses</name>
        <use_case>Poll historical answers to a Google Form.</use_case>
        <behavior>
            Retrieves historical responses to a Google Form, allowing you to
            poll for answers and analyze form submission data.
        </behavior>
        <when_to_use>
            Use when you need to retrieve and analyze responses from a Google Form
            for data analysis, reporting, or processing form submissions.
        </when_to_use>
        <intent>
            To retrieve historical responses from Google Forms for
            data analysis and form submission processing.
        </intent>
        <side_effects>None. This is a read-only operation.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - form_id: The form ID
            - page_token: Optional page token for pagination
            - page_size: Number of responses per page (default 100)
        </args>
        <returns>
            A JSON string containing a list of response objects.
        </returns>
        <raises>
            - MissingCredentialsError: If Google credentials are not configured
            - APIError: If the Google Forms API call fails
        </raises>
        <schema_constraints>
            - form_id is required
            - page_size must be a positive integer
        </schema_constraints>
    </tool>
    """,
    
    "google_task_create_new_task": """
    <tool>
        <name>google_task_create_new_task</name>
        <use_case>Create a follow-up reminder in Google Tasks.</use_case>
        <behavior>
            Creates a new task in a specified Google Tasks list with
            optional due date and notes for task management.
        </behavior>
        <when_to_use>
            Use when you need to create tasks in Google Tasks for
            follow-up reminders, task management, or workflow automation.
        </when_to_use>
        <intent>
            To create new tasks in Google Tasks for task management
            and follow-up reminder automation.
        </intent>
        <side_effects>Creates a new task in the specified Google Tasks list.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - task_list_id: The ID of the task list
            - title: The task title
            - due: Due date/time in RFC3339 timestamp (optional)
            - notes: Task notes (optional)
        </args>
        <returns>
            The created task object.
        </returns>
        <raises>
            - MissingCredentialsError: If Google credentials are not configured
            - APIError: If the Google Tasks API call fails
        </raises>
        <schema_constraints>
            - task_list_id and title are required
            - due must be a valid RFC3339 timestamp if provided
        </schema_constraints>
    </tool>
    """,
    
    "google_task_list_tasks": """
    <tool>
        <name>google_task_list_tasks</name>
        <use_case>Show open tasks in a Google Task list.</use_case>
        <behavior>
            Lists tasks from a specified Google Tasks list, with options
            to show completed tasks and control the number of results returned.
        </behavior>
        <when_to_use>
            Use when you need to retrieve tasks from a Google Tasks list
            for task management, review, or processing.
        </when_to_use>
        <intent>
            To retrieve tasks from Google Tasks lists for task management
            and workflow automation.
        </intent>
        <side_effects>None. This is a read-only operation.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - task_list_id: The ID of the task list
            - show_completed: Whether to show completed tasks (default False)
            - max_results: Maximum number of tasks to return (default 100)
        </args>
        <returns>
            A JSON string containing a list of task objects.
        </returns>
        <raises>
            - MissingCredentialsError: If Google credentials are not configured
            - APIError: If the Google Tasks API call fails
        </raises>
        <schema_constraints>
            - task_list_id is required
            - max_results must be a positive integer
        </schema_constraints>
    </tool>
    """,
    
    "google_task_patch_task": """
    <tool>
        <name>google_task_patch_task</name>
        <use_case>Mark a task complete or reschedule it in Google Tasks.</use_case>
        <behavior>
            Updates an existing task in Google Tasks using a JSON patch object,
            allowing you to mark tasks complete, reschedule them, or update other properties.
        </behavior>
        <when_to_use>
            Use when you need to update existing tasks in Google Tasks,
            such as marking them complete or changing their due dates.
        </when_to_use>
        <intent>
            To update existing tasks in Google Tasks for task management
            and workflow automation.
        </intent>
        <side_effects>Updates the specified task in Google Tasks.</side_effects>
        <category>Google Suite Integration</category>
        <args>
            - task_list_id: The ID of the task list
            - task_id: The ID of the task
            - patch: JSON patch object (fields to update)
        </args>
        <returns>
            The updated task object.
        </returns>
        <raises>
            - MissingCredentialsError: If Google credentials are not configured
            - APIError: If the Google Tasks API call fails
        </raises>
        <schema_constraints>
            - task_list_id, task_id, and patch are required
            - patch must be a valid JSON patch object
        </schema_constraints>
    </tool>
    """
}
