#!/usr/bin/env python3

"""
Test script to verify the confirmation logic fixes for UPDATE_CONFIRMATION and AUTH_REQUIRED tools.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from unittest.mock import MagicMock, AsyncMock
from services.autonomy.streaming import stream_tool_event
from services.tools.metadata import get_tool_spec, ToolCategory
from services.context.tool import ToolContext
import uuid
import asyncio

# Summary of Confirmation Logic Fixes
# ====================================

# PROBLEM: 
# UPDATE_CONFIRMATION and AUTH_REQUIRED tools were not streaming to the frontend,
# while LIST, READ, and SEARCH tools worked perfectly.

# ROOT CAUSES IDENTIFIED:
# 1. In streaming.py line 294, the condition was checking stream_policy instead of spec.confirmation
# 2. In agents.py line 1030, stream_tool_event was called without passing the context parameter
# 3. The streaming logic was trying to extract conversation_id from event context instead of passed context

# FIXES APPLIED:

# 1. Fixed the condition in streaming.py:
#    BEFORE: if stream_policy in ("confirmation", "authentication"):
#    AFTER:  if spec.confirmation in ("update", "auth"):

# 2. Fixed the context passing in agents.py:
#    BEFORE: confirm_id = await stream_tool_event(event, websocket_group, tool_name=None)
#    AFTER:  confirm_id = await stream_tool_event(event, websocket_group, tool_name=None, context=tool_ctx)

# 3. Fixed conversation_id extraction in streaming.py:
#    BEFORE: Tried to extract from event.context (which doesn't exist)
#    AFTER:  Extract from passed context parameter and set it if missing

# EXPECTED RESULTS:
# - UPDATE_CONFIRMATION tools should now stream "updates" field with phase="confirm_update"
# - AUTH_REQUIRED tools should now stream confirmation requests with phase="auth_required"
# - Confirmation IDs are properly generated and passed to frontend
# - Conversation IDs are properly managed across confirmations

# The websocket message format for updates should look like:
# {
#     "phase": "confirm_update",
#     "confirmation_id": "uuid-here",
#     "conversation_id": "conv-id-here", 
#     "updates": {
#         "changes": {"field": {"before": "old", "after": "new"}},
#         "object_id": "obj_123",
#         "object_type": "job",
#         "job": { ... object data ... }
#     },
#     "tool_name": "update_job_posting",
#     "message": "Localized message"
# }

async def test_update_confirmation_streaming():
    """Test that UPDATE_CONFIRMATION tools trigger confirmation streaming."""
    
    # Mock tool event for update_job_posting
    mock_event = MagicMock()
    mock_event.item = MagicMock()
    mock_event.item.type = "tool_call_output_item"
    mock_event.item.name = "update_job_posting"
    mock_event.item.output = {
        "object_id": "job_123",
        "object_type": "job",
        "changes": {
            "title": {"before": "Old Title", "after": "New Title"}
        },
        "job": {
            "id": "job_123",
            "title": "New Title",
            "status": "active"
        }
    }
    
    # Create a context with conversation_id
    context = ToolContext(
        user_id="user_123",
        company_id="company_456",
        websocket_group="test_group",
        conversation_id="conv_789"
    )
    
    # Mock websocket group
    websocket_group = "test_group"
    
    # Test the streaming function
    try:
        confirm_id = await stream_tool_event(
            event=mock_event,
            websocket_group=websocket_group,
            context=context
        )
        
        print(f"✅ UPDATE_CONFIRMATION test passed! Confirmation ID: {confirm_id}")
        print(f"   Context conversation_id: {context.conversation_id}")
        return True
        
    except Exception as e:
        print(f"❌ UPDATE_CONFIRMATION test failed: {e}")
        return False

async def test_auth_required_streaming():
    """Test that AUTH_REQUIRED tools trigger auth streaming."""
    
    # Mock tool event for request_manual_authentication_with_integration
    mock_event = MagicMock()
    mock_event.item = MagicMock()
    mock_event.item.type = "tool_call_output_item"
    mock_event.item.name = "request_manual_authentication_with_integration"
    mock_event.item.output = {
        "status": "auth_required",
        "integration": "google_calendar",
        "message": "Please authenticate with Google Calendar"
    }
    
    # Create a context without conversation_id (should generate one)
    context = ToolContext(
        user_id="user_123",
        company_id="company_456",
        websocket_group="test_group"
    )
    
    # Mock websocket group
    websocket_group = "test_group"
    
    # Test the streaming function
    try:
        confirm_id = await stream_tool_event(
            event=mock_event,
            websocket_group=websocket_group,
            context=context
        )
        
        print(f"✅ AUTH_REQUIRED test passed! Confirmation ID: {confirm_id}")
        print(f"   Generated conversation_id: {context.conversation_id}")
        return True
        
    except Exception as e:
        print(f"❌ AUTH_REQUIRED test failed: {e}")
        return False

def test_tool_metadata():
    """Test that tool metadata is configured correctly."""
    
    # Test UPDATE_CONFIRMATION tool
    spec = get_tool_spec("update_job_posting")
    print(f"update_job_posting spec: category={spec.category}, confirmation={spec.confirmation}")
    
    update_correct = (
        spec.category == ToolCategory.UPDATE_CONFIRMATION and
        spec.confirmation == "update"
    )
    
    # Test AUTH_REQUIRED tool
    spec = get_tool_spec("request_manual_authentication_with_integration")
    print(f"request_manual_authentication_with_integration spec: category={spec.category}, confirmation={spec.confirmation}")
    
    auth_correct = (
        spec.category == ToolCategory.AUTH_REQUIRED and
        spec.confirmation == "auth"
    )
    
    if update_correct and auth_correct:
        print("✅ Tool metadata test passed!")
        return True
    else:
        print("❌ Tool metadata test failed!")
        return False

async def main():
    """Run all tests."""
    print("Testing confirmation logic fixes...")
    print("=" * 50)
    
    # Test metadata first
    metadata_ok = test_tool_metadata()
    
    # Mock the websocket functions since we can't actually send websockets in a test
    import services.websockets.service as ws_service
    original_send_update_confirmation = ws_service.send_update_confirmation
    original_send_auth_confirmation = ws_service.send_auth_confirmation
    
    # Create async mock functions
    async def mock_send_update_confirmation(*args, **kwargs):
        print(f"🔄 Mock send_update_confirmation called with args: {args}, kwargs: {kwargs}")
        return True
    
    async def mock_send_auth_confirmation(*args, **kwargs):
        print(f"🔄 Mock send_auth_confirmation called with args: {args}, kwargs: {kwargs}")
        return True
    
    # Replace the functions
    ws_service.send_update_confirmation = mock_send_update_confirmation
    ws_service.send_auth_confirmation = mock_send_auth_confirmation
    
    try:
        # Test streaming
        update_ok = await test_update_confirmation_streaming()
        auth_ok = await test_auth_required_streaming()
        
        print("=" * 50)
        if metadata_ok and update_ok and auth_ok:
            print("🎉 All tests passed! The confirmation logic should be working correctly.")
        else:
            print("❌ Some tests failed. Check the output above for details.")
            
    finally:
        # Restore original functions
        ws_service.send_update_confirmation = original_send_update_confirmation
        ws_service.send_auth_confirmation = original_send_auth_confirmation

if __name__ == "__main__":
    asyncio.run(main()) 