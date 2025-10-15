"""
Test script to demonstrate the new pulse_id functionality in FormsView.

This script demonstrates:
1. GET requests with pulse_id parameter 
2. POST requests with pulse_id in payload for form submission

The changes maintain backward compatibility while adding pulse_id support.
"""

import json

# Example API calls demonstrating the new functionality

# 1. GET request using pulse_id (new functionality)
example_get_request_pulse_id = {
    "method": "GET",
    "url": "/api/forms/",
    "query_params": {
        "pulse_id": "550e8400-e29b-41d4-a716-446655440000"  # UUID of specific pulse
    },
    "headers": {
        "Authorization": "Bearer <token>",
        "Clous-User-ID": "<user_id>"
    },
    "description": "Retrieve forms related to a specific pulse by its ID"
}

# 2. GET request using discovery_id (legacy functionality - still works)
example_get_request_legacy = {
    "method": "GET", 
    "url": "/api/forms/",
    "query_params": {
        "discovery_id": "550e8400-e29b-41d4-a716-446655440000"  # UUID of specific pulse
    },
    "headers": {
        "Authorization": "Bearer <token>",
        "Clous-User-ID": "<user_id>"
    },
    "description": "Retrieve forms using legacy discovery_id parameter (still supported)"
}

# 3. POST request using pulse_id (new functionality)
example_post_request_pulse_id = {
    "method": "POST",
    "url": "/api/forms/",
    "headers": {
        "Authorization": "Bearer <token>",
        "Content-Type": "application/json"
    },
    "body": {
        "pulse_id": "550e8400-e29b-41d4-a716-446655440000",  # Target specific pulse
        "responses": {
            "raw": "User responses from the form...",
            "insights": "AI-generated insights...",
            "notes": "Additional notes..."
        }
    },
    "description": "Submit a form directly to a specific pulse by its ID"
}

# 4. POST request using type (legacy functionality - still works)  
example_post_request_legacy = {
    "method": "POST",
    "url": "/api/forms/",
    "headers": {
        "Authorization": "Bearer <token>",
        "Content-Type": "application/json"
    },
    "body": {
        "type": "experience",  # Legacy type-based workflow
        "responses": {
            "raw": "User responses from the form...",
            "insights": "AI-generated insights...",
            "notes": "Additional notes..."
        }
    },
    "description": "Submit a form using legacy type-based workflow (still supported)"
}

# Summary of changes made:
changes_summary = {
    "files_modified": [
        "jobs/views.py",
        "services/payloads/pulse/pulse.py"
    ],
    "new_functionality": [
        "GET /api/forms/ now accepts 'pulse_id' query parameter",
        "POST /api/forms/ now accepts 'pulse_id' in request body",
        "Added _handle_pulse_id_submit() method for pulse ID-based workflow",
        "Added _generic_form_submit_to_pulse() for generic form submission to specific pulse",
        "Added _performance_submit_to_pulse() for performance forms to specific pulse"
    ],
    "backward_compatibility": [
        "All existing functionality preserved",
        "Legacy 'discovery_id' parameter still works in GET requests",
        "Legacy type-based workflow still works in POST requests",
        "Existing handler methods unchanged"
    ],
    "workflow_priority": [
        "1. If pulse_id provided in POST → use new pulse_id workflow",
        "2. Otherwise → use existing type-based workflow", 
        "3. GET supports both pulse_id and discovery_id (pulse_id takes precedence)"
    ]
}

if __name__ == "__main__":
    print("=== New Pulse ID Functionality Test Examples ===\n")
    
    print("1. GET with pulse_id (NEW):")
    print(json.dumps(example_get_request_pulse_id, indent=2))
    print()
    
    print("2. GET with discovery_id (LEGACY - still works):")
    print(json.dumps(example_get_request_legacy, indent=2))
    print()
    
    print("3. POST with pulse_id (NEW):")
    print(json.dumps(example_post_request_pulse_id, indent=2))
    print()
    
    print("4. POST with type (LEGACY - still works):")
    print(json.dumps(example_post_request_legacy, indent=2))
    print()
    
    print("=== Summary of Changes ===")
    print(json.dumps(changes_summary, indent=2)) 