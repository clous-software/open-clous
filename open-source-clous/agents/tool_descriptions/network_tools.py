"""
Tool descriptions for network analysis tools.

These tools provide comprehensive network analysis capabilities for understanding
organizational relationships, collaboration patterns, and knowledge flows.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
NETWORK_TOOLS_DESCRIPTIONS = {
    "retrieve_network_from_employees": """
    <tool>
        <name>retrieve_network_from_employees</name>
        <use_case>Analyze collaboration networks and relationships between employees to understand organizational dynamics and knowledge flows.</use_case>
        <behavior>
            Retrieves comprehensive network data for specified employees including collaboration patterns,
            communication flows, project relationships, and organizational connections. Processes network
            data through AI analysis to identify key insights about collaboration effectiveness,
            knowledge sharing patterns, and organizational structure impact on relationships.
        </behavior>
        <when_to_use>
            Use when analyzing team collaboration effectiveness, identifying knowledge bottlenecks,
            understanding organizational communication patterns, or assessing the impact of
            organizational structure on employee relationships and productivity.
        </when_to_use>
        <intent>
            To provide deep insights into organizational network dynamics and collaboration patterns
            that can inform organizational design decisions, identify collaboration opportunities,
            and optimize team structures for better knowledge sharing and productivity.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Network Analysis</category>
        <args>
            - employee_ids: List of employee IDs to analyze (required)
            - optimization: Network analysis optimization focus (optional, default: None)
            - days: Time period for network analysis in days (optional, default: None)
            - include_adjacent: Include adjacent network connections (optional, default: False)
        </args>
        <returns>
            Dictionary with network analysis results including collaboration patterns,
            relationship insights, knowledge flow analysis, and AI-generated recommendations
            for optimizing organizational networks and collaboration effectiveness.
        </returns>
        <raises>
            - ValueError: If employee_ids is empty or invalid
            - NetworkAnalysisError: If network data cannot be retrieved or processed
        </raises>
        <schema_constraints>
            - employee_ids must be a non-empty list of valid employee UUIDs
            - optimization must be one of: collaboration, knowledge, communication, productivity
            - days must be a positive integer if provided
            - include_adjacent must be a boolean value
        </schema_constraints>
    </tool>
    """,
    
    "retrieve_network_from_candidates": """
    <tool>
        <name>retrieve_network_from_candidates</name>
        <use_case>Analyze professional networks and relationships of candidates to assess their potential for organizational integration and collaboration.</use_case>
        <behavior>
            Retrieves network data for specified candidates including professional connections,
            collaboration history, referral patterns, and relationship dynamics. Processes
            candidate network information through AI analysis to identify collaboration potential,
            cultural fit indicators, and integration readiness based on network characteristics.
        </behavior>
        <when_to_use>
            Use when evaluating candidates for cultural fit, assessing collaboration potential,
            understanding referral networks, or predicting integration success based on
            professional relationship patterns and network characteristics.
        </when_to_use>
        <intent>
            To provide insights into candidate network characteristics that can inform
            hiring decisions, predict integration success, and identify candidates with
            strong collaboration potential and cultural alignment.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Network Analysis</category>
        <args>
            - candidate_ids: List of candidate IDs to analyze (required)
            - optimization: Network analysis optimization focus (optional, default: None)
            - days: Time period for network analysis in days (optional, default: None)
            - include_adjacent: Include adjacent network connections (optional, default: False)
        </args>
        <returns>
            Dictionary with candidate network analysis including professional relationship
            patterns, collaboration potential assessment, cultural fit indicators, and
            AI-generated insights for hiring and integration decisions.
        </returns>
        <raises>
            - ValueError: If candidate_ids is empty or invalid
            - NetworkAnalysisError: If candidate network data cannot be retrieved or processed
        </raises>
        <schema_constraints>
            - candidate_ids must be a non-empty list of valid candidate UUIDs
            - optimization must be one of: collaboration, integration, cultural_fit, referral
            - days must be a positive integer if provided
            - include_adjacent must be a boolean value
        </schema_constraints>
    </tool>
    """,
    
    "identify_central_network_connectors": """
    <tool>
        <name>identify_central_network_connectors</name>
        <use_case>Identify employees who serve as central connectors in organizational networks and play key roles in information flow and collaboration.</use_case>
        <behavior>
            Analyzes employee networks to identify individuals with high centrality metrics,
            strong connection patterns, and key roles in organizational information flow.
            Uses network analysis algorithms to identify connectors, bridges, and central
            nodes that facilitate collaboration and knowledge sharing across the organization.
        </behavior>
        <when_to_use>
            Use when identifying key influencers, understanding information flow patterns,
            recognizing collaboration facilitators, or planning organizational changes
            that might impact network dynamics and communication effectiveness.
        </when_to_use>
        <intent>
            To identify and analyze central network connectors who play critical roles
            in organizational communication, collaboration, and knowledge sharing,
            enabling better understanding of network dynamics and key relationship patterns.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Network Analysis</category>
        <args>
            - employee_ids: List of employee IDs to analyze (required)
            - optimization: Network analysis optimization focus (optional, default: None)
            - days: Time period for network analysis in days (optional, default: None)
        </args>
        <returns>
            Dictionary with central connector analysis including identified connectors,
            centrality metrics, connection patterns, and insights about their roles
            in organizational networks and collaboration effectiveness.
        </returns>
        <raises>
            - ValueError: If employee_ids is empty or invalid
            - NetworkAnalysisError: If network analysis cannot be performed
        </raises>
        <schema_constraints>
            - employee_ids must be a non-empty list of valid employee UUIDs
            - optimization must be one of: centrality, influence, collaboration, communication
            - days must be a positive integer if provided
        </schema_constraints>
    </tool>
    """,
    
    "identify_boundary_brokers": """
    <tool>
        <name>identify_boundary_brokers</name>
        <use_case>Identify employees who act as bridges between different organizational groups, departments, or teams.</use_case>
        <behavior>
            Analyzes organizational networks to identify boundary brokers who connect
            different groups, departments, or teams. These individuals play crucial roles
            in cross-functional collaboration, knowledge transfer, and organizational
            integration by bridging structural gaps and facilitating communication
            between isolated groups.
        </behavior>
        <when_to_use>
            Use when analyzing cross-functional collaboration, identifying integration
            facilitators, understanding inter-departmental communication patterns,
            or planning organizational restructuring that might impact group boundaries.
        </when_to_use>
        <intent>
            To identify boundary brokers who facilitate cross-functional collaboration
            and knowledge sharing, enabling better understanding of organizational
            integration patterns and opportunities for improved inter-group communication.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Network Analysis</category>
        <args>
            - employee_ids: List of employee IDs to analyze (required)
            - optimization: Network analysis optimization focus (optional, default: None)
            - days: Time period for network analysis in days (optional, default: None)
        </args>
        <returns>
            Dictionary with boundary broker analysis including identified brokers,
            bridging patterns, cross-functional connections, and insights about
            their roles in organizational integration and collaboration.
        </returns>
        <raises>
            - ValueError: If employee_ids is empty or invalid
            - NetworkAnalysisError: If boundary analysis cannot be performed
        </raises>
        <schema_constraints>
            - employee_ids must be a non-empty list of valid employee UUIDs
            - optimization must be one of: bridging, integration, cross_functional, communication
            - days must be a positive integer if provided
        </schema_constraints>
    </tool>
    """,
    
    "identify_network_energizers": """
    <tool>
        <name>identify_network_energizers</name>
        <use_case>Identify employees who energize and motivate others in organizational networks, driving positive collaboration and engagement.</use_case>
        <behavior>
            Analyzes network interactions to identify energizers who have positive
            influence on others, drive collaboration, and create positive network
            dynamics. Uses sentiment and interaction analysis to identify individuals
            who energize their networks and contribute to positive organizational culture.
        </behavior>
        <when_to_use>
            Use when analyzing organizational culture, identifying positive influencers,
            understanding engagement patterns, or planning initiatives to improve
            collaboration and organizational energy.
        </when_to_use>
        <intent>
            To identify network energizers who contribute to positive organizational
            dynamics and collaboration, enabling better understanding of cultural
            influencers and opportunities for improving organizational energy.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Network Analysis</category>
        <args>
            - employee_ids: List of employee IDs to analyze (required)
            - optimization: Network analysis optimization focus (optional, default: None)
            - days: Time period for network analysis in days (optional, default: None)
        </args>
        <returns>
            Dictionary with energizer analysis including identified energizers,
            positive influence patterns, engagement metrics, and insights about
            their roles in creating positive organizational dynamics.
        </returns>
        <raises>
            - ValueError: If employee_ids is empty or invalid
            - NetworkAnalysisError: If energizer analysis cannot be performed
        </raises>
        <schema_constraints>
            - employee_ids must be a non-empty list of valid employee UUIDs
            - optimization must be one of: energy, engagement, influence, culture
            - days must be a positive integer if provided
        </schema_constraints>
    </tool>
    """,
    
    "measure_referral_potential_score": """
    <tool>
        <name>measure_referral_potential_score</name>
        <use_case>Measure the potential of employees to generate quality referrals based on their network characteristics and referral history.</use_case>
        <behavior>
            Analyzes employee networks and referral patterns to calculate referral
            potential scores. Considers network size, quality of connections,
            referral history, and network characteristics to predict the likelihood
            and quality of future referrals from each employee.
        </behavior>
        <when_to_use>
            Use when planning referral programs, identifying high-potential referrers,
            optimizing recruitment strategies, or assessing the referral potential
            of different employee groups or departments.
        </when_to_use>
        <intent>
            To measure and predict referral potential of employees based on their
            network characteristics and historical referral performance, enabling
            more effective referral program design and recruitment optimization.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Network Analysis</category>
        <args>
            - employee_ids: List of employee IDs to analyze (required)
            - optimization: Referral optimization focus (required, default: "referral")
            - days: Time period for referral analysis in days (optional, default: None)
        </args>
        <returns>
            Dictionary with referral potential scores, network characteristics,
            referral history analysis, and insights about employee referral
            potential and optimization opportunities.
        </returns>
        <raises>
            - ValueError: If employee_ids is empty or invalid
            - NetworkAnalysisError: If referral analysis cannot be performed
        </raises>
        <schema_constraints>
            - employee_ids must be a non-empty list of valid employee UUIDs
            - optimization must be "referral" for this specific analysis
            - days must be a positive integer if provided
        </schema_constraints>
    </tool>
    """,
    
    "identify_collaboration_bottlenecks": """
    <tool>
        <name>identify_collaboration_bottlenecks</name>
        <use_case>Identify bottlenecks and obstacles in organizational collaboration networks that hinder effective teamwork and knowledge sharing.</use_case>
        <behavior>
            Analyzes collaboration patterns to identify bottlenecks, communication
            gaps, and obstacles that hinder effective teamwork. Identifies individuals
            or groups that create bottlenecks, communication delays, or collaboration
            barriers in organizational networks.
        </behavior>
        <when_to_use>
            Use when diagnosing collaboration issues, identifying communication
            bottlenecks, understanding teamwork obstacles, or planning interventions
            to improve organizational collaboration effectiveness.
        </when_to_use>
        <intent>
            To identify collaboration bottlenecks and obstacles that hinder effective
            teamwork and knowledge sharing, enabling targeted interventions to
            improve organizational collaboration and communication.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Network Analysis</category>
        <args>
            - employee_ids: List of employee IDs to analyze (required)
            - optimization: Network analysis optimization focus (optional, default: None)
            - days: Time period for network analysis in days (optional, default: None)
        </args>
        <returns>
            Dictionary with bottleneck analysis including identified bottlenecks,
            collaboration obstacles, communication gaps, and recommendations
            for improving organizational collaboration effectiveness.
        </returns>
        <raises>
            - ValueError: If employee_ids is empty or invalid
            - NetworkAnalysisError: If bottleneck analysis cannot be performed
        </raises>
        <schema_constraints>
            - employee_ids must be a non-empty list of valid employee UUIDs
            - optimization must be one of: collaboration, communication, efficiency, flow
            - days must be a positive integer if provided
        </schema_constraints>
    </tool>
    """,
    
    "identify_knowledge_hubs": """
    <tool>
        <name>identify_knowledge_hubs</name>
        <use_case>Identify employees who serve as knowledge hubs and repositories of organizational knowledge and expertise.</use_case>
        <behavior>
            Analyzes knowledge sharing patterns to identify employees who serve as
            knowledge hubs, repositories of expertise, and sources of organizational
            knowledge. Identifies individuals with high knowledge centrality and
            expertise in specific domains who are frequently consulted by others.
        </behavior>
        <when_to_use>
            Use when mapping organizational knowledge, identifying expertise centers,
            understanding knowledge sharing patterns, or planning knowledge management
            initiatives and succession planning.
        </when_to_use>
        <intent>
            To identify knowledge hubs who serve as repositories of organizational
            expertise and knowledge, enabling better understanding of knowledge
            distribution and opportunities for knowledge management optimization.
        </intent>
        <side_effects>None. This is a read-only analysis operation.</side_effects>
        <category>Network Analysis</category>
        <args>
            - employee_ids: List of employee IDs to analyze (required)
            - optimization: Network analysis optimization focus (optional, default: None)
            - days: Time period for network analysis in days (optional, default: None)
        </args>
        <returns>
            Dictionary with knowledge hub analysis including identified hubs,
            expertise domains, knowledge sharing patterns, and insights about
            organizational knowledge distribution and expertise centers.
        </returns>
        <raises>
            - ValueError: If employee_ids is empty or invalid
            - NetworkAnalysisError: If knowledge hub analysis cannot be performed
        </raises>
        <schema_constraints>
            - employee_ids must be a non-empty list of valid employee UUIDs
            - optimization must be one of: knowledge, expertise, sharing, centrality
            - days must be a positive integer if provided
        </schema_constraints>
    </tool>
    """
}
