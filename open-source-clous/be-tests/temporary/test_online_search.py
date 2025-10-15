#!/usr/bin/env python3
"""
Simple test script to verify the online search functionality in GlobalTriggerView.
This script demonstrates the expected API usage for the new online_search trigger type.
"""

import json
import requests

def test_online_search():
    """Test the online search functionality"""
    
    # Test data for different scenarios
    test_cases = [
        {
            "name": "Basic content search",
            "data": {
                "type": "online_search",
                "subtype": "general",
                "content": "What are the latest trends in remote work and hybrid workplace policies?"
            }
        },
        {
            "name": "Training search with object",
            "data": {
                "type": "online_search",
                "subtype": "training",
                "object": json.dumps({
                    "query": "Machine learning certification courses for HR professionals",
                    "context": "Looking for professional development opportunities",
                    "store_result": True
                })
            }
        },
        {
            "name": "Deep research search",
            "data": {
                "type": "online_search",
                "subtype": "deep",
                "object": json.dumps({
                    "search_query": "Employee retention strategies in tech companies 2024",
                    "context": "Preparing comprehensive analysis for management"
                })
            }
        },
        {
            "name": "Benchmark search",
            "data": {
                "type": "online_search",
                "subtype": "benchmark",
                "content": "Average software engineer salaries by experience level in Silicon Valley"
            }
        }
    ]
    
    print("🔍 Online Search API Test Cases")
    print("=" * 50)
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n{i}. {test_case['name']}")
        print("-" * 30)
        
        # Print the request payload
        print("Request payload:")
        print(json.dumps(test_case['data'], indent=2))
        
        # Expected response structure
        expected_response = {
            "status": "success",
            "message": f"Online search completed successfully ({test_case['data'].get('subtype', 'general')})",
            "search_query": "...",
            "search_type": test_case['data'].get('subtype', 'general'),
            "user_id": "...",
            "company_id": "...",
            "timestamp": "...",
            "response": "..."
        }
        
        print("\nExpected response structure:")
        print(json.dumps(expected_response, indent=2))
        
        print("\n" + "="*50)

def test_error_cases():
    """Test error handling scenarios"""
    
    error_cases = [
        {
            "name": "Missing search query",
            "data": {
                "type": "online_search",
                "subtype": "general"
            },
            "expected_error": "No search query provided for online search"
        },
        {
            "name": "Invalid object without query",
            "data": {
                "type": "online_search",
                "object": json.dumps({
                    "context": "Some context but no query"
                })
            },
            "expected_error": "Object must contain 'query', 'content', or 'search_query' field"
        },
        {
            "name": "Invalid subtype (should default to general)",
            "data": {
                "type": "online_search",
                "subtype": "invalid_type",
                "content": "Test query"
            },
            "note": "Should default to 'general' search type"
        }
    ]
    
    print("\n🚨 Error Handling Test Cases")
    print("=" * 50)
    
    for i, error_case in enumerate(error_cases, 1):
        print(f"\n{i}. {error_case['name']}")
        print("-" * 30)
        
        print("Request payload:")
        print(json.dumps(error_case['data'], indent=2))
        
        if 'expected_error' in error_case:
            print(f"\nExpected error: {error_case['expected_error']}")
        
        if 'note' in error_case:
            print(f"\nNote: {error_case['note']}")
        
        print("\n" + "="*50)

if __name__ == "__main__":
    print("🧪 Testing Online Search Functionality")
    print("This script demonstrates the expected API usage patterns.")
    print("\nTo actually test, send POST requests to:")
    print("POST /api/global-trigger/")
    print("Headers: Authorization: Bearer <jwt_token>")
    print("Content-Type: application/json or multipart/form-data")
    
    test_online_search()
    test_error_cases()
    
    print("\n✅ Test script completed!")
    print("\nActual API endpoint usage:")
    print("curl -X POST http://localhost:8000/api/global-trigger/ \\")
    print("  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \\")
    print("  -H 'Content-Type: application/json' \\")
    print("  -d '{\"type\": \"online_search\", \"content\": \"Your search query here\"}'") 