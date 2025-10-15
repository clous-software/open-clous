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

from services.middleware.helper_service import HelperService
helper_service = HelperService()

# Import the MCP server for direct access
from services.integrations.tools.gsuite_tools import (
    mcp,
    gdrive_search,
    gdrive_read_file,
    gdrive_list_files,
    gcal_list_events
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
            helper_service.set_user_context(user_id)
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
                helper_service.set_user_context(self.user_id)

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
                helper_service.set_user_context(self.user_id)
            
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
    
    def get_gdrive_files(self, folder_id: str = "root", max_files: int = 20) -> Dict[str, Any]:
        """
        Get files from Google Drive using MCP resources.
        
        Args:
            folder_id: The ID of the folder to list files from
            max_files: The maximum number of files to return
            
        Returns:
            A dictionary with the response
        """
        try:
            # Create a resource URI for the folder files
            resource_uri = f"gdrive://folders/{folder_id}/files"
            
            # Read the resource
            content, mime_type = self.read_resource(resource_uri)
            
            return self.format_result(content)
        except Exception as e:
            logger.error(f"Error getting Google Drive files: {str(e)}", exc_info=True)
            return {"error": f"Failed to get Google Drive files: {str(e)}"}
    
    def search_gdrive_files(self, query: str) -> Dict[str, Any]:
        """
        Search for files in Google Drive using MCP resources.
        
        Args:
            query: The search query
            
        Returns:
            A dictionary with the response
        """
        try:
            # URL encode the query to handle special characters
            encoded_query = urllib.parse.quote(query)
            
            # Create a resource URI for the search query
            resource_uri = f"gdrive://search/{encoded_query}"
            
            # Read the resource
            content, mime_type = self.read_resource(resource_uri)
            
            return self.format_result(content)
        except Exception as e:
            logger.error(f"Error searching Google Drive files: {str(e)}", exc_info=True)
            return {"error": f"Failed to search Google Drive files: {str(e)}"}
    
    def read_gdrive_file(self, file_id: str) -> Dict[str, Any]:
        """
        Read a file from Google Drive using MCP resources.
        
        Args:
            file_id: The ID of the file to read
            
        Returns:
            A dictionary with the response
        """
        try:
            # Create a resource URI for the file
            resource_uri = f"gdrive://files/{file_id}"
            
            # Read the resource
            content, mime_type = self.read_resource(resource_uri)
            
            return self.format_result(content)
        except Exception as e:
            logger.error(f"Error reading Google Drive file: {str(e)}", exc_info=True)
            return {"error": f"Failed to read Google Drive file: {str(e)}"}
    
    def list_gcal_events(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """
        List events from Google Calendar using MCP resources.
        
        Args:
            start_date: Start date in ISO format (YYYY-MM-DD)
            end_date: End date in ISO format (YYYY-MM-DD)
            
        Returns:
            A dictionary with the response
        """
        try:
            # Create a resource URI for the calendar events
            resource_uri = f"gcal://events/{start_date}/{end_date}"
            
            # Read the resource
            content, mime_type = self.read_resource(resource_uri)
            
            return self.format_result(content)
        except Exception as e:
            logger.error(f"Error listing Google Calendar events: {str(e)}", exc_info=True)
            return {"error": f"Failed to list Google Calendar events: {str(e)}"} 
        
    
    # Define MCP resources for Google Drive
    @mcp.resource("gdrive://files/{file_id}")
    def gdrive_file_resource(file_id: str) -> str:
        """
        Resource for accessing Google Drive files.
        
        Args:
            file_id: The ID of the Google Drive file
            
        Returns:
            The file content as a string
        """
        user_id = helper_service.get_user_id()
        if not user_id:
            return json.dumps({"error": "No user context set"})
        
        try:
            return gdrive_read_file(user_id=user_id, file_id=file_id)
        except Exception as e:
            logger.error(f"Error accessing Google Drive file resource: {str(e)}")
            return json.dumps({"error": str(e)})

    @mcp.resource("gdrive://folders/{folder_id}/files")
    def gdrive_folder_files_resource(folder_id: str) -> str:
        """
        Resource for listing files in a Google Drive folder.
        
        Args:
            folder_id: The ID of the Google Drive folder
            
        Returns:
            JSON string with the list of files
        """
        user_id = helper_service.get_user_id()
        if not user_id:
            return json.dumps({"error": "No user context set"})
        
        try:
            return gdrive_list_files(user_id=user_id, folder_id=folder_id)
        except Exception as e:
            logger.error(f"Error accessing Google Drive folder resource: {str(e)}")
            return json.dumps({"error": str(e)})

    @mcp.resource("gdrive://search/{query}")
    def gdrive_search_resource(query: str) -> str:
        """
        Resource for searching Google Drive files.
        
        Args:
            query: The search query
            
        Returns:
            JSON string with the search results
        """
        user_id = helper_service.get_user_id()
        if not user_id:
            return json.dumps({"error": "No user context set"})
        
        try:
            return gdrive_search(user_id=user_id, query=query)
        except Exception as e:
            logger.error(f"Error accessing Google Drive search resource: {str(e)}")
            return json.dumps({"error": str(e)})

    @mcp.resource("gcal://events/{start_date}/{end_date}")
    def gcal_events_resource(start_date: str, end_date: str) -> str:
        """
        Resource for accessing Google Calendar events.
        
        Args:
            start_date: Start date in ISO format (YYYY-MM-DD)
            end_date: End date in ISO format (YYYY-MM-DD)
            
        Returns:
            JSON string with the calendar events
        """
        user_id = helper_service.get_user_id()
        if not user_id:
            return json.dumps({"error": "No user context set"})
        
        try:
            return gcal_list_events(user_id=user_id, start_date=start_date, end_date=end_date)
        except Exception as e:
            logger.error(f"Error accessing Google Calendar events resource: {str(e)}")
            return json.dumps({"error": str(e)})