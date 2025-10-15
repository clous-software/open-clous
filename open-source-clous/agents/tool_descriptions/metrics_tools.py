"""
Tool descriptions for metrics and analytics tools.

These tools provide comprehensive metrics retrieval, analysis, and workforce
quantification capabilities.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
METRICS_TOOL_DESCRIPTIONS = {
    "retrieve_company_metrics_data": """
    <tool>
        <name>retrieve_company_metrics_data</name>
        <use_case>Retrieve comprehensive metrics data across the organization with flexible filtering, aggregation, and analysis capabilities.</use_case>
        <behavior>
            Retrieves metrics data from across the organization with support for filtering,
            aggregation, grouping, and statistical analysis. Provides flexible data access
            with configurable output fields, domain-specific metrics, and comprehensive
            statistical insights for data-driven decision making.
        </behavior>
        <when_to_use>
            Use when conducting organizational analytics, generating reports, performing
            data analysis, or making data-driven decisions based on comprehensive
            metrics across multiple domains and time periods.
        </when_to_use>
        <intent>
            To provide flexible and comprehensive access to organizational metrics data
            enabling data-driven analysis, reporting, and decision making across
            all business domains and functional areas.
        </intent>
        <side_effects>None. This is a read-only data retrieval operation.</side_effects>
        <category>Metrics Analysis</category>
        <args>
            - filters: Dictionary of filters to apply to metrics data (optional)
            - count: Return count of records instead of data (optional, default: None)
            - aggregate: Aggregation method for metrics (optional, default: None)
            - group_by: Field to group metrics by (optional, default: None)
            - unique_by: Field to ensure uniqueness by (optional, default: None)
            - output_fields: List of specific fields to include (optional, default: None)
            - domain: Specific domain for metrics (optional, default: None)
            - metric_names: List of specific metric names to retrieve (optional, default: None)
            - exclude_fields: List of fields to exclude (optional, default: None)
            - exclude_property_keys: List of property keys to exclude (optional, default: None)
            - include_statistics: Include statistical analysis (optional, default: None)
            - limit: Maximum number of records to return (optional, default: None)
        </args>
        <returns>
            Dictionary with comprehensive metrics data including filtered results,
            aggregated statistics, grouped analysis, and configurable output
            fields based on specified parameters.
        </returns>
        <raises>
            - MetricsRetrievalError: If metrics data cannot be retrieved
            - ValidationError: If filter parameters are invalid
        </raises>
        <schema_constraints>
            - filters must be a valid dictionary if provided
            - aggregate must be one of: sum, avg, min, max, count if provided
            - group_by must be a valid field name if provided
            - limit must be a positive integer if provided
            - All list parameters must contain valid values
        </schema_constraints>
    </tool>
    """,
    
    "retrieve_workforce_metrics": """
    <tool>
        <name>retrieve_workforce_metrics</name>
        <use_case>Retrieve workforce-specific metrics and analytics for human resources analysis and workforce planning.</use_case>
        <behavior>
            Retrieves workforce metrics focused on human resources analytics including
            employee metrics, hiring analytics, retention data, and workforce
            composition analysis. Provides domain-specific workforce insights
            with filtering and analysis capabilities.
        </behavior>
        <when_to_use>
            Use when conducting HR analytics, workforce planning, analyzing
            employee metrics, or making human resources decisions based on
            comprehensive workforce data and trends.
        </when_to_use>
        <intent>
            To provide specialized workforce metrics and analytics enabling
            data-driven HR decisions, workforce planning, and human resources
            strategy development.
        </intent>
        <side_effects>None. This is a read-only data retrieval operation.</side_effects>
        <category>Metrics Analysis</category>
        <args>
            - domain: Workforce domain for metrics (required)
            - filters: Dictionary of filters to apply (optional, default: None)
            - metric_names: List of specific metric names to retrieve (optional, default: None)
        </args>
        <returns>
            Dictionary with workforce metrics data including domain-specific
            analytics, filtered results, and comprehensive workforce insights
            for HR decision making and planning.
        </returns>
        <raises>
            - ValueError: If domain is not specified or invalid
            - MetricsRetrievalError: If workforce metrics cannot be retrieved
        </raises>
        <schema_constraints>
            - domain must be a valid workforce domain (e.g., "hiring", "retention", "performance")
            - filters must be a valid dictionary if provided
            - metric_names must be a list of valid metric names if provided
        </schema_constraints>
    </tool>
    """,
    
    "retrieve_metrics_from_hiring_stages": """
    <tool>
        <name>retrieve_metrics_from_hiring_stages</name>
        <use_case>Retrieve metrics and analytics from hiring stages to analyze recruitment funnel performance and hiring effectiveness.</use_case>
        <behavior>
            Retrieves metrics data from hiring stages including conversion rates,
            stage performance, candidate flow analysis, and recruitment funnel
            effectiveness. Provides insights into hiring process performance,
            bottlenecks, and optimization opportunities.
        </behavior>
        <when_to_use>
            Use when analyzing recruitment funnel performance, identifying hiring
            bottlenecks, optimizing recruitment processes, or making decisions
            about hiring strategy and process improvements.
        </when_to_use>
        <intent>
            To provide comprehensive hiring stage metrics enabling recruitment
            funnel analysis, process optimization, and data-driven hiring
            strategy development.
        </intent>
        <side_effects>None. This is a read-only data retrieval operation.</side_effects>
        <category>Metrics Analysis</category>
        <args>
            - stage_ids: List of hiring stage IDs to analyze (optional, default: None)
            - time_period: Time period for metrics analysis (optional, default: None)
            - group_by: Field to group metrics by (optional, default: None)
        </args>
        <returns>
            Dictionary with hiring stage metrics including conversion rates,
            stage performance, funnel analysis, and insights about
            recruitment effectiveness and optimization opportunities.
        </returns>
        <raises>
            - MetricsRetrievalError: If hiring stage metrics cannot be retrieved
            - ValidationError: If stage_ids are invalid
        </raises>
        <schema_constraints>
            - stage_ids must be a list of valid stage UUIDs if provided
            - time_period must be a valid time period string if provided
            - group_by must be a valid field name if provided
        </schema_constraints>
    </tool>
    """,
    
    "retrieve_metrics_from_jobs": """
    <tool>
        <name>retrieve_metrics_from_jobs</name>
        <use_case>Retrieve metrics and analytics from job postings to analyze recruitment performance and job market effectiveness.</use_case>
        <behavior>
            Retrieves metrics data from job postings including application rates,
            candidate quality, time-to-fill, and job performance analytics.
            Provides insights into job posting effectiveness, market response,
            and recruitment success metrics.
        </behavior>
        <when_to_use>
            Use when analyzing job posting performance, evaluating recruitment
            effectiveness, optimizing job descriptions, or making decisions
            about job posting strategy and market positioning.
        </when_to_use>
        <intent>
            To provide comprehensive job metrics enabling recruitment performance
            analysis, job posting optimization, and data-driven hiring strategy
            development.
        </intent>
        <side_effects>None. This is a read-only data retrieval operation.</side_effects>
        <category>Metrics Analysis</category>
        <args>
            - job_ids: List of job IDs to analyze (optional, default: None)
            - time_period: Time period for metrics analysis (optional, default: None)
            - group_by: Field to group metrics by (optional, default: None)
        </args>
        <returns>
            Dictionary with job metrics including application rates, candidate
            quality, time-to-fill, and insights about job posting effectiveness
            and recruitment success.
        </returns>
        <raises>
            - MetricsRetrievalError: If job metrics cannot be retrieved
            - ValidationError: If job_ids are invalid
        </raises>
        <schema_constraints>
            - job_ids must be a list of valid job UUIDs if provided
            - time_period must be a valid time period string if provided
            - group_by must be a valid field name if provided
        </schema_constraints>
    </tool>
    """,
    
    "retrieve_metrics_from_employees": """
    <tool>
        <name>retrieve_metrics_from_employees</name>
        <use_case>Retrieve metrics and analytics from employee data to analyze workforce performance and employee engagement.</use_case>
        <behavior>
            Retrieves metrics data from employee records including performance
            metrics, engagement data, retention analytics, and workforce
            composition analysis. Provides insights into employee performance,
            satisfaction, and organizational effectiveness.
        </behavior>
        <when_to_use>
            Use when analyzing employee performance, evaluating workforce
            engagement, conducting retention analysis, or making decisions
            about employee development and organizational effectiveness.
        </when_to_use>
        <intent>
            To provide comprehensive employee metrics enabling workforce
            performance analysis, engagement assessment, and data-driven
            human resources decision making.
        </intent>
        <side_effects>None. This is a read-only data retrieval operation.</side_effects>
        <category>Metrics Analysis</category>
        <args>
            - employee_ids: List of employee IDs to analyze (optional, default: None)
            - time_period: Time period for metrics analysis (optional, default: None)
            - group_by: Field to group metrics by (optional, default: None)
        </args>
        <returns>
            Dictionary with employee metrics including performance data,
            engagement metrics, retention analytics, and insights about
            workforce effectiveness and employee satisfaction.
        </returns>
        <raises>
            - MetricsRetrievalError: If employee metrics cannot be retrieved
            - ValidationError: If employee_ids are invalid
        </raises>
        <schema_constraints>
            - employee_ids must be a list of valid employee UUIDs if provided
            - time_period must be a valid time period string if provided
            - group_by must be a valid field name if provided
        </schema_constraints>
    </tool>
    """,
    
    "retrieve_metrics_from_candidates": """
    <tool>
        <name>retrieve_metrics_from_candidates</name>
        <use_case>Retrieve metrics and analytics from candidate data to analyze recruitment effectiveness and candidate quality.</use_case>
        <behavior>
            Retrieves metrics data from candidate records including application
            metrics, assessment results, candidate quality scores, and recruitment
            funnel analytics. Provides insights into candidate performance,
            recruitment effectiveness, and hiring success metrics.
        </behavior>
        <when_to_use>
            Use when analyzing candidate quality, evaluating recruitment
            effectiveness, assessing assessment performance, or making decisions
            about candidate evaluation and hiring processes.
        </when_to_use>
        <intent>
            To provide comprehensive candidate metrics enabling recruitment
            effectiveness analysis, candidate quality assessment, and data-driven
            hiring process optimization.
        </intent>
        <side_effects>None. This is a read-only data retrieval operation.</side_effects>
        <category>Metrics Analysis</category>
        <args>
            - candidate_ids: List of candidate IDs to analyze (optional, default: None)
            - time_period: Time period for metrics analysis (optional, default: None)
            - group_by: Field to group metrics by (optional, default: None)
        </args>
        <returns>
            Dictionary with candidate metrics including application data,
            assessment results, quality scores, and insights about
            candidate performance and recruitment effectiveness.
        </returns>
        <raises>
            - MetricsRetrievalError: If candidate metrics cannot be retrieved
            - ValidationError: If candidate_ids are invalid
        </raises>
        <schema_constraints>
            - candidate_ids must be a list of valid candidate UUIDs if provided
            - time_period must be a valid time period string if provided
            - group_by must be a valid field name if provided
        </schema_constraints>
    </tool>
    """,
    
    "forecast_future_metrics_data_points": """
    <tool>
        <name>forecast_future_metrics_data_points</name>
        <use_case>Generate forecasts and predictions for future metrics data points based on historical trends and patterns.</use_case>
        <behavior>
            Analyzes historical metrics data to generate forecasts and predictions
            for future data points. Uses statistical modeling and trend analysis
            to predict future values, identify patterns, and provide insights
            about potential future outcomes and trends.
        </behavior>
        <when_to_use>
            Use when planning for future workforce needs, predicting trends,
            making strategic decisions based on forecasts, or identifying
            potential future challenges and opportunities.
        </when_to_use>
        <intent>
            To provide predictive analytics and forecasting capabilities
            enabling proactive planning, trend prediction, and data-driven
            strategic decision making.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Metrics Analysis</category>
        <args>
            - metric_name: Name of the metric to forecast (required)
        </args>
        <returns>
            Dictionary with forecast results including predicted values,
            confidence intervals, trend analysis, and insights about
            future patterns and potential outcomes.
        </returns>
        <raises>
            - ValueError: If metric_name is not specified or invalid
            - ForecastingError: If forecasting cannot be performed
        </raises>
        <schema_constraints>
            - metric_name must be a valid metric name string
        </schema_constraints>
    </tool>
    """,
    
    "research_online_metrics_benchmarks": """
    <tool>
        <name>research_online_metrics_benchmarks</name>
        <use_case>Research and retrieve online benchmarks for metrics to compare organizational performance against industry standards.</use_case>
        <behavior>
            Researches online sources to find industry benchmarks and standards
            for specific metrics. Provides comparative analysis against industry
            standards, market averages, and best practices to enable performance
            benchmarking and competitive analysis.
        </behavior>
        <when_to_use>
            Use when benchmarking organizational performance, comparing against
            industry standards, identifying performance gaps, or making decisions
            about performance targets and improvement goals.
        </when_to_use>
        <intent>
            To provide industry benchmarking capabilities enabling performance
            comparison, competitive analysis, and data-driven goal setting
            based on market standards and best practices.
        </intent>
        <side_effects>None. This is a read-only research operation.</side_effects>
        <category>Metrics Analysis</category>
        <args>
            - metric_name: Name of the metric to benchmark (required)
        </args>
        <returns>
            Dictionary with benchmark research results including industry
            standards, market averages, best practices, and comparative
            analysis for performance evaluation.
        </returns>
        <raises>
            - ValueError: If metric_name is not specified or invalid
            - BenchmarkingError: If benchmark research cannot be performed
        </raises>
        <schema_constraints>
            - metric_name must be a valid metric name string
        </schema_constraints>
    </tool>
    """,
    
    "detect_metrics_data_points_anomalies": """
    <tool>
        <name>detect_metrics_data_points_anomalies</name>
        <use_case>Detect anomalies and outliers in metrics data points to identify unusual patterns or potential issues.</use_case>
        <behavior>
            Analyzes metrics data to detect anomalies, outliers, and unusual
            patterns that may indicate issues or opportunities. Uses statistical
            analysis and pattern recognition to identify data points that deviate
            significantly from expected norms or trends.
        </behavior>
        <when_to_use>
            Use when monitoring data quality, identifying unusual patterns,
            detecting potential issues, or conducting data validation and
            quality assurance for metrics data.
        </when_to_use>
        <intent>
            To provide anomaly detection capabilities enabling data quality
            monitoring, pattern recognition, and identification of unusual
            events or trends that may require attention.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Metrics Analysis</category>
        <args>
            - metric_name: Name of the metric to analyze (required)
            - value: Specific value to check for anomalies (optional, default: None)
            - content_type: Type of content for anomaly detection (optional, default: None)
            - object_id: ID of specific object for anomaly detection (optional, default: None)
        </args>
        <returns>
            Dictionary with anomaly detection results including identified
            anomalies, statistical analysis, pattern recognition, and
            insights about unusual data points or trends.
        </returns>
        <raises>
            - ValueError: If metric_name is not specified or invalid
            - AnomalyDetectionError: If anomaly detection cannot be performed
        </raises>
        <schema_constraints>
            - metric_name must be a valid metric name string
            - value must be a valid numeric value if provided
            - content_type must be a valid content type if provided
            - object_id must be a valid UUID if provided
        </schema_constraints>
    </tool>
    """
}
