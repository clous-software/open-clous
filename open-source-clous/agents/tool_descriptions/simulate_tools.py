"""
Tool descriptions for simulation analysis tools.

These tools provide comprehensive simulation capabilities for modeling
organizational scenarios, predicting outcomes, and analyzing potential impacts.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
SIMULATE_TOOL_DESCRIPTIONS = {
    "simulate_analysis": """
    <tool>
        <name>simulate_analysis</name>
        <use_case>Provides AI-powered simulation capabilities for various organizational scenarios including workforce planning, process optimization, and impact analysis.</use_case>
        <behavior>
            Analyzes organizational data using AI to simulate various scenarios and predict potential outcomes.
            Supports multiple simulation types with specific configurations and output formats.
            Uses advanced AI models to generate realistic projections and impact assessments.
            Processes complex organizational data to deliver detailed simulation results across
            multiple HR and organizational domains with comprehensive scenario analysis.
        </behavior>
        <when_to_use>
            Use when needing AI-powered simulation for organizational planning, scenario analysis,
            or impact assessment of various HR and organizational changes. Supports multiple simulation types
            covering workforce planning, process optimization, and strategic scenario modeling.
            Essential for strategic planning, risk assessment, and organizational transformation planning.
        </when_to_use>
        <intent>
            To provide a unified interface for AI-powered organizational simulation that covers
            the full spectrum of scenario modeling and impact analysis needs. This tool enables systematic
            simulation across multiple organizational domains with consistent methodology and detailed projections.
        </intent>
        <side_effects>None. This tool only returns data without modifying any system state.</side_effects>
        <category>Simulation</category>
        <args>
            - simulation_type: Type of simulation to perform (workforce_planning, process_optimization, cost_analysis, performance_modeling, etc.) (required)
            - data: Dictionary containing the main data for the simulation (required)
            - timeline: Optional timeline for the simulation period
            - affected_teams: Optional list of teams affected by the simulation
            - cost_savings: Optional assessment of potential cost savings
            - reduction_percentage: Optional percentage reduction to model
            - target_departments: Optional list of target departments for simulation
            - eligible_cohorts: Optional list of eligible cohorts for analysis
            - scenario_parameters: Optional dictionary of scenario-specific parameters
            - success_metrics: Optional list of metrics to measure simulation success
            - risk_factors: Optional list of risk factors to consider in simulation
            - implementation_timeline: Optional timeline for implementing simulated changes
        </args>
        <returns>
            JSON string containing AI-generated simulation results, projections, and impact assessments
            specific to the requested simulation type. Includes detailed scenario analysis,
            outcome predictions, and strategic recommendations with supporting rationale.
        </returns>
        <raises>
            Returns error details in JSON format if simulation fails or simulation type is not supported.
            Handles invalid simulation types and insufficient data scenarios gracefully.
        </raises>
        <schema_constraints>
            - simulation_type: Must be one of the supported simulation types
            - data: non-empty dictionary containing simulation data
            - timeline: optional string describing simulation timeframe
            - affected_teams: optional list of strings identifying affected teams
            - cost_savings: optional string describing cost savings assessment
            - reduction_percentage: optional float between 0.0 and 100.0
            - target_departments: optional list of strings identifying target departments
            - eligible_cohorts: optional list of strings identifying eligible cohorts
            - scenario_parameters: optional dictionary containing scenario-specific parameters
            - success_metrics: optional list of strings defining success metrics
            - risk_factors: optional list of strings identifying risk factors
            - implementation_timeline: optional string describing implementation timeline
        </schema_constraints>
    </tool>
    """
}
