from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from unittest.mock import patch

# Import the serializer and required models.
from users.serializers import GlobalUserSerializer
from users.models import (
    Company, Resume,
    CompanyUser, Settings, Career, CategoryList, Network
)
from jobs.models import Qualification, Stage, Job, Interview, Preferences, Notes, BooleanModel, CategoryList, Network
from django.contrib.contenttypes.models import ContentType

User = get_user_model()

class GlobalUserSerializerTestCase(TestCase):
    def setUp(self):
        # Create a test company to be used in the serializer context.
        self.company = Company.objects.create(name="Test Company")
        
        # Create a test user.
        self.user = User.objects.create(
            email="test@example.com",
            first_name="Test",
            last_name="User"
        )
        
        # Create a Resume for the user associated with the company.
        self.resume = Resume.objects.create(user=self.user, company=self.company)
        
        # Create a Stage instance and add it to a Qualification.
        self.stage = Stage.objects.create(name="Initial", order=1, company=self.company)
        self.qualification = Qualification.objects.create(
            candidate=self.resume,
            created_at=timezone.now()
        )
        # Manually assign the stage.
        self.qualification.stages.add(self.stage)
        
        # Set a context with the company to simulate the serializer environment.
        self.context = {'company': self.company}

    def test_get_qualification_with_valid_data(self):
        """
        Verify that get_qualification returns a dictionary with proper
        stage and score information when qualification exists.
        """
        serializer = GlobalUserSerializer(instance=self.user, context=self.context)
        qualification_data = serializer.get_qualification(self.user)
        self.assertIsInstance(qualification_data, dict)
        # Check that the returned qualification id matches the created one.
        self.assertEqual(qualification_data['id'], self.qualification.id)
        # Ensure that stages are returned as a list and current_stage data is set.
        self.assertIn('stages', qualification_data)
        self.assertIsNotNone(qualification_data['current_stage'])
        self.assertEqual(qualification_data['current_stage']['name'], self.stage.name)

    def test_get_qualification_without_company(self):
        """
        When no company is provided in the context, get_qualification should
        return None.
        """
        serializer = GlobalUserSerializer(instance=self.user, context={})
        qualification_data = serializer.get_qualification(self.user)
        self.assertIsNone(qualification_data)

    def test_get_interviews_without_company(self):
        """
        get_interviews should return an empty list if the company context is missing.
        """
        serializer = GlobalUserSerializer(instance=self.user, context={})
        interviews = serializer.get_interviews(self.user)
        self.assertEqual(interviews, [])

    def test_get_interviews_with_no_qualification(self):
        """
        If a qualification cannot be found (e.g. after deletion), get_interviews
        should return an empty list.
        """
        # Remove the qualification so that Interview lookup fails.
        self.qualification.delete()
        serializer = GlobalUserSerializer(instance=self.user, context=self.context)
        interviews = serializer.get_interviews(self.user)
        self.assertEqual(interviews, [])

    def test_get_position_without_company_user(self):
        """
        When no CompanyUser record exists for the user in the given company,
        get_position should return None.
        """
        serializer = GlobalUserSerializer(instance=self.user, context=self.context)
        position = serializer.get_position(self.user)
        self.assertIsNone(position)

    @patch('users.serializers.GlobalUserSerializer._handle_nested_data_creation')
    @patch('users.serializers.GlobalUserSerializer._handle_type_specific_creation')
    def test_create_method_calls_nested_and_type_specific_handlers(
        self, mock_type_handler, mock_nested_handler
    ):
        """
        Ensure that the create method properly calls the helper methods for
        nested data creation and type-specific handling.
        """
        validated_data = {
            'email': 'newuser@example.com',
            'first_name': 'New',
            'last_name': 'User',
            'type': 'employee'
        }
        serializer = GlobalUserSerializer(data=validated_data, context=self.context)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user_instance = serializer.save()
        # Verify that nested and type-specific handlers were invoked.
        mock_nested_handler.assert_called_once_with(user_instance, validated_data)
        mock_type_handler.assert_called_once_with(user_instance, 'employee')

    @patch('users.serializers.GlobalUserSerializer._handle_nested_data_update')
    def test_update_method_updates_basic_fields_and_calls_nested_update(self, mock_nested_update):
        """
        Test that update correctly updates basic user fields and then
        delegates nested data updates.
        """
        original_user = self.user
        validated_data = {
            'first_name': 'Updated',
            'last_name': 'User',
            'occupation': 'Engineer'
        }
        serializer = GlobalUserSerializer(instance=original_user, context=self.context)
        updated_user = serializer.update(original_user, validated_data)
        # Verify that basic fields have been updated.
        self.assertEqual(updated_user.first_name, 'Updated')
        self.assertEqual(updated_user.occupation, 'Engineer')
        # Confirm that the nested update helper was called.
        mock_nested_update.assert_called_once()

    def test_get_questions_without_company(self):
        """
        When the company context is missing, get_questions should return an empty list.
        """
        serializer = GlobalUserSerializer(instance=self.user, context={})
        questions = serializer.get_questions(self.user)
        self.assertEqual(questions, [])

    def test_find_or_create_stage_existing(self):
        """
        Test that _find_or_create_stage returns the existing stage if one is found.
        """
        serializer = GlobalUserSerializer(context=self.context)
        # Using the order and name of the stage created in setUp.
        stage_found = serializer._find_or_create_stage(self.stage.order, self.stage.name, self.company)
        self.assertEqual(stage_found.id, self.stage.id)

    def test_find_or_create_stage_invalid_order(self):
        """
        Test that _find_or_create_stage returns an error dict when no stage
        is found for a given order and non-special stage name.
        """
        serializer = GlobalUserSerializer(context=self.context)
        result = serializer._find_or_create_stage(999, "NonExistent", self.company)
        self.assertIsInstance(result, dict)
        self.assertIn('error', result)
