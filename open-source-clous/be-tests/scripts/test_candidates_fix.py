#!/usr/bin/env python
import os
import sys
import django
from django.conf import settings

# Add the project directory to Python path
sys.path.append('/Users/alvipe/Desktop/cloush-server')

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.test import RequestFactory
from django.contrib.auth import get_user_model
from users.views import CandidatesView
from users.models import CompanyUser, Company
from users.models import Resume
import json

User = get_user_model()

def test_candidates_view_put():
    print("Starting CandidatesView PUT test...")
    
    # Create test data
    try:
        # Use unique emails to avoid conflicts
        import uuid
        unique_id = str(uuid.uuid4())[:8]
        
        # Create company (first create a user to be the company owner)
        owner_user = User.objects.create(
            email=f"owner{unique_id}@company.com",
            first_name="Owner",
            last_name="User"
        )
        company = Company.objects.create(
            name=f"Test Company {unique_id}",
            created_by=owner_user
        )
        print(f"Created company: {company.id}")
        
        # Create user
        user = User.objects.create(
            email=f"test{unique_id}@user.com",
            first_name="John",
            last_name="Doe",
            location="Old Location"
        )
        print(f"Created user: {user.id} with location: {user.location}")
        
        # Create CompanyUser
        company_user = CompanyUser.objects.create(
            user=user,
            company=company,
            role="employee"
        )
        print(f"Created company user: {company_user.id}")
        
        # Test data structure matching the log
        test_data = {
            "updated_data": {
                "location": "New York, NY",
                "company_user": {
                    "function": "Junior GTM Engineer"
                }
            },
            "id": str(user.id),
            "type": "employee"
        }
        
        # Create request
        factory = RequestFactory()
        request = factory.put(
            '/api/candidates/',
            data=json.dumps(test_data),
            content_type='application/json'
        )
        request.user = user  # Simulate authenticated user
        
        # Parse the JSON data to make it accessible as request.data 
        import json
        from django.utils.datastructures import MultiValueDict
        from django.http import QueryDict
        
        # Parse JSON body
        request._body = request.body
        request.data = json.loads(request._body.decode('utf-8'))
        
        # Test the view
        view = CandidatesView()
        try:
            response = view.put(request)
            print(f"Response status: {response.status_code}")
            
            # Check if user was updated
            user.refresh_from_db()
            print(f"User location after update: {user.location}")
            
            if user.location == "New York, NY":
                print("✅ SUCCESS: User location was updated correctly!")
            else:
                print("❌ FAIL: User location was not updated")
                
        except Exception as e:
            print(f"❌ FAIL: Exception during view call: {e}")
            import traceback
            traceback.print_exc()
            
    except Exception as e:
        print(f"❌ FAIL: Exception during setup: {e}")
        import traceback
        traceback.print_exc()
    
    # Clean up
    try:
        if 'user' in locals():
            user.delete()
        if 'company' in locals():
            company.delete()
        print("Cleaned up test data")
    except:
        pass

if __name__ == "__main__":
    test_candidates_view_put() 