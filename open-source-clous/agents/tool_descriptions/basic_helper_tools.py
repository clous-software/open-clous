"""
Tool descriptions for basic helper tools.

These tools provide fundamental planning, specification, and review capabilities
that support the core workflow of agents in the HR platform.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
BASIC_HELPER_TOOLS_DESCRIPTIONS = {
    "define_workflow_goals": """
    <tool>
        <name>define_workflow_goals</name>
        <use_case>Create a detailed plan for a given task or set of tasks with identified steps, dependencies, and risks.</use_case>
        <behavior>
            Processes the provided steps, dependencies, and risks to generate a structured plan
            with a unique identifier and timestamp. The tool organizes complex workflows into
            manageable components and provides a foundation for task execution and monitoring.
        </behavior>
        <when_to_use>
            Use when needing to organize complex tasks, project workflows, or multi-step processes
            with clear dependencies and potential risk factors. Essential for breaking down
            large initiatives into actionable steps and identifying potential obstacles before execution.
        </when_to_use>
        <intent>
            To provide a structured approach to task management and planning that helps
            organize work and identify potential obstacles. This tool enables systematic
            workflow design and risk mitigation in HR processes.
        </intent>
        <side_effects>None. This tool only returns data without modifying any system state.</side_effects>
        <category>Planning</category>
        <args>
            - steps_goals: List of detailed steps required to complete the plan (required)
            - dependencies: List of external dependencies or prerequisites for the plan (optional)
            - risks: List of potential risks or obstacles that might affect plan execution (optional)
        </args>
        <returns>
            JSON string containing the plan with steps, dependencies, risks, creation timestamp, and a unique plan ID.
            Each step includes completion status tracking for workflow monitoring.
        </returns>
        <raises>
            Returns error details in JSON format if plan creation fails due to invalid input or processing errors.
        </raises>
        <schema_constraints>
            - steps_goals: non-empty list of strings describing actionable steps
            - dependencies: list of strings describing external requirements
            - risks: list of strings describing potential obstacles
        </schema_constraints>
    </tool>
    """,
    
    "define_ideal_output_spec": """
    <tool>
        <name>define_ideal_output_spec</name>
        <use_case>Define clear specifications for goals with requirements, constraints, and success criteria.</use_case>
        <behavior>
            Processes the provided goal details to create a structured specification
            with requirements, constraints, and success metrics. The tool normalizes input
            formats and creates comprehensive goal definitions that serve as reference points
            for planning, execution, and evaluation of HR initiatives.
        </behavior>
        <when_to_use>
            Use when needing to formalize project goals, product requirements, or objectives
            with clear parameters for success and implementation guidelines. Critical for
            establishing measurable outcomes and ensuring alignment across stakeholders.
        </when_to_use>
        <intent>
            To create well-defined goal specifications that serve as reference points
            for planning, execution, and evaluation of initiatives. This tool ensures
            clarity and measurability in HR project outcomes.
        </intent>
        <side_effects>None. This tool only returns data without modifying any system state.</side_effects>
        <category>Planning</category>
        <args>
            - goal: The main goal or objective to specify (required)
            - requirements: List of specific requirements that must be met (required)
            - constraints: List of limitations or boundaries for implementation (optional)
            - success_criteria: List of criteria to determine if the goal is achieved (required)
        </args>
        <returns>
            JSON string containing the goal specification with requirements, constraints,
            success criteria, and related metadata. Includes normalized formatting and
            structured data for easy consumption by downstream processes.
        </returns>
        <raises>
            Returns error details in JSON format if specification creation fails due to
            invalid input format or processing errors.
        </raises>
        <schema_constraints>
            - goal: non-empty string describing the primary objective
            - requirements: non-empty list of strings or bullet-pointed text
            - constraints: list of strings or bullet-pointed text describing limitations
            - success_criteria: non-empty list of strings or bullet-pointed text defining success metrics
        </schema_constraints>
    </tool>
    """,
    
    "review_output": """
    <tool>
        <name>review_output</name>
        <use_case>Provide detailed reviews and critiques of content with structured feedback and suggestions.</use_case>
        <behavior>
            Analyzes the provided content against specified criteria to generate a comprehensive
            review with feedback, errors, suggestions, and overall quality assessment. Uses AI
            to provide expert-level evaluation across multiple dimensions including accuracy,
            completeness, clarity, and alignment with organizational standards.
        </behavior>
        <when_to_use>
            Use when needing expert evaluation of written content, code, designs, or other
            deliverables with specific improvement suggestions. Essential for quality assurance
            in HR documentation, policy reviews, and strategic planning outputs.
        </when_to_use>
        <intent>
            To facilitate quality improvement through structured critique and actionable feedback
            that identifies both strengths and areas for enhancement. This tool ensures high
            standards in HR deliverables and continuous improvement processes.
        </intent>
        <side_effects>None. This tool analyzes content and returns review data without modifying any system state.</side_effects>
        <category>Evaluation</category>
        <args>
            - content: The material to review (text, code, design specification, etc.) (required)
            - criteria: Optional specific criteria to evaluate against (optional)
            - reviewer: Optional identifier for who is performing the review (optional)
            - deadline: Optional deadline for when the review is needed (optional)
            - verbosity: Optional level of detail for the review (optional)
            - tags: Optional list of categorization tags for the review (optional)
            - format: Optional output format specification (optional)
            - include_examples: Optional flag to include example improvements (optional, default: False)
        </args>
        <returns>
            JSON string containing the review with feedback points, identified errors,
            improvement suggestions, quality rating, and metadata. Includes structured
            analysis across multiple quality dimensions with actionable recommendations.
        </returns>
        <raises>
            Returns error details in JSON format if review process fails due to content
            processing errors or AI service unavailability.
        </raises>
        <schema_constraints>
            - content: non-empty string containing the material to be reviewed
            - criteria: optional string specifying evaluation criteria
            - reviewer: optional string identifying the reviewer
            - deadline: optional string in date/time format
            - tags: optional list of strings for categorization
            - include_examples: boolean flag for example inclusion
        </schema_constraints>
    </tool>
    """
}
