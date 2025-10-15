#!/usr/bin/env python3
"""
Test script for the improved AssessmentView and AssessmentSerializer.
This script demonstrates the enhanced functionality.
"""

import os
import sys
import django
from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

# Add the project root to the Python path
sys.path.append('/Users/alvipe/Desktop/cloush-server')

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from jobs.views import AssessmentView
from jobs.serializers import AssessmentSerializer
from jobs.models import Assessment
from users.models import User as CustomUser


class AssessmentViewTest(APITestCase):
    """Test cases for the improved AssessmentView"""
    
    def setUp(self):
        """Set up test data"""
        # Create a test user
        self.user = CustomUser.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        
        # Create JWT token for authentication
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        
        # Create a test assessment
        self.assessment = Assessment.objects.create(
            user=self.user,
            status='queued'
        )
    
    def test_create_assessment(self):
        """Test creating a new assessment"""
        data = {
            'object_type': 'resume',
            'object_id': '123e4567-e89b-12d3-a456-426614174000',
            'urls': ['https://example.com/resume.pdf'],
            'skills': []
        }
        
        response = self.client.post('/api/assessments/', data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertIn('assessment_id', response.data)
        self.assertIn('status', response.data)
        self.assertIn('message', response.data)
    
    def test_get_assessment_list(self):
        """Test retrieving a list of assessments"""
        response = self.client.get('/api/assessments/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertIn('count', response.data)
        self.assertIn('next', response.data)
        self.assertIn('previous', response.data)
    
    def test_get_specific_assessment(self):
        """Test retrieving a specific assessment"""
        response = self.client.get(f'/api/assessments/?id={self.assessment.id}')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], str(self.assessment.id))
        self.assertIn('user_details', response.data)
        self.assertIn('file_attachments', response.data)
    
    def test_update_assessment(self):
        """Test updating an assessment"""
        data = {
            'status': 'completed',
            'started_at': '2024-01-01T00:00:00Z'
        }
        
        response = self.client.put(f'/api/assessments/?id={self.assessment.id}', data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertIn('assessment', response.data)
    
    def test_partial_update_assessment(self):
        """Test partial update of an assessment"""
        data = {
            'status': 'in_progress'
        }
        
        response = self.client.patch(f'/api/assessments/?id={self.assessment.id}', data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertIn('assessment', response.data)
    
    def test_delete_assessment(self):
        """Test deleting an assessment"""
        response = self.client.delete(f'/api/assessments/?id={self.assessment.id}')
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertIn('message', response.data)
    
    def test_filter_assessments_by_status(self):
        """Test filtering assessments by status"""
        response = self.client.get('/api/assessments/?status=queued')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
    
    def test_filter_assessments_by_object_type(self):
        """Test filtering assessments by object type"""
        response = self.client.get('/api/assessments/?object_type=resume')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)


class AssessmentSerializerTest(TestCase):
    """Test cases for the improved AssessmentSerializer"""
    
    def setUp(self):
        """Set up test data"""
        self.user = CustomUser.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        
        self.assessment = Assessment.objects.create(
            user=self.user,
            status='queued'
        )
    
    def test_serializer_creation(self):
        """Test serializer creation with valid data"""
        data = {
            'object_type': 'resume',
            'object_id': '123e4567-e89b-12d3-a456-426614174000',
            'urls': ['https://example.com/resume.pdf'],
            'skills': []
        }
        
        serializer = AssessmentSerializer(data=data, context={'request': type('MockRequest', (), {'user': self.user})()})
        
        self.assertTrue(serializer.is_valid())
    
    def test_serializer_serialization(self):
        """Test serializer serialization of existing assessment"""
        serializer = AssessmentSerializer(self.assessment)
        
        data = serializer.data
        self.assertIn('id', data)
        self.assertIn('user', data)
        self.assertIn('status', data)
        self.assertIn('user_details', data)
        self.assertIn('file_attachments', data)
        self.assertIn('content_object_details', data)
    
    def test_serializer_update(self):
        """Test serializer update functionality"""
        data = {
            'status': 'completed',
            'started_at': '2024-01-01T00:00:00Z'
        }
        
        serializer = AssessmentSerializer(self.assessment, data=data, partial=True)
        
        self.assertTrue(serializer.is_valid())
        updated_assessment = serializer.save()
        
        self.assertEqual(updated_assessment.status, 'completed')


if __name__ == '__main__':
    print("Testing AssessmentView and AssessmentSerializer improvements...")
    
    # Run basic tests
    test_cases = [
        AssessmentViewTest,
        AssessmentSerializerTest
    ]
    
    for test_case in test_cases:
        print(f"\nRunning {test_case.__name__}...")
        try:
            # Create test instance and run basic setup
            test_instance = test_case()
            test_instance.setUp()
            print(f"✓ {test_case.__name__} setup successful")
        except Exception as e:
            print(f"✗ {test_case.__name__} setup failed: {e}")
    
    print("\nTest script completed. Run with Django test runner for full testing.") 