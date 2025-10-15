"""
Tool descriptions for search and discovery tools.

These tools provide both traditional database search and semantic search
capabilities across organizational data for comprehensive information discovery.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
SEARCH_TOOLS_DESCRIPTIONS = {
    "search_company_objects": """
    <tool>
        <name>search_company_objects</name>
        <use_case>Search for specific object types in the company database using traditional database search functions and filters.</use_case>
        <behavior>
            Uses regular database search functions (search_* methods) for each specific object type to query the database
            for objects matching the search terms or criteria. This tool performs direct database queries without
            semantic/vector search capabilities, returning structured results with pagination. Supports parallel
            processing of multiple queries for efficient batch searching across specific object categories.
        </behavior>
        <when_to_use>
            Use when needing to find specific objects of a particular type based on exact search terms, keywords,
            or when you need to filter objects by specific attributes within a single category. Ideal for
            structured searches where you know the object type and want precise database-level filtering.
            Perfect for targeted searches with known object types and specific search criteria.
        </when_to_use>
        <intent>
            To provide a targeted, efficient way to search across specific object types within the organization
            using traditional database search methods for precise data retrieval and analysis. This tool
            enables structured, type-specific searching for known object categories.
        </intent>
        <side_effects>None. This is a read-only operation that does not modify any data.</side_effects>
        <category>Search</category>
        <args>
            - object_type: The type of object to search for (candidate, employee, job, training, document, chart, metric, skill, pulse, org_unit, stage, interview, team_members) (required)
            - queries: Optional list of search terms or filter criteria (keywords, attributes)
            - max_items: Max items per page for paginated results
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains
            an array of objects matching the search criteria. When empty,
            "data" is an empty array. Results include structured object data with
            relevant metadata and search relevance information.
        </returns>
        <raises>
            Returns error details in response if database query fails or invalid object_type is provided.
            Handles invalid object types and database connectivity issues gracefully.
        </raises>
        <schema_constraints>
            - object_type: Must be one of the allowed types (candidate, employee, job, training, document, chart, metric, skill, pulse, org_unit, stage, interview, team_members)
            - queries: Optional list of strings for search terms
            - max_items: Optional positive integer for result limiting
        </schema_constraints>
    </tool>
    """,
    
    "search_company_information": """
    <tool>
        <name>search_company_information</name>
        <use_case>Perform semantic search across all company data using embeddings and vector search through RAG (Retrieval-Augmented Generation) with parallel context retrieval and LLM tools.</use_case>
        <behavior>
            Leverages embedding-based vector search through RAG to find semantically relevant information across all data types.
            Spawns a thread-pool where each query is processed via ContextRetriever.parallel_context_retrieval_and_tools,
            using both embedding search (for semantic similarity) and LLM tools in parallel. Results include improved prompts,
            semantic context, and LLM tool outputs for comprehensive information retrieval. This is the most advanced
            search capability available, providing intelligent, context-aware information discovery.
        </behavior>
        <when_to_use>
            When you need semantic understanding of queries and want to find information that may not match exact keywords,
            but is conceptually related. Use for comprehensive information discovery across all company data types
            where traditional keyword search might miss relevant content. Essential for exploratory analysis,
            strategic research, and complex information gathering tasks.
        </when_to_use>
        <intent>
            Provide intelligent, semantic search capabilities over company data using modern AI techniques
            (embeddings + RAG) with enhanced LLM tool integration for comprehensive information retrieval.
            This tool enables natural language queries that understand context and meaning rather than
            just keyword matching.
        </intent>
        <side_effects>None. Read-only operation that does not modify any data.</side_effects>
        <category>Search</category>
        <args>
            - queries: List of query strings to search for semantically using embeddings and vector search across all company data types (required)
        </args>
        <returns>
            Dictionary with comprehensive return information:
            
            SUCCESS WITH RESULTS (status: "success"):
            - "data": Array of query results with structure:
              * "query": Original search query
              * "result": Object containing:
                - "prompt": AI-enhanced prompt for better understanding
                - "context": Unified semantic context from multiple sources
                - "sources": Array of source objects with metadata and relevance
                - "llm_tools_result": LLM-generated analysis and insights
              * "total_matches": Number of content matches found
              * "search_time": Time taken for search operation
              * "confidence_score": Overall confidence in search results
            
            SUCCESS WITH NO RESULTS (status: "success"):
            - "data": Array with empty results structure
            - "message": "No content found matching your search criteria"
            - "suggestion": "Try different keywords, broader terms, or check if content exists"
            
            SEARCH ERROR (status: "error"):
            - "error": "Semantic search operation failed"
            - "error_type": "SearchError"
            - "error_details": "Specific search failure reason (embedding issues, index problems, etc.)"
            - "suggestion": "Try simpler queries or contact support if issue persists"
            
            VALIDATION ERROR (status: "error"):
            - "error": "Invalid search parameters provided"
            - "error_type": "ValidationError"
            - "error_details": "Which parameters are invalid and expected formats"
            - "suggestion": "Review query format and parameter requirements"
            
            PERMISSION ERROR (status: "error"):
            - "error": "Insufficient permissions to search company information"
            - "error_type": "PermissionError"
            - "error_details": "Which content cannot be searched and why"
            - "suggestion": "Contact administrator for access or use different search scope"
        </returns>
        <raises>
            Returns error details in response if retrieval fails due to AI service issues,
            invalid queries, or system connectivity problems.
        </raises>
        <schema_constraints>
            - queries: non-empty list of strings containing natural language search queries
        </schema_constraints>
    </tool>
    """
}
