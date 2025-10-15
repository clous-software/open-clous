"""
Tool descriptions for recommendation analysis tools.

These tools provide AI-powered recommendations for organizational improvements,
strategic initiatives, and HR optimization across multiple domains.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
RECOMMEND_TOOL_DESCRIPTIONS = {
    "recommend_analysis": """
    <tool>
        <name>recommend_analysis</name>
        <use_case>Provides AI-powered recommendations for various organizational analysis types including skill development, team restructuring, change management, and more.</use_case>
        <behavior>
            Analyzes organizational data using AI to provide comprehensive recommendations for improvement.
            Supports multiple analysis types with specific configurations and output formats.
            Uses advanced AI models to generate actionable insights and strategic recommendations.
            Processes complex organizational data to deliver tailored recommendations across
            multiple HR and organizational domains with detailed implementation guidance.
        </behavior>
        <when_to_use>
            Use when needing AI-powered recommendations for organizational improvement, strategic planning,
            or analysis of various HR and organizational challenges. Supports 10 different analysis types
            covering people development, organizational design, and strategic initiatives.
            Essential for strategic planning, process optimization, and organizational transformation.
        </when_to_use>
        <intent>
            To provide a unified interface for AI-powered organizational recommendations that covers
            the full spectrum of HR and organizational analysis needs. This tool enables systematic
            recommendation generation across multiple organizational domains with consistent methodology.
        </intent>
        <side_effects>None. This tool only returns data without modifying any system state.</side_effects>
        <category>Recommendation</category>
        <args>
            - analysis_type: Type of analysis to perform (skill_development, mentorship_pairings, team_restructuring, role_consolidation, change_management, workflow_automation, internal_candidate_prioritization, cross_training, alumni_network_activation, succession_pipeline_acceleration) (required)
            - data: Dictionary containing the main data for the analysis (required)
            - target_roles: Optional list of target roles for development/analysis
            - timeline: Optional timeline for implementation or development
            - success_metrics: Optional list of metrics to measure success
            - affected_teams: Optional list of teams affected by the recommendation
            - priority_level: Optional priority level for the recommendation
            - cost_savings: Optional assessment of potential cost savings
            - risk_assessment: Optional risk assessment data
            - learning_resources: Optional list of available learning resources
            - support_resources: Optional list of support resources for implementation
            - critical_roles: Optional list of critical roles for succession/development
            - engagement_goals: Optional list of goals for engagement initiatives
            - technology_recommendations: Optional list of technology solutions to consider
        </args>
        <returns>
            JSON string containing AI-generated recommendations, analysis results, and actionable insights
            specific to the requested analysis type. Includes detailed implementation guidance,
            success metrics, and strategic recommendations with supporting rationale.
        </returns>
        <raises>
            Returns error details in JSON format if analysis fails or analysis type is not supported.
            Handles invalid analysis types and insufficient data scenarios gracefully.
        </raises>
        <schema_constraints>
            - analysis_type: Must be one of the supported analysis types
            - data: non-empty dictionary containing analysis data
            - target_roles: optional list of strings identifying target roles
            - timeline: optional string describing implementation timeline
            - success_metrics: optional list of strings defining success metrics
            - affected_teams: optional list of strings identifying affected teams
            - priority_level: optional string indicating recommendation priority
            - cost_savings: optional string describing cost savings assessment
            - risk_assessment: optional dictionary containing risk analysis data
            - learning_resources: optional list of strings identifying learning resources
            - support_resources: optional list of strings identifying support resources
            - critical_roles: optional list of strings identifying critical roles
            - engagement_goals: optional list of strings defining engagement goals
            - technology_recommendations: optional list of strings with technology suggestions
        </schema_constraints>
    </tool>
    """
}
