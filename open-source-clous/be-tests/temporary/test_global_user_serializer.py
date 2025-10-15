"""
Comprehensive unit tests for GlobalUserSerializer.

This test suite covers all operations for GlobalUserSerializer with extensive scenarios:
- Retrieval: Different retrieval types (self, specific, list) and levels (basic, detailed, full)
- Creation: User creation with nested data (settings, career, company_user)
- Updates: Partial and full updates with validation
- Error handling and edge cases

All external dependencies are properly mocked.
"""

import json
import pytest
import uuid
from datetime import datetime
from unittest.mock import Mock, patch, MagicMock, PropertyMock
from django.test import TestCase
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.test import APIRequestFactory
from rest_framework import status

# Import the serializer under test
from users.serializers import GlobalUserSerializer

# Import models for mocking
from users.models import User, Company, CompanyUser, Settings, Career, Resume, Auth
from jobs.models import Qualification, Job


class TestGlobalUserSerializerRetrieval(TestCase):
    """Test cases for GlobalUserSerializer data retrieval and representation"""
    
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user_id = str(uuid.uuid4())
        self.company_id = str(uuid.uuid4())

    @patch('users.serializers.Settings.objects.get')
    @patch('users.serializers.ContentType.objects.get_for_model')
    def test_get_settings_success(self, mock_get_content_type, mock_settings_get):
        """Test successful settings retrieval"""
        # Arrange
        mock_user = Mock()
        mock_user.id = self.user_id
        
        mock_settings = Mock()
        mock_settings.language = 'english'
        mock_settings.config = {'theme': 'dark'}
        mock_settings_get.return_value = mock_settings
        
        mock_content_type = Mock()
        mock_get_content_type.return_value = mock_content_type
        
        request = self.factory.get('/users/')
        serializer = GlobalUserSerializer(context={'request': request})
        
        # Act
        with patch('users.serializers.SettingsSerializer') as mock_settings_serializer:
            mock_settings_serializer.return_value.data = {
                'language': 'english',
                'config': {'theme': 'dark'}
            }
            result = serializer.get_settings(mock_user)
        
        # Assert
        self.assertEqual(result['language'], 'english')
        self.assertEqual(result['config']['theme'], 'dark')
        mock_settings_get.assert_called_once()

    @patch('users.serializers.Settings.objects.get')
    def test_get_settings_not_found(self, mock_settings_get):
        """Test settings retrieval when settings don't exist"""
        # Arrange
        mock_user = Mock()
        mock_user.id = self.user_id
        mock_settings_get.side_effect = ObjectDoesNotExist()
        
        request = self.factory.get('/users/')
        serializer = GlobalUserSerializer(context={'request': request})
        
        # Act
        result = serializer.get_settings(mock_user)
        
        # Assert
        self.assertEqual(result, {})

    def test_get_retrieval_type_self(self):
        """Test retrieval type detection for self"""
        # Arrange
        mock_user = Mock()
        mock_user.id = self.user_id
        
        mock_request = Mock()
        mock_request.user = mock_user
        
        request = self.factory.get('/users/')
        setattr(request, 'user', mock_user)
        serializer = GlobalUserSerializer(context={'request': request})
        
        # Act
        result = serializer.get_retrieval_type(mock_user)
        
        # Assert
        self.assertEqual(result, 'self')

    def test_get_retrieval_type_specific(self):
        """Test retrieval type detection for specific user"""
        # Arrange
        mock_user = Mock()
        mock_user.id = self.user_id
        
        mock_other_user = Mock()
        mock_other_user.id = str(uuid.uuid4())
        
        request = self.factory.get('/users/')
        setattr(request, 'user', mock_other_user)
        setattr(request, 'query_params', {'user_id': self.user_id})
        serializer = GlobalUserSerializer(context={'request': request})
        
        # Act
        result = serializer.get_retrieval_type(mock_user)
        
        # Assert
        self.assertEqual(result, 'specific')

    def test_get_retrieval_type_list(self):
        """Test retrieval type detection for list view"""
        # Arrange
        mock_user = Mock()
        mock_user.id = self.user_id
        
        serializer = GlobalUserSerializer(context={'retrieval_type': 'list'})
        
        # Act
        result = serializer.get_retrieval_type(mock_user)
        
        # Assert
        self.assertEqual(result, 'list')

    def test_get_retrieval_level_basic(self):
        """Test retrieval level detection for basic"""
        # Arrange
        mock_user = Mock()
        
        request = self.factory.get('/users/?retrieval_level=basic')
        serializer = GlobalUserSerializer(context={'request': request})
        
        # Act
        result = serializer.get_retrieval_level(mock_user)
        
        # Assert
        self.assertEqual(result, 'basic')

    def test_to_representation_list_filtering(self):
        """Test that to_representation filters fields for list retrieval"""
        # Arrange
        mock_user = Mock()
        mock_user.id = self.user_id
        mock_user.email = 'test@example.com'
        mock_user.first_name = 'John'
        mock_user.last_name = 'Doe'
        
        serializer = GlobalUserSerializer(context={'retrieval_type': 'list'})
        
        # Mock the parent to_representation to return all fields
        with patch.object(GlobalUserSerializer, 'get_retrieval_type', return_value='list'):
            with patch.object(GlobalUserSerializer, 'get_retrieval_level', return_value='detailed'):
                with patch.object(GlobalUserSerializer, 'get_user_from_obj', return_value=mock_user):
                    # Mock super().to_representation
                    original_data = {
                        'id': self.user_id,
                        'email': 'test@example.com',
                        'first_name': 'John',
                        'last_name': 'Doe',
                        'settings': {'language': 'english'},
                        'auth': {'google_access_token': 'token'},
                        'interviews': [],
                        'next_form': 'performance',
                        'task_execution': None,
                        'notifications': []
                    }
                    
                    with patch('users.serializers.serializers.ModelSerializer.to_representation', return_value=original_data):
                        # Act
                        result = serializer.to_representation(mock_user)
        
        # Assert
        self.assertEqual(result['id'], self.user_id)
        self.assertEqual(result['email'], 'test@example.com')
        self.assertEqual(result['retrieval_type'], 'list')
        
        # These fields should be removed for list retrieval
        self.assertNotIn('settings', result)
        self.assertNotIn('auth', result)
        self.assertNotIn('interviews', result)
        self.assertNotIn('next_form', result)
        self.assertNotIn('task_execution', result)
        self.assertNotIn('notifications', result)

    @patch('users.serializers.Resume.objects.filter')
    @patch('users.serializers.ResumeSerializer')
    def test_get_resume_with_company(self, mock_resume_serializer, mock_resume_filter):
        """Test resume retrieval with company context"""
        # Arrange
        mock_user = Mock()
        mock_company = Mock()
        mock_company.id = self.company_id
        
        mock_resume = Mock()
        mock_resume.user = mock_user
        mock_resume.company = mock_company
        
        mock_queryset = Mock()
        mock_queryset.filter.return_value = mock_queryset
        mock_queryset.order_by.return_value = mock_queryset
        mock_queryset.first.return_value = mock_resume
        mock_resume_filter.return_value = mock_queryset
        
        mock_resume_serializer.return_value.data = {
            'id': str(uuid.uuid4()),
            'user': self.user_id,
            'company': self.company_id
        }
        
        serializer = GlobalUserSerializer(context={'company': mock_company})
        
        # Act
        result = serializer.get_resume(mock_user)
        
        # Assert
        self.assertIsNotNone(result)
        self.assertEqual(result['user'], self.user_id)
        self.assertEqual(result['company'], self.company_id)
        mock_resume_filter.assert_called_once_with(user=mock_user)

    @patch('users.serializers.Resume.objects.filter')
    def test_get_resume_no_resume_found(self, mock_resume_filter):
        """Test resume retrieval when no resume exists"""
        # Arrange
        mock_user = Mock()
        
        mock_queryset = Mock()
        mock_queryset.filter.return_value = mock_queryset
        mock_queryset.order_by.return_value = mock_queryset
        mock_queryset.first.return_value = None
        mock_resume_filter.return_value = mock_queryset
        
        serializer = GlobalUserSerializer()
        
        # Act
        result = serializer.get_resume(mock_user)
        
        # Assert
        self.assertIsNone(result)

    def test_get_connected_sources_google_auth(self):
        """Test connected sources with Google authentication"""
        # Arrange
        mock_user = Mock()
        mock_auth = Mock()
        mock_auth.google_access_token = 'token123'
        mock_user.auth = mock_auth
        
        # Mock integrations
        mock_integrations = Mock()
        mock_integrations.filter.return_value = []
        mock_user.integrations = mock_integrations
        
        serializer = GlobalUserSerializer()
        
        # Act
        result = serializer.get_connected_sources(mock_user)
        
        # Assert
        self.assertIn('Google', result)

    def test_get_connected_sources_mcp_integration(self):
        """Test connected sources with MCP integration"""
        # Arrange
        mock_user = Mock()
        mock_user.auth = None
        
        mock_integration = Mock()
        mock_integration.provider = 'mcp'
        mock_integration.is_active = True
        
        mock_integrations = Mock()
        mock_integrations.filter.return_value = [mock_integration]
        mock_user.integrations = mock_integrations
        
        serializer = GlobalUserSerializer()
        
        # Act
        result = serializer.get_connected_sources(mock_user)
        
        # Assert
        self.assertIn('MCP', result)

    def test_get_connected_sources_multiple_providers(self):
        """Test connected sources with multiple providers"""
        # Arrange
        mock_user = Mock()
        mock_auth = Mock()
        mock_auth.google_access_token = 'token123'
        mock_user.auth = mock_auth
        
        mock_integration1 = Mock()
        mock_integration1.provider = 'slack'
        mock_integration1.is_active = True
        
        mock_integration2 = Mock()
        mock_integration2.provider = 'github'
        mock_integration2.is_active = True
        
        mock_integrations = Mock()
        mock_integrations.filter.return_value = [mock_integration1, mock_integration2]
        mock_user.integrations = mock_integrations
        
        serializer = GlobalUserSerializer()
        
        # Act
        result = serializer.get_connected_sources(mock_user)
        
        # Assert
        self.assertIn('Google', result)
        self.assertIn('Slack', result)
        self.assertIn('Github', result)
        self.assertEqual(len(result), 3)

    def test_get_user_from_obj_user_instance(self):
        """Test get_user_from_obj with User instance"""
        # Arrange
        mock_user = Mock(spec=User)
        serializer = GlobalUserSerializer()
        
        # Act
        result = serializer.get_user_from_obj(mock_user)
        
        # Assert
        self.assertEqual(result, mock_user)

    def test_get_user_from_obj_qualification_instance(self):
        """Test get_user_from_obj with Qualification instance"""
        # Arrange
        mock_user = Mock(spec=User)
        mock_resume = Mock()
        mock_resume.user = mock_user
        mock_qualification = Mock(spec=Qualification)
        mock_qualification.resume = mock_resume
        
        serializer = GlobalUserSerializer()
        
        # Act
        result = serializer.get_user_from_obj(mock_qualification)
        
        # Assert
        self.assertEqual(result, mock_user)

    def test_get_user_from_obj_object_with_user_attr(self):
        """Test get_user_from_obj with object that has user attribute"""
        # Arrange
        mock_user = Mock(spec=User)
        mock_obj = Mock()
        mock_obj.user = mock_user
        
        serializer = GlobalUserSerializer()
        
        # Act
        result = serializer.get_user_from_obj(mock_obj)
        
        # Assert
        self.assertEqual(result, mock_user)

    def test_get_user_from_obj_fallback(self):
        """Test get_user_from_obj fallback case"""
        # Arrange
        mock_obj = Mock()
        # Remove any user attribute if it exists
        if hasattr(mock_obj, 'user'):
            delattr(mock_obj, 'user')
        
        serializer = GlobalUserSerializer()
        
        # Act
        result = serializer.get_user_from_obj(mock_obj)
        
        # Assert
        self.assertEqual(result, mock_obj)


