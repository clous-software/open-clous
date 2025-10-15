"""
MCP Service for interacting with Model Context Protocol functions.
This module provides a compatibility layer for the existing MCPService class,
redirecting calls to the integrated MCP functions.

DEPRECATED: This module is being phased out. Use services.mcp.client.MCPClient instead.
"""

import json
import logging
import time
from typing import Dict, Any, List, Optional, Union
import openai
from django.conf import settings

from services.middleware.helper_service import HelperService
helper_service = HelperService()

# Import the new MCPClient
from services.mcp.client import MCPClient
from services.mcp.adapters import LocalPythonServer

# Import MCP functions directly (only for mapping later, not direct calling)
from services.tools.integrations.gsuite_tools import mcp as gsuite_mcp_instance
from services.tools.integrations.notion_tools import mcp as notion_mcp_instance
from services.tools.integrations.slack_tools import mcp as slack_mcp_instance

from services.context.tool import ToolContext

from services.decorators import mcp_tool
from services.tools.schemas.mcp_schemas import MCP_SERVER_SCHEMAS

logger = logging.getLogger(__name__)

class MCPService:
    """
    Service for interacting with Model Context Protocol functions.
    This class maintains backward compatibility with existing code,
    while using MCPClient internally.
    
    DEPRECATED: This class is being phased out. Use services.mcp.client.MCPClient instead.
    """
    
    def __init__(self):
        """Initialize the MCP service with OpenAI client and new MCPClient."""
        # Initialize OpenAI client for compatibility
        self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        
        # Configure MCP servers for backward compatibility
        self.mcp_servers = MCP_SERVER_SCHEMAS
        
        # Initialize the new MCPClient
        self._init_mcp_client()
        
        logger.warning("MCPService is DEPRECATED. Use services.mcp.client.MCPClient instead.")
    
    def _init_mcp_client(self):
        """Initialize the new MCPClient with all available FastMCP instances."""
        self.mcp_client = MCPClient()
        
        # Register all available FastMCP instances through LocalPythonServer adapters
        try:
            gsuite_server = LocalPythonServer(
                id="google",
                display_name="Google Workspace",
                description="Google Drive, Gmail, Calendar, Docs, and Sheets tools.",
                fast_mcp_instance=gsuite_mcp_instance
            )
            self.mcp_client.add_server(gsuite_server)
            logger.info("Registered Google Workspace server with MCPClient")
        except Exception as e:
            logger.error(f"Failed to register Google Workspace server: {e}")
            
        try:
            notion_server = LocalPythonServer(
                id="notion",
                display_name="Notion",
                description="Notion integration tools for databases and pages.",
                fast_mcp_instance=notion_mcp_instance
            )
            self.mcp_client.add_server(notion_server)
            logger.info("Registered Notion server with MCPClient")
        except Exception as e:
            logger.error(f"Failed to register Notion server: {e}")
            
        try:
            slack_server = LocalPythonServer(
                id="slack",
                display_name="Slack",
                description="Slack integration tools for messages and channels.",
                fast_mcp_instance=slack_mcp_instance
            )
            self.mcp_client.add_server(slack_server)
            logger.info("Registered Slack server with MCPClient")
        except Exception as e:
            logger.error(f"Failed to register Slack server: {e}")
    
    def mcp_tool_router(self, user_input: str, company=None, user=None, tool_name: Optional[str] = None, force_agent: bool = False, **kwargs) -> Dict[str, Any]:
        """
        Route user input to the appropriate MCP tool.
        
        DEPRECATED: Use services.mcp.client.MCPClient.call_tool instead.
        
        Args:
            user_input: The user's input text
            company: The company context (optional)
            user: The user context (optional)
            tool_name: The specific tool to call (optional)
            force_agent: Whether to use the Agent SDK approach (optional)
            **kwargs: Additional arguments to pass to the tool
            
        Returns:
            The response from the MCP tool
        """
        logger.warning("mcp_tool_router is DEPRECATED. Use MCPClient.call_tool instead.")
        
        try:
            # Set user context if provided
            user_id = None
            if user:
                user_id = str(user.id)
                helper_service.set_user_context(user)
            
            # If no tool name was specified, return error
            if not tool_name:
                return {"error": "No tool specified"}
                
            # -------------- Provider-level auth short-circuit --------------
            provider_map = {
                "slack" : "slack_",
                "notion": "notion_",
                "google": ("gdrive_", "gcal_", "gmail_", "gdocs_", "gsheets_")
            }
            for prov, prefix in provider_map.items():
                prefixes = [prefix] if isinstance(prefix, str) else prefix
                if tool_name and any(tool_name.startswith(p) for p in prefixes) and not self._has_integration(user, prov):
                    return {
                        "error": f"{prov.capitalize()} integration required",
                        "requires_auth": True,
                        "auth_type": prov,
                    }
            # ----------------------------------------------------------------
            
            # Create ToolContext with credentials from AgentTriagingService._get_all_active_credentials
            # The key difference is we don't fetch credentials here anymore;
            # we leave that to the LocalPythonServer adapter when it calls the actual tool function
            tool_ctx = ToolContext(
                user_id=user_id,
                company_id=str(company.id) if company else None,
                # No credentials here; they'll be fetched by LocalPythonServer based on user_id if needed
            )
            
            # Regular non-agent flow
            # If a specific tool is requested, call it via MCPClient
            if tool_name:
                try:
                    # Call the tool via MCPClient - it handles finding the right server
                    # and ensuring credentials are passed appropriately 
                    # from RunContextWrapper to the tool
                    result = self.mcp_client.call_tool(
                        name=tool_name,
                        ctx=tool_ctx,  # This ctx is converted to RunContextWrapper by MCPClient
                        **kwargs
                    )
                    return self._format_result(result)
                except Exception as e:
                    error_msg = str(e)
                    logger.exception(f"Error calling MCP tool {tool_name}: {error_msg}")
                    if "credentials" in error_msg.lower() or "authentication" in error_msg.lower():
                        # Determine auth type based on tool name prefix
                        auth_type = "unknown"
                        for provider, prefixes in provider_map.items():
                            prefixes_list = [prefixes] if isinstance(prefixes, str) else prefixes
                            if any(tool_name.startswith(p) for p in prefixes_list):
                                auth_type = provider
                                break
                        return {
                            "error": f"{auth_type.capitalize()} authentication required: {error_msg}",
                            "requires_auth": True,
                            "auth_type": auth_type
                        }
                    return {"error": f"Error calling MCP tool {tool_name}: {error_msg}"}
            
            return {"error": "No valid tool or operation specified"}
        
        except Exception as e:
            logger.exception(f"Error in mcp_tool_router: {e}")
            return {"error": f"Error in MCP service: {str(e)}"}

    def _format_result(self, result):
        """Format the result from an MCP tool call."""
        if isinstance(result, dict) and "error" in result:
            return result
        elif isinstance(result, str):
            return {"result": result}
        else:
            try:
                return {"result": json.dumps(result)}
            except:
                return {"result": str(result)}
    
    def _has_integration(self, u, provider: str) -> bool:
        """Check if the user has the specified integration."""
        if not u:
            return False
        try:
            from users.models import UserIntegration
            return UserIntegration.objects.filter(user=u, provider=provider, is_active=True).exists()
        except Exception as e:
            logger.exception(f"Error checking {provider} integration: {e}")
            return False

