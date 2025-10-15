"""
Tool descriptions for canvas and visualization tools.

These tools provide comprehensive canvas generation, visualization, and
interactive content creation capabilities.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
CANVAS_TOOL_DESCRIPTIONS = {
    "generate_canvas_analytics_chart": """
    <tool>
        <name>generate_canvas_analytics_chart</name>
        <use_case>Generate interactive analytics charts and visualizations for data analysis and presentation.</use_case>
        <behavior>
            Creates interactive analytics charts and visualizations based on AI-generated
            queries and data analysis requirements. Supports multiple chart types,
            data visualization formats, and interactive features for comprehensive
            data presentation and analysis.
        </behavior>
        <when_to_use>
            Use when creating data visualizations, generating analytics charts,
            presenting data insights, or developing interactive dashboards
            for data analysis and reporting purposes.
        </when_to_use>
        <intent>
            To provide comprehensive analytics visualization capabilities enabling
            data-driven insights presentation, interactive chart generation, and
            effective data communication through visual means.
        </intent>
        <side_effects>Creates new canvas block with analytics chart visualization.</side_effects>
        <category>Canvas Generation</category>
        <args>
            - ai_query: AI query describing the analytics chart requirements (required)
            - title: Title for the analytics chart (required)
            - max_charts: Maximum number of charts to generate (optional, default: 1)
            - purpose: Purpose and context for the chart (optional, default: None)
            - risks: Risk considerations for the analysis (optional, default: None)
            - anchors: Key data points or anchors for the chart (optional, default: None)
            - additional_context: Additional context for chart generation (optional, default: None)
            - assumptions: Assumptions underlying the analysis (optional, default: None)
            - priorities: Priority areas for the visualization (optional, default: None)
            - coverage: Coverage scope for the analysis (optional, default: None)
        </args>
        <returns>
            Dictionary with canvas generation results including chart visualization,
            interactive features, data insights, and comprehensive analytics
            presentation for data analysis and reporting.
        </returns>
        <raises>
            - ValueError: If ai_query or title are not specified
            - CanvasGenerationError: If analytics chart cannot be generated
            - DataAnalysisError: If underlying data analysis fails
        </raises>
        <schema_constraints>
            - ai_query must be a non-empty string describing chart requirements
            - title must be a non-empty string
            - max_charts must be a positive integer if provided
            - All optional parameters must be valid strings if provided
        </schema_constraints>
    </tool>
    """,
    
    "generate_canvas_document": """
    <tool>
        <name>generate_canvas_document</name>
        <use_case>Generate comprehensive documents and reports with structured content and professional formatting.</use_case>
        <behavior>
            Creates comprehensive documents and reports based on AI-generated
            queries and content requirements. Supports multiple document types,
            structured formatting, and professional presentation for various
            business and analytical purposes.
        </behavior>
        <when_to_use>
            Use when creating reports, generating documentation, developing
            business documents, or producing structured content for
            professional presentation and communication.
        </when_to_use>
        <intent>
            To provide comprehensive document generation capabilities enabling
            professional content creation, structured reporting, and effective
            business communication through well-formatted documents.
        </intent>
        <side_effects>Creates new canvas block with document content.</side_effects>
        <category>Canvas Generation</category>
        <args>
            - ai_query: AI query describing the document requirements (required)
            - title: Title for the document (required)
            - document_type: Type of document to generate (optional, default: None)
            - purpose: Purpose and context for the document (optional, default: None)
            - audience: Target audience for the document (optional, default: None)
            - assumptions: Assumptions underlying the content (optional, default: None)
            - additional_context: Additional context for document generation (optional, default: None)
            - risks: Risk considerations for the content (optional, default: None)
            - priorities: Priority areas for the document (optional, default: None)
        </args>
        <returns>
            Dictionary with document generation results including structured
            content, professional formatting, comprehensive information,
            and well-organized document presentation.
        </returns>
        <raises>
            - ValueError: If ai_query or title are not specified
            - CanvasGenerationError: If document cannot be generated
            - ContentGenerationError: If document content creation fails
        </raises>
        <schema_constraints>
            - ai_query must be a non-empty string describing document requirements
            - title must be a non-empty string
            - document_type must be a valid document type if provided
            - All optional parameters must be valid strings if provided
        </schema_constraints>
    </tool>
    """,
    
    "generate_canvas_diagram": """
    <tool>
        <name>generate_canvas_diagram</name>
        <use_case>Generate visual diagrams and flowcharts for process visualization and system representation.</use_case>
        <behavior>
            Creates visual diagrams and flowcharts based on AI-generated
            queries and visualization requirements. Supports multiple diagram
            types, process flows, and system representations for
            comprehensive visual communication and analysis.
        </behavior>
        <when_to_use>
            Use when creating process diagrams, generating flowcharts,
            visualizing system architectures, or developing visual
            representations for complex processes and relationships.
        </when_to_use>
        <intent>
            To provide comprehensive diagram generation capabilities enabling
            visual process representation, system visualization, and effective
            communication through structured diagrams and flowcharts.
        </intent>
        <side_effects>Creates new canvas block with diagram visualization.</side_effects>
        <category>Canvas Generation</category>
        <args>
            - ai_query: AI query describing the diagram requirements (required)
            - title: Title for the diagram (required)
            - dependencies: Dependencies and relationships to visualize (optional, default: None)
            - assumptions: Assumptions underlying the diagram (optional, default: None)
            - additional_context: Additional context for diagram generation (optional, default: None)
            - risks: Risk considerations for the visualization (optional, default: None)
            - priorities: Priority areas for the diagram (optional, default: None)
        </args>
        <returns>
            Dictionary with diagram generation results including visual
            representation, process flows, relationship mappings, and
            comprehensive diagram presentation for analysis and communication.
        </returns>
        <raises>
            - ValueError: If ai_query or title are not specified
            - CanvasGenerationError: If diagram cannot be generated
            - VisualizationError: If diagram visualization fails
        </raises>
        <schema_constraints>
            - ai_query must be a non-empty string describing diagram requirements
            - title must be a non-empty string
            - All optional parameters must be valid strings if provided
        </schema_constraints>
    </tool>
    """,
    
    "generate_canvas_objects_recommendations": """
    <tool>
        <name>generate_canvas_objects_recommendations</name>
        <use_case>Generate recommendations and suggestions for organizational objects based on analysis and criteria.</use_case>
        <behavior>
            Creates recommendations and suggestions for organizational objects
            including employees, candidates, jobs, and other entities based on
            AI analysis, specified criteria, and organizational requirements.
            Provides structured recommendations with reasoning and supporting data.
        </behavior>
        <when_to_use>
            Use when generating recommendations for hiring, employee development,
            job matching, or organizational decisions that require structured
            analysis and evidence-based suggestions.
        </when_to_use>
        <intent>
            To provide comprehensive recommendation generation capabilities enabling
            data-driven decision support, structured analysis, and evidence-based
            suggestions for organizational objects and decisions.
        </intent>
        <side_effects>Creates new canvas block with recommendations content.</side_effects>
        <category>Canvas Generation</category>
        <args>
            - ai_query: AI query describing the recommendation requirements (required)
            - title: Title for the recommendations (required)
            - target_object_type: Type of objects to recommend (required)
            - object_ids: List of specific object IDs to analyze (optional, default: None)
            - group_by: Grouping criteria for recommendations (optional, default: None)
            - max_items: Maximum number of recommendations to generate (optional, default: None)
            - criteria: Criteria for recommendation evaluation (optional, default: None)
            - objective: Objective for the recommendations (optional, default: None)
            - must_have: Must-have requirements for recommendations (optional, default: None)
            - nice_to_have: Nice-to-have requirements for recommendations (optional, default: None)
            - additional_context: Additional context for recommendations (optional, default: None)
            - risks: Risk considerations for recommendations (optional, default: None)
            - assumptions: Assumptions underlying the recommendations (optional, default: None)
            - priorities: Priority areas for recommendations (optional, default: None)
        </args>
        <returns>
            Dictionary with recommendation generation results including structured
            suggestions, supporting analysis, evidence-based reasoning, and
            comprehensive recommendation presentation for decision making.
        </returns>
        <raises>
            - ValueError: If ai_query, title, or target_object_type are not specified
            - CanvasGenerationError: If recommendations cannot be generated
            - RecommendationError: If recommendation analysis fails
        </raises>
        <schema_constraints>
            - ai_query must be a non-empty string describing recommendation requirements
            - title must be a non-empty string
            - target_object_type must be a valid object type
            - object_ids must be a list of valid UUIDs if provided
            - max_items must be a positive integer if provided
            - All optional parameters must be valid values if provided
        </schema_constraints>
    </tool>
    """,
    
    "generate_canvas_objects_comparison": """
    <tool>
        <name>generate_canvas_objects_comparison</name>
        <use_case>Generate comprehensive comparisons between organizational objects for analysis and decision making.</use_case>
        <behavior>
            Creates detailed comparisons between organizational objects including
            employees, candidates, jobs, and other entities. Provides structured
            comparison analysis with criteria evaluation, attribute comparison,
            and comprehensive assessment for decision making.
        </behavior>
        <when_to_use>
            Use when comparing candidates for hiring, evaluating employee
            performance, analyzing job positions, or conducting comparative
            analysis for organizational decision making.
        </when_to_use>
        <intent>
            To provide comprehensive comparison capabilities enabling detailed
            object evaluation, structured analysis, and evidence-based
            comparative assessment for organizational decisions.
        </intent>
        <side_effects>Creates new canvas block with comparison content.</side_effects>
        <category>Canvas Generation</category>
        <args>
            - ai_query: AI query describing the comparison requirements (required)
            - title: Title for the comparison (required)
            - target_object_type: Type of objects to compare (required)
            - object_ids: List of specific object IDs to compare (optional, default: None)
            - max_items: Maximum number of objects to include (optional, default: None)
            - purpose: Purpose and context for the comparison (optional, default: None)
            - criteria: Criteria for comparison evaluation (optional, default: None)
            - attributes: Specific attributes to compare (optional, default: None)
            - assumptions: Assumptions underlying the comparison (optional, default: None)
            - anchors: Key reference points for comparison (optional, default: None)
            - additional_context: Additional context for comparison (optional, default: None)
            - risks: Risk considerations for the comparison (optional, default: None)
        </args>
        <returns>
            Dictionary with comparison generation results including structured
            analysis, attribute comparison, criteria evaluation, and
            comprehensive comparison presentation for decision making.
        </returns>
        <raises>
            - ValueError: If ai_query, title, or target_object_type are not specified
            - CanvasGenerationError: If comparison cannot be generated
            - ComparisonError: If comparison analysis fails
        </raises>
        <schema_constraints>
            - ai_query must be a non-empty string describing comparison requirements
            - title must be a non-empty string
            - target_object_type must be a valid object type
            - object_ids must be a list of valid UUIDs if provided
            - max_items must be a positive integer if provided
            - All optional parameters must be valid values if provided
        </schema_constraints>
    </tool>
    """,
    
    "generate_canvas_objects_heatmap": """
    <tool>
        <name>generate_canvas_objects_heatmap</name>
        <use_case>Generate heatmap visualizations for organizational objects showing patterns, distributions, and relationships.</use_case>
        <behavior>
            Creates heatmap visualizations for organizational objects showing
            patterns, distributions, relationships, and data density across
            different dimensions. Provides visual analysis of object
            characteristics and organizational patterns.
        </behavior>
        <when_to_use>
            Use when visualizing data patterns, analyzing distributions,
            identifying trends, or presenting complex data relationships
            through heatmap visualizations for organizational analysis.
        </when_to_use>
        <intent>
            To provide comprehensive heatmap visualization capabilities enabling
            pattern recognition, data distribution analysis, and visual
            representation of complex organizational data relationships.
        </intent>
        <side_effects>Creates new canvas block with heatmap visualization.</side_effects>
        <category>Canvas Generation</category>
        <args>
            - ai_query: AI query describing the heatmap requirements (required)
            - title: Title for the heatmap (required)
            - target_object_type: Type of objects to visualize (required)
            - object_ids: List of specific object IDs to include (optional, default: None)
            - max_items: Maximum number of objects to include (optional, default: None)
            - metric: Metric to visualize in the heatmap (optional, default: None)
            - priorities: Priority areas for the visualization (optional, default: None)
            - risks: Risk considerations for the analysis (optional, default: None)
            - coverage: Coverage scope for the heatmap (optional, default: None)
            - anchors: Key reference points for the visualization (optional, default: None)
            - additional_context: Additional context for heatmap generation (optional, default: None)
        </args>
        <returns>
            Dictionary with heatmap generation results including visual
            representation, pattern analysis, data distribution insights,
            and comprehensive heatmap presentation for organizational analysis.
        </returns>
        <raises>
            - ValueError: If ai_query, title, or target_object_type are not specified
            - CanvasGenerationError: If heatmap cannot be generated
            - VisualizationError: If heatmap visualization fails
        </raises>
        <schema_constraints>
            - ai_query must be a non-empty string describing heatmap requirements
            - title must be a non-empty string
            - target_object_type must be a valid object type
            - object_ids must be a list of valid UUIDs if provided
            - max_items must be a positive integer if provided
            - All optional parameters must be valid values if provided
        </schema_constraints>
    </tool>
    """,
    
    "generate_canvas_objects_grid_with_quadrants": """
    <tool>
        <name>generate_canvas_objects_grid_with_quadrants</name>
        <use_case>Generate quadrant-based grid visualizations for organizational objects with strategic positioning and analysis.</use_case>
        <behavior>
            Creates quadrant-based grid visualizations for organizational objects
            with strategic positioning, analysis, and categorization. Provides
            visual representation of objects across multiple dimensions
            with quadrant-based analysis and strategic insights.
        </behavior>
        <when_to_use>
            Use when conducting strategic analysis, categorizing objects
            across dimensions, visualizing positioning, or presenting
            complex multi-dimensional data through quadrant-based grids.
        </when_to_use>
        <intent>
            To provide comprehensive quadrant-based visualization capabilities
            enabling strategic analysis, multi-dimensional categorization,
            and visual representation of complex organizational positioning.
        </intent>
        <side_effects>Creates new canvas block with quadrant grid visualization.</side_effects>
        <category>Canvas Generation</category>
        <args>
            - ai_query: AI query describing the quadrant grid requirements (required)
            - title: Title for the quadrant grid (required)
            - target_object_type: Type of objects to visualize (required)
            - object_ids: List of specific object IDs to include (optional, default: None)
            - max_items: Maximum number of objects to include (optional, default: None)
            - purpose: Purpose and context for the visualization (optional, default: None)
            - attributes: Specific attributes for quadrant analysis (optional, default: None)
            - assumptions: Assumptions underlying the analysis (optional, default: None)
            - priorities: Priority areas for the visualization (optional, default: None)
            - risks: Risk considerations for the analysis (optional, default: None)
            - anchors: Key reference points for the visualization (optional, default: None)
            - additional_context: Additional context for grid generation (optional, default: None)
        </args>
        <returns>
            Dictionary with quadrant grid generation results including visual
            representation, strategic positioning, quadrant analysis, and
            comprehensive grid presentation for strategic decision making.
        </returns>
        <raises>
            - ValueError: If ai_query, title, or target_object_type are not specified
            - CanvasGenerationError: If quadrant grid cannot be generated
            - VisualizationError: If quadrant grid visualization fails
        </raises>
        <schema_constraints>
            - ai_query must be a non-empty string describing quadrant grid requirements
            - title must be a non-empty string
            - target_object_type must be a valid object type
            - object_ids must be a list of valid UUIDs if provided
            - max_items must be a positive integer if provided
            - All optional parameters must be valid values if provided
        </schema_constraints>
    </tool>
    """,
    
    "generate_canvas_interactive_poll": """
    <tool>
        <name>generate_canvas_interactive_poll</name>
        <use_case>Generate interactive polls and surveys for data collection, feedback gathering, and engagement measurement.</use_case>
        <behavior>
            Creates interactive polls and surveys for data collection, feedback
            gathering, and engagement measurement. Supports multiple choice
            options, anonymous participation, and real-time results
            visualization for comprehensive data collection and analysis.
        </behavior>
        <when_to_use>
            Use when collecting feedback, conducting surveys, gathering
            opinions, or measuring engagement through interactive
            polls and data collection mechanisms.
        </when_to_use>
        <intent>
            To provide comprehensive interactive polling capabilities enabling
            data collection, feedback gathering, engagement measurement,
            and real-time survey administration and analysis.
        </intent>
        <side_effects>Creates new canvas block with interactive poll.</side_effects>
        <category>Canvas Generation</category>
        <args>
            - ai_query: AI query describing the poll requirements (required)
            - title: Title for the poll (required)
            - max_choices: Maximum number of choices for the poll (optional, default: None)
            - is_anonymous: Whether the poll should be anonymous (optional, default: False)
            - audience: Target audience for the poll (optional, default: None)
            - purpose: Purpose and context for the poll (optional, default: None)
            - coverage: Coverage scope for the poll (optional, default: None)
            - additional_context: Additional context for poll generation (optional, default: None)
            - risks: Risk considerations for the poll (optional, default: None)
            - assumptions: Assumptions underlying the poll (optional, default: None)
        </args>
        <returns>
            Dictionary with poll generation results including interactive
            poll interface, data collection mechanisms, real-time
            visualization, and comprehensive polling capabilities.
        </returns>
        <raises>
            - ValueError: If ai_query or title are not specified
            - CanvasGenerationError: If interactive poll cannot be generated
            - PollGenerationError: If poll creation fails
        </raises>
        <schema_constraints>
            - ai_query must be a non-empty string describing poll requirements
            - title must be a non-empty string
            - max_choices must be a positive integer if provided
            - is_anonymous must be a boolean value if provided
            - All optional parameters must be valid values if provided
        </schema_constraints>
    </tool>
    """,
    
    "generate_canvas_radar_of_alerts_and_actions": """
    <tool>
        <name>generate_canvas_radar_of_alerts_and_actions</name>
        <use_case>Generate radar charts showing alerts, actions, and risk assessments across multiple dimensions.</use_case>
        <behavior>
            Creates radar charts showing alerts, actions, and risk assessments
            across multiple dimensions. Provides visual representation of
            organizational status, risk levels, and required actions
            with comprehensive radar-based analysis and visualization.
        </behavior>
        <when_to_use>
            Use when visualizing risk assessments, monitoring organizational
            status, tracking action items, or presenting multi-dimensional
            analysis through radar chart visualizations.
        </when_to_use>
        <intent>
            To provide comprehensive radar chart capabilities enabling
            multi-dimensional analysis, risk visualization, action
            tracking, and organizational status monitoring.
        </intent>
        <side_effects>Creates new canvas block with radar chart visualization.</side_effects>
        <category>Canvas Generation</category>
        <args>
            - ai_query: AI query describing the radar chart requirements (required)
            - title: Title for the radar chart (required)
            - purpose: Purpose and context for the radar chart (optional, default: None)
            - risks: Risk considerations for the analysis (optional, default: None)
            - anchors: Key reference points for the visualization (optional, default: None)
            - dependencies: Dependencies and relationships to visualize (optional, default: None)
            - assumptions: Assumptions underlying the analysis (optional, default: None)
            - priorities: Priority areas for the radar chart (optional, default: None)
        </args>
        <returns>
            Dictionary with radar chart generation results including visual
            representation, multi-dimensional analysis, risk assessment,
            and comprehensive radar chart presentation for monitoring and analysis.
        </returns>
        <raises>
            - ValueError: If ai_query or title are not specified
            - CanvasGenerationError: If radar chart cannot be generated
            - VisualizationError: If radar chart visualization fails
        </raises>
        <schema_constraints>
            - ai_query must be a non-empty string describing radar chart requirements
            - title must be a non-empty string
            - All optional parameters must be valid strings if provided
        </schema_constraints>
    </tool>
    """
}
