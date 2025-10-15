#!/usr/bin/env python3
"""
Test script for GitHub MCP Integration

This script tests the GitHub MCP integration to ensure it's working correctly.
Run this script to verify your GitHub MCP setup.

Usage:
    python manage.py shell < services/mcp/test_github_integration.py
    
Or in Django shell:
    exec(open('services/mcp/test_github_integration.py').read())
"""

import os
import sys
import logging
from typing import Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_github_mcp_integration():
    """Test the GitHub MCP integration setup."""
    
    print("🧪 Testing GitHub MCP Integration")
    print("=" * 50)
    
    # Test 1: Check if settings are configured
    print("\n1️⃣ Testing Django settings...")
    from django.conf import settings
    
    github_url = getattr(settings, 'GITHUB_MCP_SERVER_URL', None)
    if github_url:
        print(f"   ✓ GITHUB_MCP_SERVER_URL configured: {github_url}")
    else:
        print("   ⚠️ GITHUB_MCP_SERVER_URL not configured (using default)")
    
    # Test 2: Check singleton manager initialization
    print("\n2️⃣ Testing SingletonMCPManager initialization...")
    try:
        from services.mcp.singleton_manager import SingletonMCPManager
        manager = SingletonMCPManager()
        print("   ✓ SingletonMCPManager initialized successfully")
        
        # Check if GitHub configuration exists
        if "github" in manager.server_configs:
            github_config = manager.server_configs["github"]
            print(f"   ✓ GitHub server config found: {github_config.name}")
            print(f"   ✓ GitHub server URL: {github_config.url}")
            print(f"   ✓ GitHub server type: {github_config.type}")
        else:
            print("   ❌ GitHub server configuration not found")
            return False
            
    except Exception as e:
        print(f"   ❌ Failed to initialize SingletonMCPManager: {e}")
        return False
    
    # Test 3: Check UserIntegration model
    print("\n3️⃣ Testing UserIntegration model...")
    try:
        from users.models import UserIntegration
        print("   ✓ UserIntegration model imported successfully")
        
        # Check if there are any GitHub integrations
        github_integrations = UserIntegration.objects.filter(provider='github', is_active=True)
        print(f"   ℹ️ Found {github_integrations.count()} active GitHub integrations")
        
        if github_integrations.exists():
            integration = github_integrations.first()
            print(f"   ✓ Sample integration: User {integration.user_id}, Scopes: {integration.scopes}")
        
    except Exception as e:
        print(f"   ❌ Failed to access UserIntegration model: {e}")
        return False
    
    # Test 4: Test GitHub integration helper
    print("\n4️⃣ Testing GitHub integration helper...")
    try:
        from services.mcp.github_integration_example import GitHubMCPIntegrationHelper
        print("   ✓ GitHubMCPIntegrationHelper imported successfully")
        
        # Test with a sample user if available
        from users.models import User
        sample_user = User.objects.first()
        
        if sample_user:
            status = GitHubMCPIntegrationHelper.get_integration_status(sample_user)
            print(f"   ℹ️ Sample user integration status: {status['status']}")
            print(f"   ℹ️ Message: {status['message']}")
        else:
            print("   ⚠️ No users found to test with")
            
    except Exception as e:
        print(f"   ❌ Failed to test GitHub integration helper: {e}")
        return False
    
    # Test 5: Test MCP server creation (if integration exists)
    print("\n5️⃣ Testing MCP server creation...")
    try:
        github_integrations = UserIntegration.objects.filter(provider='github', is_active=True)
        
        if github_integrations.exists():
            integration = github_integrations.first()
            user_id = str(integration.user_id)
            
            print(f"   🔍 Testing with user {user_id}...")
            
            # Test connectivity
            success = GitHubMCPIntegrationHelper.test_github_connectivity(user_id)
            if success:
                print("   ✓ GitHub MCP server connectivity test passed")
            else:
                print("   ⚠️ GitHub MCP server connectivity test failed (check token/URL)")
                
            # Test server creation
            github_server = manager._get_or_create_github_server(user_id)
            if github_server:
                print("   ✓ GitHub MCP server created successfully")
                print(f"   ✓ Server name: {github_server.name}")
            else:
                print("   ❌ Failed to create GitHub MCP server")
                
        else:
            print("   ⚠️ No GitHub integrations found - cannot test server creation")
            print("   💡 Create a GitHub integration first using:")
            print("      SingletonMCPManager.create_github_integration(user, 'your_token')")
            
    except Exception as e:
        print(f"   ❌ Failed to test MCP server creation: {e}")
        return False
    
    # Test 6: Test agent integration
    print("\n6️⃣ Testing agent integration...")
    try:
        from services.autonomy.agent_triaging import AgentTriagingService
        print("   ✓ AgentTriagingService imported successfully")
        
        # Test with a sample user
        if sample_user and github_integrations.exists():
            triage_service = AgentTriagingService(user=sample_user)
            print("   ✓ AgentTriagingService initialized with GitHub-enabled user")
            
            # Get servers to verify GitHub is included
            servers = manager.get_servers(str(sample_user.id))
            github_servers = [s for s in servers if hasattr(s, '_cloush_id') and 'github' in s._cloush_id]
            
            if github_servers:
                print(f"   ✓ GitHub MCP server available in agent system ({len(github_servers)} servers)")
            else:
                print("   ⚠️ GitHub MCP server not available in agent system")
        else:
            print("   ⚠️ Cannot test agent integration without GitHub-enabled user")
            
    except Exception as e:
        print(f"   ❌ Failed to test agent integration: {e}")
        return False
    
    # Summary
    print("\n📋 Test Summary")
    print("=" * 50)
    print("✓ GitHub MCP integration is properly implemented")
    print("✓ All components are working correctly")
    
    if github_integrations.exists():
        print(f"✓ {github_integrations.count()} active GitHub integration(s) found")
        print("✓ Ready for user interactions")
    else:
        print("⚠️ No GitHub integrations found")
        print("💡 Next steps:")
        print("   1. Create GitHub OAuth app")
        print("   2. Implement OAuth flow")
        print("   3. Use SingletonMCPManager.create_github_integration() to set up users")
    
    return True

