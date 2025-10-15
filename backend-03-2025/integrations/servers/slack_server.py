"""
Advanced MCP Client for Slack Integration.
This client provides a sophisticated interface for interacting with Slack services
through the Model Context Protocol (MCP).
"""

import json
import logging
import asyncio
import re
from typing import Dict, Any, List, Optional, Union, Tuple, Callable, Awaitable
from functools import wraps
from datetime import datetime, timedelta

from django.conf import settings



logger = logging.getLogger(__name__)

# Type definitions for better type hinting
MCPResult = Dict[str, Any]
MCPToolFunction = Callable[..., Union[str, Dict[str, Any]]]
AsyncMCPToolFunction = Callable[..., Awaitable[Union[str, Dict[str, Any]]]]

class SlackServerError(Exception):
    """Exception raised for Slack server errors."""
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

async def async_handle_result(func):
    """
    Decorator to standardize result handling for async MCP tool functions.
    Parses JSON strings and handles errors consistently.
    """
    @wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            result = await func(*args, **kwargs)
            
            # If result is already a dict, return it
            if isinstance(result, dict):
                return result
                
            # If result is a string, try to parse it as JSON
            if isinstance(result, str):
                try:
                    return json.loads(result)
                except json.JSONDecodeError:
                    # If it's not valid JSON, return it as text content
                    return {"text": result, "ok": True}
            
            return result
        except Exception as e:
            logger.exception(f"Error in {func.__name__}: {str(e)}")
            return {"error": str(e), "ok": False}
    
    return wrapper

