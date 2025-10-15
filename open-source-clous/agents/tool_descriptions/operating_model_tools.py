"""
Tool descriptions for operating model tools.

These tools provide comprehensive capabilities for managing organizational
operating model data including needs, goals, problems, history, and strategies.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
OPERATING_MODEL_TOOL_DESCRIPTIONS = {
    "read_company_operating_information": """
    <tool>
        <name>read_company_operating_information</name>
        <use_case>Retrieve comprehensive operating model information including needs, goals, problems, history, and strategies with type-based filtering.</use_case>
        <behavior>
            Queries the database for operating model information based on content type and subtype filters.
            Returns structured representations of organizational operating model data including needs assessment,
            strategic goals, problem identification, historical context, and strategic initiatives.
            Supports flexible filtering by content type and subtype for targeted information retrieval.
        </behavior>
        <when_to_use>
            Use when you need to understand the organizational operating model, strategic direction,
            or operational context. Essential for strategic planning, organizational assessment,
            and understanding the company's operational framework and strategic priorities.
        </when_to_use>
        <intent>
            To provide comprehensive access to organizational operating model data that supports
            strategic planning, organizational assessment, and operational understanding.
            Enables systematic analysis of organizational needs, goals, and strategic direction.
        </intent>
        <side_effects>None. This is a read-only operation that does not modify any operating model data.</side_effects>
        <category>Operating Model</category>
        <args>
            - content_type: Type of operating model content to retrieve (needs, goals, problems, history, strategies) (required)
            - subtype: Optional subtype filter for more specific content categorization
            - max_items: Maximum number of items to return (optional, default: 10)
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains an array of
            operating model information objects with comprehensive details including:
            - Content type and subtype categorization
            - Detailed descriptions and context
            - Priority levels and strategic importance
            - Related organizational elements
            - Historical context and evolution
            - Implementation status and progress
        </returns>
        <raises>
            Returns error details in response if database queries fail or invalid content types are provided.
            Handles filtering and retrieval errors gracefully with detailed error messages.
        </raises>
        <schema_constraints>
            - content_type: Must be one of the supported content types (needs, goals, problems, history, strategies)
            - subtype: optional string for content subtype filtering
            - max_items: positive integer (default: 10)
        </schema_constraints>
    </tool>
    """,
    
    "create_company_operating_information": """
    <tool>
        <name>create_company_operating_information</name>
        <use_case>Create or update operating model information including needs, goals, problems, history, and strategies with comprehensive validation.</use_case>
        <behavior>
            Creates or updates operating model information with comprehensive validation and data integrity checks.
            Supports creation of new operating model entries and updates to existing ones with proper
            content type and subtype categorization. Validates input parameters and ensures data consistency
            across the operating model framework.
        </behavior>
        <when_to_use>
            Use when you need to document organizational needs, define strategic goals, record problems,
            capture historical context, or establish strategic initiatives. Essential for maintaining
            comprehensive operating model documentation and strategic planning processes.
        </when_to_use>
        <intent>
            To provide a unified interface for creating and updating organizational operating model data
            that supports strategic planning, organizational development, and operational documentation.
            Enables systematic management of organizational needs, goals, and strategic direction.
        </intent>
        <side_effects>Creates or updates operating model data in the database with proper validation and categorization.</side_effects>
        <category>Operating Model</category>
        <args>
            - content_type: Type of operating model content to create/update (needs, goals, problems, history, strategies) (required)
            - subtype: Optional subtype for content categorization
            - content: The main content or description of the operating model information (required)
            - object_type: Type of object this information relates to (optional)
            - object_id: ID of the specific object this information relates to (optional)
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains the created or updated
            operating model information including:
            - Unique identifier for the created/updated entry
            - Content type and subtype categorization
            - Full content and description
            - Related object information
            - Creation/update timestamps
            - Validation results and status
        </returns>
        <raises>
            Returns error details in response if creation/update fails due to validation errors,
            permission issues, or data integrity problems. Provides detailed feedback on specific failures.
        </raises>
        <schema_constraints>
            - content_type: Must be one of the supported content types (needs, goals, problems, history, strategies)
            - subtype: optional string for content subtype categorization
            - content: non-empty string containing the operating model information
            - object_type: optional string identifying related object type
            - object_id: optional string identifying related object ID
        </schema_constraints>
    </tool>
    """
}