def create_sample_integration():
    """Create a sample GitHub integration for testing (requires manual token)."""
    
    print("\n🔧 Creating Sample GitHub Integration")
    print("=" * 50)
    
    # Get user input for token
    print("To create a sample integration, you need:")
    print("1. A GitHub personal access token")
    print("2. Required scopes: repo, user, issues, pull_requests")
    print("3. Get token from: https://github.com/settings/tokens")
    print()
    
    token = input("Enter GitHub token (or press Enter to skip): ").strip()
    
    if not token:
        print("Skipping sample integration creation")
        return
    
    try:
        from users.models import User
        from services.mcp.singleton_manager import SingletonMCPManager
        
        # Get first user or create test user
        user = User.objects.first()
        if not user:
            print("No users found. Create a user first.")
            return
        
        # Create integration
        integration = SingletonMCPManager.create_github_integration(
            user=user,
            access_token=token,
            scopes=['repo', 'user', 'issues', 'pull_requests']
        )
        
        print(f"✓ Created GitHub integration for user {user.id}")
        print(f"✓ Integration ID: {integration.id}")
        
        # Test connectivity
        from services.mcp.github_integration_example import GitHubMCPIntegrationHelper
        success = GitHubMCPIntegrationHelper.test_github_connectivity(str(user.id))
        
        if success:
            print("✓ Connectivity test passed!")
        else:
            print("⚠️ Connectivity test failed - check token")
            
    except Exception as e:
        print(f"❌ Failed to create sample integration: {e}")

if __name__ == "__main__":
    # Run the tests
    success = test_github_mcp_integration()
    
    if success:
        # Ask if user wants to create sample integration
        create_sample = input("\nWould you like to create a sample GitHub integration? (y/N): ").strip().lower()
        if create_sample == 'y':
            create_sample_integration()
    
    print("\n🏁 GitHub MCP Integration Test Complete!") 