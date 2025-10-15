"""
Tool descriptions for analysis tools.

These tools provide comprehensive analysis capabilities for jobs, skills,
and organizational data.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
ANALYSIS_TOOLS_DESCRIPTIONS = {
    "analyze_hiring_pipelines_from_jobs": """
    <tool>
        <name>analyze_hiring_pipelines_from_jobs</name>
        <use_case>Analyze hiring pipelines and recruitment processes from job data to identify bottlenecks and optimization opportunities.</use_case>
        <behavior>
            Analyzes hiring pipelines and recruitment processes from job data
            including application flows, stage performance, candidate progression,
            and recruitment effectiveness. Provides comprehensive pipeline
            analysis with bottleneck identification and optimization recommendations.
        </behavior>
        <when_to_use>
            Use when analyzing recruitment effectiveness, identifying hiring
            bottlenecks, optimizing recruitment processes, or making decisions
            about hiring strategy and process improvements.
        </when_to_use>
        <intent>
            To provide comprehensive hiring pipeline analysis enabling
            recruitment optimization, bottleneck identification, and
            data-driven hiring process improvement.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Analysis</category>
        <args>
            - job_ids: Single job ID or list of job IDs to analyze (required)
            - analysis_type: Type of analysis to perform (optional, default: None)
        </args>
        <returns>
            Dictionary with hiring pipeline analysis including stage performance,
            candidate flow analysis, bottleneck identification, and
            recommendations for recruitment optimization.
        </returns>
        <raises>
            - ValueError: If job_ids is not specified or invalid
            - AnalysisError: If hiring pipeline analysis fails
        </raises>
        <schema_constraints>
            - job_ids must be a valid job ID or list of valid job UUIDs
            - analysis_type must be a valid analysis type if provided
        </schema_constraints>
    </tool>
    """,
    
    "analyze_skills_to_business_goals_alignment": """
    <tool>
        <name>analyze_skills_to_business_goals_alignment</name>
        <use_case>Analyze alignment between employee skills and business goals to identify gaps and strategic opportunities.</use_case>
        <behavior>
            Analyzes alignment between employee skills and business goals
            including strategic objectives, business processes, and skills
            requirements. Provides comprehensive alignment analysis with
            gap identification and strategic recommendations for
            skills development and business goal achievement.
        </behavior>
        <when_to_use>
            Use when aligning workforce capabilities with business strategy,
            identifying skills gaps for strategic objectives, or making
            decisions about skills development and workforce planning.
        </when_to_use>
        <intent>
            To provide comprehensive skills-to-business alignment analysis
            enabling strategic workforce planning, skills gap identification,
            and alignment of capabilities with organizational objectives.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Analysis</category>
        <args>
            - business_goals: Description of business goals and objectives (required)
            - business_strategy: Description of business strategy and approach (required)
            - business_processes: Description of key business processes (required)
            - skills_from_employees: Skills data from employees (required)
            - skills_gaps: Description of identified skills gaps (required)
        </args>
        <returns>
            Dictionary with skills-to-business alignment analysis including
            alignment assessment, gap identification, strategic opportunities,
            and recommendations for workforce development.
        </returns>
        <raises>
            - ValueError: If required parameters are not specified or invalid
            - AnalysisError: If skills alignment analysis fails
        </raises>
        <schema_constraints>
            - All required parameters must be non-empty strings
            - Parameters should contain relevant and comprehensive information
        </schema_constraints>
    </tool>
    """,
    
    "analyze_skills_transferability": """
    <tool>
        <name>analyze_skills_transferability</name>
        <use_case>Analyze skills transferability between current roles and target roles for career development and internal mobility.</use_case>
        <behavior>
            Analyzes skills transferability between current roles and target
            roles including skill mapping, transferability factors, and
            development pathways. Provides comprehensive analysis of
            skill portability and career development opportunities.
        </behavior>
        <when_to_use>
            Use when planning career development, analyzing internal mobility
            opportunities, or making decisions about skills development
            and career progression pathways.
        </when_to_use>
        <intent>
            To provide comprehensive skills transferability analysis enabling
            career development planning, internal mobility assessment,
            and skills-based career progression strategies.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Analysis</category>
        <args>
            - current_skills: Description of current skills and competencies (required)
            - target_roles: Description of target roles and requirements (required)
            - skill_gaps: Description of identified skill gaps (required)
            - transferability_factors: Factors affecting skills transferability (required)
        </args>
        <returns>
            Dictionary with skills transferability analysis including
            transferability assessment, skill mapping, development pathways,
            and recommendations for career progression.
        </returns>
        <raises>
            - ValueError: If required parameters are not specified or invalid
            - AnalysisError: If skills transferability analysis fails
        </raises>
        <schema_constraints>
            - All required parameters must be non-empty strings
            - Parameters should contain relevant and comprehensive information
        </schema_constraints>
    </tool>
    """
}
