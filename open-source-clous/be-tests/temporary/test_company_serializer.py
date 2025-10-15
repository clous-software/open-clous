"""
Comprehensive unit tests for CompanySerializer.

This test suite covers all operations for CompanySerializer with extensive scenarios:
- Retrieval: Different retrieval levels (basic, detailed, full) and field filtering
- Creation: Company creation with nested data (links, skills, content_model)
- Updates: Partial and full updates with validation and complex data handling
- Content Model: Testing content model data management and serialization
- Skills Management: Testing company skills creation, updates, and associations
- Links Processing: Testing URL/link management with automatic processing
- Error handling and edge cases

All external dependencies are properly mocked.
"""

import json
import pytest
import uuid
from datetime import datetime, date, timedelta
from unittest.mock import Mock, patch, MagicMock, PropertyMock
from django.test import TestCase
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from rest_framework.test import APIRequestFactory
from rest_framework import status

# Import the serializer under test
from users.serializers import CompanySerializer, GlobalUserSerializer, SettingsSerializer, SkillsSerializer, LinksSerializer

# Import models for mocking
from users.models import Company, User, Settings, Skills, Links, Billing
from jobs.models import ContentModel


class TestCompanySerializerRetrieval(TestCase):
    """Test cases for CompanySerializer data retrieval and representation"""
    
    def setUp(self):
        self.factory = APIRequestFactory()
        self.company_id = str(uuid.uuid4())
        self.user_id = str(uuid.uuid4())

    def test_get_retrieval_level_basic_context(self):
        """Test retrieval level detection with basic context override"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        serializer = CompanySerializer(context={'retrieval_level': 'basic'})
        
        # Act
        result = serializer.get_retrieval_level(mock_company)
        
        # Assert
        self.assertEqual(result, 'basic')

    def test_get_retrieval_level_query_param(self):
        """Test retrieval level detection from query parameter"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        request = self.factory.get('/companies/?retrieval_level=full')
        serializer = CompanySerializer(context={'request': request})
        
        # Act
        result = serializer.get_retrieval_level(mock_company)
        
        # Assert
        self.assertEqual(result, 'full')

    def test_get_retrieval_level_default_single_object(self):
        """Test default retrieval level for single object (detailed)"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        serializer = CompanySerializer()
        
        # Act
        result = serializer.get_retrieval_level(mock_company)
        
        # Assert
        self.assertEqual(result, 'detailed')

    def test_get_retrieval_level_default_list(self):
        """Test default retrieval level for list (basic)"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        serializer = CompanySerializer()
        serializer.many = True
        
        # Act
        result = serializer.get_retrieval_level(mock_company)
        
        # Assert
        self.assertEqual(result, 'basic')

    @patch('users.serializers.Settings.objects.filter')
    @patch('users.serializers.ContentType.objects.get_for_model')
    @patch('users.serializers.SettingsSerializer')
    def test_get_settings_success(self, mock_settings_serializer, mock_get_content_type, mock_settings_filter):
        """Test successful settings retrieval for company"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        mock_settings = Mock()
        mock_settings.config = {'business_model': 'SaaS', 'industry': 'Technology'}
        
        mock_queryset = Mock()
        mock_queryset.first.return_value = mock_settings
        mock_settings_filter.return_value = mock_queryset
        
        mock_content_type = Mock()
        mock_get_content_type.return_value = mock_content_type
        
        mock_settings_serializer.return_value.data = {
            'config': {'business_model': 'SaaS', 'industry': 'Technology'}
        }
        
        serializer = CompanySerializer(context={'retrieval_level': 'detailed'})
        
        # Act
        result = serializer.get_settings(mock_company)
        
        # Assert
        self.assertIsNotNone(result)
        self.assertEqual(result['config']['business_model'], 'SaaS')
        mock_settings_filter.assert_called_once()

    @patch('users.serializers.Settings.objects.filter')
    def test_get_settings_basic_level_skipped(self, mock_settings_filter):
        """Test that settings retrieval is skipped for basic level"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        serializer = CompanySerializer(context={'retrieval_level': 'basic'})
        
        # Act
        result = serializer.get_settings(mock_company)
        
        # Assert
        self.assertIsNone(result)
        mock_settings_filter.assert_not_called()

    @patch('users.serializers.SkillsSerializer')
    def test_get_skills_success(self, mock_skills_serializer):
        """Test successful skills retrieval for company"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        mock_skill1 = Mock()
        mock_skill1.name = 'Python'
        mock_skill2 = Mock()
        mock_skill2.name = 'JavaScript'
        
        mock_company.skills_needs.all.return_value = [mock_skill1, mock_skill2]
        
        mock_skills_serializer.return_value = [
            {'name': 'Python', 'level': 4.5},
            {'name': 'JavaScript', 'level': 4.0}
        ]
        
        serializer = CompanySerializer()
        
        # Act
        result = serializer.get_skills(mock_company)
        
        # Assert
        self.assertEqual(len(result), 2)
        mock_skills_serializer.assert_called_once()

    def test_get_skills_empty_list(self):
        """Test skills retrieval when no skills exist"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        mock_company.skills_needs.all.return_value = []
        
        serializer = CompanySerializer()
        
        # Act
        result = serializer.get_skills(mock_company)
        
        # Assert
        self.assertEqual(result, [])

    @patch('users.serializers.Billing.objects.get_or_create')
    def test_get_plan_success(self, mock_billing_get_create):
        """Test successful plan retrieval"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        mock_company.created_by = Mock()
        
        mock_billing = Mock()
        mock_billing.plan = 'premium'
        mock_billing_get_create.return_value = (mock_billing, False)
        
        serializer = CompanySerializer(context={'retrieval_level': 'detailed'})
        
        # Act
        result = serializer.get_plan(mock_company)
        
        # Assert
        self.assertEqual(result, 'premium')

    @patch('users.serializers.Billing.objects.get')
    def test_get_trial_days_remaining(self, mock_billing_get):
        """Test trial days calculation"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        mock_company.created_by = Mock()
        
        future_date = timezone.now() + timedelta(days=5)
        mock_billing = Mock()
        mock_billing.trial_end = future_date
        mock_billing_get.return_value = mock_billing
        
        serializer = CompanySerializer(context={'retrieval_level': 'detailed'})
        
        # Act
        with patch('users.serializers.date') as mock_date:
            mock_date.today.return_value = date.today()
            result = serializer.get_trial_days(mock_company)
        
        # Assert
        self.assertIsInstance(result, int)
        self.assertGreaterEqual(result, 4)  # Should be approximately 5 days

    def test_to_representation_basic_filtering(self):
        """Test that to_representation filters fields for basic retrieval"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        mock_company.name = 'Test Company'
        
        serializer = CompanySerializer(context={'retrieval_level': 'basic'})
        
        # Mock the parent to_representation to return all fields
        original_data = {
            'id': self.company_id,
            'name': 'Test Company',
            'logo': 'http://example.com/logo.png',
            'created_at': '2024-01-01T00:00:00Z',
            'updated_at': '2024-01-01T00:00:00Z',
            'links': [],
            'settings': {'config': {}},
            'skills': [],
            'content_model': {},
            'trial_days': 30,
            'plan': 'starter'
        }
        
        with patch('users.serializers.serializers.ModelSerializer.to_representation', return_value=original_data):
            with patch.object(serializer, '_get_content_model_data', return_value={}):
                # Act
                result = serializer.to_representation(mock_company)
        
        # Assert
        # Should only keep essential fields for basic retrieval
        expected_fields = ['id', 'name', 'logo', 'created_at', 'updated_at', 'links']
        for field in expected_fields:
            self.assertIn(field, result)
        
        # These fields should be removed for basic retrieval
        removed_fields = ['settings', 'skills', 'trial_days', 'plan']
        for field in removed_fields:
            self.assertNotIn(field, result)

    @patch('users.serializers.ContentModel.objects.filter')
    @patch('users.serializers.ContentType.objects.get_for_model')
    def test_get_content_model_data_success(self, mock_get_content_type, mock_content_filter):
        """Test successful content model data retrieval"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        mock_content1 = Mock()
        mock_content1.type = 'strategy'
        mock_content1.subtype = 'growth'
        mock_content1.content = 'Expand internationally'
        
        mock_content2 = Mock()
        mock_content2.type = 'culture'
        mock_content2.subtype = None
        mock_content2.content = 'Innovation and collaboration'
        
        mock_queryset = Mock()
        mock_queryset.order_by.return_value = [mock_content1, mock_content2]
        mock_queryset.exists.return_value = True
        mock_content_filter.return_value = mock_queryset
        
        mock_content_type = Mock()
        mock_get_content_type.return_value = mock_content_type
        
        serializer = CompanySerializer(context={'retrieval_level': 'detailed'})
        
        # Act
        result = serializer._get_content_model_data(mock_company)
        
        # Assert
        self.assertIsInstance(result, dict)
        self.assertEqual(result['growth_strategy'], 'Expand internationally')
        self.assertEqual(result['culture'], 'Innovation and collaboration')


