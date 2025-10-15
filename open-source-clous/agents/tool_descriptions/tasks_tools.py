"""
Tool descriptions for task management tools.

These tools provide capabilities for creating, scheduling, and managing
automatic tasks and reminders.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
TASKS_TOOLS_DESCRIPTIONS = {
    "create_automatic_task_schedule": """
    <tool>
        <name>create_automatic_task_schedule</name>
        <use_case>Create and schedule automatic tasks with reminders, notifications, and recurring schedules for workflow management.</use_case>
        <behavior>
            Creates and schedules automatic tasks with reminders, notifications,
            and recurring schedules for workflow management. Supports various
            reminder types, frequency settings, and priority levels
            for comprehensive task automation and management.
        </behavior>
        <when_to_use>
            Use when creating automated workflows, scheduling recurring tasks,
            setting up reminders, or implementing task automation
            for organizational processes and workflow management.
        </when_to_use>
        <intent>
            To provide comprehensive task automation capabilities enabling
            workflow automation, reminder management, and systematic
            task scheduling for organizational efficiency.
        </intent>
        <side_effects>Creates new tasks and schedules in the task management system.</side_effects>
        <category>Task Management</category>
        <args>
            - task_creations: List of task creation items with details and scheduling (required)
        </args>
        <returns>
            Dictionary with task creation results including scheduled tasks,
            reminder configurations, automation settings, and
            comprehensive task management confirmation.
        </returns>
        <raises>
            - ValueError: If task_creations is not specified or invalid
            - TaskCreationError: If task creation fails
            - SchedulingError: If task scheduling fails
        </raises>
        <schema_constraints>
            - task_creations must be a non-empty list of valid task creation items
            - Each task creation item must have valid details and scheduling information
        </schema_constraints>
    </tool>
    """
}
