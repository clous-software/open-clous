#!/usr/bin/env python
"""
Test script for Google Drive MCP integration.
This script will test the MCP integration with Google Drive by:
1. Finding a user with Google credentials
2. Running test queries that require Google Drive access
3. Logging the responses
"""

import os
import sys
import django
import json
import logging
from datetime import datetime

# Set up Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Import Django models and services
from users.models import User, Auth
from services.integrations.mcp_client import MCPService

def find_user_with_google_auth():
    """Find a user with Google authentication credentials."""
    auth = Auth.objects.filter(google_refresh_token__isnull=False).first()
    if not auth:
        logger.error("No users found with Google authentication credentials.")
        return None
    
    user = auth.referrer
    logger.info(f"Found user with Google auth: {user.email}")
    return user

def test_google_drive_search(mcp_service, user):
    """Test searching for files in Google Drive."""
    logger.info("Testing Google Drive search...")
    
    test_queries = [
        "Find documents about project planning in my Google Drive",
        "Search for spreadsheets in my Drive",
        "Find PDF files in my Google Drive from last month"
    ]
    
    for query in test_queries:
        logger.info(f"Testing query: {query}")
        
        # Get all available functions from all MCP servers
        all_functions = []
        for server_name, server_config in mcp_service.mcp_servers.items():
            for func in server_config["functions"]:
                func_copy = func.copy()
                func_copy["server_name"] = server_name
                all_functions.append(func_copy)
        
        # Execute the MCP flow
        result = mcp_service._execute_mcp_flow_with_all_tools(query, all_functions, user)
        
        logger.info(f"Response: {result.get('response')}")
        logger.info(f"Used tools: {result.get('used_tools')}")
        logger.info("-" * 50)

def test_google_drive_read_file(mcp_service, user, file_id=None):
    """Test reading a file from Google Drive."""
    logger.info("Testing Google Drive file reading...")
    
    if not file_id:
        # First search for a file to get its ID
        search_query = "Find a document in my Google Drive"
        
        # Get all available functions
        all_functions = []
        for server_name, server_config in mcp_service.mcp_servers.items():
            for func in server_config["functions"]:
                func_copy = func.copy()
                func_copy["server_name"] = server_name
                all_functions.append(func_copy)
        
        # Execute the search
        search_result = mcp_service._execute_mcp_flow_with_all_tools(search_query, all_functions, user)
        logger.info(f"Search response: {search_result.get('response')}")
        
        # Ask for the file ID
        logger.info("Please provide a file ID from the search results to test file reading:")
        file_id = input("File ID: ").strip()
    
    if file_id:
        # Test reading the file
        read_query = f"Read the contents of the file with ID {file_id} from my Google Drive"
        
        # Get all available functions
        all_functions = []
        for server_name, server_config in mcp_service.mcp_servers.items():
            for func in server_config["functions"]:
                func_copy = func.copy()
                func_copy["server_name"] = server_name
                all_functions.append(func_copy)
        
        # Execute the read
        read_result = mcp_service._execute_mcp_flow_with_all_tools(read_query, all_functions, user)
        
        logger.info(f"Read response: {read_result.get('response')}")
        logger.info(f"Used tools: {read_result.get('used_tools')}")
    else:
        logger.error("No file ID provided. Skipping file read test.")

def main():
    """Main function to run the tests."""
    logger.info("Starting Google Drive MCP integration test...")
    
    # Check if MCP servers are configured
    from django.conf import settings
    if not hasattr(settings, 'GOOGLE_DRIVE_MCP_URL'):
        logger.error("GOOGLE_DRIVE_MCP_URL not found in settings. Please configure it.")
        return
    
    logger.info(f"Google Drive MCP URL: {settings.GOOGLE_DRIVE_MCP_URL}")
    
    # Find a user with Google auth
    user = find_user_with_google_auth()
    if not user:
        return
    
    # Initialize MCP service
    mcp_service = MCPService()
    
    # Run tests
    test_google_drive_search(mcp_service, user)
    
    # Optionally test file reading if a file ID is provided
    file_id = None
    if len(sys.argv) > 1:
        file_id = sys.argv[1]
    
    test_google_drive_read_file(mcp_service, user, file_id)
    
    logger.info("Google Drive MCP integration test completed.")

if __name__ == "__main__":
    main() 