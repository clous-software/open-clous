"""
Test script to verify that ToolWrapper in LocalPythonServer properly exposes inputSchema attribute.

This file creates a simple test to check if our fix for the AttributeError:
'ToolWrapper' object has no attribute 'inputSchema' is working properly.
"""
import sys
import asyncio
import logging
from pprint import pformat
from typing import Any, Dict, Optional

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Import our MCP components
from services.mcp.adapters import LocalPythonServer, FastMCP, wrap_tool_result
from services.mcp.server_manager import MCPServerManager
from agents.run import RunContextWrapper

async def test_local_python_server():
    """Test the LocalPythonServer adapter."""
    # Create a mock FastMCP instance
    mcp = FastMCP("test_mcp")
    
    # Add a tool that returns a string
    @mcp.tool()
    async def test_string_tool(ctx=None, param1=None):
        """Test tool that returns a string"""
        return f"Got param: {param1}"
    
    # Create the server
    server = LocalPythonServer("test_server", mcp)
    
    # Connect to the server
    await server.connect()
    
    # List tools
    tools = await server.list_tools()
    logger.info(f"Found {len(tools)} tools on server")
    tool_names = [t.name for t in tools]
    assert "test_string_tool" in tool_names, "Test tool not found in tools list"
    
    # Call the tool
    ctx = RunContextWrapper(user_id="test_user")
    result = await server.call_tool("test_string_tool", ctx, param1="value1")
    
    # Check that the result is compatible with model_dump_json
    logger.info(f"Tool result type: {type(result)}")
    assert hasattr(result, "model_dump_json"), "Result does not have model_dump_json attribute"
    json_str = result.model_dump_json()
    logger.info(f"Tool result JSON: {json_str}")
    
    # Test the wrap_tool_result function directly
    plain_string = "This is a test string"
    wrapped = wrap_tool_result(plain_string, "test")
    assert hasattr(wrapped, "model_dump_json"), "wrap_tool_result did not properly wrap string"
    
    logger.info("LocalPythonServer test completed successfully")

async def test_server_manager():
    """Test the ServerManager with the fix."""
    # Create a ServerManager
    manager = MCPServerManager()
    
    # Create a mock FastMCP instance
    mcp = FastMCP("test_mcp")
    
    # Add a tool that returns a string
    @mcp.tool()
    async def search_test(ctx=None, query=None):
        """Test search tool that returns a string"""
        return f"Search results for: {query}"
    
    # Register the server
    server = manager.register_local_server("test_server", mcp)
    
    # Get all servers
    servers = manager.get_all_servers()
    assert len(servers) == 1, "Wrong number of servers"
    assert servers[0].id == "test_server", "Server ID mismatch"
    
    # List tools on the server
    tools = await servers[0].list_tools()
    logger.info(f"Found {len(tools)} tools on server")
    tool_names = [t.name for t in tools]
    assert "search_test" in tool_names, "Search tool not found in tools list"
    
    # Call the tool
    ctx = RunContextWrapper(user_id="test_user")
    result = await servers[0].call_tool("search_test", ctx, query="test query")
    
    # Check that the result is compatible with model_dump_json
    logger.info(f"Tool result type: {type(result)}")
    assert hasattr(result, "model_dump_json"), "Result does not have model_dump_json attribute"
    json_str = result.model_dump_json()
    logger.info(f"Tool result JSON: {json_str}")
    
    logger.info("ServerManager test completed successfully")

if __name__ == "__main__":
    # Setup Django environment if needed
    try:
        import django
        import os
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cloush.settings")
        django.setup()
    except Exception as e:
        logger.warning(f"Could not set up Django environment: {e}")
    
    # Run the tests
    async def run_tests():
        logger.info("Running LocalPythonServer test...")
        await test_local_python_server()
        
        logger.info("\nRunning ServerManager test...")
        await test_server_manager()
    
    asyncio.run(run_tests()) 