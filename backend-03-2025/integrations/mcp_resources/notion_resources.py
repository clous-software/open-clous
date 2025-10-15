"""
MCP Resources implementation for Notion integration in the Cloush server.
This module provides proper MCP resources implementation according to the MCP specification.
"""

import logging
import json
import urllib.parse
from typing import Dict, Any, Tuple, Optional, Callable, Coroutine

from mcp.server.fastmcp import FastMCP, Context
from django.conf import settings

import asyncio
from concurrent.futures import ThreadPoolExecutor
from mcp.types import Resource  # Assumed MCP SDK type

# Import the MCP server for direct access
from services.integrations.tools.notion_tools import (
    mcp,
    set_user_context,
    get_user_id,
    get_notion_tools,
    list_databases,
    query_database,
    search,
    get_block_children
)

logger = logging.getLogger(__name__)

class MCPResourceClient:
    """
    Client for interacting with MCP resources.
    Provides methods for reading resources from the MCP server.
    """
    
    def __init__(self, user_id: str = None):
        """
        Initialize the MCP resource client.
        
        Args:
            user_id: The ID of the user to set as context
        """
        self.user_id = user_id
        if user_id:
            set_user_context(user_id)
        logger.debug(f"Initialized MCP resource client for user {user_id}")

    def _run_async_operation(self, coroutine: Coroutine) -> Any:
        """
        Helper method to run an async operation in a separate thread.
        
        Args:
            coroutine: The coroutine to run
            
        Returns:
            The result of the coroutine
        """
        with ThreadPoolExecutor(max_workers=1) as executor:
            def run_async():
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                try:
                    return loop.run_until_complete(coroutine)
                finally:
                    loop.close()
            
            return executor.submit(run_async).result()
    
    def read_resource(self, resource_uri: str) -> Tuple[str, str]:
        """
        Read a resource from the MCP server.
        
        Args:
            resource_uri: The URI of the resource to read
            
        Returns:
            A tuple of (content, mime_type)
        """
        try:
            logger.debug(f"Reading MCP resource: {resource_uri}")
            
            # Ensure user context is set
            if self.user_id:
                set_user_context(self.user_id)

            # Execute the async function using our helper method
            result = self._run_async_operation(mcp.read_resource(resource_uri))
            
            # Check if result is a tuple; if not, assign a default mime type.
            if isinstance(result, tuple) and len(result) == 2:
                content, mime_type = result
            else:
                content = result
                mime_type = "text/plain"  # Default MIME type if not provided
                
            return content, mime_type

        except Exception as e:
            logger.error(f"Error reading MCP resource {resource_uri}: {str(e)}", exc_info=True)
            error_message = json.dumps({"error": f"Failed to read resource {resource_uri}: {str(e)}"})
            return error_message, "application/json"
    
    def list_resources(self) -> Dict[str, Any]:
        """
        List available resources from the MCP server.
        
        Returns:
            A dictionary of available resources
        """
        try:
            logger.debug("Listing MCP resources")
            
            # Ensure user context is set
            if self.user_id:
                set_user_context(self.user_id)
            
            # Use our helper method to handle the async call
            resources = self._run_async_operation(mcp.list_resources())
            
            return resources
        except Exception as e:
            logger.error(f"Error listing MCP resources: {str(e)}", exc_info=True)
            return {"error": f"Failed to list resources: {str(e)}"}
    
    def format_result(self, result: Any) -> Dict[str, Any]:
        """
        Format the result from an MCP resource.
        
        Args:
            result: The result to format
            
        Returns:
            A formatted dictionary
        """
        if isinstance(result, str):
            try:
                # Try to parse as JSON
                return {"response": json.loads(result)}
            except json.JSONDecodeError:
                # Return as plain text
                return {"response": result}
        elif isinstance(result, dict):
            # If it already has a response key, return as is
            if "response" in result:
                return result
            # Otherwise wrap it
            return {"response": result}
        else:
            return {"response": str(result)}
    
    def get_notion_databases(self) -> Dict[str, Any]:
        """
        Get all accessible Notion databases using MCP resources.
        
        Returns:
            A dictionary with the response
        """
        try:
            # Create a resource URI for databases
            resource_uri = "notion://databases"
            
            # Read the resource
            content, mime_type = self.read_resource(resource_uri)
            
            return self.format_result(content)
        except Exception as e:
            logger.error(f"Error getting Notion databases: {str(e)}", exc_info=True)
            return {"error": f"Failed to get Notion databases: {str(e)}"}
    
    def get_notion_database_pages(self, database_id: str, filter_json: str = None) -> Dict[str, Any]:
        """
        Get pages from a Notion database using MCP resources.
        
        Args:
            database_id: The ID of the database to query
            filter_json: Optional JSON string with filter conditions
            
        Returns:
            A dictionary with the response
        """
        try:
            # Create a resource URI for the database pages
            resource_uri = f"notion://databases/{database_id}/pages"
            
            # Add filter if provided
            if filter_json:
                # URL encode the filter to handle special characters
                encoded_filter = urllib.parse.quote(filter_json)
                resource_uri = f"{resource_uri}?filter={encoded_filter}"
            
            # Read the resource
            content, mime_type = self.read_resource(resource_uri)
            
            return self.format_result(content)
        except Exception as e:
            logger.error(f"Error getting Notion database pages: {str(e)}", exc_info=True)
            return {"error": f"Failed to get Notion database pages: {str(e)}"}
    
    def get_notion_page_content(self, page_id: str) -> Dict[str, Any]:
        """
        Get a Notion page's content using MCP resources.
        
        Args:
            page_id: The ID of the page to retrieve
            
        Returns:
            A dictionary with the response
        """
        try:
            # Create a resource URI for the page content
            resource_uri = f"notion://pages/{page_id}/content"
            
            # Read the resource
            content, mime_type = self.read_resource(resource_uri)
            
            return self.format_result(content)
        except Exception as e:
            logger.error(f"Error getting Notion page content: {str(e)}", exc_info=True)
            return {"error": f"Failed to get Notion page content: {str(e)}"}
    
    def search_notion(self, query: str) -> Dict[str, Any]:
        """
        Search Notion content using MCP resources.
        
        Args:
            query: The search query text
            
        Returns:
            A dictionary with the response
        """
        try:
            # URL encode the query to handle special characters
            encoded_query = urllib.parse.quote(query)
            
            # Create a resource URI for the search query
            resource_uri = f"notion://search/{encoded_query}"
            
            # Read the resource
            content, mime_type = self.read_resource(resource_uri)
            
            return self.format_result(content)
        except Exception as e:
            logger.error(f"Error searching Notion: {str(e)}", exc_info=True)
            return {"error": f"Failed to search Notion: {str(e)}"}

