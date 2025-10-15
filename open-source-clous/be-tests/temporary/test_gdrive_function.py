import asyncio
import logging
import sys

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

async def test_mcp_adapters():
    """Test the fix for MCPToolResult compatibility"""
    try:
        from services.mcp.adapters import LocalPythonServer
        from types import SimpleNamespace

        # Simulate a tool returning a string
        def simple_string_tool(ctx=None, **kwargs):
            return "This is a simple string response"
        
        # Create a simple context mock
        ctx = SimpleNamespace(user_id="test_user")
        
        # Create a mock FastMCP instance
        mcp_instance = SimpleNamespace()
        mcp_instance.tools = {"string_tool": simple_string_tool}
        
        # Create a LocalPythonServer instance
        server = LocalPythonServer("test_server", mcp_instance)
        await server.connect()
        
        # Test calling the tool
        result = await server.call_tool("string_tool", ctx)
        
        # Check if our fix works - the result should have a content attribute
        if hasattr(result, 'content'):
            logger.info(f"Success! Result has content attribute: {result.content}")
            return True
        else:
            logger.error(f"Failed! Result doesn't have content attribute: {type(result)}")
            return False
    except Exception as e:
        logger.error(f"Error testing MCP adapters: {e}")
        return False

async def main():
    """Run all tests"""
    success = await test_mcp_adapters()
    if success:
        logger.info("All tests passed!")
        return 0
    else:
        logger.error("Test failed!")
        return 1

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    sys.exit(loop.run_until_complete(main())) 