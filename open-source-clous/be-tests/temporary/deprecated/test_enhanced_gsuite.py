"""
Test script for the enhanced Google Workspace client.
This script provides a simple way to test the enhanced Google client functionality.
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
from services.integrations.gsuite_extensions import extend_mcp_client
from services.integrations.gsuite_integration import get_enhanced_client

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def test_enhanced_client(user_id, service, method, **kwargs):
    """
    Test the enhanced Google client with a specific service and method.
    
    Args:
        user_id: The ID of the user to use for testing
        service: The service to test (drive, calendar, gmail, docs, sheets)
        method: The method to test
        **kwargs: Arguments to pass to the method
    """
    try:
        # Get the enhanced client
        client = get_enhanced_client(user_id)
        
        # Get the service
        if service == 'drive':
            service_client = client.drive
        elif service == 'calendar':
            service_client = client.calendar
        elif service == 'gmail':
            service_client = client.gmail
        elif service == 'docs':
            service_client = client.docs
        elif service == 'sheets':
            service_client = client.sheets
        else:
            logger.error(f"Unknown service: {service}")
            return False
        
        # Call the method
        logger.info(f"Testing {service}.{method} with args: {kwargs}")
        
        if hasattr(service_client, method):
            method_func = getattr(service_client, method)
            result = method_func(**kwargs)
            
            # Print the result
            logger.info("Result:")
            print(json.dumps(result, indent=2))
            
            return True
        else:
            logger.error(f"Method {method} not found in service {service}")
            return False
        
    except Exception as e:
        logger.error(f"Error testing enhanced client: {e}")
        return False

def test_direct_tool(user_id, tool_name, **kwargs):
    """
    Test a direct MCP tool function.
    
    Args:
        user_id: The ID of the user to use for testing
        tool_name: The name of the tool to test
        **kwargs: Arguments to pass to the tool
    """
    try:
        # Import the tool function
        if tool_name == 'gmail_list_messages':
            from services.integrations.gsuite_integration import gmail_list_messages as tool_func
        elif tool_name == 'gmail_read_message':
            from services.integrations.gsuite_integration import gmail_read_message as tool_func
        elif tool_name == 'gmail_send_message':
            from services.integrations.gsuite_integration import gmail_send_message as tool_func
        elif tool_name == 'gdocs_create_document':
            from services.integrations.gsuite_integration import gdocs_create_document as tool_func
        elif tool_name == 'gdocs_read_document':
            from services.integrations.gsuite_integration import gdocs_read_document as tool_func
        elif tool_name == 'gdocs_update_document':
            from services.integrations.gsuite_integration import gdocs_update_document as tool_func
        elif tool_name == 'gsheets_create_spreadsheet':
            from services.integrations.gsuite_integration import gsheets_create_spreadsheet as tool_func
        elif tool_name == 'gsheets_read_spreadsheet':
            from services.integrations.gsuite_integration import gsheets_read_spreadsheet as tool_func
        elif tool_name == 'gsheets_update_spreadsheet':
            from services.integrations.gsuite_integration import gsheets_update_spreadsheet as tool_func
        else:
            logger.error(f"Unknown tool: {tool_name}")
            return False
        
        # Call the tool
        logger.info(f"Testing tool {tool_name} with args: {kwargs}")
        result = tool_func(user_id=user_id, **kwargs)
        
        # Print the result
        logger.info("Result:")
        print(result)
        
        return True
        
    except Exception as e:
        logger.error(f"Error testing tool: {e}")
        return False

def main():
    """Main function to parse arguments and run tests."""
    parser = argparse.ArgumentParser(description='Test the enhanced Google client')
    parser.add_argument('--user-id', required=True, help='User ID to use for testing')
    
    subparsers = parser.add_subparsers(dest='command', help='Command to run')
    
    # Client test command
    client_parser = subparsers.add_parser('client', help='Test the enhanced client')
    client_parser.add_argument('--service', required=True, choices=['drive', 'calendar', 'gmail', 'docs', 'sheets'], help='Service to test')
    client_parser.add_argument('--method', required=True, help='Method to test')
    client_parser.add_argument('--args', help='JSON string of arguments to pass to the method')
    
    # Tool test command
    tool_parser = subparsers.add_parser('tool', help='Test a direct MCP tool')
    tool_parser.add_argument('--tool', required=True, help='Tool to test')
    tool_parser.add_argument('--args', help='JSON string of arguments to pass to the tool')
    
    args = parser.parse_args()
    
    # Parse arguments
    kwargs = {}
    if args.args:
        try:
            kwargs = json.loads(args.args)
        except json.JSONDecodeError:
            logger.error("Invalid JSON in --args")
            return False
    
    # Run the appropriate test
    if args.command == 'client':
        return test_enhanced_client(args.user_id, args.service, args.method, **kwargs)
    elif args.command == 'tool':
        return test_direct_tool(args.user_id, args.tool, **kwargs)
    else:
        logger.error("No command specified")
        return False

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1) 