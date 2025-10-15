"""
Tool descriptions for methods and utility tools.

These tools provide utility functions for workflow management, file system
operations, and platform functionality.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
METHODS_TOOL_DESCRIPTIONS = {
    "remember_workflow_goals": """
    <tool>
        <name>remember_workflow_goals</name>
        <use_case>Retrieve and display previously defined workflow goals and objectives for ongoing work and project management.</use_case>
        <behavior>
            Retrieves and displays previously defined workflow goals and objectives
            from the system memory. Provides access to stored workflow information
            including goals, objectives, and progress tracking for ongoing
            work and project management activities.
        </behavior>
        <when_to_use>
            Use when accessing previously defined workflow goals, reviewing
            project objectives, or continuing work on established
            workflows and project management activities.
        </when_to_use>
        <intent>
            To provide access to stored workflow goals and objectives enabling
            continuity in work, project management, and ongoing workflow
            execution and tracking.
        </intent>
        <side_effects>None. This is a read-only memory retrieval operation.</side_effects>
        <category>Methods</category>
        <args>
            None
        </args>
        <returns>
            Dictionary with retrieved workflow goals including objectives,
            progress information, and workflow context for ongoing
            work and project management.
        </returns>
        <raises>
            - MemoryRetrievalError: If workflow goals cannot be retrieved
            - SystemError: If system memory access fails
        </raises>
        <schema_constraints>
            None
        </schema_constraints>
    </tool>
    """,
    
    "mark_workflow_goal_done": """
    <tool>
        <name>mark_workflow_goal_done</name>
        <use_case>Mark workflow goals as completed or update their status for progress tracking and workflow management.</use_case>
        <behavior>
            Marks workflow goals as completed or updates their status for
            progress tracking and workflow management. Provides ability to
            update goal status, track completion, and maintain workflow
            progress information for ongoing project management.
        </behavior>
        <when_to_use>
            Use when completing workflow goals, updating progress status,
            or tracking achievement of objectives in ongoing
            workflows and project management activities.
        </when_to_use>
        <intent>
            To provide workflow goal status management capabilities enabling
            progress tracking, completion marking, and ongoing
            workflow management and monitoring.
        </intent>
        <side_effects>Updates workflow goal status in system memory.</side_effects>
        <category>Methods</category>
        <args>
            - goal_text: Text description of the goal to mark (required)
            - done: Whether the goal is completed (optional, default: True)
        </args>
        <returns>
            Dictionary with updated workflow goal status including
            completion information, progress updates, and
            workflow management confirmation.
        </returns>
        <raises>
            - ValueError: If goal_text is not specified or invalid
            - MemoryUpdateError: If workflow goal status cannot be updated
        </raises>
        <schema_constraints>
            - goal_text must be a non-empty string
            - done must be a boolean value
        </schema_constraints>
    </tool>
    """,
    
    "remember_generated_canvas_content": """
    <tool>
        <name>remember_generated_canvas_content</name>
        <use_case>Retrieve and display previously generated canvas content for reference and continued work.</use_case>
        <behavior>
            Retrieves and displays previously generated canvas content from
            the system memory. Provides access to stored canvas information
            including generated content, visualizations, and analysis
            results for reference and continued work.
        </behavior>
        <when_to_use>
            Use when accessing previously generated canvas content, reviewing
            past visualizations, or continuing work on established
            canvas-based analysis and presentation activities.
        </when_to_use>
        <intent>
            To provide access to stored canvas content enabling continuity
            in visual analysis, presentation work, and ongoing
            canvas-based project activities.
        </intent>
        <side_effects>None. This is a read-only memory retrieval operation.</side_effects>
        <category>Methods</category>
        <args>
            - max_results: Maximum number of canvas results to retrieve (optional, default: 10)
        </args>
        <returns>
            Dictionary with retrieved canvas content including
            generated visualizations, analysis results, and
            canvas information for reference and continued work.
        </returns>
        <raises>
            - MemoryRetrievalError: If canvas content cannot be retrieved
            - SystemError: If system memory access fails
        </raises>
        <schema_constraints>
            - max_results must be a positive integer if provided
        </schema_constraints>
    </tool>
    """
}
