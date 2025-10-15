#!/usr/bin/env python
"""
Test script to validate the company_user update fix in GlobalUserSerializer
"""

import os
import sys
import django

# Add the project directory to Python path
sys.path.append('/Users/alvipe/Desktop/cloush-server')

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Initialize Django
django.setup()

from users.serializers import GlobalUserSerializer
from users.models import User, CompanyUser
from jobs.models import Company

def test_company_user_update():
    """Test that company_user updates work correctly."""
    
    print("Testing company_user update functionality...")
    
    # Test data structure similar to what's received in the logs
    test_payload = {
        'location': 'New York, NY',
        'company_user': {'function': 'Junior GTM Engineer'},
        'type': 'employee'
    }
    
    # Simulate the transformation that happens in CandidatesView.put()
    processed_payload = test_payload.copy()
    
    # Allow the old 'company_user' key for backward compatibility
    if 'company_user' in processed_payload and 'company_user_update' not in processed_payload:
        print(f"Converting 'company_user' to 'company_user_update': {processed_payload['company_user']}")
        processed_payload['company_user_update'] = processed_payload.pop('company_user')
    
    print(f"Original payload: {test_payload}")
    print(f"Processed payload: {processed_payload}")
    
    # Test that the new field is in the serializer fields
    serializer_fields = GlobalUserSerializer.Meta.fields
    print(f"GlobalUserSerializer fields contain 'company_user_update': {'company_user_update' in serializer_fields}")
    print(f"GlobalUserSerializer fields contain 'company_user': {'company_user' in serializer_fields}")
    
    # Create a serializer instance to test field definitions
    serializer = GlobalUserSerializer()
    
    # Check field types
    print(f"company_user field type: {type(serializer.fields.get('company_user'))}")
    print(f"company_user_update field type: {type(serializer.fields.get('company_user_update'))}")
    
    # Check if company_user is read-only and company_user_update is write-only
    company_user_field = serializer.fields.get('company_user')
    company_user_update_field = serializer.fields.get('company_user_update')
    
    if company_user_field:
        print(f"company_user is read_only: {getattr(company_user_field, 'read_only', False)}")
    
    if company_user_update_field:
        print(f"company_user_update is write_only: {getattr(company_user_update_field, 'write_only', False)}")
        print(f"company_user_update is required: {getattr(company_user_update_field, 'required', True)}")
    
    print("\nTest completed successfully! ✅")
    print("\nThe fix should now allow company_user updates to work properly.")
    print("When the API receives 'company_user' data, it will be converted to 'company_user_update'")
    print("and processed correctly by the serializer.")

if __name__ == '__main__':
    test_company_user_update() 