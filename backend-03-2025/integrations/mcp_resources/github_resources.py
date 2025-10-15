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
from services.integrations.tools.github_tools import (
    mcp,
    set_user_context,
    get_user_id,
    github_get_user_info,
    github_list_repos,
    github_get_repo,
    github_get_repo_contents,
    github_get_repo_languages,
    github_get_repo_readme,
    github_get_repo_contributors,
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
    
    def get_github_user_info(self) -> Dict[str, Any]:
        """
        Get information about the authenticated GitHub user.
        
        Returns:
            A dictionary with the response
        """
        try:
            # Create a resource URI for the user info
            resource_uri = "github://user"
            
            # Read the resource
            content, mime_type = self.read_resource(resource_uri)
            
            return self.format_result(content)
        except Exception as e:
            logger.error(f"Error getting GitHub user info: {str(e)}", exc_info=True)
            return {"error": f"Failed to get GitHub user info: {str(e)}"}
    
    def get_github_repos(self, sort: str = "updated", per_page: int = 20) -> Dict[str, Any]:
        """
        Get repositories for the authenticated GitHub user.
        
        Args:
            sort: How to sort the repositories (created, updated, pushed, full_name)
            per_page: Number of repositories to return per page
            
        Returns:
            A dictionary with the response
        """
        try:
            # Create a resource URI for the repositories
            params = urllib.parse.urlencode({"sort": sort, "per_page": per_page})
            resource_uri = f"github://repos?{params}"
            
            # Read the resource
            content, mime_type = self.read_resource(resource_uri)
            
            return self.format_result(content)
        except Exception as e:
            logger.error(f"Error getting GitHub repositories: {str(e)}", exc_info=True)
            return {"error": f"Failed to get GitHub repositories: {str(e)}"}
    
    def get_github_repo(self, owner: str, repo: str) -> Dict[str, Any]:
        """
        Get information about a specific GitHub repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            
        Returns:
            A dictionary with the response
        """
        try:
            # Create a resource URI for the repository
            resource_uri = f"github://repos/{owner}/{repo}"
            
            # Read the resource
            content, mime_type = self.read_resource(resource_uri)
            
            return self.format_result(content)
        except Exception as e:
            logger.error(f"Error getting GitHub repository: {str(e)}", exc_info=True)
            return {"error": f"Failed to get GitHub repository: {str(e)}"}
    
    def get_github_repo_contents(self, owner: str, repo: str, path: str = "", ref: str = None) -> Dict[str, Any]:
        """
        Get contents of a file or directory in a GitHub repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            path: Path to the file or directory (optional, defaults to repository root)
            ref: The name of the commit/branch/tag (optional)
            
        Returns:
            A dictionary with the response
        """
        try:
            # Create a resource URI for the repository contents
            params = {}
            if ref:
                params["ref"] = ref
            
            query_string = f"?{urllib.parse.urlencode(params)}" if params else ""
            
            if path:
                resource_uri = f"github://repos/{owner}/{repo}/contents/{path}{query_string}"
            else:
                resource_uri = f"github://repos/{owner}/{repo}/contents{query_string}"
            
            # Read the resource
            content, mime_type = self.read_resource(resource_uri)
            
            return self.format_result(content)
        except Exception as e:
            logger.error(f"Error getting GitHub repository contents: {str(e)}", exc_info=True)
            return {"error": f"Failed to get GitHub repository contents: {str(e)}"}
    
    def get_github_repo_readme(self, owner: str, repo: str, ref: str = None) -> Dict[str, Any]:
        """
        Get the README file of a GitHub repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            ref: The name of the commit/branch/tag (optional)
            
        Returns:
            A dictionary with the response
        """
        try:
            # Create a resource URI for the repository README
            params = {}
            if ref:
                params["ref"] = ref
            
            query_string = f"?{urllib.parse.urlencode(params)}" if params else ""
            resource_uri = f"github://repos/{owner}/{repo}/readme{query_string}"
            
            # Read the resource
            content, mime_type = self.read_resource(resource_uri)
            
            return self.format_result(content)
        except Exception as e:
            logger.error(f"Error getting GitHub repository README: {str(e)}", exc_info=True)
            return {"error": f"Failed to get GitHub repository README: {str(e)}"}

    # Define MCP resources for GitHub

    @mcp.resource("github://user")
    def github_user_resource() -> str:
        """
        Resource for accessing GitHub user information.
        
        Returns:
            User information as a JSON string
        """
        user_id = get_user_id()
        if not user_id:
            return json.dumps({"error": "No user context set"})
        
        try:
            return github_get_user_info(user_id=user_id)
        except Exception as e:
            logger.error(f"Error accessing GitHub user resource: {str(e)}")
            return json.dumps({"error": str(e)})

    @mcp.resource("github://repos")
    def github_repos_resource(sort: str = "updated", per_page: int = 20) -> str:
        """
        Resource for listing GitHub repositories.
        
        Args:
            sort: How to sort the repositories (created, updated, pushed, full_name)
            per_page: Number of repositories to return per page
            
        Returns:
            JSON string with the list of repositories
        """
        user_id = get_user_id()
        if not user_id:
            return json.dumps({"error": "No user context set"})
        
        try:
            return github_list_repos(user_id=user_id, sort=sort, per_page=per_page)
        except Exception as e:
            logger.error(f"Error accessing GitHub repositories resource: {str(e)}")
            return json.dumps({"error": str(e)})

    @mcp.resource("github://repos/{owner}/{repo}")
    def github_repo_resource(owner: str, repo: str) -> str:
        """
        Resource for accessing a specific GitHub repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            
        Returns:
            JSON string with repository information
        """
        user_id = get_user_id()
        if not user_id:
            return json.dumps({"error": "No user context set"})
        
        try:
            return github_get_repo(user_id=user_id, owner=owner, repo=repo)
        except Exception as e:
            logger.error(f"Error accessing GitHub repository resource: {str(e)}")
            return json.dumps({"error": str(e)})

    @mcp.resource("github://repos/{owner}/{repo}/contents/{path}")
    def github_repo_contents_resource(owner: str, repo: str, path: str, ref: str = None) -> str:
        """
        Resource for accessing contents of a file or directory in a GitHub repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            path: Path to the file or directory
            ref: The name of the commit/branch/tag (optional)
            
        Returns:
            JSON string with contents information
        """
        user_id = get_user_id()
        if not user_id:
            return json.dumps({"error": "No user context set"})
        
        try:
            return github_get_repo_contents(user_id=user_id, owner=owner, repo=repo, path=path, ref=ref)
        except Exception as e:
            logger.error(f"Error accessing GitHub repository contents resource: {str(e)}")
            return json.dumps({"error": str(e)})

    @mcp.resource("github://repos/{owner}/{repo}/contents")
    def github_repo_root_contents_resource(owner: str, repo: str, ref: str = None) -> str:
        """
        Resource for accessing contents of the root directory in a GitHub repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            ref: The name of the commit/branch/tag (optional)
            
        Returns:
            JSON string with contents information
        """
        user_id = get_user_id()
        if not user_id:
            return json.dumps({"error": "No user context set"})
        
        try:
            return github_get_repo_contents(user_id=user_id, owner=owner, repo=repo, path="", ref=ref)
        except Exception as e:
            logger.error(f"Error accessing GitHub repository root contents resource: {str(e)}")
            return json.dumps({"error": str(e)})

    @mcp.resource("github://repos/{owner}/{repo}/languages")
    def github_repo_languages_resource(owner: str, repo: str) -> str:
        """
        Resource for accessing languages used in a GitHub repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            
        Returns:
            JSON string with languages information
        """
        user_id = get_user_id()
        if not user_id:
            return json.dumps({"error": "No user context set"})
        
        try:
            return github_get_repo_languages(user_id=user_id, owner=owner, repo=repo)
        except Exception as e:
            logger.error(f"Error accessing GitHub repository languages resource: {str(e)}")
            return json.dumps({"error": str(e)})

    @mcp.resource("github://repos/{owner}/{repo}/readme")
    def github_repo_readme_resource(owner: str, repo: str, ref: str = None) -> str:
        """
        Resource for accessing the README file of a GitHub repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            ref: The name of the commit/branch/tag (optional)
            
        Returns:
            JSON string with README information
        """
        user_id = get_user_id()
        if not user_id:
            return json.dumps({"error": "No user context set"})
        
        try:
            return github_get_repo_readme(user_id=user_id, owner=owner, repo=repo, ref=ref)
        except Exception as e:
            logger.error(f"Error accessing GitHub repository README resource: {str(e)}")
            return json.dumps({"error": str(e)})

    @mcp.resource("github://repos/{owner}/{repo}/contributors")
    def github_repo_contributors_resource(owner: str, repo: str) -> str:
        """
        Resource for accessing contributors to a GitHub repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            
        Returns:
            JSON string with contributors information
        """
        user_id = get_user_id()
        if not user_id:
            return json.dumps({"error": "No user context set"})
        
        try:
            return github_get_repo_contributors(user_id=user_id, owner=owner, repo=repo)
        except Exception as e:
            logger.error(f"Error accessing GitHub repository contributors resource: {str(e)}")
            return json.dumps({"error": str(e)})
