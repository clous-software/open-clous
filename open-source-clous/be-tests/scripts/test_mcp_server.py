#!/usr/bin/env python
"""
Test script to verify the LocalMCPServer implementation.
This script creates a LocalMCPServer, registers mock tools,
and attempts to list and call the tools.
"""

import asyncio
import logging
from typing import Dict, Any, List
from services.mcp.local_server import LocalMCPServer
from services.mcp.server_factory import ServerFactory

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create mock tools for testing
async def mock_tool_1(param1: str = None, param2: int = 0) -> Dict[str, Any]:
    """Mock tool 1 for testing."""
    return {"result": f"Tool 1 called with {param1=}, {param2=}"}

async def mock_tool_2(items: List[str] = None) -> Dict[str, Any]:
    """Mock tool 2 for testing."""
    items = items or []
    return {"result": f"Tool 2 called with {len(items)} items"}

def sync_mock_tool(text: str = None) -> str:
    """Synchronous mock tool for testing."""
    return f"Sync tool called with text: {text or 'none'}"

# Create a mock FastMCP class
class MockFastMCP:
    """Mock FastMCP class for testing."""
    
    def __init__(self, name="MockMCP"):
        self.name = name
        self._tool_manager = self
        self._tools = {
            "mock_tool_1": mock_tool_1,
            "mock_tool_2": mock_tool_2,
            "sync_mock_tool": sync_mock_tool
        }
        
        # Add names to tools
        for name, tool in self._tools.items():
            tool.name = name
            # Add mock schema for compatibility
            tool.mcp_tool_spec = {"name": name, "description": tool.__doc__ or ""}

async def test_local_server():
    """Test creating and using a LocalMCPServer with mock tools."""
    logger.info("Starting LocalMCPServer test...")
    
    try:
        # Create a mock FastMCP instance
        mock_mcp = MockFastMCP()
        logger.info("Created mock FastMCP instance")
        
        # Create a LocalMCPServer directly
        server_id = "test_mock"
        server = LocalMCPServer(server_id, display_name="Test Mock Server")
        logger.info(f"Created LocalMCPServer: {server.name}")
        
        # Register tools from mock_mcp
        ServerFactory._register_tools_from_fastmcp(server, mock_mcp)
        logger.info(f"Registered tools from mock_mcp")
        
        # Connect to the server
        connected = await server.connect()
        logger.info(f"Server connect result: {connected}")
        
        # List the tools
        tools = await server.list_tools()
        logger.info(f"Server has {len(tools)} tools")
        
        # Print tool names
        tool_names = [getattr(tool, 'name', str(tool)) for tool in tools]
        logger.info(f"Tool names: {', '.join(tool_names)}")
        
        # Try to call the async tool
        result = await server.call_tool("mock_tool_1", {"param1": "test", "param2": 42})
        logger.info(f"Tool call result: {result}")
        
        # Try to call the sync tool
        result = await server.call_tool("sync_mock_tool", {"text": "hello"})
        logger.info(f"Sync tool call result: {result}")
        
        logger.info("LocalMCPServer test completed successfully!")
        return True
    
    except Exception as e:
        logger.exception(f"Test failed: {e}")
        return False

async def test_server_factory():
    """Test creating an MCP server using ServerFactory."""
    logger.info("Testing ServerFactory.create_local_server...")
    
    try:
        # Create a mock FastMCP instance
        mock_mcp = MockFastMCP()
        
        # Create a server using ServerFactory
        server = ServerFactory.create_local_server("factory_test", mock_mcp)
        logger.info(f"Created server using ServerFactory: {server.name}")
        
        # Connect to the server
        connected = await server.connect()
        logger.info(f"Server connect result: {connected}")
        
        # List the tools
        tools = await server.list_tools()
        logger.info(f"Server has {len(tools)} tools")
        
        # Call a tool
        result = await server.call_tool("mock_tool_2", {"items": ["item1", "item2", "item3"]})
        logger.info(f"Tool call result: {result}")
        
        logger.info("ServerFactory test completed successfully!")
        return True
        
    except Exception as e:
        logger.exception(f"ServerFactory test failed: {e}")
        return False

if __name__ == "__main__":
    logger.info("Starting MCP server tests")
    
    # Run the tests
    loop = asyncio.get_event_loop()
    local_server_result = loop.run_until_complete(test_local_server())
    factory_result = loop.run_until_complete(test_server_factory())
    
    # Print summary
    logger.info("Test Results:")
    logger.info(f"- LocalMCPServer test: {'PASSED' if local_server_result else 'FAILED'}")
    logger.info(f"- ServerFactory test: {'PASSED' if factory_result else 'FAILED'}")
    
    if local_server_result and factory_result:
        logger.info("All tests PASSED! The LocalMCPServer implementation works correctly.")
    else:
        logger.info("Some tests FAILED. Check the logs above for details.") 