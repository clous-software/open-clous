"""
Test suite for enhanced CanvasView API response functionality.

Tests the enhanced response structure including canvas_id delivery,
metadata enrichment, and proper handling of both synchronous and
asynchronous operations.
"""

import json
import uuid
from unittest.mock import Mock, patch
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.utils import timezone
from users.models import User, Company, CompanyUser
from jobs.models import Thread, Canvas


class CanvasViewEnhancementTests(TestCase):
    """Test enhanced CanvasView response functionality."""
    
    def setUp(self):
        """Set up test data."""
        self.client = APIClient()
        
        # Create test user and company
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        self.company = Company.objects.create(
            name='Test Company',
            description='Test company for canvas tests'
        )
        CompanyUser.objects.create(
            user=self.user,
            company=self.company
        )
        
        # Create test thread
        self.thread = Thread.objects.create(
            title='Test Thread',
            user=self.user
        )
        
        self.canvas_url = reverse('canvas-view')  # Adjust based on your URL pattern
        
    def test_enhanced_response_structure_async(self):
        """Test enhanced response structure for asynchronous operations."""
        request_data = {
            'user_message': 'Create analytics dashboard',
            'canvas_type': 'chart',
            'thread_id': str(self.thread.id),
            'workflow': 'analytics'
        }
        
        # Mock the functions_service.create_analytics to return a 202 response
        with patch('jobs.views.functions_service') as mock_service:
            mock_response = Mock()
            mock_response.status_code = 202
            mock_response.data = {
                'message': 'Analytics creation has been initiated',
                'task_id': str(uuid.uuid4()),
                'websocket_group': 'test-group'
            }
            mock_service.create_analytics.return_value = mock_response
            
            response = self.client.post(
                self.canvas_url,
                data=json.dumps(request_data),
                content_type='application/json',
                HTTP_CLOUS_USER_ID=str(self.user.id)
            )
            
            self.assertEqual(response.status_code, 202)
            
            # Check enhanced response structure
            data = response.json()
            self.assertIn('canvas_type', data)
            self.assertIn('thread_id', data)
            self.assertIn('websocket_group', data)
            self.assertIn('user_id', data)
            self.assertIn('company_id', data)
            self.assertIn('timestamp', data)
            self.assertIn('status', data)
            self.assertIn('processing', data)
            self.assertIn('note', data)
            
            # Check specific values
            self.assertEqual(data['canvas_type'], 'chart')
            self.assertEqual(data['thread_id'], str(self.thread.id))
            self.assertEqual(data['user_id'], str(self.user.id))
            self.assertEqual(data['company_id'], str(self.company.id))
            self.assertEqual(data['status'], 'accepted')
            self.assertTrue(data['processing'])
            self.assertIn('Canvas ID will be available via websocket', data['note'])
            
    def test_enhanced_response_structure_sync_with_canvas_id(self):
        """Test enhanced response structure for synchronous operations with canvas_id."""
        request_data = {
            'user_message': 'Get recommendations',
            'canvas_type': 'recommendation',
            'thread_id': str(self.thread.id)
        }
        
        canvas_id = str(uuid.uuid4())
        
        # Mock the functions_service.get_recommendation to return a 200 response with canvas_id
        with patch('jobs.views.functions_service') as mock_service:
            mock_response = Mock()
            mock_response.status_code = 200
            mock_response.data = {
                'message': 'Recommendation completed',
                'canvas_id': canvas_id,
                'results': {'recommendations': []}
            }
            mock_service.get_recommendation.return_value = mock_response
            
            response = self.client.post(
                self.canvas_url,
                data=json.dumps(request_data),
                content_type='application/json',
                HTTP_CLOUS_USER_ID=str(self.user.id)
            )
            
            self.assertEqual(response.status_code, 200)
            
            # Check enhanced response structure
            data = response.json()
            self.assertIn('canvas_id', data)
            self.assertEqual(data['canvas_id'], canvas_id)
            self.assertEqual(data['status'], 'completed')
            self.assertFalse(data['processing'])
            self.assertIn('Canvas creation completed successfully', data['note'])
            
    def test_enhanced_response_structure_sync_without_canvas_id(self):
        """Test enhanced response structure for synchronous operations without canvas_id."""
        request_data = {
            'user_message': 'Simple operation',
            'canvas_type': 'recommendation',
            'thread_id': str(self.thread.id)
        }
        
        # Mock the functions_service to return a 200 response without canvas_id
        with patch('jobs.views.functions_service') as mock_service:
            mock_response = Mock()
            mock_response.status_code = 200
            mock_response.data = {
                'message': 'Operation completed',
                'results': {}
            }
            mock_service.get_recommendation.return_value = mock_response
            
            response = self.client.post(
                self.canvas_url,
                data=json.dumps(request_data),
                content_type='application/json',
                HTTP_CLOUS_USER_ID=str(self.user.id)
            )
            
            self.assertEqual(response.status_code, 200)
            
            # Check enhanced response structure
            data = response.json()
            self.assertEqual(data['status'], 'completed')
            self.assertFalse(data['processing'])
            self.assertIn('Request completed successfully', data['note'])
            self.assertNotIn('canvas_id', data)  # Should not have canvas_id
            
    def test_canvas_type_routing_preservation(self):
        """Test that all canvas types are properly routed and enhanced."""
        canvas_types = [
            'chart', 'documents', 'diagram', 'recommendation',
            'compare', 'heatmap', 'quadrantic_grid', 'multi_canvas'
        ]
        
        for canvas_type in canvas_types:
            with self.subTest(canvas_type=canvas_type):
                request_data = {
                    'user_message': f'Create {canvas_type}',
                    'canvas_type': canvas_type,
                    'thread_id': str(self.thread.id)
                }
                
                # Mock the appropriate service method
                with patch('jobs.views.functions_service') as mock_service:
                    mock_response = Mock()
                    mock_response.status_code = 202
                    mock_response.data = {
                        'message': f'{canvas_type} creation initiated',
                        'task_id': str(uuid.uuid4()),
                        'websocket_group': 'test-group'
                    }
                    
                    # Set up the mock for the specific canvas type method
                    if canvas_type == 'chart':
                        mock_service.create_analytics.return_value = mock_response
                    elif canvas_type == 'documents':
                        mock_service.create_document.return_value = mock_response
                    elif canvas_type == 'diagram':
                        mock_service.create_diagram.return_value = mock_response
                    elif canvas_type == 'recommendation':
                        mock_service.get_recommendation.return_value = mock_response
                    elif canvas_type == 'compare':
                        mock_service.compare.return_value = mock_response
                    elif canvas_type == 'heatmap':
                        mock_service.heatmap.return_value = mock_response
                    elif canvas_type == 'quadrantic_grid':
                        mock_service.quadrantic_grid.return_value = mock_response
                    elif canvas_type == 'multi_canvas':
                        mock_service.create_multi_canvas.return_value = mock_response
                    
                    response = self.client.post(
                        self.canvas_url,
                        data=json.dumps(request_data),
                        content_type='application/json',
                        HTTP_CLOUS_USER_ID=str(self.user.id)
                    )
                    
                    self.assertEqual(response.status_code, 202)
                    data = response.json()
                    self.assertEqual(data['canvas_type'], canvas_type)
                    
    def test_error_handling_preservation(self):
        """Test that error handling still works correctly."""
        request_data = {
            'user_message': 'Create something',
            'canvas_type': 'invalid_type',
            'thread_id': str(self.thread.id)
        }
        
        response = self.client.post(
            self.canvas_url,
            data=json.dumps(request_data),
            content_type='application/json',
            HTTP_CLOUS_USER_ID=str(self.user.id)
        )
        
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertIn('error', data)
        self.assertIn('Unsupported canvas type', data['error'])
        
    def test_metadata_consistency(self):
        """Test that metadata is consistently added across different scenarios."""
        request_data = {
            'user_message': 'Test consistency',
            'canvas_type': 'chart',
            'thread_id': str(self.thread.id)
        }
        
        with patch('jobs.views.functions_service') as mock_service:
            mock_response = Mock()
            mock_response.status_code = 202
            mock_response.data = {
                'message': 'Test initiated',
                'task_id': str(uuid.uuid4()),
                'websocket_group': 'test-group'
            }
            mock_service.create_analytics.return_value = mock_response
            
            response = self.client.post(
                self.canvas_url,
                data=json.dumps(request_data),
                content_type='application/json',
                HTTP_CLOUS_USER_ID=str(self.user.id)
            )
            
            data = response.json()
            
            # Check all required metadata fields are present
            required_fields = [
                'canvas_type', 'thread_id', 'websocket_group',
                'user_id', 'company_id', 'timestamp', 'status', 'processing'
            ]
            
            for field in required_fields:
                self.assertIn(field, data, f"Missing required field: {field}")
                
            # Check timestamp format
            timestamp = data['timestamp']
            # Should be valid ISO format
            timezone.datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
            
    def test_preserve_original_canvas_id(self):
        """Test that original canvas_id from service response is preserved."""
        original_canvas_id = str(uuid.uuid4())
        request_data = {
            'user_message': 'Test preserve canvas_id',
            'canvas_type': 'recommendation',
            'thread_id': str(self.thread.id)
        }
        
        with patch('jobs.views.functions_service') as mock_service:
            mock_response = Mock()
            mock_response.status_code = 200
            mock_response.data = {
                'message': 'Test completed',
                'canvas_id': original_canvas_id,
                'other_data': 'test'
            }
            mock_service.get_recommendation.return_value = mock_response
            
            response = self.client.post(
                self.canvas_url,
                data=json.dumps(request_data),
                content_type='application/json',
                HTTP_CLOUS_USER_ID=str(self.user.id)
            )
            
            data = response.json()
            
            # Original canvas_id should be preserved exactly
            self.assertEqual(data['canvas_id'], original_canvas_id)
            
            # Enhanced fields should also be present
            self.assertEqual(data['canvas_type'], 'recommendation')
            self.assertEqual(data['status'], 'completed') 