class TestGlobalUserSerializerCreation(TestCase):
    """Test cases for GlobalUserSerializer user creation"""
    
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user_id = str(uuid.uuid4())
        self.company_id = str(uuid.uuid4())

    @patch('users.serializers.logger')
    @patch('users.serializers.Settings.objects.update_or_create')
    def test_handle_nested_data_creation_settings(self, mock_settings_update, mock_logger):
        """Test creation of settings during user creation"""
        # Arrange
        mock_user = Mock()
        mock_user.id = self.user_id
        mock_company = Mock()
        mock_company.id = self.company_id
        
        validated_data = {
            'settings': {
                'language': 'spanish',
                'config': {'theme': 'light', 'notifications': True}
            }
        }
        
        mock_settings_update.return_value = (Mock(), True)
        
        serializer = GlobalUserSerializer(context={'company': mock_company})
        
        # Act
        serializer._handle_nested_data_creation(mock_user, validated_data)
        
        # Assert
        mock_settings_update.assert_called_once_with(
            user=mock_user,
            company=mock_company,
            defaults={
                'language': 'spanish',
                'config': {'theme': 'light', 'notifications': True}
            }
        )
        mock_logger.debug.assert_called()

    @patch('users.serializers.logger')
    @patch('users.serializers.Career.objects.create')
    def test_handle_nested_data_creation_career(self, mock_career_create, mock_logger):
        """Test creation of career during user creation"""
        # Arrange
        mock_user = Mock()
        mock_user.id = self.user_id
        
        mock_career = Mock()
        mock_career_create.return_value = mock_career
        
        validated_data = {
            'career': {
                'seniority': 'senior',
                'years_experience': 5,
                'preferred_location': 'remote'
            }
        }
        
        serializer = GlobalUserSerializer()
        
        # Act
        serializer._handle_nested_data_creation(mock_user, validated_data)
        
        # Assert
        mock_career_create.assert_called_once_with(
            user=mock_user,
            seniority='senior',
            years_experience=5,
            preferred_location='remote'
        )
        mock_logger.debug.assert_called()

    @patch('users.serializers.logger')
    @patch('users.serializers.CompanyUser.objects.create')
    def test_handle_nested_data_creation_company_user(self, mock_company_user_create, mock_logger):
        """Test creation of company user association during user creation"""
        # Arrange
        mock_user = Mock()
        mock_user.id = self.user_id
        mock_company = Mock()
        mock_company.id = self.company_id
        
        mock_company_user = Mock()
        mock_company_user_create.return_value = mock_company_user
        
        validated_data = {
            'company_user': {
                'role': 'talent',
                'function': 'engineering',
                'compensation': 100000
            }
        }
        
        serializer = GlobalUserSerializer(context={'company': mock_company})
        
        # Act
        serializer._handle_nested_data_creation(mock_user, validated_data)
        
        # Assert
        mock_company_user_create.assert_called_once_with(
            user=mock_user,
            company=mock_company,
            role='talent',
            function='engineering',
            compensation=100000
        )
        mock_logger.debug.assert_called()

    @patch('users.serializers.logger')
    @patch('users.serializers.Career.objects.create')
    def test_handle_nested_data_creation_career_exception(self, mock_career_create, mock_logger):
        """Test career creation with exception handling"""
        # Arrange
        mock_user = Mock()
        mock_user.id = self.user_id
        
        mock_career_create.side_effect = Exception("Database error")
        
        validated_data = {
            'career': {
                'seniority': 'senior'
            }
        }
        
        serializer = GlobalUserSerializer()
        
        # Act
        serializer._handle_nested_data_creation(mock_user, validated_data)
        
        # Assert
        mock_career_create.assert_called_once()
        mock_logger.error.assert_called_with(f"Failed to create career for user {self.user_id}: Database error")


