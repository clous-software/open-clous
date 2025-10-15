import pytest
import json
from unittest.mock import patch, MagicMock, AsyncMock

from services.mcp.utils import ensure_sdk_schema
from services.mcp.server_factory import ServerFactory
from services.mcp.auth_middleware import MCPAuthMiddleware
from services.guardrails.service import GuardrailService
from services.autonomy.agents import AgentService, GlobalAgent

class TestMCPSDKIntegration:
    """Test the integration with OpenAI Agents SDK."""
    
    def test_ensure_sdk_schema_with_input_schema(self):
        """Test that ensure_sdk_schema preserves inputSchema and adds parameters."""
        # Create a mock tool with inputSchema but no parameters
        tool = MagicMock()
        tool.name = "test_tool"
        tool.description = "Test tool description"
        tool.inputSchema = {"type": "object", "properties": {}}
        
        # Apply our utility
        processed_tool = ensure_sdk_schema(tool)
        
        # Verify it has both attributes now
        assert hasattr(processed_tool, "inputSchema")
        assert hasattr(processed_tool, "parameters")
        assert processed_tool.inputSchema == processed_tool.parameters
        
    def test_ensure_sdk_schema_with_parameters(self):
        """Test that ensure_sdk_schema preserves parameters and adds inputSchema."""
        # Create a mock tool with parameters but no inputSchema
        tool = MagicMock()
        tool.name = "test_tool"
        tool.description = "Test tool description"
        tool.parameters = {"type": "object", "properties": {}}
        
        # Apply our utility
        processed_tool = ensure_sdk_schema(tool)
        
        # Verify it has both attributes now
        assert hasattr(processed_tool, "inputSchema")
        assert hasattr(processed_tool, "parameters")
        assert processed_tool.inputSchema == processed_tool.parameters
    
    def test_ensure_sdk_schema_creates_wrapper(self):
        """Test that ensure_sdk_schema creates a wrapper for tools missing both schema attributes."""
        # Create a basic function with no schema attributes
        def basic_tool(ctx):
            return "Tool result"
        
        # Apply our utility
        processed_tool = ensure_sdk_schema(basic_tool)
        
        # Verify the wrapper has the required attributes
        assert hasattr(processed_tool, "inputSchema")
        assert hasattr(processed_tool, "parameters")
        assert processed_tool.name == "basic_tool"
        
    @pytest.mark.asyncio
    @patch("agents.mcp.server_stdio.MCPServerStdio")
    async def test_server_factory_creates_local_server(self, mock_stdio):
        """Test that ServerFactory creates a local server correctly."""
        # Set up mock
        mock_server = AsyncMock()
        mock_stdio.return_value = mock_server
        mock_server.id = "test_server"
        
        # Use factory to create server
        server = ServerFactory.create_local_server("test_server")
        
        # Verify server was created with correct ID
        mock_stdio.assert_called_once()
        assert server.id == "test_server"
        
    @pytest.mark.asyncio
    @patch("agents.mcp.server_sse.MCPServerSse")
    async def test_server_factory_creates_sse_server(self, mock_sse):
        """Test that ServerFactory creates an SSE server correctly."""
        # Set up mock
        mock_server = AsyncMock()
        mock_sse.return_value = mock_server
        mock_server.id = "test_sse"
        
        # Use factory to create server
        server = ServerFactory.create_remote_sse_server("test_sse", "http://example.com", "test_token")
        
        # Verify server was created with correct parameters
        mock_sse.assert_called_once_with(
            id="test_sse", 
            url="http://example.com", 
            access_token="test_token"
        )
        assert server.id == "test_sse"
        
    @pytest.mark.asyncio
    @patch("services.autonomy.agents.AgentService")
    async def test_global_agent_initializes_with_mcp_servers(self, mock_agent_service):
        """Test that GlobalAgent initializes correctly with MCP servers."""
        # Set up mocks
        mock_service = MagicMock()
        mock_agent_service.return_value = mock_service
        mock_service.create_agent.return_value = MagicMock()
        
        # Create mock MCP servers
        mock_servers = [MagicMock(), MagicMock()]
        mock_servers[0].id = "server1"
        mock_servers[1].id = "server2"
        
        # Create GlobalAgent with mock servers
        agent = GlobalAgent(
            agent_service=mock_service,
            instructions="Test instructions",
            tools=[],
            mcp_servers=mock_servers
        )
        
        # Verify agent was created with correct servers
        mock_service.create_agent.assert_called_once()
        args = mock_service.create_agent.call_args
        assert args.kwargs.get("mcp_servers") == mock_servers 