def get_notion_resources():
    """
    Returns a list of resource definitions for Notion integration.
    """
    resources = [
        Resource(
            name="Notion Databases",
            description="Resource representing accessible Notion databases.",
            configuration={}
        ),
        Resource(
            name="Notion Pages",
            description="Resource representing Notion pages and their metadata.",
            configuration={}
        ),
        Resource(
            name="Notion Blocks",
            description="Resource representing Notion block content.",
            configuration={}
        ),
        Resource(
            name="Notion Search",
            description="Resource for searching Notion content.",
            configuration={}
        )
    ]
    return resources

# Define MCP resources for Notion
@mcp.resource("notion://databases")
def notion_databases_resource() -> str:
    """
    Resource for accessing all Notion databases.
    
    Returns:
        JSON string with list of databases
    """
    user_id = get_user_id()
    if not user_id:
        return json.dumps({"error": "No user context set"})
    
    try:
        return list_databases(user_id=user_id)
    except Exception as e:
        logger.error(f"Error accessing Notion databases resource: {str(e)}")
        return json.dumps({"error": str(e)})

@mcp.resource("notion://databases/{database_id}/pages")
def notion_database_pages_resource(database_id: str, filter: str = None) -> str:
    """
    Resource for accessing pages within a Notion database.
    
    Args:
        database_id: The ID of the Notion database
        filter: Optional filter conditions as a JSON string
        
    Returns:
        JSON string with the database pages
    """
    user_id = get_user_id()
    if not user_id:
        return json.dumps({"error": "No user context set"})
    
    try:
        # Parse filter if provided
        filter_dict = None
        if filter:
            try:
                filter_dict = json.loads(filter)
            except json.JSONDecodeError:
                return json.dumps({"error": "Invalid filter JSON"})
        
        return query_database(user_id=user_id, database_id=database_id, filter=filter_dict)
    except Exception as e:
        logger.error(f"Error accessing Notion database pages resource: {str(e)}")
        return json.dumps({"error": str(e)})

@mcp.resource("notion://pages/{page_id}/content")
def notion_page_content_resource(page_id: str) -> str:
    """
    Resource for accessing a Notion page's content.
    
    Args:
        page_id: The ID of the Notion page
        
    Returns:
        JSON string with the page content
    """
    user_id = get_user_id()
    if not user_id:
        return json.dumps({"error": "No user context set"})
    
    try:
        return get_block_children(user_id=user_id, block_id=page_id)
    except Exception as e:
        logger.error(f"Error accessing Notion page content resource: {str(e)}")
        return json.dumps({"error": str(e)})

@mcp.resource("notion://search/{query}")
def notion_search_resource(query: str) -> str:
    """
    Resource for searching Notion content.
    
    Args:
        query: The search query
        
    Returns:
        JSON string with the search results
    """
    user_id = get_user_id()
    if not user_id:
        return json.dumps({"error": "No user context set"})
    
    try:
        return search(user_id=user_id, query=query)
    except Exception as e:
        logger.error(f"Error accessing Notion search resource: {str(e)}")
        return json.dumps({"error": str(e)})
