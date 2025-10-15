"""
Tool descriptions for artifact creation tools.
These tools create various HR-related artifacts like job descriptions, interview questions, emails, etc.
"""

ARTIFACT_TOOLS_DESCRIPTIONS = {
    "create_new_job_openings": """
    <tool>
        <name>create_new_job_openings</name>
        <use_case>Create multiple comprehensive job descriptions and job postings for recruitment purposes</use_case>
        <behavior>
            Prepares the creation of multiple job descriptions by calling the actual functions in parallel
            and generating structured, professional job content designed for effective candidate attraction
            and clear role definition. Uses ThreadPoolExecutor for efficient parallel processing.
        </behavior>
        <when_to_use>
            - When the user needs to create multiple job postings for different roles
            - When comprehensive job descriptions need to be generated in bulk
            - When structured job content is required for various recruitment needs
            - When the user wants to ensure consistent and professional job descriptions across multiple positions
        </when_to_use>
        <intent>To generate comprehensive job descriptions that enable effective recruitment and clear role definition</intent>
        <side_effects>Prepares job creation data for front-end confirmation. No database changes until confirmed.</side_effects>
        <category>Job Management</category>
        <args>
            - job_creations: List of dictionaries or JobCreationItem objects, each containing ai_query and optionally context, skills_needs_to_cover, expertise_necessary, salary_band, must_have, nice_to_have, and additional_context
        </args>
        <returns>
            Dictionary with comprehensive return information:
            
            SUCCESS (status: "success"):
            - "success": true
            - "message": "All job descriptions created successfully"
            - "created": Array of job objects with:
              * "object_id": Unique ID of the created job
              * "object_type": "job"
              * "title": Job title
              * "content": Generated job description content
              * "metadata": Creation metadata including AI model used, timestamps, etc.
              * "validation_status": "passed"
              * "created_at": Timestamp when job was created
            - "objects": Array of {object_id, object_type} pairs for created jobs
            - "validation_results": {
                "all_valid": true,
                "validation_errors": []
              }
            - "summary": {
                "total_requested": Number of jobs requested
                "successful_creations": Number of jobs created
                "failed_creations": 0
              }
            
            PARTIAL SUCCESS (status: "partial"):
            - "success": false
            - "message": "Some job descriptions created successfully, others failed"
            - "created": Array of successfully created jobs (same structure as above)
            - "objects": Array of {object_id, object_type} pairs for successful creations
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of validation error objects
              }
            - "errors": Array of error objects with:
              * "job_index": Index of the failed job in the request
              * "error_type": Type of error (ValidationError, AIError, etc.)
              * "error_message": Human-readable error description
              * "suggestion": Specific guidance on how to fix the creation attempt
            - "summary": {
                "total_requested": Number of jobs requested
                "successful_creations": Number of jobs created
                "failed_creations": Number of failed creations
              }
            
            COMPLETE FAILURE (status: "error"):
            - "success": false
            - "message": "All job description creations failed"
            - "created": []
            - "objects": []
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of all validation errors
              }
            - "errors": Array of error objects for all failed creations
            - "summary": {
                "total_requested": Number of jobs requested
                "successful_creations": 0
                "failed_creations": Number of failed creations
              }
        </returns>
        <raises>
            Returns structured error details for invalid inputs, missing data, or creation failures.
        </raises>
        <schema_constraints>
            - job_creations: List of dictionaries or JobCreationItem objects
            - Each creation must contain ai_query (string) specifying the job requirements and context
            - Optional fields: context, skills_needs_to_cover, expertise_necessary, salary_band, must_have (list), nice_to_have (list), additional_context
        </schema_constraints>
    </tool>
    """,
    
    "create_new_interviews_questions": """
    <tool>
        <name>create_new_interviews_questions</name>
        <use_case>Create multiple comprehensive interview question sets for candidate evaluation</use_case>
        <behavior>
            Prepares the creation of multiple interview question sets by calling the actual functions in parallel
            and generating structured, professional interview content designed for effective candidate assessment.
            Uses ThreadPoolExecutor for efficient parallel processing to save inference time.
        </behavior>
        <when_to_use>
            - When the user needs to create multiple interview question sets for different roles
            - When technical or behavioral questions need to be generated in bulk
            - When structured interview processes need to be established for various positions
            - When the user wants to ensure consistent and effective candidate evaluations across multiple roles
        </when_to_use>
        <intent>To generate comprehensive interview questions that enable effective and consistent candidate evaluations</intent>
        <side_effects>Prepares interview question creation data for front-end confirmation. No database changes until confirmed.</side_effects>
        <category>Interview Management</category>
        <args>
            - interview_creations: List of dictionaries or InterviewQuestionCreationItem objects, each containing ai_query and optionally role_focus, skills_focus, difficulty, evaluation_criteria, and additional_context
        </args>
        <returns>
            Dictionary with comprehensive return information:
            
            SUCCESS (status: "success"):
            - "success": true
            - "message": "All interview questions created successfully"
            - "created": Array of interview objects with:
              * "object_id": Unique ID of the created interview
              * "object_type": "interview"
              * "title": Interview title or role focus
              * "content": Generated interview questions content
              * "metadata": Creation metadata including difficulty level, skills focus, etc.
              * "validation_status": "passed"
              * "created_at": Timestamp when interview was created
            - "objects": Array of {object_id, object_type} pairs for created interviews
            - "validation_results": {
                "all_valid": true,
                "validation_errors": []
              }
            - "summary": {
                "total_requested": Number of interviews requested
                "successful_creations": Number of interviews created
                "failed_creations": 0
              }
            
            PARTIAL SUCCESS (status: "partial"):
            - "success": false
            - "message": "Some interview questions created successfully, others failed"
            - "created": Array of successfully created interviews (same structure as above)
            - "objects": Array of {object_id, object_type} pairs for successful creations
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of validation error objects
              }
            - "errors": Array of error objects with:
              * "interview_index": Index of the failed interview in the request
              * "error_type": Type of error (ValidationError, AIError, etc.)
              * "error_message": Human-readable error description
              * "suggestion": Specific guidance on how to fix the creation attempt
            - "summary": {
                "total_requested": Number of interviews requested
                "successful_creations": Number of interviews created
                "failed_creations": Number of failed creations
              }
            
            COMPLETE FAILURE (status: "error"):
            - "success": false
            - "message": "All interview question creations failed"
            - "created": []
            - "objects": []
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of all validation errors
              }
            - "errors": Array of error objects for all failed creations
            - "summary": {
                "total_requested": Number of interviews requested
                "successful_creations": 0
                "failed_creations": Number of failed creations
              }
        </returns>
        <raises>
            Returns structured error details for invalid inputs, missing data, or creation failures.
        </raises>
        <schema_constraints>
            - interview_creations: List of dictionaries or InterviewQuestionCreationItem objects
            - Each creation must contain ai_query (string) specifying the interview purpose and role
            - Optional fields: role_focus, skills_focus (list), difficulty, evaluation_criteria (list), additional_context
        </schema_constraints>
    </tool>
    """,
    
    "create_new_email_drafts": """
    <tool>
        <name>create_new_email_drafts</name>
        <use_case>Create multiple professional email drafts for various HR communications</use_case>
        <behavior>
            Prepares the creation of multiple email drafts by calling the actual functions in parallel
            and generating structured, professional email content designed for effective communication.
            Uses ThreadPoolExecutor for efficient parallel processing to save inference time.
        </behavior>
        <when_to_use>
            - When the user needs to create multiple email drafts for different purposes
            - When professional HR communications need to be generated in bulk
            - When structured email templates are required for various communication needs
            - When the user wants to ensure consistent and professional communication across multiple recipients
        </when_to_use>
        <intent>To generate comprehensive email drafts that enable effective and professional HR communications</intent>
        <side_effects>Prepares email creation data for front-end confirmation. No database changes until confirmed.</side_effects>
        <category>Communication</category>
        <args>
            - email_creations: List of dictionaries or EmailCreationItem objects, each containing ai_query and optionally recipient_type, recipient_id, recipient_context, purpose, tone, urgency, and additional_context
        </args>
        <returns>
            Dictionary with comprehensive return information:
            
            SUCCESS (status: "success"):
            - "success": true
            - "message": "All email drafts created successfully"
            - "created": Array of email objects with:
              * "object_id": Unique ID of the created email
              * "object_type": "email"
              * "subject": Email subject line
              * "content": Generated email content
              * "recipient_info": Recipient details and context
              * "metadata": Creation metadata including tone, urgency, purpose, etc.
              * "validation_status": "passed"
              * "created_at": Timestamp when email was created
            - "objects": Array of {object_id, object_type} pairs for created emails
            - "validation_results": {
                "all_valid": true,
                "validation_errors": []
              }
            - "summary": {
                "total_requested": Number of emails requested
                "successful_creations": Number of emails created
                "failed_creations": 0
              }
            
            PARTIAL SUCCESS (status: "partial"):
            - "success": false
            - "message": "Some email drafts created successfully, others failed"
            - "created": Array of successfully created emails (same structure as above)
            - "objects": Array of {object_id, object_type} pairs for successful creations
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of validation error objects
              }
            - "errors": Array of error objects with:
              * "email_index": Index of the failed email in the request
              * "error_type": Type of error (ValidationError, AIError, etc.)
              * "error_message": Human-readable error description
              * "suggestion": Specific guidance on how to fix the creation attempt
            - "summary": {
                "total_requested": Number of emails requested
                "successful_creations": Number of emails created
                "failed_creations": Number of failed creations
              }
            
            COMPLETE FAILURE (status: "error"):
            - "success": false
            - "message": "All email draft creations failed"
            - "created": []
            - "objects": []
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of all validation errors
              }
            - "errors": Array of error objects for all failed creations
            - "summary": {
                "total_requested": Number of emails requested
                "successful_creations": 0
                "failed_creations": Number of failed creations
              }
        </returns>
        <raises>
            Returns structured error details for invalid inputs, missing data, or creation failures.
        </raises>
        <schema_constraints>
            - email_creations: List of dictionaries or EmailCreationItem objects
            - Each creation must contain ai_query (string) specifying the email purpose and content
            - Optional fields: recipient_type, recipient_id, recipient_context, purpose, tone, urgency, additional_context
        </schema_constraints>
    </tool>
    """,
    
    "create_new_pulse_forms": """
    <tool>
        <name>create_new_pulse_forms</name>
        <use_case>Create multiple pulse survey forms for employee feedback and engagement measurement</use_case>
        <behavior>
            Prepares the creation of multiple pulse survey forms by calling the actual functions in parallel
            and generating structured, professional survey content designed for effective employee feedback collection.
            Uses ThreadPoolExecutor for efficient parallel processing to save inference time.
        </behavior>
        <when_to_use>
            - When the user needs to create multiple pulse surveys for different purposes
            - When employee feedback forms need to be generated in bulk
            - When structured survey content is required for various engagement measurement needs
            - When the user wants to ensure consistent and effective feedback collection across multiple topics
        </when_to_use>
        <intent>To generate comprehensive pulse survey forms that enable effective employee feedback collection and engagement measurement</intent>
        <side_effects>Prepares pulse form creation data for front-end confirmation. No database changes until confirmed.</side_effects>
        <category>Employee Engagement</category>
        <args>
            - pulse_creations: List of dictionaries or PulseCreationItem objects, each containing ai_query and optionally context, pulse_type, target_audience, survey_focus, and additional_context
        </args>
        <returns>
            Dictionary with comprehensive return information:
            
            SUCCESS (status: "success"):
            - "success": true
            - "message": "All pulse forms created successfully"
            - "created": Array of pulse objects with:
              * "object_id": Unique ID of the created pulse form
              * "object_type": "pulse"
              * "title": Pulse survey title
              * "content": Generated survey questions and structure
              * "target_audience": Intended survey recipients
              * "metadata": Creation metadata including pulse type, survey focus, etc.
              * "validation_status": "passed"
              * "created_at": Timestamp when pulse form was created
            - "objects": Array of {object_id, object_type} pairs for created pulse forms
            - "validation_results": {
                "all_valid": true,
                "validation_errors": []
              }
            - "summary": {
                "total_requested": Number of pulse forms requested
                "successful_creations": Number of pulse forms created
                "failed_creations": 0
              }
            
            PARTIAL SUCCESS (status: "partial"):
            - "success": false
            - "message": "Some pulse forms created successfully, others failed"
            - "created": Array of successfully created pulse forms (same structure as above)
            - "objects": Array of {object_id, object_type} pairs for successful creations
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of validation error objects
              }
            - "errors": Array of error objects with:
              * "pulse_index": Index of the failed pulse form in the request
              * "error_type": Type of error (ValidationError, AIError, etc.)
              * "error_message": Human-readable error description
              * "suggestion": Specific guidance on how to fix the creation attempt
            - "summary": {
                "total_requested": Number of pulse forms requested
                "successful_creations": Number of pulse forms created
                "failed_creations": Number of failed creations
              }
            
            COMPLETE FAILURE (status: "error"):
            - "success": false
            - "message": "All pulse form creations failed"
            - "created": []
            - "objects": []
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of all validation errors
              }
            - "errors": Array of error objects for all failed creations
            - "summary": {
                "total_requested": Number of pulse forms requested
                "successful_creations": 0
                "failed_creations": Number of failed creations
              }
        </returns>
        <raises>
            Returns structured error details for invalid inputs, missing data, or creation failures.
        </raises>
        <schema_constraints>
            - pulse_creations: List of dictionaries or PulseCreationItem objects
            - Each creation must contain ai_query (string) specifying the pulse survey purpose and content
            - Optional fields: context, pulse_type, target_audience, survey_focus, additional_context
        </schema_constraints>
    </tool>
    """,
    
    "create_new_courses": """
    <tool>
        <name>create_new_courses</name>
        <use_case>Create multiple comprehensive training courses and learning programs for skill development</use_case>
        <behavior>
            Prepares the creation of multiple training courses by calling the actual functions in parallel
            and generating structured, professional course content designed for effective learning outcomes.
            Uses ThreadPoolExecutor for efficient parallel processing to save inference time.
        </behavior>
        <when_to_use>
            - When the user needs to create multiple training courses for different skills or topics
            - When learning programs need to be generated in bulk
            - When structured course content is required for various training needs
            - When the user wants to ensure consistent and professional course design across multiple learning objectives
        </when_to_use>
        <intent>To generate comprehensive training courses that enable effective skill development and learning outcomes</intent>
        <side_effects>Prepares course creation data for front-end confirmation. No database changes until confirmed.</side_effects>
        <category>Learning Management</category>
        <args>
            - course_creations: List of dictionaries or CourseCreationItem objects, each containing ai_query and optionally context, course_type, difficulty_level, target_audience, duration, skills_focus, and additional_context
        </args>
        <returns>
            Dictionary with comprehensive return information:
            
            SUCCESS (status: "success"):
            - "success": true
            - "message": "All training courses created successfully"
            - "created": Array of course objects with:
              * "object_id": Unique ID of the created course
              * "object_type": "course"
              * "title": Course title
              * "content": Generated course curriculum and materials
              * "target_audience": Intended course participants
              * "metadata": Creation metadata including course type, difficulty, duration, etc.
              * "validation_status": "passed"
              * "created_at": Timestamp when course was created
            - "objects": Array of {object_id, object_type} pairs for created courses
            - "validation_results": {
                "all_valid": true,
                "validation_errors": []
              }
            - "summary": {
                "total_requested": Number of courses requested
                "successful_creations": Number of courses created
                "failed_creations": 0
              }
            
            PARTIAL SUCCESS (status: "partial"):
            - "success": false
            - "message": "Some training courses created successfully, others failed"
            - "created": Array of successfully created courses (same structure as above)
            - "objects": Array of {object_id, object_type} pairs for successful creations
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of validation error objects
              }
            - "errors": Array of error objects with:
              * "course_index": Index of the failed course in the request
              * "error_type": Type of error (ValidationError, AIError, etc.)
              * "error_message": Human-readable error description
              * "suggestion": Specific guidance on how to fix the creation attempt
            - "summary": {
                "total_requested": Number of courses requested
                "successful_creations": Number of courses created
                "failed_creations": Number of failed creations
              }
            
            COMPLETE FAILURE (status: "error"):
            - "success": false
            - "message": "All training course creations failed"
            - "created": []
            - "objects": []
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of all validation errors
              }
            - "errors": Array of error objects for all failed creations
            - "summary": {
                "total_requested": Number of courses requested
                "successful_creations": 0
                "failed_creations": Number of failed creations
              }
        </returns>
        <raises>
            Returns structured error details for invalid inputs, missing data, or creation failures.
        </raises>
        <schema_constraints>
            - course_creations: List of dictionaries or CourseCreationItem objects
            - Each creation must contain ai_query (string) specifying the course purpose and content
            - Optional fields: context, course_type, difficulty_level, target_audience, duration, skills_focus (list), additional_context
        </schema_constraints>
    </tool>
    """,
    
    "create_new_assessments": """
    <tool>
        <name>create_new_assessments</name>
        <use_case>Create multiple comprehensive assessment cases for hiring processes with structured evaluation criteria</use_case>
        <behavior>
            Prepares the creation of multiple assessment cases by calling the actual functions in parallel
            and generating structured, professional assessment content designed for effective candidate evaluation.
            Uses ThreadPoolExecutor for efficient parallel processing to save inference time.
        </behavior>
        <when_to_use>
            - When the user needs to create multiple assessment cases for different roles or positions
            - When technical or behavioral assessments need to be generated in bulk
            - When structured evaluation processes need to be established for various roles
            - When the user wants to ensure consistent and effective candidate evaluations across multiple positions
        </when_to_use>
        <intent>To generate comprehensive assessment cases that enable effective and consistent candidate evaluations</intent>
        <side_effects>Prepares assessment creation data for front-end confirmation. No database changes until confirmed.</side_effects>
        <category>Assessment Management</category>
        <args>
            - assessment_creations: List of dictionaries or AssessmentCreationItem objects, each containing ai_query and optionally context, assessment_type, difficulty_level, target_role, skills_focus, evaluation_criteria, and additional_context
        </args>
        <returns>
            Dictionary with comprehensive return information:
            
            SUCCESS (status: "success"):
            - "success": true
            - "message": "All assessments created successfully"
            - "created": Array of assessment objects with:
              * "object_id": Unique ID of the created assessment
              * "object_type": "assessment"
              * "title": Assessment title or role focus
              * "content": Generated assessment tasks and evaluation criteria
              * "target_role": Intended assessment role
              * "metadata": Creation metadata including assessment type, difficulty, evaluation criteria, etc.
              * "validation_status": "passed"
              * "created_at": Timestamp when assessment was created
            - "objects": Array of {object_id, object_type} pairs for created assessments
            - "validation_results": {
                "all_valid": true,
                "validation_errors": []
              }
            - "summary": {
                "total_requested": Number of assessments requested
                "successful_creations": Number of assessments created
                "failed_creations": 0
              }
            
            PARTIAL SUCCESS (status: "partial"):
            - "success": false
            - "message": "Some assessments created successfully, others failed"
            - "created": Array of successfully created assessments (same structure as above)
            - "objects": Array of {object_id, object_type} pairs for successful creations
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of validation error objects
              }
            - "errors": Array of error objects with:
              * "assessment_index": Index of the failed assessment in the request
              * "error_type": Type of error (ValidationError, AIError, etc.)
              * "error_message": Human-readable error description
              * "suggestion": Specific guidance on how to fix the creation attempt
            - "summary": {
                "total_requested": Number of assessments requested
                "successful_creations": Number of assessments created
                "failed_creations": Number of failed creations
              }
            
            COMPLETE FAILURE (status: "error"):
            - "success": false
            - "message": "All assessment creations failed"
            - "created": []
            - "objects": []
            - "validation_results": {
                "all_valid": false,
                "validation_errors": Array of all validation errors
              }
            - "errors": Array of error objects for all failed creations
            - "summary": {
                "total_requested": Number of assessments requested
                "successful_creations": 0
                "failed_creations": Number of failed creations
              }
        </returns>
        <raises>
            Returns structured error details for invalid inputs, missing data, or creation failures.
        </raises>
        <schema_constraints>
            - assessment_creations: List of dictionaries or AssessmentCreationItem objects
            - Each creation must contain ai_query (string) specifying the assessment purpose and content
            - Optional fields: context, assessment_type, difficulty_level, target_role, skills_focus (list), evaluation_criteria (list), additional_context
        </schema_constraints>
    </tool>
    """
}
