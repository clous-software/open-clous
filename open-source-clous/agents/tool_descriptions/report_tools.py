"""
Tool descriptions for report generation tools.

These tools provide capabilities for creating comprehensive reports
and analytics across organizational data.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
REPORT_TOOLS_DESCRIPTIONS = {
    "create_reports": """
    <tool>
        <name>create_reports</name>
        <use_case>Create comprehensive reports across multiple organizational domains including jobs, performance, learning, and business metrics.</use_case>
        <behavior>
            Creates comprehensive reports across multiple organizational domains
            including jobs, performance, learning, and business metrics.
            Supports various report types, metric filtering, and
            comprehensive analytics for data-driven decision making.
        </behavior>
        <when_to_use>
            Use when generating organizational reports, conducting analytics,
            creating performance summaries, or producing comprehensive
            data analysis for business intelligence and decision making.
        </when_to_use>
        <intent>
            To provide comprehensive report generation capabilities enabling
            data analysis, business intelligence, and systematic
            reporting across organizational domains and metrics.
        </intent>
        <side_effects>Creates new reports and analytics in the reporting system.</side_effects>
        <category>Reporting</category>
        <args>
            - report_generations: List of report generation items with type and parameters (required)
        </args>
        <returns>
            Dictionary with report generation results including
            created reports, analytics data, metric summaries,
            and comprehensive reporting confirmation.
        </returns>
        <raises>
            - ValueError: If report_generations is not specified or invalid
            - ReportGenerationError: If report creation fails
            - DataAnalysisError: If data analysis fails
        </raises>
        <schema_constraints>
            - report_generations must be a non-empty list of valid report generation items
            - Each report generation item must have valid type and parameters
        </schema_constraints>
    </tool>
    """,
    
    "create_skills_reports": """
    <tool>
        <name>create_skills_reports</name>
        <use_case>Create specialized reports focused on skills analysis, competency assessment, and workforce development.</use_case>
        <behavior>
            Creates specialized reports focused on skills analysis, competency
            assessment, and workforce development. Provides comprehensive
            skills reporting with gap analysis, competency mapping,
            and development recommendations for workforce planning.
        </behavior>
        <when_to_use>
            Use when generating skills-focused reports, conducting competency
            analysis, or creating workforce development summaries
            for skills planning and talent development initiatives.
        </when_to_use>
        <intent>
            To provide specialized skills reporting capabilities enabling
            competency analysis, skills gap identification, and
            comprehensive workforce development reporting.
        </intent>
        <side_effects>Creates new skills reports and analytics in the reporting system.</side_effects>
        <category>Reporting</category>
        <args>
            - report_generations: List of skills report generation items with parameters (required)
        </args>
        <returns>
            Dictionary with skills report generation results including
            competency analysis, skills gap reports, development
            recommendations, and comprehensive skills reporting confirmation.
        </returns>
        <raises>
            - ValueError: If report_generations is not specified or invalid
            - SkillsReportError: If skills report creation fails
            - CompetencyAnalysisError: If competency analysis fails
        </raises>
        <schema_constraints>
            - report_generations must be a non-empty list of valid skills report generation items
            - Each report generation item must have valid skills-focused parameters
        </schema_constraints>
    </tool>
    """
}