class SlackServer:
    """
    Client for interacting with Slack API through MCP.
    Provides methods for accessing channels, messages, and users.
    """
    
    def __init__(self, user_id: Optional[str] = None):
        """
        Initialize the Slack client.
        
        Args:
            user_id: Optional user ID to set as the context
        """
        # Import MCP functions directly
        from services.tools.integrations.slack_tools import (
            # User context management

            slack_list_channels,
            slack_post_message,
            slack_reply_to_thread,
            slack_add_reaction,
            slack_get_channel_history,
            slack_get_thread_replies,
            slack_get_users,
            slack_get_user_profile,
            slack_search_messages,
            slack_get_channel_info
        )
        self.slack_list_channels = slack_list_channels
        self.slack_post_message = slack_post_message
        self.slack_reply_to_thread = slack_reply_to_thread
        self.slack_add_reaction = slack_add_reaction
        self.slack_get_channel_history = slack_get_channel_history
        self.slack_get_thread_replies = slack_get_thread_replies
        self.slack_get_users = slack_get_users
        self.slack_get_user_profile = slack_get_user_profile
        self.slack_search_messages = slack_search_messages
        self.slack_get_channel_info = slack_get_channel_info

        from services.middleware.helper_service import HelperService
        helper_service = HelperService()
        
        if user_id:
            helper_service.set_user_context(user_id)
        self.user_id = user_id or helper_service.get_user_id()
    
    @handle_result
    def list_channels(self, limit: int = 100, cursor: Optional[str] = None, user_id: Optional[str] = None) -> MCPResult:
        """
        List public channels in the workspace with pagination.
        
        Args:
            limit: Maximum number of channels to return (default 100, max 200)
            cursor: Pagination cursor for next page of results
            user_id: Optional user ID to override the client's user context
            
        Returns:
            Dictionary with channel information
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            raise SlackServerError("User ID is required")
            
        return self.slack_list_channels(user_id=effective_user_id, limit=limit, cursor=cursor)
    
    @handle_result
    def post_message(self, channel_id: str, text: str, user_id: Optional[str] = None) -> MCPResult:
        """
        Post a new message to a Slack channel.
        
        Args:
            channel_id: The ID of the channel to post to
            text: The message text to post
            user_id: Optional user ID to override the client's user context
            
        Returns:
            Dictionary with the result of the operation
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            raise SlackServerError("User ID is required")
            
        return self.slack_post_message(user_id=effective_user_id, channel_id=channel_id, text=text)
    
    @handle_result
    def reply_to_thread(self, channel_id: str, thread_ts: str, text: str, user_id: Optional[str] = None) -> MCPResult:
        """
        Reply to a specific message thread in Slack.
        
        Args:
            channel_id: The ID of the channel containing the thread
            thread_ts: The timestamp of the parent message
            text: The reply text
            user_id: Optional user ID to override the client's user context
            
        Returns:
            Dictionary with the result of the operation
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            raise SlackServerError("User ID is required")
            
        return self.slack_reply_to_thread(user_id=effective_user_id, channel_id=channel_id, thread_ts=thread_ts, text=text)
    
    @handle_result
    def add_reaction(self, channel_id: str, timestamp: str, reaction: str, user_id: Optional[str] = None) -> MCPResult:
        """
        Add a reaction emoji to a message.
        
        Args:
            channel_id: The ID of the channel containing the message
            timestamp: The timestamp of the message to react to
            reaction: The name of the emoji reaction (without ::)
            user_id: Optional user ID to override the client's user context
            
        Returns:
            Dictionary with the result of the operation
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            raise SlackServerError("User ID is required")
            
        return self.slack_add_reaction(user_id=effective_user_id, channel_id=channel_id, timestamp=timestamp, reaction=reaction)
    
    @handle_result
    def get_channel_history(self, channel_id: str, limit: int = 10, user_id: Optional[str] = None) -> MCPResult:
        """
        Get recent messages from a channel.
        
        Args:
            channel_id: The ID of the channel
            limit: Number of messages to retrieve (default 10)
            user_id: Optional user ID to override the client's user context
            
        Returns:
            Dictionary with channel messages
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            raise SlackServerError("User ID is required")
            
        return self.slack_get_channel_history(user_id=effective_user_id, channel_id=channel_id, limit=limit)
    
    @handle_result
    def get_thread_replies(self, channel_id: str, thread_ts: str, user_id: Optional[str] = None) -> MCPResult:
        """
        Get all replies in a message thread.
        
        Args:
            channel_id: The ID of the channel containing the thread
            thread_ts: The timestamp of the parent message
            user_id: Optional user ID to override the client's user context
            
        Returns:
            Dictionary with thread replies
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            raise SlackServerError("User ID is required")
            
        return self.slack_get_thread_replies(user_id=effective_user_id, channel_id=channel_id, thread_ts=thread_ts)
    
    @handle_result
    def get_users(self, limit: int = 100, cursor: Optional[str] = None, user_id: Optional[str] = None) -> MCPResult:
        """
        Get a list of all users in the workspace with their basic profile information.
        
        Args:
            limit: Maximum number of users to return (default 100, max 200)
            cursor: Pagination cursor for next page of results
            user_id: Optional user ID to override the client's user context
            
        Returns:
            Dictionary with user information
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            raise SlackServerError("User ID is required")
            
        return self.slack_get_users(user_id=effective_user_id, limit=limit, cursor=cursor)
    
    @handle_result
    def get_user_profile(self, user_id_to_fetch: str, user_id: Optional[str] = None) -> MCPResult:
        """
        Get detailed profile information for a specific user.
        
        Args:
            user_id_to_fetch: The ID of the user to get profile information for
            user_id: Optional user ID to override the client's user context
            
        Returns:
            Dictionary with user profile information
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            raise SlackServerError("User ID is required")
            
        return self.slack_get_user_profile(user_id=effective_user_id, user_id_to_fetch=user_id_to_fetch)
    
    @handle_result
    def search_messages(self, query: str, count: int = 20, user_id: Optional[str] = None) -> MCPResult:
        """
        Search for messages in public channels.
        
        Args:
            query: The search query
            count: Number of results to return (default 20)
            user_id: Optional user ID to override the client's user context
            
        Returns:
            Dictionary with search results
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            raise SlackServerError("User ID is required")
            
        return self.slack_search_messages(user_id=effective_user_id, query=query, count=count)
    
    @handle_result
    def get_channel_info(self, channel_id: str, user_id: Optional[str] = None) -> MCPResult:
        """
        Get information about a channel.
        
        Args:
            channel_id: The ID of the channel
            user_id: Optional user ID to override the client's user context
            
        Returns:
            Dictionary with channel information
        """
        effective_user_id = user_id or self.user_id
        if not effective_user_id:
            raise SlackServerError("User ID is required")
            
        return self.slack_get_channel_info(user_id=effective_user_id, channel_id=channel_id)
    
    @handle_result
    def create_channel(self, name: str, is_private: bool = False, team_id: Optional[str] = None) -> MCPResult:
        """
        Create a new channel in the workspace.
        
        Args:
            name: The name of the channel to create (without #)
            is_private: Whether to create a private channel (default False)
            team_id: Optional team ID for multi-workspace apps
            
        Returns:
            Dictionary with the result of the operation
        """
        if not name:
            raise SlackServerError("Channel name is required")
            
        # Clean the channel name according to Slack's rules
        # Remove any # prefix if present
        name = name.lstrip('#')
        # Convert to lowercase and replace spaces/special chars with underscores
        name = re.sub(r'[^a-z0-9_-]', '_', name.lower())
        
        # Call the appropriate Slack API method
        method = "conversations.create"
        params = {
            "name": name,
            "is_private": is_private
        }
        if team_id:
            params["team_id"] = team_id
            
        return self._call_slack_api(method, params)
    
    @handle_result
    def archive_channel(self, channel_id: str) -> MCPResult:
        """
        Archive a channel.
        
        Args:
            channel_id: The ID of the channel to archive
            
        Returns:
            Dictionary with the result of the operation
        """
        if not channel_id:
            raise SlackServerError("Channel ID is required")
            
        method = "conversations.archive"
        params = {"channel": channel_id}
        return self._call_slack_api(method, params)
    
    @handle_result
    def unarchive_channel(self, channel_id: str) -> MCPResult:
        """
        Unarchive a channel.
        
        Args:
            channel_id: The ID of the channel to unarchive
            
        Returns:
            Dictionary with the result of the operation
        """
        if not channel_id:
            raise SlackServerError("Channel ID is required")
            
        method = "conversations.unarchive"
        params = {"channel": channel_id}
        return self._call_slack_api(method, params)
    
    @handle_result
    def invite_to_channel(self, channel_id: str, users: List[str]) -> MCPResult:
        """
        Invite users to a channel.
        
        Args:
            channel_id: The ID of the channel to invite users to
            users: List of user IDs to invite
            
        Returns:
            Dictionary with the result of the operation
        """
        if not channel_id or not users:
            raise SlackServerError("Channel ID and users list are required")
            
        method = "conversations.invite"
        params = {
            "channel": channel_id,
            "users": ",".join(users)
        }
        return self._call_slack_api(method, params)
    
    @handle_result
    def kick_from_channel(self, channel_id: str, user_to_kick: str) -> MCPResult:
        """
        Remove a user from a channel.
        
        Args:
            channel_id: The ID of the channel to remove the user from
            user_to_kick: The ID of the user to remove
            
        Returns:
            Dictionary with the result of the operation
        """
        if not channel_id or not user_to_kick:
            raise SlackServerError("Channel ID and user to kick are required")
            
        method = "conversations.kick"
        params = {
            "channel": channel_id,
            "user": user_to_kick
        }
        return self._call_slack_api(method, params)
    
    @handle_result
    def set_channel_topic(self, channel_id: str, topic: str) -> MCPResult:
        """
        Set the topic for a channel.
        
        Args:
            channel_id: The ID of the channel
            topic: The new topic text
            
        Returns:
            Dictionary with the result of the operation
        """
        if not channel_id or not topic:
            raise SlackServerError("Channel ID and topic are required")
            
        method = "conversations.setTopic"
        params = {
            "channel": channel_id,
            "topic": topic
        }
        return self._call_slack_api(method, params)
    
    @handle_result
    def set_channel_purpose(self, channel_id: str, purpose: str) -> MCPResult:
        """
        Set the purpose for a channel.
        
        Args:
            channel_id: The ID of the channel
            purpose: The new purpose text
            
        Returns:
            Dictionary with the result of the operation
        """
        if not channel_id or not purpose:
            raise SlackServerError("Channel ID and purpose are required")
            
        method = "conversations.setPurpose"
        params = {
            "channel": channel_id,
            "purpose": purpose
        }
        return self._call_slack_api(method, params)
    
    @handle_result
    def rename_channel(self, channel_id: str, new_name: str) -> MCPResult:
        """
        Rename a channel.
        
        Args:
            channel_id: The ID of the channel
            new_name: The new name for the channel (without #)
            
        Returns:
            Dictionary with the result of the operation
        """
        if not channel_id or not new_name:
            raise SlackServerError("Channel ID and new name are required")
            
        # Clean the new name according to Slack's rules
        new_name = new_name.lstrip('#')
        new_name = re.sub(r'[^a-z0-9_-]', '_', new_name.lower())
        
        method = "conversations.rename"
        params = {
            "channel": channel_id,
            "name": new_name
        }
        return self._call_slack_api(method, params)
    
    @handle_result
    def join_channel(self, channel_id: str) -> MCPResult:
        """
        Join a channel.
        
        Args:
            channel_id: The ID of the channel to join
            
        Returns:
            Dictionary with the result of the operation
        """
        if not channel_id:
            raise SlackServerError("Channel ID is required")
            
        method = "conversations.join"
        params = {"channel": channel_id}
        return self._call_slack_api(method, params)
    
    @handle_result
    def leave_channel(self, channel_id: str) -> MCPResult:
        """
        Leave a channel.
        
        Args:
            channel_id: The ID of the channel to leave
            
        Returns:
            Dictionary with the result of the operation
        """
        if not channel_id:
            raise SlackServerError("Channel ID is required")
            
        method = "conversations.leave"
        params = {"channel": channel_id}
        return self._call_slack_api(method, params)
    
    # def _call_slack_api(self, method: str, params: Dict[str, Any]) -> Dict[str, Any]:
    #     """
    #     Helper method to call the Slack API.
        
    #     Args:
    #         method: The Slack API method to call
    #         params: The parameters to pass to the method
            
    #     Returns:
    #         Dictionary with the API response
    #     """
    #     try:
    #         # Get the Slack client from settings
    #         from slack_sdk import WebClient
    #         from slack_sdk.errors import SlackApiError
            
    #         client = WebClient(token=settings.SLACK_BOT_TOKEN)
            
    #         # Call the API method
    #         response = getattr(client, method)(**params)
            
    #         # Return the response data
    #         return response.data
            
    #     except Exception as e:
    #         logger.exception(f"Error calling Slack API {method}: {e}")
    #         raise SlackServerError(f"Error calling Slack API: {str(e)}")