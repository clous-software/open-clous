"""
Test script for the integrated MCP server.
This script provides a simple way to test the MCP server functionality.
"""

import os
import sys
import json
import logging
import argparse
from pathlib import Path

# Set up Django environment
sys.path.append(str(Path(__file__).resolve().parent.parent.parent))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

from django.contrib.auth import get_user_model
from services.integrations.servers.gsuite_server import MCPClient
from services.integrations.mcp_client import MCPService

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def test_mcp_client(user_id, tool_name, **kwargs):
    """
    Test the MCP client with a specific tool.
    
    Args:
        user_id: The ID of the user to use for testing
        tool_name: The name of the tool to test
        **kwargs: Arguments to pass to the tool
    """
    try:
        # Initialize the MCP client
        client = MCPClient(base_url="http://localhost:8000")
        
        # Call the tool
        logger.info(f"Testing MCP client with tool: {tool_name}")
        logger.info(f"Arguments: {kwargs}")
        
        # Call the tool method dynamically if it exists
        if hasattr(client, tool_name):
            tool_method = getattr(client, tool_name)
            result = tool_method(user_id, **kwargs)
        else:
            # Fall back to generic call_tool method
            result = client.call_tool(tool_name, user_id=user_id, **kwargs)
        
        # Print the result
        logger.info("Result:")
        print(result)
        
        return True
        
    except Exception as e:
        logger.error(f"Error testing MCP client: {e}")
        return False

def test_mcp_service(user_id, query):
    """
    Test the MCPService with a user query.
    
    Args:
        user_id: The ID of the user to use for testing
        query: The user query to test
    """
    try:
        # Initialize the MCP service
        service = MCPService()
        
        # Call the MCP tool router
        logger.info(f"Testing MCP service with query: {query}")
        result = service.mcp_tool_router(query, user_id)
        
        # Print the result
        logger.info("Result:")
        print(result)
        
        return True
        
    except Exception as e:
        logger.error(f"Error testing MCP service: {e}")
        return False

def get_valid_user_id():
    """Get a valid user ID from the database for testing."""
    User = get_user_model()
    try:
        # Try to get a user with Google credentials
        from users.models import Auth
        auth = Auth.objects.filter(google_refresh_token__isnull=False).first()
        if auth and auth.referrer:
            return str(auth.referrer.id)
        
        # Fall back to any user
        user = User.objects.first()
        if user:
            return str(user.id)
            
    except Exception as e:
        logger.error(f"Error getting valid user ID: {e}")
    
    return None

def main():
    """Main function to run the test script."""
    parser = argparse.ArgumentParser(description='Test the MCP server implementation')
    parser.add_argument('--mode', choices=['client', 'service'], default='client',
                        help='Test mode: client for direct tool calls, service for query routing')
    parser.add_argument('--tool', default='gdrive_search',
                        help='Tool name to test (for client mode)')
    parser.add_argument('--user-id', help='User ID to use for testing')
    parser.add_argument('--query', default='Find my recent documents',
                        help='Query to test (for service mode) or search query (for gdrive_search)')
    parser.add_argument('--file-id', help='File ID (for gdrive_read_file)')
    parser.add_argument('--folder-id', default='root', help='Folder ID (for gdrive_list_files)')
    parser.add_argument('--start-date', default='2023-01-01', help='Start date (for calendar tools)')
    parser.add_argument('--end-date', default='2023-12-31', help='End date (for calendar tools)')
    
    args = parser.parse_args()
    
    # Get a valid user ID if not provided
    user_id = args.user_id or get_valid_user_id()
    if not user_id:
        logger.error("No valid user ID found. Please provide a user ID with --user-id.")
        return False
    
    if args.mode == 'client':
        # Prepare arguments based on the tool
        kwargs = {}
        if args.tool == 'gdrive_search':
            kwargs['query'] = args.query
        elif args.tool == 'gdrive_read_file':
            if not args.file_id:
                logger.error("File ID is required for gdrive_read_file. Use --file-id.")
                return False
            kwargs['file_id'] = args.file_id
        elif args.tool == 'gdrive_list_files':
            kwargs['folder_id'] = args.folder_id
        elif args.tool in ['gcal_list_events', 'gcal_get_availability']:
            kwargs['start_date'] = args.start_date
            kwargs['end_date'] = args.end_date
        
        return test_mcp_client(user_id, args.tool, **kwargs)
    else:
        return test_mcp_service(user_id, args.query)

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 