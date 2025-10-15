#!/usr/bin/env python3
"""
Test script to demonstrate the enhanced tool message functionality.
This shows how tool-specific messages take precedence over phase-based messages.
"""

from services.middleware.helper.language_helpers import LanguageHelperService
from services.maps.conversation_tool_ws_map import get_tool_message

def test_tool_messages():
    """Test the enhanced tool message functionality."""
    
    # Initialize the language helper
    language_helper = LanguageHelperService()
    
    print("=== Testing Enhanced Tool Message Functionality ===\n")
    
    # Test 1: Tool with specific message
    print("1. Testing tool with specific message:")
    tool_name = "list_candidates"
    message, category = get_tool_message(tool_name)
    print(f"   Tool: {tool_name}")
    print(f"   Message: {message}")
    print(f"   Category: {category}")
    print()
    
    # Test 2: Tool without specific message (falls back to phase-based)
    print("2. Testing tool without specific message:")
    tool_name = "list_document_reports"  # This tool doesn't have a specific message
    message, category = get_tool_message(tool_name)
    print(f"   Tool: {tool_name}")
    print(f"   Message: {message}")
    print(f"   Category: {category}")
    print()
    
    # Test 3: Direct language helper test
    print("3. Testing language helper directly:")
    # Test with tool-specific message
    specific_message = language_helper.get_ws_message("list_retrieval", "en", "list_candidates")
    print(f"   Tool-specific message for 'list_candidates': {specific_message}")
    
    # Test without tool-specific message (phase-based)
    phase_message = language_helper.get_ws_message("list_retrieval", "en", "list_document_reports")
    print(f"   Phase-based message for 'list_document_reports': {phase_message}")
    print()
    
    # Test 4: Different languages
    print("4. Testing different languages:")
    for lang in ["en", "es", "fr", "de"]:
        message, category = get_tool_message("create_chart", None)  # No user, default to "en"
        if lang == "en":
            print(f"   {lang.upper()}: {message}")
    
    # Test 5: Integration tools
    print("\n5. Testing integration tools:")
    integration_tools = ["github_get_user_info", "notion_query_database", "slack_post_message"]
    for tool in integration_tools:
        message, category = get_tool_message(tool)
        print(f"   {tool}: {message}")
    
    print("\n=== Test Complete ===")

if __name__ == "__main__":
    test_tool_messages() 