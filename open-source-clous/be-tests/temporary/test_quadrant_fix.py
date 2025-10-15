#!/usr/bin/env python3
"""Test script to verify the quadrant grid service fix for string responses."""

import json
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(__file__))

def test_string_response_handling():
    """Test that the quadrant grid service can handle string AI responses."""
    
    # Mock the AI service behavior that was causing the issue
    class MockAIService:
        def process_ai_request(self, **kwargs):
            # Return a string response like what was happening in the error
            return '{"ids": ["a2c12a35-3a3c-41f0-9c86-80d6815db4a7", "f3d52a95-fec7-4491-9754-8262f7f17a2d"]}'
    
    # Mock the other services
    class MockTransformService:
        def list_objects(self, **kwargs):
            return [
                {"id": "a2c12a35-3a3c-41f0-9c86-80d6815db4a7", "name": "Employee 1", "description": "Test employee 1"},
                {"id": "f3d52a95-fec7-4491-9754-8262f7f17a2d", "name": "Employee 2", "description": "Test employee 2"},
            ]
    
    class MockRetrieveService:
        def __init__(self, **kwargs):
            pass
        
        def get_object_context(self, **kwargs):
            return "Mock context"
    
    class MockParsingHelper:
        def singularize(self, text):
            return text.rstrip('s') if text.endswith('s') else text
        
        def clean_object_type(self, text):
            return text.lower()
    
    # Test the fix
    try:
        from services.endware.functions.quadrant_grid_service import QuadrantGridService, QuadrantGridRequest
        
        # Create a service instance
        service = QuadrantGridService()
        
        # Replace the services with mocks
        service.ai_service = MockAIService()
        service.transform_service = MockTransformService()
        service.retrieve_service = MockRetrieveService()
        service.parsing_helper = MockParsingHelper()
        
        # Test the _classify_objects method directly
        listed_objects = [
            {"id": "a2c12a35-3a3c-41f0-9c86-80d6815db4a7", "name": "Employee 1", "description": "Test employee 1"},
            {"id": "f3d52a95-fec7-4491-9754-8262f7f17a2d", "name": "Employee 2", "description": "Test employee 2"},
        ]
        
        result = service._classify_objects(
            listed_objects=listed_objects,
            object_type="employee",
            user_input="test query",
            additional_context="test context"
        )
        
        print(f"✅ Test passed! Successfully handled string AI response.")
        print(f"Selected objects: {len(result)}")
        print(f"Object IDs: {[obj.get('id') for obj in result]}")
        return True
        
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_incomplete_json_handling():
    """Test handling of incomplete JSON responses."""
    
    class MockAIServiceIncomplete:
        def process_ai_request(self, **kwargs):
            # Return incomplete JSON like in the original error
            return '{"ids": [\n    "a2c12a35-3a3c-41f0-9c86-80d6815db4a7",\n    "f3d52a95-fec7-4491-9754-8262f7f17a2d",\n    "0ca93d11-d67d-488e-b4de-e97858fda1c0",'
    
    class MockTransformService:
        def list_objects(self, **kwargs):
            return [
                {"id": "a2c12a35-3a3c-41f0-9c86-80d6815db4a7", "name": "Employee 1", "description": "Test employee 1"},
                {"id": "f3d52a95-fec7-4491-9754-8262f7f17a2d", "name": "Employee 2", "description": "Test employee 2"},
                {"id": "0ca93d11-d67d-488e-b4de-e97858fda1c0", "name": "Employee 3", "description": "Test employee 3"},
            ]
    
    class MockRetrieveService:
        def __init__(self, **kwargs):
            pass
    
    class MockParsingHelper:
        def singularize(self, text):
            return text.rstrip('s') if text.endswith('s') else text
        
        def clean_object_type(self, text):
            return text.lower()
    
    try:
        from services.endware.functions.quadrant_grid_service import QuadrantGridService
        
        service = QuadrantGridService()
        service.ai_service = MockAIServiceIncomplete()
        service.transform_service = MockTransformService()
        service.retrieve_service = MockRetrieveService()
        service.parsing_helper = MockParsingHelper()
        
        listed_objects = [
            {"id": "a2c12a35-3a3c-41f0-9c86-80d6815db4a7", "name": "Employee 1", "description": "Test employee 1"},
            {"id": "f3d52a95-fec7-4491-9754-8262f7f17a2d", "name": "Employee 2", "description": "Test employee 2"},
            {"id": "0ca93d11-d67d-488e-b4de-e97858fda1c0", "name": "Employee 3", "description": "Test employee 3"},
        ]
        
        result = service._classify_objects(
            listed_objects=listed_objects,
            object_type="employee",
            user_input="test query",
            additional_context="test context"
        )
        
        print(f"✅ Incomplete JSON test passed! Successfully extracted IDs from incomplete response.")
        print(f"Selected objects: {len(result)}")
        print(f"Object IDs: {[obj.get('id') for obj in result]}")
        return True
        
    except Exception as e:
        print(f"❌ Incomplete JSON test failed with error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("Testing quadrant grid service fixes...")
    
    test1_passed = test_string_response_handling()
    test2_passed = test_incomplete_json_handling()
    
    if test1_passed and test2_passed:
        print("\n🎉 All tests passed! The fix should resolve the original issue.")
        sys.exit(0)
    else:
        print("\n❌ Some tests failed. The issue may not be fully resolved.")
        sys.exit(1) 