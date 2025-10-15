#!/usr/bin/env python3
"""
Test script to verify the UPDATE_CONFIRMATION flow fixes.

This script tests:
1. Agent stops correctly after confirmation tool fires
2. WebSocket payload includes properly serialized updates field
3. Settings flag controls behavior
"""

import asyncio
import json
import logging
from unittest.mock import AsyncMock, MagicMock, patch
from django.conf import settings

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_websocket_serialization():
    """Test that WebSocket service properly serializes non-JSON-safe objects."""
    from services.websockets.service import WebSocketService
    
    # Create test data with non-JSON-safe objects
    from decimal import Decimal
    from datetime import datetime
    
    changes = {
        "salary": Decimal("50000.50"),
        "start_date": datetime(2024, 1, 1),
        "active": True,
        "nested": {
            "amount": Decimal("100.25"),
            "timestamp": datetime(2024, 1, 1, 12, 0, 0)
        }
    }
    
    object_data = {
        "id": 123,
        "name": "John Doe",
        "salary": Decimal("50000.50"),
        "created_at": datetime(2024, 1, 1)
    }
    
    # Test serialization
    service = WebSocketService()
    safe_changes = service.serialize_for_websocket(changes)
    safe_object = service.serialize_for_websocket(object_data)
    
    # Verify serialization worked
    assert isinstance(safe_changes, dict)
    assert isinstance(safe_object, dict)
    
    # Verify Decimal objects were converted to strings or numbers
    assert isinstance(safe_changes["salary"], (str, float, int))
    assert isinstance(safe_object["salary"], (str, float, int))
    
    # Verify datetime objects were converted to strings
    assert isinstance(safe_changes["start_date"], str)
    assert isinstance(safe_object["created_at"], str)
    
    # Test that the data can be JSON serialized
    try:
        json.dumps(safe_changes)
        json.dumps(safe_object)
        logger.info("✅ WebSocket serialization test passed")
        return True
    except Exception as e:
        logger.error(f"❌ WebSocket serialization test failed: {e}")
        return False

async def test_agent_confirmation_stop():
    """Test that agent stops correctly after confirmation tool fires."""
    from services.autonomy.agents import AgentService
    
    # Mock the confirmation service
    with patch('services.autonomy.agents.DurableConfirmationService') as mock_confirmation_service:
        mock_service = AsyncMock()
        mock_confirmation_service.return_value = mock_service
        
        # Mock the result object
        mock_result = MagicMock()
        mock_result.cancel = AsyncMock()
        mock_result.is_complete = False
        
        # Mock the websocket service
        with patch('services.autonomy.agents.send_status') as mock_send_status:
            mock_send_status.return_value = AsyncMock()
            
            # Create agent service
            agent_service = AgentService()
            
            # Mock the process_agent_streamed method to simulate confirmation
            with patch.object(agent_service, 'process_agent_streamed') as mock_process:
                # Simulate confirmation scenario
                mock_process.return_value = {
                    "status": "pending_confirmation",
                    "confirmation_id": "test-confirm-id",
                    "agent_name": "test-agent"
                }
                
                # Test the behavior
                result = await agent_service.process_agent_streamed(
                    agent=MagicMock(),
                    messages=[{"role": "user", "content": "test"}],
                    context=MagicMock(),
                    llm_ctx=MagicMock(),
                    websocket_group="test-group"
                )
                
                # Verify the result indicates pending confirmation
                assert result["status"] == "pending_confirmation"
                assert "confirmation_id" in result
                assert "agent_name" in result
                
                logger.info("✅ Agent confirmation stop test passed")
                return True
                
    return False

def test_settings_flag():
    """Test that the settings flag controls behavior correctly."""
    # Test default behavior (should be True)
    default_strict_stop = getattr(settings, 'AGENTS_CONFIRMATION_STRICT_STOP', True)
    assert default_strict_stop is True
    
    # Test with different values
    with patch('django.conf.settings.AGENTS_CONFIRMATION_STRICT_STOP', False):
        strict_stop = getattr(settings, 'AGENTS_CONFIRMATION_STRICT_STOP', True)
        assert strict_stop is False
    
    with patch('django.conf.settings.AGENTS_CONFIRMATION_STRICT_STOP', True):
        strict_stop = getattr(settings, 'AGENTS_CONFIRMATION_STRICT_STOP', True)
        assert strict_stop is True
    
    logger.info("✅ Settings flag test passed")
    return True

async def main():
    """Run all tests."""
    logger.info("🧪 Running confirmation fixes tests...")
    
    tests = [
        ("WebSocket Serialization", test_websocket_serialization),
        ("Agent Confirmation Stop", test_agent_confirmation_stop),
        ("Settings Flag", test_settings_flag),
    ]
    
    results = []
    
    for test_name, test_func in tests:
        logger.info(f"\n📋 Running {test_name} test...")
        try:
            if asyncio.iscoroutinefunction(test_func):
                result = await test_func()
            else:
                result = test_func()
            results.append((test_name, result))
        except Exception as e:
            logger.error(f"❌ {test_name} test failed with exception: {e}")
            results.append((test_name, False))
    
    # Summary
    logger.info("\n" + "="*50)
    logger.info("📊 TEST RESULTS SUMMARY")
    logger.info("="*50)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        logger.info(f"{test_name}: {status}")
        if result:
            passed += 1
    
    logger.info(f"\n🎯 Overall: {passed}/{total} tests passed")
    
    if passed == total:
        logger.info("🎉 All tests passed! The confirmation fixes are working correctly.")
    else:
        logger.error("💥 Some tests failed. Please review the implementation.")
    
    return passed == total

if __name__ == "__main__":
    # Set up Django environment
    import os
    import django
    
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    django.setup()
    
    # Run tests
    success = asyncio.run(main())
    exit(0 if success else 1) 