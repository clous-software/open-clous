"""
MCP Resources implementation for the Cloush server.
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

# Import the MCP server for direct access
from services.integrations.tools.perplexity_tools import (
    mcp,
    set_user_context,
    get_user_id,
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
    