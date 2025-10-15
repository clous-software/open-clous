"""
Tool descriptions for update and modification tools.

These tools provide comprehensive capabilities for updating organizational data
including employees, candidates, jobs, and other entities with proper validation.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
UPDATE_TOOL_DESCRIPTIONS = {
    "update_employees": """
    <tool>
        <name>update_employees</name>
        <use_case>Comprehensive employee management tool for updating work details, moving between organizational units, establishing network relationships, and assigning items in a single operation.</use_case>
        <behavior>
            Prepares comprehensive changes to employee data including work details (contract_id, compensation, function),
            organizational moves (org_unit_id, office_location_id), network relationships (mentor, shadow, buddy, peer),
            and item assignments (responsibilities, benefits, course assignments). Validates input parameters and provides
            detailed feedback on what would be changed. Supports partial updates where only specified fields are prepared
            for modification. Can handle both single employee (as dict) and multiple employees (as list).
        </behavior>
        <when_to_use>
            Use when needing to perform any employee management operation including updating work details, moving employees
            between departments or locations, establishing mentorship or peer relationships, or assigning responsibilities,
            benefits, and courses. This is ideal for comprehensive employee lifecycle management and organizational restructuring.
        </when_to_use>
        <intent>
            To provide a unified way to manage all aspects of employee data that supports HR operations,
            organizational development, workforce planning, and employee relationship management in a single operation.
            Enables comprehensive employee lifecycle management with proper validation and confirmation workflows.
        </intent>
        <side_effects>Prepares comprehensive employee changes for front-end confirmation. Does not directly modify database until confirmed by user.</side_effects>
        <category>Employee Management</category>
        <args>
            - employee_updates: List of EmployeeUpdateItem objects, each containing employee_id and optional fields for any type of employee operation (required)
        </args>
        <returns>
            Dictionary with comprehensive return information:
            
            SUCCESS (status: "success"):
            - "success": true
            - "message": "Employee updates prepared and applied successfully"
            - "changes": Array of change objects with:
              * "employee_id": ID of the updated employee
              * "change_type": Type of change (update, move, match, assign)
              * "fields_updated": List of fields that were changed
              * "previous_values": Values before update
              * "new_values": Values after update
              * "validation_status": "passed"
              * "applied_at": Timestamp when change was applied
            - "validation_results": {
                "all_valid": true,
                "validation_errors": []
              }
            - "confirmation_required": false
            - "summary": {
                "total_employees": Number of employees processed
                "successful_updates": Number of successful updates
                "failed_updates": 0
              }
            
            PARTIAL SUCCESS (status: "partial"):
            - "success": false
            - "message": "Some employee updates succeeded, others failed"
            - "changes": Array of successful changes (same structure as above)
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of validation error objects
              }
            - "confirmation_required": true
            - "errors": Array of error objects with:
              * "employee_id": ID of employee with failed update
              * "error_type": Type of error (ValidationError, PermissionError, etc.)
              * "error_message": Human-readable error description
              * "suggestion": Specific guidance on how to fix the error
            - "summary": {
                "total_employees": Number of employees processed
                "successful_updates": Number of successful updates
                "failed_updates": Number of failed updates
              }
            
            COMPLETE FAILURE (status: "error"):
            - "success": false
            - "message": "All employee updates failed"
            - "changes": []
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of all validation errors
              }
            - "confirmation_required": false
            - "errors": Array of error objects for all failed updates
            - "summary": {
                "total_employees": Number of employees processed
                "successful_updates": 0
                "failed_updates": Number of failed updates
              }
        </returns>
        <raises>
            Returns error details in response if employee updates fail due to invalid employee IDs,
            permission issues, or data validation errors. Provides detailed feedback on specific failures.
        </raises>
        <schema_constraints>
            - employee_updates: non-empty list of EmployeeUpdateItem objects with valid employee_id fields
        </schema_constraints>
    </tool>
    """,
    
    "update_candidates": """
    <tool>
        <name>update_candidates</name>
        <use_case>Comprehensive candidate management tool for updating candidate information, application status, and recruitment pipeline data.</use_case>
        <behavior>
            Prepares changes to candidate data including personal information, application status, interview scheduling,
            assessment results, and recruitment pipeline position. Validates input parameters and provides detailed
            feedback on what would be changed. Supports partial updates where only specified fields are prepared
            for modification. Can handle both single candidate (as dict) and multiple candidates (as list).
        </behavior>
        <when_to_use>
            Use when needing to update candidate information, change application status, schedule interviews,
            record assessment results, or move candidates through the recruitment pipeline. Essential for
            managing the entire candidate lifecycle from application to hiring decision.
        </when_to_use>
        <intent>
            To provide a unified way to manage all aspects of candidate data that supports recruitment operations,
            pipeline management, and candidate relationship management in a single operation.
            Enables comprehensive candidate lifecycle management with proper validation and confirmation workflows.
        </intent>
        <side_effects>Prepares candidate changes for front-end confirmation. Does not directly modify database until confirmed by user.</side_effects>
        <category>Candidate Management</category>
        <args>
            - candidate_updates: List of CandidateUpdateItem objects, each containing candidate_id and optional fields for any type of candidate operation (required)
        </args>
        <returns>
            Dictionary with success status, message, and comprehensive change details including:
            - success: Boolean indicating if the update preparation was successful
            - message: Descriptive message about the operation results
            - changes: Detailed breakdown of all prepared changes by candidate
            - validation_results: Information about any validation issues encountered
            - confirmation_required: Boolean indicating if user confirmation is needed
        </returns>
        <raises>
            Returns error details in response if candidate updates fail due to invalid candidate IDs,
            permission issues, or data validation errors. Provides detailed feedback on specific failures.
        </raises>
        <schema_constraints>
            - candidate_updates: non-empty list of CandidateUpdateItem objects with valid candidate_id fields
        </schema_constraints>
    </tool>
    """,
    
    "update_jobs": """
    <tool>
        <name>update_jobs</name>
        <use_case>Comprehensive job management tool for updating job positions, requirements, and hiring pipeline data.</use_case>
        <behavior>
            Prepares changes to job data including position details, requirements, qualifications, compensation,
            hiring status, and recruitment process configuration. Validates input parameters and provides detailed
            feedback on what would be changed. Supports partial updates where only specified fields are prepared
            for modification. Can handle both single job (as dict) and multiple jobs (as list).
        </behavior>
        <when_to_use>
            Use when needing to update job descriptions, modify requirements, change hiring status,
            adjust compensation ranges, or configure recruitment processes. Essential for managing
            the entire job lifecycle from creation to closure.
        </when_to_use>
        <intent>
            To provide a unified way to manage all aspects of job data that supports recruitment operations,
            workforce planning, and job lifecycle management in a single operation.
            Enables comprehensive job management with proper validation and confirmation workflows.
        </intent>
        <side_effects>Prepares job changes for front-end confirmation. Does not directly modify database until confirmed by user.</side_effects>
        <category>Job Management</category>
        <args>
            - job_updates: List of JobUpdateItem objects, each containing job_id and optional fields for any type of job operation (required)
        </args>
        <returns>
            Dictionary with success status, message, and comprehensive change details including:
            - success: Boolean indicating if the update preparation was successful
            - message: Descriptive message about the operation results
            - changes: Detailed breakdown of all prepared changes by job
            - validation_results: Information about any validation issues encountered
            - confirmation_required: Boolean indicating if user confirmation is needed
        </returns>
        <raises>
            Returns error details in response if job updates fail due to invalid job IDs,
            permission issues, or data validation errors. Provides detailed feedback on specific failures.
        </raises>
        <schema_constraints>
            - job_updates: non-empty list of JobUpdateItem objects with valid job_id fields
        </schema_constraints>
    </tool>
    """
}
