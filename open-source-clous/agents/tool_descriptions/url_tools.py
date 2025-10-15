"""
Tool descriptions for URL and web search tools.

These tools provide comprehensive web search, URL analysis, and online research
capabilities for gathering external information and analyzing web content.
"""

# Tool descriptions following the function_tool_naming_and_descriptions guidelines
URL_TOOLS_DESCRIPTIONS = {
    "run_online_search": """
    <tool>
        <name>run_online_search</name>
        <use_case>Unified tool for web searches, URL content analysis, and deep research. Supports three modes: web_search (AI-powered search), url_analysis (scrape/analyze URLs), and deep_research (comprehensive research).</use_case>
        <behavior>
            Based on search_type parameter:
            - "web_search": Uses AI models (Perplexity/Sonar) for real-time web searches with citations
            - "url_analysis": Scrapes and analyzes URL content using OpenGraph metadata extraction
            - "deep_research": Conducts comprehensive research using deep research models (o3-deep-research, o4-mini-deep-research)
            
            All modes support concurrent execution for multiple queries/URLs via thread pools.
            Provides intelligent content analysis and metadata extraction with comprehensive result formatting.
        </behavior>
        <when_to_use>
            - web_search: When up-to-date information or multi-topic research is needed
            - url_analysis: To analyze webpage structure, metadata, and content from specific URLs
            - deep_research: For comprehensive research requiring systematic analysis and multiple sources
            Essential for external information gathering, competitive analysis, and market research.
        </when_to_use>
        <intent>Provide flexible online information gathering through search, URL analysis, or deep research methodologies.
        Enables comprehensive external information discovery and analysis for strategic decision-making.</intent>
        <side_effects>Outgoing API calls to search providers, AI services, and HTTP requests for URL analysis.</side_effects>
        <category>Web Search & Analysis</category>
        <args>
            - queries: A single query/URL string or list of queries/URLs to process (required)
            - search_type: Mode of operation - "web_search", "url_analysis", or "deep_research" (optional, default: "web_search")
            - exclusive_url_domains: Restrict results to specific domains (web_search mode)
            - exclude_url_domains: Exclude results from specific domains (web_search mode)
            - search_after_date: Only include content published after this date (web_search mode)
            - search_before_date: Only include content published before this date (web_search mode)
            - include_deeper_analysis_from_url_domains: Include deeper analysis from specific domains (web_search mode)
            - include_related_urls: Whether to include analysis of related URLs (url_analysis mode)
            - search_depth: Level of research depth for deep_research mode (basic, comprehensive, exhaustive)
            - analysis_focus: Specific aspect to focus analysis on (deep_research mode)
            - research_methodology: Research approach for deep_research mode (systematic, exploratory, comparative)
            - research_scope: Scope of research for deep_research mode (global, regional, industry-specific)
            - time_constraints: Time limitations for research (deep_research mode)
        </args>
        <returns>
            On success: {"status": "success", "data": {query: result_dict, ...}} or single result for single query
            Each result contains comprehensive information including content, metadata, citations, and analysis.
            For web_search: AI-powered search results with citations and source attribution
            For url_analysis: Extracted content, metadata, and structural analysis
            For deep_research: Comprehensive research reports with multiple sources and detailed analysis
        </returns>
        <raises>
            Returns error details in response if search fails due to network issues, invalid URLs,
            or API service unavailability. Handles rate limiting and timeout scenarios gracefully.
        </raises>
        <schema_constraints>
            - queries: non-empty string or list of strings
            - search_type: must be one of "web_search", "url_analysis", "deep_research"
            - exclusive_url_domains: optional list of valid domain strings
            - exclude_url_domains: optional list of valid domain strings
            - search_after_date: optional date string in YYYY-MM-DD format
            - search_before_date: optional date string in YYYY-MM-DD format
            - include_related_urls: boolean value
            - search_depth: must be one of "basic", "comprehensive", "exhaustive"
            - research_methodology: must be one of "systematic", "exploratory", "comparative"
            - research_scope: must be one of "global", "regional", "industry-specific"
        </schema_constraints>
    </tool>
    """,
    
    "fetch_url_metadata": """
    <tool>
        <name>fetch_url_metadata</name>
        <use_case>Extract comprehensive metadata and content from web URLs including OpenGraph data, structured content, and page analysis.</use_case>
        <behavior>
            Fetches and analyzes web page content to extract metadata, OpenGraph information, structured data,
            and page content. Uses advanced web scraping techniques to gather comprehensive information
            about web pages including titles, descriptions, images, and structured content.
            Supports concurrent processing of multiple URLs for efficient batch analysis.
        </behavior>
        <when_to_use>
            Use when you need to extract metadata from specific URLs, analyze web page content,
            or gather structured information from web resources. Essential for content analysis,
            link previews, and web resource documentation.
        </when_to_use>
        <intent>
            To provide comprehensive web page analysis and metadata extraction capabilities
            that support content research, link analysis, and web resource documentation.
            Enables systematic analysis of web content for organizational use.
        </intent>
        <side_effects>Outgoing HTTP requests to fetch web page content and metadata.</side_effects>
        <category>Web Analysis</category>
        <args>
            - urls: Single URL string or list of URLs to analyze (required)
            - include_content: Whether to include full page content in analysis (optional, default: False)
            - include_images: Whether to extract and analyze images from the page (optional, default: True)
            - include_structured_data: Whether to extract structured data (JSON-LD, microdata) (optional, default: True)
            - timeout: Request timeout in seconds (optional, default: 30)
        </args>
        <returns>
            Dictionary with "status" and "data" keys. When successful, "data" contains metadata for each URL including:
            - Page title and description
            - OpenGraph metadata (og:title, og:description, og:image, etc.)
            - Structured data and schema markup
            - Page content summary (if include_content=True)
            - Image information and alt text (if include_images=True)
            - URL canonical form and redirect information
        </returns>
        <raises>
            Returns error details in response if URL fetching fails due to network issues,
            invalid URLs, or page access restrictions. Handles timeout and parsing errors gracefully.
        </raises>
        <schema_constraints>
            - urls: non-empty string or list of valid URL strings
            - include_content: boolean value (default: False)
            - include_images: boolean value (default: True)
            - include_structured_data: boolean value (default: True)
            - timeout: positive integer in seconds (default: 30)
        </schema_constraints>
    </tool>
    """
}