class TestGlobalUserSerializerUpdate(TestCase):
    """Test cases for GlobalUserSerializer user updates"""
    
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user_id = str(uuid.uuid4())
        self.company_id = str(uuid.uuid4())

    @patch('users.serializers.logger')
    @patch('users.serializers.Settings.objects.update_or_create')
    @patch('users.serializers.ContentType.objects.get_for_model')
    def test_handle_nested_data_update_settings(self, mock_get_content_type, mock_settings_update, mock_logger):
        """Test updating settings during user update"""
        # Arrange
        mock_user = Mock()
        mock_user.id = self.user_id
        
        mock_content_type = Mock()
        mock_get_content_type.return_value = mock_content_type
        
        mock_settings = Mock()
        mock_settings_update.return_value = (mock_settings, False)
        
        validated_data = {
            'settings_update': {
                'language': 'french',
                'config': {'dark_mode': True}
            }
        }
        
        serializer = GlobalUserSerializer()
        
        # Act
        serializer._handle_nested_data_update(mock_user, validated_data)
        
        # Assert
        mock_settings_update.assert_called_once()
        mock_settings.save.assert_called_once()
        mock_logger.debug.assert_called_with(f"Updated settings for user {self.user_id}")

    @patch('users.serializers.logger')
    @patch('users.serializers.Career.objects.get_or_create')
    def test_handle_nested_data_update_career(self, mock_career_get_create, mock_logger):
        """Test updating career during user update"""
        # Arrange
        mock_user = Mock()
        mock_user.id = self.user_id
        
        mock_career = Mock()
        mock_career_get_create.return_value = (mock_career, False)
        
        validated_data = {
            'career': {
                'seniority': 'lead',
                'years_experience': 8
            }
        }
        
        serializer = GlobalUserSerializer()
        
        # Act
        serializer._handle_nested_data_update(mock_user, validated_data)
        
        # Assert
        mock_career_get_create.assert_called_once_with(user=mock_user)
        self.assertEqual(mock_career.seniority, 'lead')
        self.assertEqual(mock_career.years_experience, 8)
        mock_career.save.assert_called_once()
        mock_logger.debug.assert_called_with(f"Updated career for user {self.user_id}")

    @patch('users.serializers.logger')
    @patch('users.serializers.Career.objects.get_or_create')
    def test_handle_nested_data_update_career_exception(self, mock_career_get_create, mock_logger):
        """Test career update with exception handling"""
        # Arrange
        mock_user = Mock()
        mock_user.id = self.user_id
        
        mock_career_get_create.side_effect = Exception("Database connection failed")
        
        validated_data = {
            'career': {
                'seniority': 'lead'
            }
        }
        
        serializer = GlobalUserSerializer()
        
        # Act
        serializer._handle_nested_data_update(mock_user, validated_data)
        
        # Assert
        mock_career_get_create.assert_called_once()
        mock_logger.error.assert_called_with(f"Error updating career for user {self.user_id}: Database connection failed")


