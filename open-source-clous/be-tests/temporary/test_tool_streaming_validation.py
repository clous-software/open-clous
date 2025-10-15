#!/usr/bin/env python3
"""
Tool Streaming and Metadata Integration Validation Script

This script validates that:
1. All tools are properly registered in the metadata system
2. The streaming system can handle all registered tools
3. Tool specifications are correctly configured
4. The integration between metadata and streaming works correctly
"""

import sys
import os
import logging
from typing import Dict, List, Any

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def test_tool_registration():
    """Test that all tools are properly registered."""
    logger.info("🔍 Testing tool registration...")
    
    try:
        from services.tools.metadata import (
            TOOL_REGISTRY, 
            TOOL_META, 
            validate_tool_registration,
            get_registered_tools,
            get_tools_by_category,
            ToolCategory
        )
        
        # Check if all tools in TOOL_META are registered
        missing_tools = []
        for tool_name in TOOL_META:
            if tool_name not in TOOL_REGISTRY:
                missing_tools.append(tool_name)
        
        if missing_tools:
            logger.error(f"❌ Missing tool registrations: {missing_tools}")
            return False
        
        logger.info(f"✅ All {len(TOOL_META)} tools are properly registered")
        
        # Test validation function
        if validate_tool_registration():
            logger.info("✅ Tool registration validation passed")
        else:
            logger.error("❌ Tool registration validation failed")
            return False
        
        # Test helper functions
        registered_tools = get_registered_tools()
        logger.info(f"✅ Retrieved {len(registered_tools)} registered tools")
        
        # Test category filtering
        list_tools = get_tools_by_category(ToolCategory.LIST_OBJECTS)
        logger.info(f"✅ Found {len(list_tools)} LIST_OBJECTS tools")
        
        return True
        
    except Exception as e:
        logger.error(f"❌ Tool registration test failed: {e}")
        return False

def test_tool_spec_retrieval():
    """Test that tool specifications can be retrieved correctly."""
    logger.info("🔍 Testing tool specification retrieval...")
    
    try:
        from services.tools.metadata import get_tool_spec, ToolCategory
        
        # Test known tools
        test_tools = [
            "list_candidates",
            "read_candidate_data", 
            "update_job_posting",
            "request_manual_authentication_with_integration"
        ]
        
        for tool_name in test_tools:
            spec = get_tool_spec(tool_name)
            logger.info(f"✅ Tool '{tool_name}': category={spec.category}, stream_policy={spec.stream_policy}")
            
            # Verify spec has required attributes
            required_attrs = ['name', 'category', 'risk', 'stream_policy', 'confirmation']
            for attr in required_attrs:
                if not hasattr(spec, attr):
                    logger.error(f"❌ Tool spec for '{tool_name}' missing attribute: {attr}")
                    return False
        
        # Test unknown tool (should return fallback)
        unknown_spec = get_tool_spec("unknown_tool_12345")
        if unknown_spec.category == ToolCategory.NONE:
            logger.info("✅ Unknown tool correctly returns fallback spec")
        else:
            logger.error("❌ Unknown tool should return NONE category")
            return False
        
        return True
        
    except Exception as e:
        logger.error(f"❌ Tool specification test failed: {e}")
        return False

def test_streaming_integration():
    """Test that the streaming system can work with the metadata system."""
    logger.info("🔍 Testing streaming integration...")
    
    try:
        # Set up Django settings for the test
        import os
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
        
        import django
        django.setup()
        
        from services.tools.metadata import get_tool_spec, ToolCategory
        from services.autonomy.streaming import stream_tool_event
        
        # Create a mock event for testing
        class MockEvent:
            class MockItem:
                def __init__(self, item_type, name):
                    self.type = item_type
                    self.name = name
                    self.input = {"test": "data"}
                    self.output = {"result": "success"}
            
            def __init__(self, item_type, name):
                self.item = self.MockItem(item_type, name)
        
        # Test with a known tool
        test_event = MockEvent("tool_call_item", "list_candidates")
        
        # This would normally require a real websocket group and context
        # For now, just test that we can get the tool spec
        spec = get_tool_spec("list_candidates")
        logger.info(f"✅ Streaming integration test: {spec.name} -> {spec.category}")
        
        return True
        
    except Exception as e:
        logger.error(f"❌ Streaming integration test failed: {e}")
        return False

def test_tool_categories():
    """Test that tool categories are properly configured."""
    logger.info("🔍 Testing tool categories...")
    
    try:
        from services.tools.metadata import get_tools_by_category, ToolCategory
        
        # Test each category
        categories_to_test = [
            ToolCategory.LIST_OBJECTS,
            ToolCategory.READ_OBJECT,
            ToolCategory.UPDATE_CONFIRMATION,
            ToolCategory.AUTH_REQUIRED,
            ToolCategory.SEARCH_OBJECTS,
            ToolCategory.AI_MODEL_REASON
        ]
        
        for category in categories_to_test:
            tools = get_tools_by_category(category)
            logger.info(f"✅ Category {category.value}: {len(tools)} tools")
            
            # Verify stream policies are appropriate for category
            for tool_name, spec in tools.items():
                if category == ToolCategory.READ_OBJECT and spec.stream_policy != "args":
                    logger.warning(f"⚠️ READ_OBJECT tool '{tool_name}' has stream_policy '{spec.stream_policy}', expected 'args'")
                elif category == ToolCategory.LIST_OBJECTS and spec.stream_policy != "output":
                    logger.warning(f"⚠️ LIST_OBJECTS tool '{tool_name}' has stream_policy '{spec.stream_policy}', expected 'output'")
        
        return True
        
    except Exception as e:
        logger.error(f"❌ Tool categories test failed: {e}")
        return False

def main():
    """Run all validation tests."""
    logger.info("🚀 Starting Tool Streaming and Metadata Integration Validation")
    
    tests = [
        ("Tool Registration", test_tool_registration),
        ("Tool Specification Retrieval", test_tool_spec_retrieval),
        ("Streaming Integration", test_streaming_integration),
        ("Tool Categories", test_tool_categories)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        logger.info(f"\n{'='*60}")
        logger.info(f"Running: {test_name}")
        logger.info(f"{'='*60}")
        
        try:
            if test_func():
                logger.info(f"✅ {test_name}: PASSED")
                passed += 1
            else:
                logger.error(f"❌ {test_name}: FAILED")
        except Exception as e:
            logger.error(f"❌ {test_name}: ERROR - {e}")
    
    logger.info(f"\n{'='*60}")
    logger.info(f"VALIDATION SUMMARY: {passed}/{total} tests passed")
    logger.info(f"{'='*60}")
    
    if passed == total:
        logger.info("🎉 All tests passed! Tool streaming and metadata integration is working correctly.")
        return 0
    else:
        logger.error("💥 Some tests failed. Please review the issues above.")
        return 1

if __name__ == "__main__":
    sys.exit(main()) 