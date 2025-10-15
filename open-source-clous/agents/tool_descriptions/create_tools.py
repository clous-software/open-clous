"""
Tool descriptions for creation tools.

These tools provide capabilities for creating files, importing data,
and generating content.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
CREATE_TOOL_DESCRIPTIONS = {
    "create_spreadsheet_xlsx_file": """
    <tool>
        <name>create_spreadsheet_xlsx_file</name>
        <use_case>Create Excel spreadsheet files with structured data based on AI-generated queries and requirements.</use_case>
        <behavior>
            Creates Excel spreadsheet files with structured data based on
            AI-generated queries and requirements. Supports various data
            formats, CSV parsing, and structured data organization
            for comprehensive spreadsheet creation and data management.
        </behavior>
        <when_to_use>
            Use when creating structured data files, generating reports
            in spreadsheet format, or organizing data for analysis
            and presentation in Excel-compatible formats.
        </when_to_use>
        <intent>
            To provide comprehensive spreadsheet creation capabilities enabling
            structured data organization, report generation, and
            data management in Excel-compatible formats.
        </intent>
        <side_effects>Creates new Excel file with specified content.</side_effects>
        <category>Creation</category>
        <args>
            - query: AI query describing the spreadsheet requirements (required)
            - scope: Scope and context for the spreadsheet (required)
            - goal: Goal and purpose of the spreadsheet (required)
            - considerations: Additional considerations for creation (optional, default: None)
            - file_name: Name for the generated file (optional, default: "spreadsheet")
        </args>
        <returns>
            Dictionary with spreadsheet creation results including
            file information, data structure, and comprehensive
            spreadsheet generation confirmation.
        </returns>
        <raises>
            - ValueError: If required parameters are not specified or invalid
            - FileCreationError: If spreadsheet creation fails
            - DataProcessingError: If data processing fails
        </raises>
        <schema_constraints>
            - query must be a non-empty string describing spreadsheet requirements
            - scope must be a non-empty string describing scope and context
            - goal must be a non-empty string describing purpose and goals
            - file_name must be a valid filename string if provided
        </schema_constraints>
    </tool>
    """,
    
    "import_file_by_object_type": """
    <tool>
        <name>import_file_by_object_type</name>
        <use_case>Import data files for specific object types including candidates, employees, jobs, courses, and other organizational entities.</use_case>
        <behavior>
            Imports data files for specific object types including candidates,
            employees, jobs, courses, and other organizational entities.
            Supports various file formats, data validation, and structured
            import processes for comprehensive data integration.
        </behavior>
        <when_to_use>
            Use when importing data from external sources, migrating data
            between systems, or bulk loading organizational data
            for candidates, employees, jobs, courses, and other entities.
        </when_to_use>
        <intent>
            To provide comprehensive data import capabilities enabling
            bulk data loading, system migration, and integration
            of external data sources into organizational systems.
        </intent>
        <side_effects>Imports data into organizational systems and creates new records.</side_effects>
        <category>Creation</category>
        <args>
            - import_creations: List of import creation items with type and data (required)
        </args>
        <returns>
            Dictionary with import results including processed records,
            validation results, import statistics, and comprehensive
            import operation confirmation.
        </returns>
        <raises>
            - ValueError: If import_creations is not specified or invalid
            - ImportError: If data import fails
            - ValidationError: If data validation fails
        </raises>
        <schema_constraints>
            - import_creations must be a non-empty list of valid import creation items
            - Each import creation item must have valid type and data
        </schema_constraints>
    </tool>
    """
}
