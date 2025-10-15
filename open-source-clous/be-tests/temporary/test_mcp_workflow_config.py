#!/usr/bin/env python3
"""
Test script for the new MCP workflow configuration system.
This script demonstrates how to use the workflow-based MCP server filtering.
"""

import asyncio
import logging
from typing import Dict, Any

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def test_mcp_workflow_config():
    """Test the MCP workflow configuration system."""
    
    # Import the services
    from services.autonomy.agent_triaging import AgentTriagingService
    from services.mcp.singleton_manager import get_mcp_manager
    
    print("🧪 Testing MCP Workflow Configuration System")
    print("=" * 50)
    
    # Test 1: Default configuration (all MCP servers allowed)
    print("\n1️⃣ Testing default configuration...")
    service = AgentTriagingService(workflow_config={})
    mcp_config = service.get_mcp_config()
    print(f"   Default MCP config: {mcp_config}")
    assert mcp_config.get('enabled', False) == True, "Default should enable MCP"
    assert mcp_config.get('allow_defaults', False) == True, "Default should allow defaults"
    
    # Test 2: Disable MCP entirely
    print("\n2️⃣ Testing MCP disabled...")
    service.configure_mcp_servers(enabled=False)
    mcp_config = service.get_mcp_config()
    print(f"   MCP disabled config: {mcp_config}")
    assert mcp_config.get('enabled') == False, "MCP should be disabled"
    
    # Test 3: Allow specific providers
    print("\n3️⃣ Testing allow list...")
    service.configure_mcp_servers(
        enabled=True,
        allow=["gsuite", "github"]
    )
    mcp_config = service.get_mcp_config()
    print(f"   Allow list config: {mcp_config}")
    assert "gsuite" in mcp_config.get('allow', []), "gsuite should be in allow list"
    assert "github" in mcp_config.get('allow', []), "github should be in allow list"
    
    # Test 4: Deny specific providers
    print("\n4️⃣ Testing deny list...")
    service.deny_mcp_provider("slack")
    mcp_config = service.get_mcp_config()
    print(f"   Deny list config: {mcp_config}")
    assert "slack" in mcp_config.get('deny', []), "slack should be in deny list"
    
    # Test 5: Add custom server
    print("\n5️⃣ Testing custom server...")
    custom_server = {
        "id": "test_server",
        "type": "sse",
        "url": "https://test.mcp.server/v1",
        "name": "Test MCP Server"
    }
    service.add_custom_mcp_server(custom_server)
    mcp_config = service.get_mcp_config()
    print(f"   Custom server config: {mcp_config}")
    assert len(mcp_config.get('custom', [])) > 0, "Should have custom servers"
    
    # Test 6: Test MCP manager with workflow config
    print("\n6️⃣ Testing MCP manager with workflow config...")
    mcp_manager = get_mcp_manager()
    
    # Test with a mock user ID
    test_user_id = "test_user_123"
    workflow_config = service.get_workflow_config()
    
    # This will return an empty list since we don't have real integrations
    # but it tests the filtering logic
    servers = await mcp_manager.get_servers(test_user_id, workflow_config)
    print(f"   MCP manager returned {len(servers)} servers")
    
    # Test 7: Test server status
    print("\n7️⃣ Testing server status...")
    status = mcp_manager.get_server_status()
    print(f"   Server status: {status}")
    assert isinstance(status, dict), "Status should be a dictionary"
    assert 'total_servers' in status, "Status should have total_servers"
    
    print("\n✅ All tests passed!")
    print("\n📋 Summary of MCP Configuration Features:")
    print("   • Master enable/disable switch")
    print("   • Allow/deny lists for providers")
    print("   • Custom server configurations")
    print("   • Workflow-based filtering")
    print("   • Dynamic integration discovery")
    print("   • Server status monitoring")

if __name__ == "__main__":
    asyncio.run(test_mcp_workflow_config()) 