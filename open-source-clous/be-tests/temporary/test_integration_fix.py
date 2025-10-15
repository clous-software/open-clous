#!/usr/bin/env python
"""
Simple test script to verify the APIntegrationAuthView field mappings are correct.
"""

import os
import sys
import django

# Add the project directory to the Python path
sys.path.append('/Users/alvipe/Desktop/cloush-server')

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from users.models import UserIntegration

def test_user_integration_fields():
    """Test that UserIntegration model has the expected fields."""
    print("Testing UserIntegration model fields...")
    
    # Check that the model has the expected fields
    expected_fields = [
        'id', 'user', 'provider', 'auth_type', 'external_id', 
        'access_token', 'refresh_token', 'token_expires_at', 
        'mcp_url', 'scopes', 'metadata', 'last_sync_at', 
        'sync_status', 'is_active'
    ]
    
    model_fields = [field.name for field in UserIntegration._meta.fields]
    
    print(f"Expected fields: {expected_fields}")
    print(f"Actual fields: {model_fields}")
    
    missing_fields = set(expected_fields) - set(model_fields)
    extra_fields = set(model_fields) - set(expected_fields)
    
    if missing_fields:
        print(f"❌ Missing fields: {missing_fields}")
        return False
    elif extra_fields:
        print(f"⚠️  Extra fields (not critical): {extra_fields}")
    
    print("✅ All expected fields are present!")
    return True

def test_auth_choices():
    """Test that the auth_type choices are correctly defined."""
    print("\nTesting auth_type choices...")
    
    expected_choices = [
        ('oauth', 'OAuth2'),
        ('api_key', 'API Key'), 
        ('pat', 'Personal Access')
    ]
    
    actual_choices = UserIntegration.AUTH_CHOICES
    
    print(f"Expected choices: {expected_choices}")
    print(f"Actual choices: {actual_choices}")
    
    if actual_choices == expected_choices:
        print("✅ Auth choices are correct!")
        return True
    else:
        print("❌ Auth choices don't match!")
        return False

def test_unique_constraints():
    """Test that the unique constraints are correctly defined."""
    print("\nTesting unique constraints...")
    
    expected_unique_together = ('user', 'provider', 'external_id')
    actual_unique_together = UserIntegration._meta.unique_together[0]
    
    print(f"Expected unique_together: {expected_unique_together}")
    print(f"Actual unique_together: {actual_unique_together}")
    
    if actual_unique_together == expected_unique_together:
        print("✅ Unique constraints are correct!")
        return True
    else:
        print("❌ Unique constraints don't match!")
        return False

if __name__ == "__main__":
    print("Testing APIntegrationAuthView field mappings...\n")
    
    tests = [
        test_user_integration_fields,
        test_auth_choices,
        test_unique_constraints
    ]
    
    all_passed = True
    for test in tests:
        if not test():
            all_passed = False
    
    print(f"\n{'='*50}")
    if all_passed:
        print("✅ All tests passed! The APIntegrationAuthView should work correctly.")
    else:
        print("❌ Some tests failed. Please check the field mappings.")
    
    print("="*50) 