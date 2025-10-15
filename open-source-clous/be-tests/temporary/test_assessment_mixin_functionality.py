#!/usr/bin/env python3
"""
Comprehensive test script for AssessmentView and AssessmentSerializer mixin functionality.
This script tests all the mixin features: StatusManagement, ContentManagement, 
BooleanManagement, FileAttachment, and LinkManagement.
"""

import os
import sys
import django
from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.contenttypes.models import ContentType

# Add the project root to the Python path
sys.path.append('/Users/alvipe/Desktop/cloush-server')

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from jobs.views import AssessmentView
from jobs.serializers import AssessmentSerializer
from jobs.models import Assessment, BooleanModel, ContentModel, Links
from users.models import User as CustomUser, FileAttachment, CategoryList


class AssessmentMixinFunctionalityTest(APITestCase):
    """Test cases for Assessment mixin functionality"""
    
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
        
        # Create a test org unit
        self.org_unit = CategoryList.objects.create(
            name='Test Org Unit',
            type='org_unit',
            subtype='department'
        )
        
        # Create a test assessment
        self.assessment = Assessment.objects.create(
            user=self.user,
            status='queued',
            org_unit=self.org_unit,
            started_at='2024-01-01T00:00:00Z'
        )
    
    def test_status_management_mixin(self):
        """Test StatusManagementMixin functionality"""
        # Test saving status
        self.assessment.save_status('in_progress', self.user, 'assessment_status')
        
        # Test getting status
        current_status = self.assessment.get_status('assessment_status')
        self.assertEqual(current_status, 'in_progress')
        
        # Test getting all statuses
        all_statuses = self.assessment.get_statuses('assessment_status')
        self.assertEqual(all_statuses.count(), 1)
        
        # Test updating status
        self.assessment.update_status('completed', self.user, 'assessment_status')
        updated_status = self.assessment.get_status('assessment_status')
        self.assertEqual(updated_status, 'completed')
    
    def test_content_management_mixin(self):
        """Test ContentManagementMixin functionality"""
        # Test saving content
        content_data = {'analysis': 'This is a test analysis', 'score': 85}
        self.assessment.save_content('analysis', content_data)
        
        # Test getting content
        retrieved_content = self.assessment.get_content('analysis')
        self.assertEqual(retrieved_content, content_data)
        
        # Test updating content
        updated_content = {'analysis': 'Updated analysis', 'score': 90}
        self.assessment.update_content('analysis', updated_content)
        retrieved_updated = self.assessment.get_content('analysis')
        self.assertEqual(retrieved_updated, updated_content)
    
    def test_boolean_management_mixin(self):
        """Test BooleanManagementMixin functionality"""
        # Test creating boolean flags
        boolean_data = [
            {'name': 'is_urgent', 'value': True},
            {'name': 'is_complex', 'value': False}
        ]
        result = self.assessment.create_boolean_flags(BooleanModel, boolean_data, 'assessment_flags')
        
        # Test getting boolean flags
        flags = self.assessment.get_boolean_flags(BooleanModel, 'assessment_flags')
        self.assertEqual(flags.count(), 2)
        
        # Test deleting boolean flags
        delete_result = self.assessment.delete_boolean_flags(BooleanModel, ['is_urgent'], 'assessment_flags')
        self.assertEqual(delete_result['deleted'], 1)
    
    def test_file_attachment_mixin(self):
        """Test FileAttachmentMixin functionality"""
        # Test saving file attachment
        file_attachment = self.assessment.save_file_attachment(
            url='https://example.com/file.pdf',
            type='document',
            name='Test Document',
            mime_type='application/pdf'
        )
        
        # Test getting file attachments
        attachments = self.assessment.get_file_attachments(type='document')
        self.assertEqual(attachments.count(), 1)
        
        # Test getting specific file attachment
        attachment = self.assessment.get_file_attachment(type='document', name='Test Document')
        self.assertIsNotNone(attachment)
    
    def test_link_management_mixin(self):
        """Test LinkManagementMixin functionality"""
        # Test saving link
        link = self.assessment.save_link(
            url='https://example.com/resource',
            type='resource',
            name='Test Resource'
        )
        
        # Test getting links
        links = self.assessment.get_links(Links, type='resource')
        self.assertEqual(links.count(), 1)
        
        # Test getting specific link
        specific_link = self.assessment.get_link(Links, type='resource', name='Test Resource')
        self.assertIsNotNone(specific_link)
    
    def test_serializer_with_mixin_data(self):
        """Test AssessmentSerializer with mixin data"""
        # Add some mixin data to the assessment
        self.assessment.save_status('completed', self.user, 'assessment_status')
        self.assessment.save_content('analysis', {'score': 85, 'feedback': 'Good work'})
        self.assessment.create_boolean_flags(BooleanModel, [{'name': 'is_approved', 'value': True}])
        self.assessment.save_link('https://example.com/report', 'report', 'Final Report')
        
        # Test serializer
        serializer = AssessmentSerializer(self.assessment)
        data = serializer.data
        
        # Check that mixin data is included
        self.assertIn('status_details', data)
        self.assertIn('content_details', data)
        self.assertIn('boolean_flags_details', data)
        self.assertIn('links_details', data)
        
        # Verify status details
        self.assertEqual(data['status_details']['current_status'], 'completed')
        
        # Verify content details
        self.assertIn('analysis', data['content_details'])
        self.assertEqual(data['content_details']['analysis']['score'], 85)
        
        # Verify boolean flags
        self.assertEqual(len(data['boolean_flags_details']), 1)
        self.assertEqual(data['boolean_flags_details'][0]['name'], 'is_approved')
        
        # Verify links
        self.assertEqual(len(data['links_details']), 1)
        self.assertEqual(data['links_details'][0]['name'], 'Final Report')
    
    def test_create_assessment_with_mixin_data(self):
        """Test creating assessment with mixin data via API"""
        data = {
            'object_type': 'resume',
            'object_id': '123e4567-e89b-12d3-a456-426614174000',
            'urls': ['https://example.com/resume.pdf'],
            'content': {'analysis': 'Initial analysis', 'priority': 'high'},
            'content_type': 'analysis',
            'boolean_flags': [
                {'name': 'is_urgent', 'value': True},
                {'name': 'needs_review', 'value': False}
            ],
            'links': [
                {'url': 'https://example.com/reference', 'type': 'reference', 'name': 'Reference Link'}
            ]
        }
        
        response = self.client.post('/api/assessments/', data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertIn('assessment_id', response.data)
        
        # Verify the assessment was created with mixin data
        assessment_id = response.data['assessment_id']
        assessment = Assessment.objects.get(id=assessment_id)
        
        # Check content was saved
        content = assessment.get_content('analysis')
        self.assertEqual(content['analysis'], 'Initial analysis')
        
        # Check boolean flags were saved
        flags = assessment.get_boolean_flags(BooleanModel)
        self.assertEqual(flags.count(), 2)
        
        # Check links were saved
        links = assessment.get_links(Links)
        self.assertEqual(links.count(), 1)
    
    def test_update_assessment_with_mixin_data(self):
        """Test updating assessment with mixin data via API"""
        # Add initial mixin data
        self.assessment.save_status('queued', self.user, 'assessment_status')
        self.assessment.save_content('analysis', {'score': 70})
        
        # Update with new mixin data
        data = {
            'status': 'in_progress',
            'content': {'analysis': 'Updated analysis', 'score': 85},
            'content_type': 'analysis',
            'boolean_flags': [{'name': 'is_completed', 'value': True}],
            'links': [{'url': 'https://example.com/updated', 'type': 'document', 'name': 'Updated Doc'}]
        }
        
        response = self.client.put(f'/api/assessments/?id={self.assessment.id}', data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verify the assessment was updated with mixin data
        assessment = Assessment.objects.get(id=self.assessment.id)
        
        # Check status was updated
        status = assessment.get_status('assessment_status')
        self.assertEqual(status, 'in_progress')
        
        # Check content was updated
        content = assessment.get_content('analysis')
        self.assertEqual(content['score'], 85)
        
        # Check boolean flags were updated
        flags = assessment.get_boolean_flags(BooleanModel)
        self.assertEqual(flags.count(), 1)
        self.assertEqual(flags.first().name, 'is_completed')
        
        # Check links were updated
        links = assessment.get_links(Links)
        self.assertEqual(links.count(), 1)
        self.assertEqual(links.first().name, 'Updated Doc')
    
    def test_filtering_by_mixin_data(self):
        """Test filtering assessments by mixin data"""
        # Create assessments with different mixin data
        assessment1 = Assessment.objects.create(user=self.user, status='queued')
        assessment1.save_status('completed', self.user, 'assessment_status')
        assessment1.create_boolean_flags(BooleanModel, [{'name': 'is_urgent', 'value': True}])
        
        assessment2 = Assessment.objects.create(user=self.user, status='queued')
        assessment2.save_status('in_progress', self.user, 'assessment_status')
        assessment2.save_content('analysis', {'type': 'detailed'})
        
        # Test filtering by boolean flag
        response = self.client.get('/api/assessments/?boolean_flag=is_urgent')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        
        # Test filtering by content type
        response = self.client.get('/api/assessments/?content_type=analysis')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        
        # Test filtering by org unit
        response = self.client.get(f'/api/assessments/?org_unit={self.org_unit.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_serializer_method_fields(self):
        """Test all serializer method fields return correct data"""
        # Add comprehensive mixin data
        self.assessment.save_status('completed', self.user, 'assessment_status')
        self.assessment.save_content('analysis', {'score': 85, 'feedback': 'Excellent'})
        self.assessment.save_content('summary', 'This is a summary')
        self.assessment.create_boolean_flags(BooleanModel, [
            {'name': 'is_approved', 'value': True},
            {'name': 'needs_followup', 'value': False}
        ])
        self.assessment.save_link('https://example.com/report', 'report', 'Final Report')
        
        serializer = AssessmentSerializer(self.assessment)
        data = serializer.data
        
        # Test user_details
        self.assertIn('user_details', data)
        self.assertEqual(data['user_details']['email'], 'test@example.com')
        
        # Test org_unit_details
        self.assertIn('org_unit_details', data)
        self.assertEqual(data['org_unit_details']['name'], 'Test Org Unit')
        
        # Test status_details
        self.assertIn('status_details', data)
        self.assertEqual(data['status_details']['current_status'], 'completed')
        
        # Test content_details
        self.assertIn('content_details', data)
        self.assertIn('analysis', data['content_details'])
        self.assertIn('summary', data['content_details'])
        
        # Test boolean_flags_details
        self.assertIn('boolean_flags_details', data)
        self.assertEqual(len(data['boolean_flags_details']), 2)
        
        # Test links_details
        self.assertIn('links_details', data)
        self.assertEqual(len(data['links_details']), 1)
        self.assertEqual(data['links_details'][0]['name'], 'Final Report')


if __name__ == '__main__':
    print("Testing Assessment mixin functionality...")
    
    # Run basic tests
    test_cases = [
        AssessmentMixinFunctionalityTest
    ]
    
    for test_case in test_cases:
        print(f"\nRunning {test_case.__name__}...")
        try:
            # Create test instance and run basic setup
            test_instance = test_case()
            test_instance.setUp()
            print(f"✓ {test_case.__name__} setup successful")
            
            # Run individual test methods
            test_methods = [method for method in dir(test_instance) if method.startswith('test_')]
            for method in test_methods:
                try:
                    getattr(test_instance, method)()
                    print(f"  ✓ {method} passed")
                except Exception as e:
                    print(f"  ✗ {method} failed: {e}")
                    
        except Exception as e:
            print(f"✗ {test_case.__name__} setup failed: {e}")
    
    print("\nMixin functionality test completed.") 