"""
Tool descriptions for data retrieval tools.

These tools provide comprehensive access to organizational data including
candidates, employees, jobs, courses, skills, and company information.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
READ_TOOLS_DESCRIPTIONS = {
    "read_candidates_data": """
    <tool>
        <name>read_candidates_data</name>
        <use_case>Retrieve comprehensive context and details about multiple candidates in the recruitment process.</use_case>
        <behavior>
            Queries the database for specific candidates by IDs and returns structured representations
            of their profiles, including resume data, skills, application history, assessment results,
            and optionally additional insights and analysis. Supports parallel processing of multiple
            candidate IDs for efficient batch retrieval with configurable detail levels.
        </behavior>
        <when_to_use>
            Use when you need detailed information about specific candidates to evaluate their
            suitability for positions, review their qualifications, or understand their application histories.
            Ideal for candidate assessment, interview preparation, and recruitment decision-making.
        </when_to_use>
        <intent>
            To provide a comprehensive view of multiple candidate profiles with flexible depth control
            and optional analytics to support efficient recruitment decision making. Enables thorough
            candidate evaluation with configurable information granularity.
        </intent>
        <side_effects>None. This is a read-only operation that does not modify any candidate data.</side_effects>
        <category>Retrieval</category>
        <args>
            - candidate_ids: Single candidate ID or list of up to 5 candidate IDs (required)
            - include_skills: Include candidate skills and competencies (optional, default: True)
            - include_responsibilities: Include candidate responsibilities and roles (optional, default: True)
            - include_statistics: Include statistical analysis and metrics (optional, default: False)
            - include_content_model: Include AI-generated content model data (optional, default: False)
            - include_history: Include historical data and changes (optional, default: False)
            - include_notes: Include notes and comments (optional, default: False)
            - include_documents: Include uploaded documents and files (optional, default: False)
            - include_assessments: Include assessment results and evaluations (optional, default: False)
            - include_performances: Include performance metrics and reviews (optional, default: False)
            - include_company: Include company context and organizational data (optional, default: False)
            - include_benefits: Include benefits and compensation information (optional, default: False)
            - include_certificates: Include certifications and credentials (optional, default: False)
            - include_tools: Include tools and technologies used (optional, default: False)
            - include_languages: Include language proficiencies (optional, default: False)
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains
            a mapping of candidate IDs to their profile information including:
            - Resume/CV data, skills, and qualifications
            - Application history and status
            - Assessment results and interview feedback
            - Communication history and notes
            - Match scores against job requirements
        </returns>
        <raises>
            Returns error details in response if database queries fail, including which
            specific candidate IDs encountered errors. Supports partial success scenarios.
        </raises>
        <schema_constraints>
            - candidate_ids: valid UUID string or array of UUID strings (max 5 items)
        </schema_constraints>
    </tool>
    """,
    
    "read_employees_data": """
    <tool>
        <name>read_employees_data</name>
        <use_case>Retrieve comprehensive context and details about multiple employees within the organization.</use_case>
        <behavior>
            Queries the database for specific employees by IDs and returns structured representations
            of their profiles, including role information, skills, performance data, team affiliations,
            and optionally additional insights and analysis. Supports parallel processing for efficient
            batch retrieval with configurable detail levels across all employee data dimensions.
        </behavior>
        <when_to_use>
            Use when you need detailed information about specific employees to understand their
            roles, skills, performance, or organizational relationships. Essential for talent
            management, performance reviews, and workforce planning activities.
        </when_to_use>
        <intent>
            To provide a comprehensive view of multiple employee profiles with flexible depth control
            and optional analytics to support talent management and workforce planning. Enables
            thorough employee analysis with configurable information granularity.
        </intent>
        <side_effects>None. This is a read-only operation that does not modify any employee data.</side_effects>
        <category>Retrieval</category>
        <args>
            - employee_ids: Single employee ID or list of up to 5 employee IDs (required)
            - include_skills: Include employee skills and competencies (optional, default: True)
            - include_responsibilities: Include employee responsibilities and roles (optional, default: True)
            - include_statistics: Include statistical analysis and metrics (optional, default: False)
            - include_content_model: Include AI-generated content model data (optional, default: False)
            - include_history: Include historical data and changes (optional, default: False)
            - include_notes: Include notes and comments (optional, default: False)
            - include_documents: Include uploaded documents and files (optional, default: False)
            - include_assessments: Include assessment results and evaluations (optional, default: False)
            - include_performances: Include performance metrics and reviews (optional, default: False)
            - include_company: Include company context and organizational data (optional, default: False)
            - include_benefits: Include benefits and compensation information (optional, default: False)
            - include_certificates: Include certifications and credentials (optional, default: False)
            - include_tools: Include tools and technologies used (optional, default: False)
            - include_languages: Include language proficiencies (optional, default: False)
        </args>
        <returns>
            Dictionary with comprehensive return information:
            
            SUCCESS (status: "success"):
            - "data": Dictionary mapping employee IDs to their complete profile data including:
              * Professional profile: name, role, department, team affiliations, contact info
              * Skills inventory (if include_skills=True): skill names, levels, competencies, certifications
              * Responsibilities (if include_responsibilities=True): job duties, projects, contributions
              * Statistics (if include_statistics=True): performance metrics, scores, trends, KPIs
              * Content model (if include_content_model=True): AI-generated insights and metadata
              * History (if include_history=True): timeline of changes, promotions, role transitions
              * Notes (if include_notes=True): internal notes, comments, observations
              * Documents (if include_documents=True): uploaded files, resumes, certificates
              * Assessments (if include_assessments=True): test results, evaluations, scores
              * Performances (if include_performances=True): performance reviews, ratings, feedback
              * Company info (if include_company=True): organizational context, policies, culture
              * Benefits (if include_benefits=True): compensation, benefits packages, perks
              * Certificates (if include_certificates=True): professional certifications, credentials
              * Tools (if include_tools=True): assigned tools, software, technologies
              * Languages (if include_languages=True): language proficiencies, communication skills
            
            PARTIAL SUCCESS (status: "partial"):
            - "data": Dictionary of successfully retrieved employees with full profile data
            - "errors": Dictionary mapping failed employee IDs to detailed error information
            - "message": "X of Y employees retrieved successfully"
            - Each error includes: status, error message, error_type, and specific resolution suggestion
            
            COMPLETE FAILURE (status: "error"):
            - "error": Human-readable error message explaining the failure
            - "error_type": Exception class name (e.g., "ValidationError", "PermissionError")
            - "error_details": Technical details about what went wrong
            - "suggestion": Specific guidance on how to resolve the issue
            
            COMMON ERROR SCENARIOS:
            - Invalid employee IDs: "Check that employee IDs are valid UUIDs and exist in the system"
            - Missing permissions: "Verify user has access to requested employee data"
            - Invalid parameters: "Review include_* parameters for valid boolean values"
            - Database errors: "System temporarily unavailable, retry operation"
        </returns>
        <raises>
            Returns error details in response if database queries fail, including which
            specific employee IDs encountered errors. Supports partial success scenarios.
        </raises>
        <schema_constraints>
            - employee_ids: valid UUID string or array of UUID strings (max 5 items)
        </schema_constraints>
    </tool>
    """,
    
    "read_jobs_data": """
    <tool>
        <name>read_jobs_data</name>
        <use_case>Retrieve comprehensive context and details about multiple job positions or roles.</use_case>
        <behavior>
            Queries the database for specific jobs by IDs and returns structured representations
            of the positions, including requirements, qualifications, hiring status, and
            optionally additional insights and analysis. Supports parallel processing for
            efficient batch retrieval with configurable detail levels across all job data dimensions.
        </behavior>
        <when_to_use>
            Use when you need detailed information about specific jobs to understand their
            requirements, hiring status, candidate pipelines, or organizational context.
            Essential for recruitment planning, job analysis, and workforce strategy.
        </when_to_use>
        <intent>
            To provide a comprehensive view of multiple job positions with flexible depth control
            and optional analytics to support recruitment and workforce planning. Enables
            thorough job analysis with configurable information granularity.
        </intent>
        <side_effects>None. This is a read-only operation that does not modify any job data.</side_effects>
        <category>Retrieval</category>
        <args>
            - job_ids: Single job ID or list of up to 5 job IDs (required)
            - include_company: Include company context and organizational data (optional, default: True)
            - include_forms: Include application forms and questionnaires (optional, default: True)
            - include_settings: Include job-specific settings and configurations (optional, default: False)
            - include_documents: Include job-related documents and files (optional, default: False)
            - include_questions: Include interview questions and assessments (optional, default: True)
            - include_content_model: Include AI-generated content model data (optional, default: False)
            - include_history: Include historical data and changes (optional, default: False)
            - include_notes: Include notes and comments (optional, default: False)
            - include_interviews: Include interview data and scheduling (optional, default: False)
            - include_benefits: Include benefits and compensation information (optional, default: False)
            - include_certificates: Include required certifications (optional, default: False)
            - include_tools: Include required tools and technologies (optional, default: False)
            - include_languages: Include required language proficiencies (optional, default: False)
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains
            a mapping of job IDs to their details including:
            - Job description, requirements, and qualifications
            - Salary range, benefits, and employment terms
            - Department and team context
            - Hiring status and recruitment process stage
            - Candidate pipeline and application statistics
            - Required skills, experience levels, and competencies
            - Similar roles and internal mobility options
        </returns>
        <raises>
            Returns error details in response if database queries fail, including which
            specific job IDs encountered errors. Supports partial success scenarios.
        </raises>
        <schema_constraints>
            - job_ids: valid UUID string or array of UUID strings (max 5 items)
        </schema_constraints>
    </tool>
    """,
    
    "read_courses_data": """
    <tool>
        <name>read_courses_data</name>
        <use_case>Retrieve comprehensive context and details about multiple courses or learning resources.</use_case>
        <behavior>
            Queries the database for specific courses by IDs and returns structured representations
            of the courses, including curriculum, objectives, enrollment data, and
            optionally additional insights and analysis. Supports parallel processing for
            efficient batch retrieval with configurable detail levels across all course data dimensions.
        </behavior>
        <when_to_use>
            Use when you need detailed information about specific courses to understand their
            content, effectiveness, prerequisites, or enrollment statistics. Essential for
            learning and development planning, course evaluation, and skills development strategy.
        </when_to_use>
        <intent>
            To provide a comprehensive view of multiple courses with flexible depth control
            and optional analytics to support learning and development planning. Enables
            thorough course analysis with configurable information granularity.
        </intent>
        <side_effects>None. This is a read-only operation that does not modify any course data.</side_effects>
        <category>Retrieval</category>
        <args>
            - course_ids: Single course ID or list of up to 5 course IDs (required)
            - include_company: Include company context and organizational data (optional, default: True)
            - include_users: Include enrolled users and participants (optional, default: True)
            - include_skills: Include skills developed by the course (optional, default: True)
            - include_content_model: Include AI-generated content model data (optional, default: False)
            - include_statistics: Include enrollment and completion statistics (optional, default: False)
            - include_notes: Include notes and comments (optional, default: False)
            - include_history: Include historical data and changes (optional, default: False)
            - include_resources: Include course resources and materials (optional, default: False)
            - include_files: Include uploaded files and documents (optional, default: False)
            - include_links: Include external links and references (optional, default: False)
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains
            a mapping of course IDs to their details including:
            - Course content, curriculum, and learning objectives
            - Duration, format, and delivery method
            - Required prerequisites and target audience
            - Enrollment statistics and completion rates
            - Associated skills, certifications, and competencies
            - Instructor information
            - Participant feedback and effectiveness metrics
        </returns>
        <raises>
            Returns error details in response if database queries fail, including which
            specific course IDs encountered errors. Supports partial success scenarios.
        </raises>
        <schema_constraints>
            - course_ids: valid UUID string or array of UUID strings (max 5 items)
        </schema_constraints>
    </tool>
    """,
    
    "read_skills_data": """
    <tool>
        <name>read_skills_data</name>
        <use_case>Retrieve comprehensive context and details about multiple specific skills, competencies, or capabilities.</use_case>
        <behavior>
            Queries the database for specific skills by IDs and returns structured representations
            of the skills, including definitions, prevalence, related roles, and
            optionally additional insights and analysis. Supports parallel processing for
            efficient batch retrieval with configurable detail levels across all skill data dimensions.
        </behavior>
        <when_to_use>
            Use when you need detailed information about specific skills to understand their
            definitions, prevalence, required training, or organizational importance.
            Essential for skills gap analysis, training planning, and workforce development.
        </when_to_use>
        <intent>
            To provide a comprehensive view of multiple skills with flexible depth control
            and optional analytics to support talent management and workforce planning.
            Enables thorough skills analysis with configurable information granularity.
        </intent>
        <side_effects>None. This is a read-only operation that does not modify any skill data.</side_effects>
        <category>Retrieval</category>
        <args>
            - skill_ids: Single skill ID or list of up to 5 skill IDs (required)
            - include_statistics: Include statistical analysis and prevalence data (optional, default: False)
            - include_content_model: Include AI-generated content model data (optional, default: False)
            - include_competences: Include competence levels and assessments (optional, default: False)
            - include_verification: Include verification and validation data (optional, default: False)
            - include_object_characteristics: Include object characteristics and metadata (optional, default: False)
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains
            a mapping of skill IDs to their details including:
            - Skill definition, description, and categorization
            - Prevalence within the organization and skill gap analysis
            - Associated roles, jobs, and career paths requiring this skill
            - Training programs and resources to develop this skill
            - Employees and candidates possessing this skill and their proficiency levels
            - Industry benchmarks and market demand trends
            - Related and complementary skills
        </returns>
        <raises>
            Returns error details in response if database queries fail, including which
            specific skill IDs encountered errors. Supports partial success scenarios.
        </raises>
        <schema_constraints>
            - skill_ids: valid UUID string or array of UUID strings (max 5 items)
        </schema_constraints>
    </tool>
    """,
    
    "read_company": """
    <tool>
        <name>read_company</name>
        <use_case>Retrieve comprehensive company information including all available data such as statistics, organizational units, benefits, perks, contracts, hiring stages, tools, metrics, skills needs, content model, career page content, settings, links, and created_by information. Optionally includes organizational structure.</use_case>
        <behavior>
            Wraps the CompanySerializer functionality to provide complete company information with configurable sections. 
            Integrates with existing RetrieveService methods for enhanced data including basic context, skills analysis, 
            jobs overview, and optionally organizational structure. Returns a comprehensive dictionary with all company data
            in a single consolidated response for complete organizational analysis.
        </behavior>
        <when_to_use>
            Use when you need complete company information for analysis, reporting, dashboard creation, 
            strategic planning, or when conducting comprehensive company assessments. This is the most 
            comprehensive company information retrieval function available and should be used for
            high-level organizational analysis and strategic decision-making.
        </when_to_use>
        <intent>
            To provide a unified, comprehensive view of all company information in a single call,
            enabling complete company analysis and strategic decision-making with all available data.
            This tool serves as the foundation for organizational understanding and strategic planning.
        </intent>
        <side_effects>None. This is a read-only operation that does not modify any company data.</side_effects>
        <category>Company Information</category>
        <args>
            - include_organizational_structure: If True, includes detailed organizational structure with teams and users (optional, default: False)
            - include_statistics: Include company statistics and metrics (optional, default: True)
            - include_skills_needs: Include skills needs and requirements analysis (optional, default: True)
            - include_benefits: Include employee benefits and compensation (optional, default: True)
            - include_perks: Include company perks and additional benefits (optional, default: True)
            - include_contracts: Include contract templates and terms (optional, default: True)
            - include_tools: Include company tools and technologies (optional, default: True)
            - include_metrics_being_measured: Include metrics and KPIs being tracked (optional, default: True)
            - include_career_page_content: Include career page content and branding (optional, default: True)
            - include_office_locations: Include office locations and remote work policies (optional, default: True)
            - include_certificates: Include company certifications and credentials (optional, default: True)
            - include_content_model: Include AI-generated content model data (optional, default: False)
            - include_history: Include historical data and changes (optional, default: False)
            - include_strategy: Include strategic planning and business strategy (optional, default: False)
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains comprehensive company information including:
            - company: Full company data from serializer
            - metadata: Retrieval configuration and included sections
            - additional_context: Basic context information
            - skills_analysis: Enhanced skills data (if requested)
            - jobs_overview: Jobs information (if available)
            - organizational_structure: Org structure (if include_organizational_structure=True)
        </returns>
        <raises>
            Returns error details in response if database queries fail or company doesn't exist.
        </raises>
        <schema_constraints>
            - include_organizational_structure: boolean value (default: False)
        </schema_constraints>
    </tool>
    """
}
