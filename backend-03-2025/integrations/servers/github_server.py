"""
GitHub API Client for integrating with GitHub repositories.
This client provides an interface for authenticating users and accessing their repositories
through the Model Context Protocol (MCP).
"""

import logging
import json
import uuid
from typing import Dict, Any, List, Optional, Union, Callable, Awaitable
import requests
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from functools import wraps

from users.models import User, Auth

# Import MCP functions directly
from services.tools.integrations.github_tools import (
    # GitHub user functions
    github_get_user_info,
    github_list_repos,
    
    # GitHub repo functions
    github_get_repo,
    github_get_repo_contents,
    github_get_repo_languages,
    github_get_repo_readme,
    github_get_repo_contributors,
    
    # User context management
    set_user_context
)

# Configure logging
logger = logging.getLogger(__name__)

# Type definitions for better type hinting
MCPResult = Dict[str, Any]
MCPToolFunction = Callable[..., Union[str, Dict[str, Any]]]
AsyncMCPToolFunction = Callable[..., Awaitable[Union[str, Dict[str, Any]]]]

class GitHubServerError(Exception):
    """Exception raised for GitHub server errors."""
    pass

def handle_result(func):
    """
    Decorator to standardize result handling for MCP tool functions.
    Parses JSON strings and handles errors consistently.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            result = func(*args, **kwargs)
            
            # Parse the result if it's a string (JSON)
            if isinstance(result, str):
                try:
                    return json.loads(result)
                except json.JSONDecodeError:
                    # If it's not JSON, return it as is in a result field
                    return {"result": result, "success": True}
            else:
                # If it's already a dict or other object, return it as is
                return {"result": result, "success": True}
                
        except Exception as e:
            logger.exception(f"Error in MCP tool {func.__name__}: {e}")
            return {"error": str(e), "success": False}
    
    return wrapper

class GitHubServer:
    """
    Client for interacting with the GitHub API through MCP.
    Provides methods for authentication, repository access, and user information.
    """
    
    def __init__(self, user_id: Optional[str] = None, access_token: Optional[str] = None):
        """
        Initialize the GitHub API client.
        
        Args:
            user_id: Optional user ID to use for all requests
            access_token: Optional access token for authenticated requests
        """
        self.user_id = user_id
        self.access_token = access_token
        self.api_base_url = "https://api.github.com"
        
        if user_id:
            set_user_context(user_id)
            
        logger.debug(f"Initialized GitHub API client for user_id: {user_id}")
    
    def _make_request(self, method: str, endpoint: str, data: Optional[Dict[str, Any]] = None, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Make a request to the GitHub API.
        
        Args:
            method: HTTP method (GET, POST, etc.)
            endpoint: API endpoint (without base URL)
            data: Optional data for POST/PUT requests
            params: Optional query parameters
            
        Returns:
            Response data as dictionary
        """
        url = f"{self.api_base_url}/{endpoint.lstrip('/')}"
        headers = {
            "Accept": "application/vnd.github.v3+json"
        }
        
        # Use the instance access token or try to get one for the user
        access_token = self.access_token
        if not access_token and self.user_id:
            try:
                user = User.objects.get(id=self.user_id)
                auth = Auth.objects.filter(referred=user).first()
                
                if auth and auth.github_access_token:
                    access_token = auth.get_valid_github_token()
            except Exception as e:
                logger.error(f"Error getting GitHub token for user {self.user_id}: {e}")
                raise GitHubServerError(f"Failed to get GitHub token: {str(e)}")
        
        if access_token:
            headers["Authorization"] = f"token {access_token}"
            
        try:
            response = requests.request(
                method=method,
                url=url,
                json=data if method.upper() in ["POST", "PUT", "PATCH"] else None,
                params=params,
                headers=headers
            )
            
            response.raise_for_status()
            
            if response.status_code == 204:  # No content
                return {}
                
            return response.json()
            
        except requests.exceptions.RequestException as e:
            logger.error(f"GitHub API request failed: {e}")
            if hasattr(e, 'response') and e.response is not None:
                logger.error(f"Response status: {e.response.status_code}, Response body: {e.response.text}")
            raise GitHubServerError(f"GitHub API request failed: {str(e)}")
    
    @handle_result
    def get_user_info(self, user_id: Optional[str] = None) -> MCPResult:
        """
        Get information about the authenticated user.
        
        Args:
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with user information
        """
        effective_user_id = user_id or self.user_id
        result = json.loads(github_get_user_info(user_id=effective_user_id))
        
        if not result.get("success", False):
            error_msg = result.get("error", "Unknown error getting user info")
            logger.error(f"GitHub get_user_info error: {error_msg}")
            return {"error": error_msg, "success": False}
            
        return result
    
    @handle_result
    def list_repositories(self, sort: str = "updated", per_page: int = 100, user_id: Optional[str] = None) -> MCPResult:
        """
        Get repositories for the authenticated user.
        
        Args:
            sort: How to sort the repositories (created, updated, pushed, full_name)
            per_page: Number of repositories to return per page
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with list of repositories
        """
        effective_user_id = user_id or self.user_id
        result = json.loads(github_list_repos(user_id=effective_user_id, sort=sort, per_page=per_page))
        
        if not result.get("success", False):
            error_msg = result.get("error", "Unknown error listing repositories")
            logger.error(f"GitHub list_repositories error: {error_msg}")
            return {"error": error_msg, "success": False}
            
        return result
    
    @handle_result
    def get_repository(self, owner: str, repo: str, user_id: Optional[str] = None) -> MCPResult:
        """
        Get information about a specific repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with repository information
        """
        effective_user_id = user_id or self.user_id
        result = json.loads(github_get_repo(user_id=effective_user_id, owner=owner, repo=repo))
        
        if not result.get("success", False):
            error_msg = result.get("error", "Unknown error getting repository")
            logger.error(f"GitHub get_repository error: {error_msg}")
            return {"error": error_msg, "success": False}
            
        return result
    
    @handle_result
    def get_repository_contents(self, owner: str, repo: str, path: str = "", ref: Optional[str] = None, user_id: Optional[str] = None) -> MCPResult:
        """
        Get contents of a file or directory in a repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            path: Path to the file or directory (optional, defaults to repository root)
            ref: The name of the commit/branch/tag (optional)
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with contents information
        """
        effective_user_id = user_id or self.user_id
        result = json.loads(github_get_repo_contents(
            user_id=effective_user_id,
            owner=owner,
            repo=repo,
            path=path,
            ref=ref
        ))
        
        if not result.get("success", False):
            error_msg = result.get("error", "Unknown error getting repository contents")
            logger.error(f"GitHub get_repository_contents error: {error_msg}")
            return {"error": error_msg, "success": False}
            
        return result
    
    @handle_result
    def get_repository_languages(self, owner: str, repo: str, user_id: Optional[str] = None) -> MCPResult:
        """
        Get languages used in a repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with languages information
        """
        effective_user_id = user_id or self.user_id
        result = json.loads(github_get_repo_languages(user_id=effective_user_id, owner=owner, repo=repo))
        
        if not result.get("success", False):
            error_msg = result.get("error", "Unknown error getting repository languages")
            logger.error(f"GitHub get_repository_languages error: {error_msg}")
            return {"error": error_msg, "success": False}
            
        return result
    
    @handle_result
    def get_repository_readme(self, owner: str, repo: str, ref: Optional[str] = None, user_id: Optional[str] = None) -> MCPResult:
        """
        Get the README file of a repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            ref: The name of the commit/branch/tag (optional)
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with README information
        """
        effective_user_id = user_id or self.user_id
        result = json.loads(github_get_repo_readme(
            user_id=effective_user_id,
            owner=owner,
            repo=repo,
            ref=ref
        ))
        
        if not result.get("success", False):
            error_msg = result.get("error", "Unknown error getting repository README")
            logger.error(f"GitHub get_repository_readme error: {error_msg}")
            return {"error": error_msg, "success": False}
            
        return result
    
    @handle_result
    def get_repository_contributors(self, owner: str, repo: str, user_id: Optional[str] = None) -> MCPResult:
        """
        Get contributors to a repository.
        
        Args:
            owner: Repository owner (username or organization)
            repo: Repository name
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with contributors information
        """
        effective_user_id = user_id or self.user_id
        result = json.loads(github_get_repo_contributors(user_id=effective_user_id, owner=owner, repo=repo))
        
        if not result.get("success", False):
            error_msg = result.get("error", "Unknown error getting repository contributors")
            logger.error(f"GitHub get_repository_contributors error: {error_msg}")
            return {"error": error_msg, "success": False}
            
        return result
    
    @classmethod
    def for_user(cls, user_id: str) -> Optional['GitHubServer']:
        """
        Create a GitHub server for a specific user.
        
        Args:
            user_id: The ID of the user
            
        Returns:
            A configured GitHubServer or None if no valid token found
        """
        try:
            user = User.objects.get(id=user_id)
            
            # Find the user's GitHub auth record
            auth = Auth.objects.filter(referred=user).first()
            
            if not auth or not auth.github_access_token:
                logger.warning(f"No GitHub token found for user {user_id}")
                return None
                
            # Get a valid token (refreshing if needed)
            token = auth.get_valid_github_token()
            
            if not token:
                logger.warning(f"Failed to get valid GitHub token for user {user_id}")
                return None
                
            return cls(user_id=user_id, access_token=token)
            
        except User.DoesNotExist:
            logger.error(f"User with ID {user_id} not found")
            return None
        except Exception as e:
            logger.exception(f"Error creating GitHub client for user: {e}")
            return None