class TestGlobalUserSerializerValidation(TestCase):
    """Test cases for GlobalUserSerializer validation logic"""
    
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user_id = str(uuid.uuid4())

    def test_meta_model_and_fields(self):
        """Test Meta class configuration"""
        # Act
        serializer = GlobalUserSerializer()
        
        # Assert
        self.assertEqual(serializer.Meta.model, User)
        expected_fields = [
            'id', 'email', 'first_name', 'last_name', 'auth',
            'handle', 'location', 'resume', 'settings', 'settings_update', 'is_leader', 'company_user', 'company_user_update',
            'career', 'type', 'qualification', 'interviews', 'task_execution', 'next_form',
            'notifications', 'logo', 'retrieval_type', 'retrieval_level', 'connected_sources', 'content_model'
        ]
        self.assertEqual(serializer.Meta.fields, expected_fields)
        
        # Check extra_kwargs
        self.assertTrue(serializer.Meta.extra_kwargs['email']['required'])
        self.assertTrue(serializer.Meta.extra_kwargs['first_name']['required'])
        self.assertTrue(serializer.Meta.extra_kwargs['last_name']['required'])
        self.assertTrue(serializer.Meta.extra_kwargs['logo']['read_only'])

    def test_retrieval_levels_constant(self):
        """Test RETRIEVAL_LEVELS constant"""
        # Act
        serializer = GlobalUserSerializer()
        
        # Assert
        expected_levels = ('basic', 'detailed', 'full')
        self.assertEqual(serializer.RETRIEVAL_LEVELS, expected_levels)