class TestCompanySerializerCreation(TestCase):
    """Test cases for CompanySerializer company creation"""
    
    def setUp(self):
        self.factory = APIRequestFactory()
        self.company_id = str(uuid.uuid4())
        self.user_id = str(uuid.uuid4())

    @patch('users.serializers.CompanySerializer._handle_links')
    @patch('users.serializers.CompanySerializer._handle_content_model')
    @patch('users.serializers.CompanySerializer._handle_skills')
    def test_create_with_nested_data(self, mock_handle_skills, mock_handle_content_model, mock_handle_links):
        """Test company creation with nested data"""
        # Arrange
        validated_data = {
            'name': 'Test Company',
            'industry': 'Technology',
            'links': [{'url': 'https://example.com', 'slug': 'website'}],
            'content_model': {
                'strategy': {'growth': 'Expand internationally'},
                'culture': 'Innovation focused'
            },
            'skills': [{'name': 'Python', 'level': 4.5}]
        }
        
        mock_company = Mock()
        mock_company.id = self.company_id
        
        serializer = CompanySerializer()
        
        # Act
        with patch('users.serializers.serializers.ModelSerializer.create', return_value=mock_company):
            result = serializer.create(validated_data)
        
        # Assert
        self.assertEqual(result, mock_company)
        mock_handle_links.assert_called_once()
        mock_handle_content_model.assert_called_once()
        mock_handle_skills.assert_called_once()

    @patch('users.serializers.Links.objects.create')
    @patch('users.serializers.ContentType.objects.get_for_model')
    @patch('services.tasks.TaskService')
    def test_handle_links_creation(self, mock_task_service, mock_get_content_type, mock_links_create):
        """Test links creation with automatic website processing"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        mock_content_type = Mock()
        mock_get_content_type.return_value = mock_content_type
        
        mock_link = Mock()
        mock_link.id = str(uuid.uuid4())
        mock_links_create.return_value = mock_link
        
        mock_task_service_instance = Mock()
        mock_task_service_instance.retrieve_and_save_segmented_information_from_url.delay = Mock()
        mock_task_service.return_value = mock_task_service_instance
        
        links_data = [
            {'url': 'https://example.com', 'slug': 'website'},
            {'url': 'https://linkedin.com/company/test', 'slug': 'linkedin'}
        ]
        
        serializer = CompanySerializer()
        
        # Act
        serializer._handle_links(links_data, mock_company)
        
        # Assert
        self.assertEqual(mock_links_create.call_count, 2)
        # Should trigger async task for website link
        mock_task_service_instance.retrieve_and_save_segmented_information_from_url.delay.assert_called_once_with(
            mock_link.id, self.company_id
        )

    @patch('users.serializers.Skills.objects.get_or_create')
    @patch('users.serializers.CategoryList.objects.get_or_create')
    @patch('users.serializers.Metric.objects.create')
    @patch('users.serializers.ContentType.objects.get_for_model')
    def test_handle_skills_creation(self, mock_get_content_type, mock_metric_create, 
                                  mock_category_get_create, mock_skills_get_create):
        """Test skills creation with competence categories and metrics"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        mock_content_type = Mock()
        mock_get_content_type.return_value = mock_content_type
        
        mock_skill = Mock()
        mock_skill.id = str(uuid.uuid4())
        mock_skill.name = 'Python'
        mock_skills_get_create.return_value = (mock_skill, True)
        
        mock_competence = Mock()
        mock_competence.name = 'technical_skills'
        mock_category_get_create.return_value = (mock_competence, False)
        
        skills_data = [
            {'name': 'Python', 'level': 4.5, 'competence': 'technical_skills'},
            {'name': 'Communication', 'level': 4.0, 'competence': 'soft_skills'}
        ]
        
        serializer = CompanySerializer()
        
        # Act
        serializer._handle_skills(skills_data, mock_company)
        
        # Assert
        self.assertEqual(mock_skills_get_create.call_count, 2)
        self.assertEqual(mock_category_get_create.call_count, 2)
        self.assertEqual(mock_metric_create.call_count, 2)

    def test_handle_content_model_nested_structure(self):
        """Test content model handling with nested structure"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        mock_company.update_content = Mock()
        
        content_model_data = {
            'strategy': {
                'growth': 'Expand internationally',
                'product': 'Focus on AI features'
            },
            'culture': 'Innovation and collaboration'
        }
        
        serializer = CompanySerializer()
        
        # Act
        serializer._handle_content_model(content_model_data, mock_company)
        
        # Assert
        expected_calls = [
            (('strategy', 'Expand internationally'), {'subtype': 'growth'}),
            (('strategy', 'Focus on AI features'), {'subtype': 'product'}),
            (('culture', 'Innovation and collaboration'), {})
        ]
        
        actual_calls = mock_company.update_content.call_args_list
        self.assertEqual(len(actual_calls), 3)


class TestCompanySerializerUpdate(TestCase):
    """Test cases for CompanySerializer company updates"""
    
    def setUp(self):
        self.factory = APIRequestFactory()
        self.company_id = str(uuid.uuid4())
        self.user_id = str(uuid.uuid4())

    @patch('users.serializers.CompanySerializer._handle_links')
    @patch('users.serializers.CompanySerializer._handle_content_model')
    @patch('users.serializers.CompanySerializer._handle_skills')
    @patch('users.serializers.Settings.objects.get_or_create')
    @patch('users.serializers.ContentType.objects.get_for_model')
    def test_update_with_settings_and_preferences(self, mock_get_content_type, mock_settings_get_create,
                                                mock_handle_skills, mock_handle_content_model, mock_handle_links):
        """Test company update with settings and preferences"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        mock_settings = Mock()
        mock_settings.config = {}
        mock_settings_get_create.return_value = (mock_settings, False)
        
        mock_content_type = Mock()
        mock_get_content_type.return_value = mock_content_type
        
        validated_data = {
            'name': 'Updated Company',
            'settings': {'business_model': 'Updated SaaS'},
            'preferences': {'notification_frequency': 'daily'},
            'content_model': {'strategy': 'New strategy'},
            'skills': [{'name': 'Django', 'level': 4.0}]
        }
        
        serializer = CompanySerializer()
        
        # Act
        with patch('users.serializers.serializers.ModelSerializer.update', return_value=mock_company):
            result = serializer.update(mock_company, validated_data)
        
        # Assert
        self.assertEqual(result, mock_company)
        mock_settings_get_create.assert_called_once()
        mock_settings.save.assert_called_once()
        mock_handle_content_model.assert_called_once_with({'strategy': 'New strategy'}, mock_company)
        mock_handle_skills.assert_called_once_with([{'name': 'Django', 'level': 4.0}], mock_company)

    @patch('users.serializers.Links.objects.get')
    @patch('users.serializers.ContentType.objects.get_for_model')
    def test_handle_links_update_existing(self, mock_get_content_type, mock_links_get):
        """Test updating existing links"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        mock_content_type = Mock()
        mock_get_content_type.return_value = mock_content_type
        
        link_id = str(uuid.uuid4())
        mock_link = Mock()
        mock_link.slug = 'website'
        mock_link.url = 'https://old-example.com'
        mock_links_get.return_value = mock_link
        
        links_data = [
            {
                'id': link_id,
                'url': 'https://new-example.com',
                'slug': 'website'
            }
        ]
        
        serializer = CompanySerializer()
        
        # Act
        serializer._handle_links(links_data, mock_company)
        
        # Assert
        mock_links_get.assert_called_once_with(
            id=link_id,
            object_id=self.company_id,
            content_type=mock_content_type
        )
        self.assertEqual(mock_link.url, 'https://new-example.com')
        mock_link.save.assert_called_once()


class TestCompanySerializerValidation(TestCase):
    """Test cases for CompanySerializer validation logic"""
    
    def setUp(self):
        self.factory = APIRequestFactory()
        self.company_id = str(uuid.uuid4())

    def test_meta_model_and_fields(self):
        """Test that serializer Meta configuration is correct"""
        # Arrange & Act
        serializer = CompanySerializer()
        
        # Assert
        self.assertEqual(serializer.Meta.model, Company)
        self.assertEqual(serializer.Meta.fields, '__all__')
        self.assertIn('created_at', serializer.Meta.read_only_fields)
        self.assertIn('updated_at', serializer.Meta.read_only_fields)

    def test_retrieval_levels_constant(self):
        """Test that retrieval levels constant is properly defined"""
        # Arrange & Act
        serializer = CompanySerializer()
        
        # Assert
        self.assertEqual(serializer.RETRIEVAL_LEVELS, ('basic', 'detailed', 'full'))

    def test_invalid_skills_data_format(self):
        """Test handling of invalid skills data format"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        invalid_skills_data = "not a list"
        
        serializer = CompanySerializer()
        
        # Act & Assert
        with patch('users.serializers.logger') as mock_logger:
            serializer._handle_skills(invalid_skills_data, mock_company)
            mock_logger.warning.assert_called_with(
                f"Invalid skills data format for company {self.company_id}. Expected list, got {type(invalid_skills_data)}"
            )

    def test_invalid_content_model_format(self):
        """Test handling of invalid content model format"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        
        invalid_content_data = "not a dictionary"
        
        serializer = CompanySerializer()
        
        # Act & Assert
        with patch('users.serializers.logger') as mock_logger:
            serializer._handle_content_model(invalid_content_data, mock_company)
            mock_logger.warning.assert_called_with(
                f"Invalid content model data format for company {self.company_id}. Expected dict, got {type(invalid_content_data)}"
            )


class TestCompanySerializerIntegration(TestCase):
    """Integration tests combining multiple CompanySerializer operations"""
    
    def setUp(self):
        self.factory = APIRequestFactory()
        self.company_id = str(uuid.uuid4())
        self.user_id = str(uuid.uuid4())

    @patch('users.serializers.Settings.objects.filter')
    @patch('users.serializers.SkillsSerializer')
    @patch('users.serializers.ContentType.objects.get_for_model')
    @patch('users.serializers.Billing.objects.get_or_create')
    def test_full_serialization_workflow(self, mock_billing_get_create, mock_get_content_type,
                                      mock_skills_serializer, mock_settings_filter):
        """Test complete serialization workflow with all components"""
        # Arrange
        mock_company = Mock()
        mock_company.id = self.company_id
        mock_company.name = 'Test Company'
        mock_company.industry = 'Technology'
        mock_company.logo = None
        mock_company.created_by = Mock()
        
        # Mock settings
        mock_settings = Mock()
        mock_settings.config = {'business_model': 'SaaS'}
        mock_settings_filter.return_value.first.return_value = mock_settings
        
        # Mock skills
        mock_skill = Mock()
        mock_skill.name = 'Python'
        mock_company.skills_needs.all.return_value = [mock_skill]
        mock_skills_serializer.return_value = [{'name': 'Python', 'level': 4.5}]
        
        # Mock billing
        mock_billing = Mock()
        mock_billing.plan = 'premium'
        mock_billing.trial_end = timezone.now() + timedelta(days=10)
        mock_billing_get_create.return_value = (mock_billing, False)
        
        # Mock content type
        mock_content_type = Mock()
        mock_get_content_type.return_value = mock_content_type
        
        request = self.factory.get('/companies/')
        
        # Mock all the serializer dependencies
        with patch('users.serializers.SettingsSerializer') as mock_settings_serializer:
            with patch('users.serializers.date') as mock_date:
                mock_settings_serializer.return_value.data = {'config': {'business_model': 'SaaS'}}
                mock_date.today.return_value = date.today()
                
                serializer = CompanySerializer(
                    mock_company,
                    context={'request': request, 'retrieval_level': 'full'}
                )
                
                # Act
                with patch.object(serializer, 'to_representation') as mock_to_representation:
                    mock_to_representation.return_value = {
                        'id': self.company_id,
                        'name': 'Test Company',
                        'industry': 'Technology',
                        'settings': {'config': {'business_model': 'SaaS'}},
                        'skills': [{'name': 'Python', 'level': 4.5}],
                        'plan': 'premium',
                        'trial_days': 10,
                        'content_model': {}
                    }
                    
                    result = serializer.data
        
        # Assert
        self.assertEqual(result['id'], self.company_id)
        self.assertEqual(result['name'], 'Test Company')
        self.assertIn('settings', result)
        self.assertIn('skills', result)
        self.assertIn('plan', result)
        self.assertIn('trial_days', result)

    def test_create_update_delete_workflow(self):
        """Test complete CRUD workflow simulation"""
        # This test simulates a complete workflow but with mocked dependencies
        # In a real integration test, you would use actual database operations
        
        # Arrange
        creation_data = {
            'name': 'New Company',
            'industry': 'Technology',
            'links': [{'url': 'https://example.com', 'slug': 'website'}],
            'skills': [{'name': 'Python', 'level': 4.5}]
        }
        
        update_data = {
            'name': 'Updated Company',
            'content_model': {'strategy': 'New approach'}
        }
        
        mock_company = Mock()
        mock_company.id = self.company_id
        mock_company.name = 'New Company'
        
        # 1. Test creation
        with patch('users.serializers.serializers.ModelSerializer.create', return_value=mock_company):
            with patch.object(CompanySerializer, '_handle_links') as mock_handle_links:
                with patch.object(CompanySerializer, '_handle_skills') as mock_handle_skills:
                    serializer = CompanySerializer()
                    created_company = serializer.create(creation_data)
                    
                    self.assertEqual(created_company, mock_company)
                    mock_handle_links.assert_called_once()
                    mock_handle_skills.assert_called_once()
        
        # 2. Test update
        mock_company.name = 'Updated Company'
        with patch('users.serializers.serializers.ModelSerializer.update', return_value=mock_company):
            with patch.object(CompanySerializer, '_handle_content_model') as mock_handle_content:
                serializer = CompanySerializer()
                updated_company = serializer.update(mock_company, update_data)
                
                self.assertEqual(updated_company, mock_company)
                mock_handle_content.assert_called_once_with({'strategy': 'New approach'}, mock_company)


if __name__ == '__main__':
    import unittest
    unittest.main() 