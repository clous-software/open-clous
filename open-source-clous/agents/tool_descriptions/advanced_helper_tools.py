"""
Tool descriptions for advanced helper tools.

These tools provide sophisticated planning, analysis, and decision-making
capabilities for complex organizational challenges.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
ADVANCED_HELPER_TOOLS_DESCRIPTIONS = {
    "define_hypotheses": """
    <tool>
        <name>define_hypotheses</name>
        <use_case>Define and structure hypotheses for complex problems, enabling systematic testing and validation of assumptions.</use_case>
        <behavior>
            Creates structured hypotheses for complex problems with clear assumptions,
            testable predictions, and evidence requirements. Provides systematic
            framework for hypothesis-driven problem solving with confidence levels
            and testing methodologies for validation.
        </behavior>
        <when_to_use>
            Use when approaching complex problems that require systematic analysis,
            when testing assumptions about organizational challenges, or when
            developing structured approaches to problem-solving and decision-making.
        </when_to_use>
        <intent>
            To provide structured hypothesis development capabilities enabling
            systematic problem analysis, assumption testing, and evidence-based
            decision making for complex organizational challenges.
        </intent>
        <side_effects>None. This is a planning and analysis operation.</side_effects>
        <category>Advanced Planning</category>
        <args>
            - problem_statement: Clear statement of the problem to analyze (required)
            - domain: Domain or area of focus for the hypothesis (optional, default: None)
            - assumptions: List of initial assumptions to consider (optional, default: None)
            - confidence_level: Confidence level for the hypothesis (optional, default: 0.7)
            - priority: Priority level for the hypothesis (optional, default: "medium")
            - testing_method: Method for testing the hypothesis (optional, default: None)
            - timeline: Timeline for hypothesis testing (optional, default: None)
        </args>
        <returns>
            Dictionary with structured hypothesis including assumptions,
            testable predictions, evidence requirements, confidence levels,
            and testing methodology for systematic problem analysis.
        </returns>
        <raises>
            - ValueError: If problem_statement is not specified or invalid
            - HypothesisError: If hypothesis definition fails
        </raises>
        <schema_constraints>
            - problem_statement must be a non-empty string
            - confidence_level must be between 0.0 and 1.0
            - priority must be one of: low, medium, high
            - timeline must be a valid time period string if provided
        </schema_constraints>
    </tool>
    """,
    
    "define_risks_identification": """
    <tool>
        <name>define_risks_identification</name>
        <use_case>Identify and analyze risks for projects or initiatives with comprehensive risk assessment and mitigation strategies.</use_case>
        <behavior>
            Identifies and analyzes risks for projects or initiatives with comprehensive
            risk assessment including probability, impact, and mitigation strategies.
            Provides structured risk analysis with risk matrix, stakeholder involvement,
            and timeline considerations for effective risk management.
        </behavior>
        <when_to_use>
            Use when planning projects or initiatives, conducting risk assessments,
            developing risk mitigation strategies, or preparing for potential
            challenges and obstacles in organizational activities.
        </when_to_use>
        <intent>
            To provide comprehensive risk identification capabilities enabling
            proactive risk management, mitigation planning, and informed
            decision making for projects and organizational initiatives.
        </intent>
        <side_effects>None. This is a planning and analysis operation.</side_effects>
        <category>Advanced Planning</category>
        <args>
            - project_or_initiative: Description of the project or initiative (required)
            - timeframe: Timeframe for risk analysis (optional, default: None)
            - stakeholders: List of stakeholders to consider (optional, default: None)
            - risk_categories: Categories of risks to analyze (optional, default: None)
            - owner: Owner or responsible party for risk management (optional, default: None)
        </args>
        <returns>
            Dictionary with comprehensive risk analysis including identified
            risks, mitigation strategies, risk matrix, overall risk level,
            and stakeholder considerations for risk management.
        </returns>
        <raises>
            - ValueError: If project_or_initiative is not specified or invalid
            - RiskAnalysisError: If risk identification fails
        </raises>
        <schema_constraints>
            - project_or_initiative must be a non-empty string
            - timeframe must be a valid time period string if provided
            - stakeholders must be a list of valid stakeholder names if provided
            - risk_categories must be a list of valid risk categories if provided
        </schema_constraints>
    </tool>
    """,
    
    "define_decision_reflection": """
    <tool>
        <name>define_decision_reflection</name>
        <use_case>Conduct structured reflection on past decisions to extract lessons learned and improve future decision-making.</use_case>
        <behavior>
            Conducts structured reflection on past decisions with comprehensive
            analysis of outcomes, lessons learned, and improvement opportunities.
            Provides systematic framework for decision evaluation including
            impact assessment and stakeholder considerations.
        </behavior>
        <when_to_use>
            Use when reflecting on past decisions, conducting post-decision
            analysis, extracting lessons learned, or improving decision-making
            processes based on historical outcomes and experiences.
        </when_to_use>
        <intent>
            To provide structured decision reflection capabilities enabling
            learning from past decisions, process improvement, and enhanced
            decision-making effectiveness for future organizational challenges.
        </intent>
        <side_effects>None. This is a reflection and analysis operation.</side_effects>
        <category>Advanced Planning</category>
        <args>
            - decision_description: Description of the decision to reflect upon (required)
            - decision_date: Date when the decision was made (optional, default: None)
            - context: Context and circumstances of the decision (optional, default: None)
            - stakeholders_affected: List of stakeholders affected by the decision (optional, default: None)
            - outcomes_observed: List of observed outcomes from the decision (optional, default: None)
        </args>
        <returns>
            Dictionary with decision reflection including lessons learned,
            what went well, improvement opportunities, impact assessment,
            and insights for future decision-making.
        </returns>
        <raises>
            - ValueError: If decision_description is not specified or invalid
            - ReflectionError: If decision reflection fails
        </raises>
        <schema_constraints>
            - decision_description must be a non-empty string
            - decision_date must be a valid ISO date string if provided
            - stakeholders_affected must be a list of valid stakeholder names if provided
            - outcomes_observed must be a list of valid outcome descriptions if provided
        </schema_constraints>
    </tool>
    """,
    
    "define_problem_decomposition": """
    <tool>
        <name>define_problem_decomposition</name>
        <use_case>Break down complex problems into manageable sub-problems with dependencies and complexity assessment.</use_case>
        <behavior>
            Breaks down complex problems into manageable sub-problems with clear
            dependencies, complexity assessment, and priority ordering. Provides
            structured approach to problem decomposition with resource requirements
            and systematic problem-solving framework.
        </behavior>
        <when_to_use>
            Use when facing complex problems that need to be broken down into
            manageable components, when planning systematic problem-solving
            approaches, or when organizing complex initiatives into
            structured work streams.
        </when_to_use>
        <intent>
            To provide systematic problem decomposition capabilities enabling
            structured problem-solving, manageable task organization, and
            effective approach to complex organizational challenges.
        </intent>
        <side_effects>None. This is a planning and analysis operation.</side_effects>
        <category>Advanced Planning</category>
        <args>
            - complex_problem: Description of the complex problem to decompose (required)
            - priority_order: Preferred order for addressing sub-problems (optional, default: None)
            - resource_requirements: Resource requirements for problem solving (optional, default: None)
            - complexity_level: Complexity level of the overall problem (optional, default: None)
        </args>
        <returns>
            Dictionary with problem decomposition including main problem,
            sub-problems, dependencies, complexity assessment, and
            systematic approach for problem resolution.
        </returns>
        <raises>
            - ValueError: If complex_problem is not specified or invalid
            - DecompositionError: If problem decomposition fails
        </raises>
        <schema_constraints>
            - complex_problem must be a non-empty string
            - priority_order must be a list of valid sub-problem identifiers if provided
            - resource_requirements must be a valid resource description if provided
            - complexity_level must be one of: low, medium, high, very_high
        </schema_constraints>
    </tool>
    """,
    
    "define_potential_scenarios": """
    <tool>
        <name>define_potential_scenarios</name>
        <use_case>Define potential scenarios and outcomes for strategic planning and decision-making under uncertainty.</use_case>
        <behavior>
            Defines potential scenarios and outcomes for strategic planning with
            probability assessments, impact analysis, and key drivers identification.
            Provides comprehensive scenario planning framework with confidence
            levels and timeline considerations for strategic decision-making.
        </behavior>
        <when_to_use>
            Use when conducting strategic planning, preparing for uncertain
            futures, developing contingency plans, or making decisions
            under conditions of uncertainty and multiple possible outcomes.
        </when_to_use>
        <intent>
            To provide comprehensive scenario planning capabilities enabling
            strategic preparation, contingency planning, and informed
            decision-making under conditions of uncertainty and complexity.
        </intent>
        <side_effects>None. This is a planning and analysis operation.</side_effects>
        <category>Advanced Planning</category>
        <args>
            - base_situation: Description of the base situation or current state (required)
            - timeframe: Timeframe for scenario analysis (optional, default: None)
            - key_variables: List of key variables to consider (optional, default: None)
            - confidence_levels: Confidence levels for different scenarios (optional, default: None)
            - scenario_count: Number of scenarios to generate (optional, default: 3)
        </args>
        <returns>
            Dictionary with scenario planning including potential scenarios,
            probability assessments, impact analysis, key drivers,
            and strategic insights for decision-making.
        </returns>
        <raises>
            - ValueError: If base_situation is not specified or invalid
            - ScenarioError: If scenario definition fails
        </raises>
        <schema_constraints>
            - base_situation must be a non-empty string
            - timeframe must be a valid time period string if provided
            - key_variables must be a list of valid variable names if provided
            - confidence_levels must be a dictionary with valid confidence values if provided
            - scenario_count must be a positive integer
        </schema_constraints>
    </tool>
    """,
    
    "define_options_evaluation": """
    <tool>
        <name>define_options_evaluation</name>
        <use_case>Evaluate multiple options against defined criteria with structured scoring and recommendation framework.</use_case>
        <behavior>
            Evaluates multiple options against defined criteria with structured
            scoring matrix, evaluation framework, and recommendation generation.
            Provides comprehensive option analysis with decision-maker context,
            deadline considerations, and constraint analysis.
        </behavior>
        <when_to_use>
            Use when evaluating multiple options for decisions, conducting
            structured option analysis, or making choices between
            different approaches or solutions for organizational challenges.
        </when_to_use>
        <intent>
            To provide structured option evaluation capabilities enabling
            systematic decision-making, criteria-based evaluation,
            and evidence-based choice between multiple alternatives.
        </intent>
        <side_effects>None. This is a planning and analysis operation.</side_effects>
        <category>Advanced Planning</category>
        <args>
            - decision_context: Context and description of the decision (required)
            - options: List of options to evaluate (required)
            - evaluation_criteria: Criteria for evaluating options (optional, default: None)
            - decision_maker: Person or group making the decision (optional, default: None)
            - deadline: Deadline for the decision (optional, default: None)
            - constraints: List of constraints to consider (optional, default: None)
        </args>
        <returns>
            Dictionary with option evaluation including scoring matrix,
            evaluation criteria, recommendation, and comprehensive
            analysis for informed decision-making.
        </returns>
        <raises>
            - ValueError: If decision_context or options are not specified or invalid
            - EvaluationError: If option evaluation fails
        </raises>
        <schema_constraints>
            - decision_context must be a non-empty string
            - options must be a non-empty list of valid option descriptions
            - evaluation_criteria must be a list of valid criteria if provided
            - deadline must be a valid ISO date string if provided
            - constraints must be a list of valid constraint descriptions if provided
        </schema_constraints>
    </tool>
    """,
    
    "define_justification_consideration": """
    <tool>
        <name>define_justification_consideration</name>
        <use_case>Develop comprehensive justification for decisions or recommendations with evidence, assumptions, and counter-arguments.</use_case>
        <behavior>
            Develops comprehensive justification for decisions or recommendations
            with evidence analysis, assumption identification, and counter-argument
            consideration. Provides structured reasoning framework with confidence
            levels and stakeholder considerations for decision support.
        </behavior>
        <when_to_use>
            Use when developing justification for decisions, creating
            recommendation support, or preparing comprehensive
            reasoning for organizational choices and strategic directions.
        </when_to_use>
        <intent>
            To provide comprehensive justification development capabilities
            enabling evidence-based reasoning, assumption validation,
            and structured support for organizational decisions and recommendations.
        </intent>
        <side_effects>None. This is a planning and analysis operation.</side_effects>
        <category>Advanced Planning</category>
        <args>
            - decision_or_recommendation: Description of the decision or recommendation (required)
            - decision_type: Type of decision being justified (optional, default: None)
            - stakeholders: List of stakeholders to consider (optional, default: None)
            - risk_assessment: Risk assessment for the decision (optional, default: None)
            - override_reason: Reason for overriding standard considerations (optional, default: None)
        </args>
        <returns>
            Dictionary with comprehensive justification including reasoning,
            evidence, assumptions, counter-arguments, confidence levels,
            and stakeholder considerations for decision support.
        </returns>
        <raises>
            - ValueError: If decision_or_recommendation is not specified or invalid
            - JustificationError: If justification development fails
        </raises>
        <schema_constraints>
            - decision_or_recommendation must be a non-empty string
            - decision_type must be a valid decision type if provided
            - stakeholders must be a list of valid stakeholder names if provided
            - risk_assessment must be a valid risk description if provided
        </schema_constraints>
    </tool>
    """,
    
    "define_root_causes_diagnosis": """
    <tool>
        <name>define_root_causes_diagnosis</name>
        <use_case>Conduct systematic root cause analysis to identify underlying causes of problems and systemic issues.</use_case>
        <behavior>
            Conducts systematic root cause analysis to identify underlying causes
            of problems with symptom analysis, contributing factors, and systemic
            issue identification. Provides comprehensive diagnosis framework
            with severity assessment and timeline considerations.
        </behavior>
        <when_to_use>
            Use when diagnosing organizational problems, conducting root cause
            analysis, identifying systemic issues, or developing
            comprehensive understanding of problem origins and contributing factors.
        </when_to_use>
        <intent>
            To provide systematic root cause analysis capabilities enabling
            deep problem understanding, systemic issue identification,
            and comprehensive diagnosis for effective problem resolution.
        </intent>
        <side_effects>None. This is a planning and analysis operation.</side_effects>
        <category>Advanced Planning</category>
        <args>
            - symptoms: List of symptoms or indicators of the problem (required)
            - affected_areas: List of areas affected by the problem (optional, default: None)
            - severity_level: Severity level of the problem (optional, default: None)
            - timeline: Timeline for the problem development (optional, default: None)
            - historical_context: Historical context and background (optional, default: None)
        </args>
        <returns>
            Dictionary with root cause analysis including symptoms,
            root causes, contributing factors, systemic issues,
            and recommendations for problem resolution.
        </returns>
        <raises>
            - ValueError: If symptoms are not specified or invalid
            - DiagnosisError: If root cause analysis fails
        </raises>
        <schema_constraints>
            - symptoms must be a non-empty list of valid symptom descriptions
            - affected_areas must be a list of valid area names if provided
            - severity_level must be one of: low, medium, high, critical
            - timeline must be a valid time period string if provided
        </schema_constraints>
    </tool>
    """,
    
    "analyze_current_workflow": """
    <tool>
        <name>analyze_current_workflow</name>
        <use_case>Analyze current workflow processes and identify optimization opportunities for improved efficiency and effectiveness.</use_case>
        <behavior>
            Analyzes current workflow processes with comprehensive examination
            of process steps, efficiency metrics, and optimization opportunities.
            Provides detailed workflow analysis with reasoning effort
            and focus areas for systematic process improvement.
        </behavior>
        <when_to_use>
            Use when analyzing existing workflows, identifying process
            inefficiencies, or developing optimization strategies
            for current organizational processes and procedures.
        </when_to_use>
        <intent>
            To provide comprehensive workflow analysis capabilities enabling
            process optimization, efficiency improvement, and systematic
            workflow enhancement for organizational effectiveness.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Advanced Planning</category>
        <args>
            - analysis_focus: Specific focus area for workflow analysis (optional, default: None)
            - reasoning_effort: Level of reasoning effort for analysis (optional, default: "medium")
        </args>
        <returns>
            Dictionary with workflow analysis including process examination,
            efficiency metrics, optimization opportunities, and
            recommendations for workflow improvement.
        </returns>
        <raises>
            - WorkflowAnalysisError: If workflow analysis fails
            - SystemError: If workflow data cannot be accessed
        </raises>
        <schema_constraints>
            - analysis_focus must be a valid focus area if provided
            - reasoning_effort must be one of: low, medium, high
        </schema_constraints>
    </tool>
    """
}
