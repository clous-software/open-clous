"""
Tool descriptions for diagnostic analysis tools.

These tools provide comprehensive organizational diagnosis capabilities
for identifying systemic issues, patterns, and root causes in HR processes.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
DIAGNOSE_TOOL_DESCRIPTIONS = {
    "diagnose_analysis": """
    <tool>
        <name>diagnose_analysis</name>
        <use_case>Unified diagnostic analysis tool that can perform any type of organizational diagnosis including performance blockers, compensation equity gaps, promotion bottlenecks, hiring funnel leaks, onboarding failures, skill decay risk, succession gaps, knowledge transfer gaps, internal mobility obstacles, and external hire integration failures.</use_case>
        <behavior>
            Performs comprehensive diagnostic analysis based on the specified analysis type.
            Uses AI to analyze organizational data and identify systemic issues, patterns, and root causes.
            Provides actionable recommendations for improvement with detailed insights into organizational
            challenges and their underlying factors. Supports multiple analysis types with specialized
            processing for each diagnostic category.
        </behavior>
        <when_to_use>
            Use when you need to diagnose organizational issues, identify systemic problems,
            analyze patterns in HR data, or understand root causes of organizational challenges.
            Essential for organizational health assessment, performance analysis, and strategic
            problem identification across all HR domains.
        </when_to_use>
        <intent>
            To provide a single, unified interface for all types of organizational diagnostic analysis,
            making it easier to identify and understand complex organizational issues. This tool
            enables systematic diagnosis across multiple HR dimensions with consistent methodology.
        </intent>
        <side_effects>None. This tool only returns data without modifying any system state.</side_effects>
        <category>Diagnosis</category>
        <args>
            - analysis_type: Type of diagnostic analysis to perform (performance_blockers, compensation_equity_gaps, promotion_bottlenecks, hiring_funnel_leaks, onboarding_failure_points, skill_decay_risk, succession_gaps, knowledge_transfer_gaps, internal_mobility_obstacles, external_hire_integration_failures) (required)
            - data: Dictionary containing the data to analyze (required)
            - timeline: Optional timeline of issues or analysis period
            - affected_teams: Optional list of teams affected by issues
            - severity_level: Optional severity level of issues
            - affected_roles: Optional list of roles affected by issues
            - confidence_level: Optional confidence level for analysis (0.0 to 1.0)
            - data_sources: Optional list of data sources used in analysis
            - compliance_risks: Optional list of compliance risks identified
            - bottleneck_severity: Optional severity of bottlenecks
            - affected_departments: Optional list of departments affected by issues
            - demographics: Optional list of demographic factors to analyze
            - success_probability: Optional probability of success (0.0 to 1.0)
            - impact_assessment: Optional assessment of impact
        </args>
        <returns>
            JSON string containing comprehensive diagnostic analysis results:
            
            SUCCESS (status: "success"):
            - "diagnosis_results": Array of identified issues with:
              * "issue_type": Category of the identified problem
              * "severity": Impact level (low, medium, high, critical)
              * "description": Detailed explanation of the issue
              * "affected_areas": Which parts of the organization are impacted
              * "evidence": Supporting data and metrics
            - "root_causes": Array of underlying causes with:
              * "cause_type": Category of root cause
              * "description": Detailed explanation of the cause
              * "contributing_factors": Supporting factors
              * "systemic_issues": Broader organizational problems
            - "impact_analysis": Object containing:
              * "business_impact": Effect on operations and performance
              * "financial_impact": Cost implications and risks
              * "timeline": How quickly issues need addressing
              * "stakeholder_impact": Who is affected and how
            - "recommendations": Array of actionable recommendations with:
              * "priority": Urgency level (immediate, short-term, long-term)
              * "action": Specific steps to take
              * "resources_needed": Required support and tools
              * "expected_outcome": Anticipated results
            - "next_steps": Array of immediate actions to take
            - "methodology": Analysis approach and data sources used
            - "confidence_level": Reliability score (0.0-1.0) for results
            - "limitations": Any constraints or assumptions in the analysis
            
            INSUFFICIENT DATA (status: "error"):
            - "error": "Insufficient data for analysis"
            - "error_type": "InsufficientDataError"
            - "error_details": "What data is missing and why it's needed"
            - "suggestion": "Gather additional data or use different analysis parameters"
            
            ANALYSIS FAILURE (status: "error"):
            - "error": "Analysis computation failed"
            - "error_type": "AnalysisError"
            - "error_details": "Technical reason for failure"
            - "suggestion": "Try with different parameters or contact support"
        </returns>
        <raises>
            Returns error details in JSON format if analysis fails due to invalid analysis type,
            insufficient data, or AI processing errors.
        </raises>
        <schema_constraints>
            - analysis_type: must be one of the supported analysis types
            - data: non-empty dictionary containing analysis data
            - timeline: optional string describing analysis timeframe
            - affected_teams: optional list of strings identifying affected teams
            - severity_level: optional string indicating issue severity
            - affected_roles: optional list of strings identifying affected roles
            - confidence_level: optional float between 0.0 and 1.0
            - data_sources: optional list of strings identifying data sources
            - compliance_risks: optional list of strings identifying compliance issues
            - bottleneck_severity: optional string indicating bottleneck severity
            - affected_departments: optional list of strings identifying affected departments
            - demographics: optional list of strings identifying demographic factors
            - success_probability: optional float between 0.0 and 1.0
            - impact_assessment: optional string describing impact assessment
        </schema_constraints>
    </tool>
    """
}