class MCPClient:
    """
    A higher-level client for GitHub API that uses the GitHubServer.
    This class is designed to be similar to other MCP clients for easier integration.
    """
    
    def __init__(self, user_id: Optional[str] = None):
        """
        Initialize the MCP Client for GitHub.
        
        Args:
            user_id: The ID of the user
        """
        self.user_id = user_id
        self.github = GitHubServer.for_user(user_id) if user_id else None
        
    def __repr__(self):
        return f"MCPClient(user_id={self.user_id})"
    
    def generate_auth_url(self, state: str, redirect_uri: Optional[str] = None, scopes: Optional[List[str]] = None) -> str:
        """
        Generate a GitHub OAuth authorization URL.
        
        Args:
            state: Random state string for CSRF protection
            redirect_uri: Optional redirect URI (must match registered URI)
            scopes: Optional list of scopes to request
            
        Returns:
            Authorization URL to redirect the user to
        """
        if not scopes:
            scopes = ["read:user", "user:email", "repo"]
            
        params = {
            "client_id": settings.GITHUB_CLIENT_ID,
            "redirect_uri": redirect_uri or settings.GITHUB_REDIRECT_URI,
            "scope": " ".join(scopes),
            "state": state,
            "allow_signup": "true"
        }
        
        # Build the query string
        query_string = "&".join([f"{key}={value}" for key, value in params.items()])
        
        return f"https://github.com/login/oauth/authorize?{query_string}"
    
    def exchange_code_for_token(self, code: str, state: str, redirect_uri: Optional[str] = None) -> Dict[str, Any]:
        """
        Exchange an authorization code for an access token.
        
        Args:
            code: Authorization code from GitHub callback
            state: State string for verification
            redirect_uri: Optional redirect URI (must match the one used in authorization)
            
        Returns:
            Dictionary with token information
        """
        data = {
            "client_id": settings.GITHUB_CLIENT_ID,
            "client_secret": settings.GITHUB_CLIENT_SECRET,
            "code": code,
            "redirect_uri": redirect_uri or settings.GITHUB_REDIRECT_URI,
            "state": state
        }
        
        try:
            response = requests.post(
                "https://github.com/login/oauth/access_token",
                data=data,
                headers={"Accept": "application/json"}
            )
            
            response.raise_for_status()
            token_data = response.json()
            
            if "error" in token_data:
                logger.error(f"GitHub token exchange error: {token_data['error']}")
                raise GitHubServerError(f"GitHub token exchange failed: {token_data.get('error_description', token_data['error'])}")
                
            # Extract token information
            result = {
                "access_token": token_data.get("access_token"),
                "token_type": token_data.get("token_type", "bearer"),
                "scope": token_data.get("scope", "").split(",")
            }
            
            # Add refresh token and expiry if provided
            if "refresh_token" in token_data:
                result["refresh_token"] = token_data["refresh_token"]
                
            if "expires_in" in token_data:
                result["expires_in"] = int(token_data["expires_in"])
                result["expires_at"] = timezone.now() + timedelta(seconds=int(token_data["expires_in"]))
                
            return result
            
        except requests.exceptions.RequestException as e:
            logger.error(f"GitHub token exchange failed: {e}")
            if hasattr(e, 'response') and e.response is not None:
                logger.error(f"Response status: {e.response.status_code}, Response body: {e.response.text}")
            raise GitHubServerError(f"Failed to exchange GitHub code for token: {str(e)}") 