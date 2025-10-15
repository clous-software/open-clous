"""
Tool descriptions for authentication tools.
These tools handle authentication flows for external integrations.
"""

AUTHENTICATION_TOOLS_DESCRIPTIONS = {
    "authenticate_integration_server": """
    <tool>
        <name>authenticate_integration_server</name>
        <use_case>Triggers an authentication confirmation flow for a remote MCP integration (e.g., Notion)</use_case>
        <behavior>
            Emits an auth_required confirmation over WebSocket; the UI must complete the handshake
            and return the auth token. This tool initiates the authentication process for external
            service integrations that require user consent and token exchange.
        </behavior>
        <when_to_use>
            - When setting up new integrations with external services
            - When authentication tokens have expired and need renewal
            - When user needs to authorize access to external platforms
        </when_to_use>
        <intent>To initiate secure authentication flows for external service integrations</intent>
        <side_effects>Sends WebSocket confirmation request to frontend for user authentication</side_effects>
        <category>Authentication</category>
        <args>
            - provider: The name of the external service provider (e.g., "notion", "slack", "google")
        </args>
        <returns>
            Dictionary with authentication status and next steps:
            - "status": "auth_required" | "success" | "error"
            - "message": Description of current authentication state
            - "provider": The service provider being authenticated
            - "next_steps": Instructions for completing authentication
        </returns>
        <raises>
            Returns error details if authentication flow cannot be initiated
        </raises>
        <examples>
            authenticate_integration_server(provider="notion")
            authenticate_integration_server(provider="slack")
        </examples>
    </tool>
    """
}
