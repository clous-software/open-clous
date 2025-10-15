#!/usr/bin/env python
"""
Test script to verify GlobalJobSerializer handles complex nested data correctly.
"""

import os
import sys
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# Sample request data similar to what was failing in the logs
test_data = {
    'id': '1a301f5a-ec33-4d90-90ed-538330888fdb',
    'user': {
        'id': '24d85ea1-930d-4f87-b489-3918374e125b',
        'email': 'avillalba@clous.app',
        'first_name': 'Alvaro',
        'last_name': 'Villalba Perez',
        # ... (rest of user data)
    },
    'company': {
        'id': 'fdfe2ec6-a76d-41f1-b9e3-009f8a46c363',
        'name': 'Clous',
        # ... (rest of company data)
    },
    'skills': [
        {
            'id': '5047ea12-07d1-445f-a324-ec66ba5b5118',
            'name': 'Trabajo en equipo',
            'type': None,
            # ... (rest of skill data)
        }
    ],
    'tools': [
        {
            'id': 'c9a72cb1-a1aa-46dc-a7ab-2399978460fb',
            'title': 'AWS',
            'type': 'tool',
        },
        {
            'id': '2591847f-50e4-4c00-a277-e7624255d03e',
            'title': 'Docker',
            'type': 'tool',
        }
    ],
    'languages': [
        {
            'id': '07fbdc0d-a6e1-4c5e-9e17-94ff1ab63387',
            'title': 'Español',
            'type': 'language',
        }
    ],
    'org_unit': {
        'id': 'dcd0d763-ed54-4bfc-90af-d84f4f72226f',
        'type': 'org_unit',
        'name': 'Engineering',
    },
    'role': 'Ingeniero Senior de Software',
    'location': 'Remoto, España',
    'contract': 'Tiempo completo',
    'max_salary': '52000',
    'min_salary': '45000',
    'currency': 'EUR',
    'status': 'published',
}

def test_serializer_validation():
    """Test that the serializer can handle complex nested data without validation errors."""
    print("Testing GlobalJobSerializer with complex nested data...")
    
    try:
        from jobs.serializers import GlobalJobSerializer
        
        # Test the to_internal_value method directly
        serializer = GlobalJobSerializer()
        
        print("1. Testing to_internal_value method...")
        internal_data = serializer.to_internal_value(test_data)
        print(f"✅ to_internal_value succeeded")
        print(f"   Original fields: {list(test_data.keys())}")
        print(f"   Internal fields: {list(internal_data.keys())}")
        
        # Check that nested objects were moved to dedicated fields
        if 'skills_data' in internal_data:
            print(f"   ✅ skills moved to skills_data: {len(internal_data['skills_data'])} items")
        if 'tools_data' in internal_data:
            print(f"   ✅ tools moved to tools_data: {len(internal_data['tools_data'])} items")
        if 'languages_data' in internal_data:
            print(f"   ✅ languages moved to languages_data: {len(internal_data['languages_data'])} items")
        if 'org_unit_data' in internal_data:
            print(f"   ✅ org_unit moved to org_unit_data: {internal_data['org_unit_data']}")
        
        # Check that complex nested objects were removed
        removed_fields = ['user', 'company', 'skills', 'tools', 'languages', 'org_unit']
        for field in removed_fields:
            if field not in internal_data:
                print(f"   ✅ {field} correctly removed from validation")
        
        print("\n2. Testing serializer validation...")
        
        # Test partial validation (as used in PUT requests)
        serializer = GlobalJobSerializer(data=test_data, partial=True)
        is_valid = serializer.is_valid()
        
        if is_valid:
            print("✅ Serializer validation passed!")
            print(f"   Validated data fields: {list(serializer.validated_data.keys())}")
        else:
            print("❌ Serializer validation failed!")
            print(f"   Errors: {serializer.errors}")
            
        return is_valid
        
    except Exception as e:
        print(f"❌ Test failed with exception: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_serializer_validation()
    print(f"\nTest {'PASSED' if success else 'FAILED'}") 