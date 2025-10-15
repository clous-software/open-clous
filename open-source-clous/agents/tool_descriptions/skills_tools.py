"""
Tool descriptions for skills analysis and management tools.

These tools provide comprehensive skills assessment, gap analysis, and workforce
capability management capabilities.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
SKILLS_TOOLS_DESCRIPTIONS = {
    "retrieve_skills": """
    <tool>
        <name>retrieve_skills</name>
        <use_case>Retrieve comprehensive skills data across employees, candidates, jobs, and organizational units for skills analysis and workforce planning.</use_case>
        <behavior>
            Retrieves skills data from multiple sources including employees, candidates, jobs,
            and organizational units. Provides comprehensive skills overview with gap analysis,
            competency levels, and skills distribution across the organization. Supports
            filtering by various criteria and time periods for targeted skills analysis.
        </behavior>
        <when_to_use>
            Use when conducting skills audits, analyzing workforce capabilities, identifying
            skills gaps, planning training programs, or making strategic workforce decisions
            based on current skills inventory and competency levels.
        </when_to_use>
        <intent>
            To provide comprehensive skills visibility across the organization enabling
            data-driven workforce planning, skills gap identification, and strategic
            talent development decisions.
        </intent>
        <side_effects>None. This is a read-only operation that retrieves skills data.</side_effects>
        <category>Skills Analysis</category>
        <args>
            - employee_ids: List of employee IDs to include in analysis (optional)
            - candidate_ids: List of candidate IDs to include in analysis (optional)
            - job_ids: List of job IDs to include in analysis (optional)
            - org_unit_ids: List of organizational unit IDs to include in analysis (optional)
            - show_skills_gaps: Include skills gap analysis in results (optional, default: False)
            - since_days: Time period for skills data in days (optional, default: None)
        </args>
        <returns>
            Dictionary with comprehensive skills data including skills inventory,
            competency levels, gap analysis, skills distribution, and insights
            about workforce capabilities and development needs.
        </returns>
        <raises>
            - ValueError: If no valid IDs provided or invalid parameters
            - SkillsAnalysisError: If skills data cannot be retrieved or processed
        </raises>
        <schema_constraints>
            - At least one of employee_ids, candidate_ids, job_ids, or org_unit_ids must be provided
            - All ID lists must contain valid UUIDs
            - since_days must be a positive integer if provided
            - show_skills_gaps must be a boolean value
        </schema_constraints>
    </tool>
    """,
    
    "retrieve_company_skills_gaps": """
    <tool>
        <name>retrieve_company_skills_gaps</name>
        <use_case>Identify and analyze skills gaps across the organization by comparing current skills with job requirements and business needs.</use_case>
        <behavior>
            Analyzes skills gaps by comparing current employee skills with job requirements,
            organizational needs, and business objectives. Identifies critical skills gaps,
            competency shortages, and areas where the organization lacks necessary capabilities
            for strategic success. Provides detailed gap analysis with prioritization and impact assessment.
        </behavior>
        <when_to_use>
            Use when conducting strategic skills planning, identifying training priorities,
            assessing workforce readiness for business objectives, or making decisions
            about skills development investments and hiring priorities.
        </when_to_use>
        <intent>
            To identify critical skills gaps that may hinder organizational success and
            provide actionable insights for workforce development, training planning,
            and strategic talent acquisition.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Skills Analysis</category>
        <args>
            - org_unit_ids: List of organizational unit IDs to analyze (optional)
            - job_ids: List of job IDs to analyze (optional)
        </args>
        <returns>
            Dictionary with skills gap analysis including identified gaps, criticality
            levels, impact assessment, affected roles, and recommendations for
            addressing skills shortages and development needs.
        </returns>
        <raises>
            - SkillsAnalysisError: If skills gap analysis cannot be performed
            - DataRetrievalError: If required data cannot be retrieved
        </raises>
        <schema_constraints>
            - org_unit_ids must be a list of valid organizational unit UUIDs if provided
            - job_ids must be a list of valid job UUIDs if provided
            - At least one of org_unit_ids or job_ids should be provided for meaningful analysis
        </schema_constraints>
    </tool>
    """,
    
    "retrieve_company_skills_needs": """
    <tool>
        <name>retrieve_company_skills_needs</name>
        <use_case>Analyze current and future skills needs across the organization based on business strategy, job requirements, and market trends.</use_case>
        <behavior>
            Analyzes organizational skills needs by examining job requirements, business
            strategy, market trends, and future planning. Identifies current and emerging
            skills requirements, competency demands, and strategic capabilities needed
            for organizational success and competitive advantage.
        </behavior>
        <when_to_use>
            Use when planning workforce development, aligning skills strategy with business
            objectives, identifying emerging skills requirements, or making strategic
            decisions about skills investment and talent acquisition priorities.
        </when_to_use>
        <intent>
            To provide comprehensive understanding of organizational skills needs enabling
            strategic workforce planning, skills development prioritization, and alignment
            of talent strategy with business objectives.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Skills Analysis</category>
        <args>
            - since_days: Time period for skills needs analysis in days (optional, default: None)
        </args>
        <returns>
            Dictionary with skills needs analysis including current requirements,
            emerging needs, strategic capabilities, market trends, and recommendations
            for skills development and workforce planning.
        </returns>
        <raises>
            - SkillsAnalysisError: If skills needs analysis cannot be performed
            - DataRetrievalError: If required data cannot be retrieved
        </raises>
        <schema_constraints>
            - since_days must be a positive integer if provided
        </schema_constraints>
    </tool>
    """,
    
    "retrieve_employees_skills_levels": """
    <tool>
        <name>retrieve_employees_skills_levels</name>
        <use_case>Analyze skills levels and competency assessments for specific employees to understand their capabilities and development needs.</use_case>
        <behavior>
            Retrieves detailed skills level data for specified employees including
            competency assessments, skill ratings, proficiency levels, and development
            progress. Analyzes individual skills profiles to identify strengths,
            development areas, and career progression opportunities.
        </behavior>
        <when_to_use>
            Use when conducting individual skills assessments, planning personal
            development programs, identifying training needs, or making decisions
            about employee development and career progression.
        </when_to_use>
        <intent>
            To provide detailed insights into individual employee skills levels
            enabling personalized development planning, targeted training, and
            informed career development decisions.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Skills Analysis</category>
        <args>
            - employee_ids: List of employee IDs to analyze (required)
            - since_days: Time period for skills analysis in days (optional, default: None)
        </args>
        <returns>
            Dictionary with employee skills level analysis including competency
            assessments, skill ratings, development progress, strengths, and
            recommendations for individual development planning.
        </returns>
        <raises>
            - ValueError: If employee_ids is empty or invalid
            - SkillsAnalysisError: If skills level analysis cannot be performed
        </raises>
        <schema_constraints>
            - employee_ids must be a non-empty list of valid employee UUIDs
            - since_days must be a positive integer if provided
        </schema_constraints>
    </tool>
    """,
    
    "retrieve_candidates_skills_levels": """
    <tool>
        <name>retrieve_candidates_skills_levels</name>
        <use_case>Analyze skills levels and competency assessments for candidates to evaluate their qualifications and potential fit for positions.</use_case>
        <behavior>
            Retrieves skills level data for specified candidates including competency
            assessments, skill ratings, proficiency levels, and evaluation results.
            Analyzes candidate skills profiles to assess qualifications, identify
            strengths, and evaluate potential fit for specific positions or roles.
        </behavior>
        <when_to_use>
            Use when evaluating candidate qualifications, assessing skills fit for
            positions, identifying training needs for new hires, or making hiring
            decisions based on skills assessment and competency evaluation.
        </when_to_use>
        <intent>
            To provide comprehensive candidate skills assessment enabling informed
            hiring decisions, skills-based candidate evaluation, and identification
            of development needs for potential new hires.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Skills Analysis</category>
        <args>
            - candidate_ids: List of candidate IDs to analyze (optional)
            - job_ids: List of job IDs to analyze against (optional)
            - since_days: Time period for skills analysis in days (optional, default: None)
        </args>
        <returns>
            Dictionary with candidate skills level analysis including competency
            assessments, skill ratings, job fit analysis, strengths, and
            recommendations for hiring and development planning.
        </returns>
        <raises>
            - ValueError: If no valid IDs provided
            - SkillsAnalysisError: If candidate skills analysis cannot be performed
        </raises>
        <schema_constraints>
            - At least one of candidate_ids or job_ids must be provided
            - candidate_ids must be a list of valid candidate UUIDs if provided
            - job_ids must be a list of valid job UUIDs if provided
            - since_days must be a positive integer if provided
        </schema_constraints>
    </tool>
    """
}
