#!/usr/bin/env python
import os
import sys

# Add the project directory to the path
sys.path.insert(0, '/Users/alvipe/Desktop/cloush-server')

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
import django
django.setup()

from jobs.models import Job
from jobs.serializers import GlobalJobSerializer
from django.test import RequestFactory
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def test_job_serialization():
    try:
        # Get the specific job
        job_id = '1a301f5a-ec33-4d90-90ed-538330888fdb'
        print(f"🔍 Fetching job {job_id}...")
        job = Job.objects.get(id=job_id)
        print(f"✅ Job found: {job.role} at {job.company.name if job.company else 'No Company'}")
        
        # Create a mock request
        request = RequestFactory().get('/api/job/')
        print(f"✅ Mock request created")
        
        # Try serialization step by step
        print(f"🔄 Creating serializer...")
        serializer = GlobalJobSerializer(job, context={'request': request})
        print(f"✅ Serializer created successfully")
        
        print(f"🔄 Accessing serializer.data...")
        try:
            data = serializer.data
            print(f"✅ Serialization successful!")
            print(f"📊 Keys in serialized data: {list(data.keys())}")
            print(f"📊 Total fields: {len(data)}")
            
            # Check specific fields that might be problematic
            problematic_fields = ['company', 'user', 'skills', 'tools', 'languages', 'org_unit']
            for field in problematic_fields:
                if field in data:
                    print(f"✅ {field}: {type(data[field])} - {str(data[field])[:100]}...")
                else:
                    print(f"❌ {field}: Missing")
                    
        except Exception as serialization_error:
            print(f"❌ Serialization failed: {serialization_error}")
            import traceback
            traceback.print_exc()
            
    except Exception as e:
        print(f"❌ General error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_job_serialization() 