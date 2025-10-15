"""
Tool descriptions for event management tools.

These tools provide comprehensive event creation, scheduling, and management
capabilities including interviews, meetings, and other scheduled activities.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
EVENT_TOOLS_DESCRIPTIONS = {
    "create_interview_event": """
    <tool>
        <name>create_interview_event</name>
        <use_case>Create interview events with comprehensive scheduling, participant management, and calendar integration capabilities.</use_case>
        <behavior>
            Creates interview events with detailed participant information, scheduling details, and location specifications.
            Generates immediate visual feedback by streaming CanvasComponent chunks to the frontend, enabling
            responsive user experiences for interview management. Supports multiple interview types including
            phone, video, and in-person interviews with proper timezone handling and calendar integration.
        </behavior>
        <when_to_use>
            Use when you need to schedule interviews, manage interview logistics, or create interview events
            with comprehensive participant and scheduling information. Essential for recruitment process
            management and interview coordination.
        </when_to_use>
        <intent>
            To provide comprehensive interview event creation and management capabilities that support
            the recruitment process with proper scheduling, participant management, and calendar integration.
            Enables efficient interview coordination and logistics management.
        </intent>
        <side_effects>Creates interview events and streams visual feedback to frontend via websocket connections.</side_effects>
        <category>Event Management</category>
        <args>
            - query: Description of the interview event to create (required)
            - title: Optional title for the interview event
            - interviewee_name: Name of the candidate being interviewed (optional)
            - interviewee_email: Email address of the candidate being interviewed (optional)
            - interviewer_name: Name of the interviewer (optional)
            - interviewer_email: Email address of the interviewer (optional)
            - start_date: Start date and time for the interview (optional)
            - end_date: End date and time for the interview (optional)
            - location: Interview location or meeting link (optional)
            - timezone: Timezone for the interview (optional)
            - emails: List of additional email addresses to notify (optional)
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains:
            - Event creation confirmation and details
            - Interview participant information
            - Scheduling and logistics details
            - Calendar integration status
            - Notification delivery status
        </returns>
        <raises>
            Returns error details in response if event creation fails due to invalid parameters,
            scheduling conflicts, or websocket connection issues. Provides detailed feedback on specific failures.
        </raises>
        <schema_constraints>
            - query: non-empty string describing the interview event
            - title: optional string for event title
            - interviewee_name: optional string for candidate name
            - interviewee_email: optional valid email address string
            - interviewer_name: optional string for interviewer name
            - interviewer_email: optional valid email address string
            - start_date: optional date/time string in ISO format
            - end_date: optional date/time string in ISO format
            - location: optional string for interview location
            - timezone: optional valid timezone string
            - emails: optional list of valid email address strings
        </schema_constraints>
    </tool>
    """,
    
    "create_meeting_event": """
    <tool>
        <name>create_meeting_event</name>
        <use_case>Create meeting events with comprehensive scheduling, participant management, and agenda coordination capabilities.</use_case>
        <behavior>
            Creates meeting events with detailed participant information, scheduling details, and agenda specifications.
            Generates immediate visual feedback by streaming CanvasComponent chunks to the frontend, enabling
            responsive user experiences for meeting management. Supports various meeting types including
            team meetings, client meetings, and internal discussions with proper timezone handling.
        </behavior>
        <when_to_use>
            Use when you need to schedule meetings, coordinate team gatherings, or create meeting events
            with comprehensive participant and agenda information. Essential for team coordination
            and meeting management processes.
        </when_to_use>
        <intent>
            To provide comprehensive meeting event creation and management capabilities that support
            team coordination, client relations, and internal communication with proper scheduling
            and participant management. Enables efficient meeting coordination and logistics management.
        </intent>
        <side_effects>Creates meeting events and streams visual feedback to frontend via websocket connections.</side_effects>
        <category>Event Management</category>
        <args>
            - query: Description of the meeting event to create (required)
            - title: Optional title for the meeting event
            - start_date: Start date and time for the meeting (optional)
            - end_date: End date and time for the meeting (optional)
            - location: Meeting location or video conference link (optional)
            - timezone: Timezone for the meeting (optional)
            - emails: List of email addresses for meeting participants (optional)
            - agenda: Optional meeting agenda or discussion topics
            - meeting_type: Type of meeting (team, client, internal, etc.) (optional)
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains:
            - Event creation confirmation and details
            - Meeting participant information
            - Scheduling and logistics details
            - Calendar integration status
            - Notification delivery status
        </returns>
        <raises>
            Returns error details in response if event creation fails due to invalid parameters,
            scheduling conflicts, or websocket connection issues. Provides detailed feedback on specific failures.
        </raises>
        <schema_constraints>
            - query: non-empty string describing the meeting event
            - title: optional string for event title
            - start_date: optional date/time string in ISO format
            - end_date: optional date/time string in ISO format
            - location: optional string for meeting location
            - timezone: optional valid timezone string
            - emails: optional list of valid email address strings
            - agenda: optional string for meeting agenda
            - meeting_type: optional string for meeting type
        </schema_constraints>
    </tool>
    """,
    
    "create_calendar_event": """
    <tool>
        <name>create_calendar_event</name>
        <use_case>Create general calendar events with comprehensive scheduling and participant management capabilities.</use_case>
        <behavior>
            Creates calendar events with detailed scheduling information and participant management.
            Generates immediate visual feedback by streaming CanvasComponent chunks to the frontend, enabling
            responsive user experiences for calendar management. Supports various event types including
            appointments, deadlines, reminders, and general calendar entries with proper timezone handling.
        </behavior>
        <when_to_use>
            Use when you need to schedule general calendar events, create appointments, set deadlines,
            or manage any type of scheduled activity. Essential for general calendar management
            and event scheduling processes.
        </when_to_use>
        <intent>
            To provide comprehensive calendar event creation and management capabilities that support
            general scheduling, appointment management, and calendar coordination with proper
            timezone handling and participant management. Enables efficient calendar management.
        </intent>
        <side_effects>Creates calendar events and streams visual feedback to frontend via websocket connections.</side_effects>
        <category>Event Management</category>
        <args>
            - query: Description of the calendar event to create (required)
            - title: Optional title for the calendar event
            - start_date: Start date and time for the event (optional)
            - end_date: End date and time for the event (optional)
            - location: Event location or venue (optional)
            - timezone: Timezone for the event (optional)
            - emails: List of email addresses for event participants (optional)
            - event_type: Type of event (appointment, deadline, reminder, etc.) (optional)
            - description: Detailed description of the event (optional)
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains:
            - Event creation confirmation and details
            - Event participant information
            - Scheduling and logistics details
            - Calendar integration status
            - Notification delivery status
        </returns>
        <raises>
            Returns error details in response if event creation fails due to invalid parameters,
            scheduling conflicts, or websocket connection issues. Provides detailed feedback on specific failures.
        </raises>
        <schema_constraints>
            - query: non-empty string describing the calendar event
            - title: optional string for event title
            - start_date: optional date/time string in ISO format
            - end_date: optional date/time string in ISO format
            - location: optional string for event location
            - timezone: optional valid timezone string
            - emails: optional list of valid email address strings
            - event_type: optional string for event type
            - description: optional string for event description
        </schema_constraints>
    </tool>
    """
}
