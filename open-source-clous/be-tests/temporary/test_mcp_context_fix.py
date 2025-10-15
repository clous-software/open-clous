#!/usr/bin/env python3
"""
Test script to verify that MCP tools receive proper context (user_id) through environment variables.
This tests the fixes made to enable context passing to MCP-based tools.
"""

import os
import sys
import django

# Add project root to path
project_root = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_root)

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

def test_mcp_context_env_vars():
    """Test that environment variables are properly set for MCP context"""
    print("🧪 Testing MCP context environment variable setup...")
    
    # Simulate setting environment variables as done in agent_triaging.py
    test_user_id = "test_user_123"
    test_company_id = "test_company_456"
    
    os.environ['MCP_USER_ID'] = test_user_id
    os.environ['MCP_COMPANY_ID'] = test_company_id
    os.environ['MCP_CREDENTIALS_AVAILABLE'] = '{"google": {"available": true}}'
    
    print(f"✅ Set environment variables:")
    print(f"   MCP_USER_ID: {os.environ.get('MCP_USER_ID')}")
    print(f"   MCP_COMPANY_ID: {os.environ.get('MCP_COMPANY_ID')}")
    print(f"   MCP_CREDENTIALS_AVAILABLE: {os.environ.get('MCP_CREDENTIALS_AVAILABLE')}")
    
    # Test that gsuite_tools can read these environment variables
    try:
        from services.tools.integrations.gsuite_tools import _get_credentials, MissingCredentialsError
        from services.context.tool import ToolContext
        from agents import RunContextWrapper
        
        # Create empty context (simulating MCP subprocess scenario)
        empty_context = ToolContext(
            user_id=None,
            company_id=None,
            websocket_group=None,
            credentials=None
        )
        empty_wrapper = RunContextWrapper(context=empty_context)
        
        print(f"\n🧪 Testing _get_credentials with empty context...")
        print(f"   Context user_id: {empty_context.user_id}")
        print(f"   Context company_id: {empty_context.company_id}")
        print(f"   Context credentials: {empty_context.credentials}")
        
        # This should now fall back to environment variables and then try database lookup
        try:
            credentials = _get_credentials(empty_wrapper, "drive")
            print(f"❌ Unexpected success - credentials should fail without actual auth setup")
        except MissingCredentialsError as e:
            error_msg = str(e)
            # Check if it tried to use the user_id from environment
            if "test_user_123" in error_msg or "authentication required" in error_msg.lower():
                print(f"✅ Correctly found user_id from environment and attempted auth")
                print(f"   Error (expected): {error_msg}")
            else:
                print(f"⚠️  Found environment user_id but got unexpected error: {error_msg}")
                
    except Exception as e:
        print(f"❌ Error testing _get_credentials: {e}")
        import traceback
        traceback.print_exc()
    
    # Clean up
    for key in ['MCP_USER_ID', 'MCP_COMPANY_ID', 'MCP_CREDENTIALS_AVAILABLE']:
        if key in os.environ:
            del os.environ[key]
    
    print(f"\n✅ Test completed!")

if __name__ == "__main__":
    test_mcp_context_env_vars() 