#!/usr/bin/env python3
"""
Simple test for the robust call_id mapping fix.
This tests the logic without importing the actual streaming module.
"""

def test_robust_call_id_mapping():
    """Test the robust call_id mapping logic."""
    print("Testing robust call_id mapping...")
    
    # Simulate the cache being populated during tool_call_item with multiple IDs
    _CALL_ID_TO_TOOL = {}
    tool_name = "update_employee_work_details"
    _CALL_ID_TO_TOOL["call_123"] = tool_name
    _CALL_ID_TO_TOOL["123"] = tool_name  # Same ID in different field
    
    print(f"Cache populated: {_CALL_ID_TO_TOOL}")
    
    # Test different scenarios for tool_call_output_item
    test_cases = [
        # Case 1: call_id in raw_item
        {
            "raw_item": {"call_id": "call_123"},
            "expected": tool_name,
            "description": "call_id in raw_item dict"
        },
        # Case 2: id in raw_item  
        {
            "raw_item": {"id": "123"},
            "expected": tool_name,
            "description": "id in raw_item dict"
        },
        # Case 3: call_id as direct attribute
        {
            "call_id": "call_123",
            "expected": tool_name,
            "description": "call_id as direct attribute"
        },
        # Case 4: id as direct attribute
        {
            "id": "123", 
            "expected": tool_name,
            "description": "id as direct attribute"
        },
        # Case 5: no matching ID
        {
            "raw_item": {"call_id": "nonexistent"},
            "expected": None,
            "description": "no matching ID"
        }
    ]
    
    def mock_extract_tool_name(evt):
        """Mock implementation of the robust _extract_tool_name function."""
        # 4. Robust call_id mapping - check all possible ID fields
        raw = getattr(evt.item, "raw_item", None)
        ids = {
            getattr(evt.item, "id", None),
            getattr(evt.item, "call_id", None),
        }
        if isinstance(raw, dict):
            ids |= {raw.get("id"), raw.get("call_id")}
        
        for cid in filter(None, ids):
            tn = _CALL_ID_TO_TOOL.get(cid)
            if tn:                      # ✅ found the real name
                return tn
        
        return None
    
    # Mock event class
    class MockEvent:
        def __init__(self, **kwargs):
            self.item = MockItem(**kwargs)
    
    class MockItem:
        def __init__(self, **kwargs):
            self.type = "tool_call_output_item"
            for key, value in kwargs.items():
                setattr(self, key, value)
    
    # Run tests
    passed = 0
    total = len(test_cases)
    
    for case in test_cases:
        # Create mock event
        mock_event = MockEvent(**{k: v for k, v in case.items() if k != "expected" and k != "description"})
        
        # Test the extraction
        result = mock_extract_tool_name(mock_event)
        
        if result == case["expected"]:
            print(f"✅ PASS: {case['description']}")
            passed += 1
        else:
            print(f"❌ FAIL: {case['description']} - Expected {case['expected']}, got {result}")
    
    print(f"\nResults: {passed}/{total} tests passed")
    
    # Test cleanup
    print("\nTesting cleanup...")
    cleanup_ids = {
        "call_123",
        "123",
        "nonexistent"  # This shouldn't exist anyway
    }
    
    for cid in cleanup_ids:
        _CALL_ID_TO_TOOL.pop(cid, None)
    
    print(f"Cache after cleanup: {_CALL_ID_TO_TOOL}")
    
    if len(_CALL_ID_TO_TOOL) == 0:
        print("✅ Cleanup test passed")
    else:
        print(f"❌ Cleanup test failed - cache still has {len(_CALL_ID_TO_TOOL)} items")
    
    return passed == total

if __name__ == "__main__":
    success = test_robust_call_id_mapping()
    import sys
    sys.exit(0 if success else 1) 