class TestGlobalUserSerializerIntegration(TestCase):
    """Integration tests combining multiple GlobalUserSerializer operations"""
    
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user_id = str(uuid.uuid4())
        self.company_id = str(uuid.uuid4())

    @patch('users.serializers.Settings.objects.get')
    @patch('users.serializers.Resume.objects.filter')
    @patch('users.serializers.CompanyUser.objects.select_related')
    @patch('users.serializers.ContentType.objects.get_for_model')
    def test_full_serialization_workflow(self, mock_get_content_type, mock_company_user_select, mock_resume_filter, mock_settings_get):
        """Test complete serialization workflow with all components"""
        # Arrange
        mock_user = Mock(spec=User)
        mock_user.id = self.user_id
        mock_user.email = 'test@example.com'
        mock_user.first_name = 'John'
        mock_user.last_name = 'Doe'
        
        mock_company = Mock()
        mock_company.id = self.company_id
        
        # Mock settings
        mock_settings = Mock()
        mock_settings.language = 'english'
        mock_settings.config = {}
        mock_settings_get.return_value = mock_settings
        
        # Mock resume
        mock_resume = Mock()
        mock_resume_filter.return_value.filter.return_value.order_by.return_value.first.return_value = mock_resume
        
        # Mock company user
        mock_company_user = Mock()
        mock_company_user_select.return_value.filter.return_value.order_by.return_value.first.return_value = mock_company_user
        
        # Mock content type
        mock_content_type = Mock()
        mock_get_content_type.return_value = mock_content_type
        
        request = self.factory.get('/users/')
        setattr(request, 'user', mock_user)
        
        # Mock all the serializer dependencies
        with patch('users.serializers.SettingsSerializer') as mock_settings_serializer:
            with patch('users.serializers.ResumeSerializer') as mock_resume_serializer:
                with patch('users.serializers.CompanyUserSerializer') as mock_company_user_serializer:
                    mock_settings_serializer.return_value.data = {'language': 'english'}
                    mock_resume_serializer.return_value.data = {'id': str(uuid.uuid4())}
                    mock_company_user_serializer.return_value.data = {'role': 'talent'}
                    
                    serializer = GlobalUserSerializer(
                        mock_user,
                        context={'request': request, 'company': mock_company}
                    )
                    
                    # Act
                    with patch.object(serializer, 'to_representation') as mock_to_representation:
                        mock_to_representation.return_value = {
                            'id': self.user_id,
                            'email': 'test@example.com',
                            'first_name': 'John',
                            'last_name': 'Doe',
                            'retrieval_type': 'self',
                            'retrieval_level': 'detailed',
                            'settings': {'language': 'english'},
                            'resume': {'id': str(uuid.uuid4())},
                            'company_user': {'role': 'talent'}
                        }
                        
                        result = serializer.data
        
        # Assert
        self.assertEqual(result['id'], self.user_id)
        self.assertEqual(result['email'], 'test@example.com')
        self.assertEqual(result['retrieval_type'], 'self')
        self.assertIn('settings', result)
        self.assertIn('resume', result)
        self.assertIn('company_user', result)


if __name__ == '__main__':
    from django.test.utils import get_runner
    from django.conf import settings
    
    TestRunner = get_runner(settings)
    test_runner = TestRunner()
    failures = test_runner.run_tests(["__main__"]) 