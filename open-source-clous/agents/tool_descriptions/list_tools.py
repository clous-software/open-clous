"""
Tool descriptions for listing and enumeration tools.

These tools provide intuitive, human-readable interfaces for retrieving
lists of organizational entities with consistent formatting and error handling.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
LIST_TOOLS_DESCRIPTIONS = {
    "list_candidates": """
    <tool>
        <name>list_candidates</name>
        <use_case>Retrieve a list of candidates in the recruitment process with filtering and sorting capabilities.</use_case>
        <behavior>
            Provides a comprehensive list of candidates with configurable filtering, sorting, and grouping options.
            Uses TransformService.list_objects internally to ensure consistent data formatting and user-context aware
            results. Supports various retrieval levels and can filter by multiple criteria including status, skills,
            experience level, and application date. Returns standardized JSON response format with pagination support.
        </behavior>
        <when_to_use>
            Use when you need to see all candidates or a filtered subset for recruitment planning, pipeline analysis,
            or candidate management. Essential for understanding the current candidate pool, identifying trends,
            and managing recruitment workflows effectively.
        </when_to_use>
        <intent>
            To provide an intuitive, human-readable interface for candidate listing that supports flexible
            filtering and sorting while maintaining consistent response formatting across all listing operations.
            Enables efficient candidate pool management and recruitment analysis.
        </intent>
        <side_effects>None. This is a read-only operation that does not modify any candidate data.</side_effects>
        <category>Listing</category>
        <args>
            - max_items: Maximum number of candidates to return (optional, default: 10)
            - filters: Optional dictionary of filters to apply (status, skills, experience_level, etc.)
            - sort_by: Optional dictionary specifying sort criteria and direction
            - group_by: Optional dictionary specifying grouping criteria
            - retrieval_level: Level of detail to retrieve (optional, default: "detailed")
        </args>
        <returns>
            Dictionary with comprehensive return information:
            
            SUCCESS WITH DATA (status: "success"):
            - "data": Array of candidate objects with complete information including:
              * Basic info: ID, name, email, phone, location, application date
              * Recruitment status: current stage, qualification score, status history
              * Job associations: applied job IDs, job titles, recruitment progress
              * Skills data: skill names, levels, competencies (if skill filters applied)
              * Experience: work history, education, certifications
              * Metadata: creation date, last update, status changes
            
            SUCCESS WITH NO DATA (status: "success"):
            - "data": Empty array []
            - "message": "No candidates found matching the specified criteria"
            - "suggestion": "Try broadening filters, checking date ranges, or verifying candidate existence"
            
            FILTER ERROR (status: "error"):
            - "error": "Invalid filter parameters provided"
            - "error_type": "FilterError"
            - "error_details": "Specific filter validation failures with expected formats"
            - "suggestion": "Review filter documentation and use valid parameter formats"
            
            PERMISSION ERROR (status: "error"):
            - "error": "Insufficient permissions to access candidate data"
            - "error_type": "PermissionError"
            - "error_details": "Which candidate data cannot be accessed and why"
            - "suggestion": "Contact administrator or use different filter criteria"
            
            SYSTEM ERROR (status: "error"):
            - "error": "System error during candidate listing"
            - "error_type": "SystemError"
            - "error_details": "Technical details about the system failure"
            - "suggestion": "Retry operation or contact support if issue persists"
        </returns>
        <raises>
            Returns error details in response if database queries fail or invalid parameters are provided.
            Handles filtering and sorting errors gracefully with detailed error messages.
        </raises>
        <schema_constraints>
            - max_items: positive integer (default: 10)
            - filters: optional dictionary with valid filter keys
            - sort_by: optional dictionary with valid sort criteria
            - group_by: optional dictionary with valid grouping criteria
            - retrieval_level: string from allowed values (default: "detailed")
        </schema_constraints>
    </tool>
    """,
    
    "list_employees": """
    <tool>
        <name>list_employees</name>
        <use_case>Retrieve a list of employees within the organization with filtering and sorting capabilities.</use_case>
        <behavior>
            Provides a comprehensive list of employees with configurable filtering, sorting, and grouping options.
            Uses TransformService.list_objects internally to ensure consistent data formatting and user-context aware
            results. Supports various retrieval levels and can filter by department, role, skills, performance,
            and employment status. Returns standardized JSON response format with pagination support.
        </behavior>
        <when_to_use>
            Use when you need to see all employees or a filtered subset for workforce planning, organizational
            analysis, or employee management. Essential for understanding the current workforce, identifying
            talent distribution, and managing organizational structure effectively.
        </when_to_use>
        <intent>
            To provide an intuitive, human-readable interface for employee listing that supports flexible
            filtering and sorting while maintaining consistent response formatting across all listing operations.
            Enables efficient workforce management and organizational analysis.
        </intent>
        <side_effects>None. This is a read-only operation that does not modify any employee data.</side_effects>
        <category>Listing</category>
        <args>
            - max_items: Maximum number of employees to return (optional, default: 10)
            - filters: Optional dictionary of filters to apply (department, role, skills, performance, etc.)
            - sort_by: Optional dictionary specifying sort criteria and direction
            - group_by: Optional dictionary specifying grouping criteria
            - retrieval_level: Level of detail to retrieve (optional, default: "detailed")
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains an array of employee
            objects with comprehensive information including role, department, skills, performance metrics,
            and organizational relationships. Returns empty array if no employees match the criteria.
        </returns>
        <raises>
            Returns error details in response if database queries fail or invalid parameters are provided.
            Handles filtering and sorting errors gracefully with detailed error messages.
        </raises>
        <schema_constraints>
            - max_items: positive integer (default: 10)
            - filters: optional dictionary with valid filter keys
            - sort_by: optional dictionary with valid sort criteria
            - group_by: optional dictionary with valid grouping criteria
            - retrieval_level: string from allowed values (default: "detailed")
        </schema_constraints>
    </tool>
    """,
    
    "list_jobs": """
    <tool>
        <name>list_jobs</name>
        <use_case>Retrieve a list of job positions or roles with filtering and sorting capabilities.</use_case>
        <behavior>
            Provides a comprehensive list of jobs with configurable filtering, sorting, and grouping options.
            Uses TransformService.list_objects internally to ensure consistent data formatting and user-context aware
            results. Supports various retrieval levels and can filter by department, status, requirements,
            and hiring stage. Returns standardized JSON response format with pagination support.
        </behavior>
        <when_to_use>
            Use when you need to see all jobs or a filtered subset for recruitment planning, workforce
            analysis, or job management. Essential for understanding the current job landscape, identifying
            hiring needs, and managing recruitment pipelines effectively.
        </when_to_use>
        <intent>
            To provide an intuitive, human-readable interface for job listing that supports flexible
            filtering and sorting while maintaining consistent response formatting across all listing operations.
            Enables efficient job management and recruitment planning.
        </intent>
        <side_effects>None. This is a read-only operation that does not modify any job data.</side_effects>
        <category>Listing</category>
        <args>
            - max_items: Maximum number of jobs to return (optional, default: 10)
            - filters: Optional dictionary of filters to apply (department, status, requirements, etc.)
            - sort_by: Optional dictionary specifying sort criteria and direction
            - group_by: Optional dictionary specifying grouping criteria
            - retrieval_level: Level of detail to retrieve (optional, default: "detailed")
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains an array of job
            objects with comprehensive information including requirements, department, hiring status,
            and candidate pipeline. Returns empty array if no jobs match the criteria.
        </returns>
        <raises>
            Returns error details in response if database queries fail or invalid parameters are provided.
            Handles filtering and sorting errors gracefully with detailed error messages.
        </raises>
        <schema_constraints>
            - max_items: positive integer (default: 10)
            - filters: optional dictionary with valid filter keys
            - sort_by: optional dictionary with valid sort criteria
            - group_by: optional dictionary with valid grouping criteria
            - retrieval_level: string from allowed values (default: "detailed")
        </schema_constraints>
    </tool>
    """,
    
    "list_skills": """
    <tool>
        <name>list_skills</name>
        <use_case>Retrieve a list of skills, competencies, or capabilities with filtering and sorting capabilities.</use_case>
        <behavior>
            Provides a comprehensive list of skills with configurable filtering, sorting, and grouping options.
            Uses TransformService.list_objects internally to ensure consistent data formatting and user-context aware
            results. Supports various retrieval levels and can filter by category, proficiency level, prevalence,
            and organizational importance. Returns standardized JSON response format with pagination support.
        </behavior>
        <when_to_use>
            Use when you need to see all skills or a filtered subset for skills gap analysis, training
            planning, or competency management. Essential for understanding the current skills landscape,
            identifying development needs, and managing organizational capabilities effectively.
        </when_to_use>
        <intent>
            To provide an intuitive, human-readable interface for skills listing that supports flexible
            filtering and sorting while maintaining consistent response formatting across all listing operations.
            Enables efficient skills management and workforce development planning.
        </intent>
        <side_effects>None. This is a read-only operation that does not modify any skill data.</side_effects>
        <category>Listing</category>
        <args>
            - max_items: Maximum number of skills to return (optional, default: 10)
            - filters: Optional dictionary of filters to apply (category, proficiency, prevalence, etc.)
            - sort_by: Optional dictionary specifying sort criteria and direction
            - group_by: Optional dictionary specifying grouping criteria
            - retrieval_level: Level of detail to retrieve (optional, default: "detailed")
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains an array of skill
            objects with comprehensive information including definition, category, prevalence, and
            associated roles. Returns empty array if no skills match the criteria.
        </returns>
        <raises>
            Returns error details in response if database queries fail or invalid parameters are provided.
            Handles filtering and sorting errors gracefully with detailed error messages.
        </raises>
        <schema_constraints>
            - max_items: positive integer (default: 10)
            - filters: optional dictionary with valid filter keys
            - sort_by: optional dictionary with valid sort criteria
            - group_by: optional dictionary with valid grouping criteria
            - retrieval_level: string from allowed values (default: "detailed")
        </schema_constraints>
    </tool>
    """,
    
    "list_trainings": """
    <tool>
        <name>list_trainings</name>
        <use_case>Retrieve a list of training courses or learning resources with filtering and sorting capabilities.</use_case>
        <behavior>
            Provides a comprehensive list of trainings with configurable filtering, sorting, and grouping options.
            Uses TransformService.list_objects internally to ensure consistent data formatting and user-context aware
            results. Supports various retrieval levels and can filter by type, status, target audience,
            and completion rates. Returns standardized JSON response format with pagination support.
        </behavior>
        <when_to_use>
            Use when you need to see all trainings or a filtered subset for learning and development
            planning, course management, or skills development strategy. Essential for understanding
            the current training landscape, identifying development opportunities, and managing
            learning programs effectively.
        </when_to_use>
        <intent>
            To provide an intuitive, human-readable interface for training listing that supports flexible
            filtering and sorting while maintaining consistent response formatting across all listing operations.
            Enables efficient learning and development management and strategic planning.
        </intent>
        <side_effects>None. This is a read-only operation that does not modify any training data.</side_effects>
        <category>Listing</category>
        <args>
            - max_items: Maximum number of trainings to return (optional, default: 10)
            - filters: Optional dictionary of filters to apply (type, status, audience, completion_rate, etc.)
            - sort_by: Optional dictionary specifying sort criteria and direction
            - group_by: Optional dictionary specifying grouping criteria
            - retrieval_level: Level of detail to retrieve (optional, default: "detailed")
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains an array of training
            objects with comprehensive information including content, objectives, enrollment data, and
            effectiveness metrics. Returns empty array if no trainings match the criteria.
        </returns>
        <raises>
            Returns error details in response if database queries fail or invalid parameters are provided.
            Handles filtering and sorting errors gracefully with detailed error messages.
        </raises>
        <schema_constraints>
            - max_items: positive integer (default: 10)
            - filters: optional dictionary with valid filter keys
            - sort_by: optional dictionary with valid sort criteria
            - group_by: optional dictionary with valid grouping criteria
            - retrieval_level: string from allowed values (default: "detailed")
        </schema_constraints>
    </tool>
    """
}
