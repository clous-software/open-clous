import pytest
from django.test import TestCase
from django.contrib.auth import get_user_model
from jobs.models import Performance, Status
from users.models import Company

User = get_user_model()


class TestStatusManagementMixin(TestCase):
    """Test the StatusManagementMixin functionality with Performance model."""

    def setUp(self):
        """Set up test data."""
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        self.company = Company.objects.create(
            name='Test Company',
            slug='test-company'
        )
        self.performance = Performance.objects.create(
            user=self.user,
            type='annual_review',
            subtype='2024'
        )

    def test_save_status(self):
        """Test saving a status using the mixin."""
        status_obj = self.performance.save_status(
            value='in_progress',
            user=self.user,
            type='review_status',
            subtype='current'
        )
        
        self.assertIsInstance(status_obj, Status)
        self.assertEqual(status_obj.value, 'in_progress')
        self.assertEqual(status_obj.user, self.user)
        self.assertEqual(status_obj.type, 'review_status')
        self.assertEqual(status_obj.subtype, 'current')
        self.assertEqual(status_obj.content_object, self.performance)

    def test_get_status(self):
        """Test retrieving a status using the mixin."""
        # Create a status first
        self.performance.save_status(
            value='completed',
            user=self.user,
            type='review_status'
        )
        
        # Retrieve the status
        status_value = self.performance.get_status(type='review_status')
        self.assertEqual(status_value, 'completed')

    def test_get_status_not_found(self):
        """Test retrieving a non-existent status returns None."""
        status_value = self.performance.get_status(type='non_existent')
        self.assertIsNone(status_value)

    def test_get_statuses(self):
        """Test retrieving multiple statuses using the mixin."""
        # Create multiple statuses
        self.performance.save_status(
            value='draft',
            user=self.user,
            type='review_status'
        )
        self.performance.save_status(
            value='in_progress',
            user=self.user,
            type='review_status'
        )
        
        # Retrieve all statuses
        statuses = self.performance.get_statuses(type='review_status')
        self.assertEqual(statuses.count(), 2)
        
        # Check ordering (most recent first)
        status_values = [status.value for status in statuses]
        self.assertEqual(status_values, ['in_progress', 'draft'])

    def test_update_status(self):
        """Test updating a status using the mixin."""
        # Create initial status
        self.performance.save_status(
            value='draft',
            user=self.user,
            type='review_status'
        )
        
        # Update the status
        updated_status = self.performance.update_status(
            value='completed',
            user=self.user,
            type='review_status'
        )
        
        self.assertEqual(updated_status.value, 'completed')
        
        # Verify only one status exists for this type
        statuses = self.performance.get_statuses(type='review_status')
        self.assertEqual(statuses.count(), 1)

    def test_delete_status(self):
        """Test deleting statuses using the mixin."""
        # Create multiple statuses
        self.performance.save_status(
            value='draft',
            user=self.user,
            type='review_status'
        )
        self.performance.save_status(
            value='in_progress',
            user=self.user,
            type='review_status'
        )
        
        # Delete statuses
        result = self.performance.delete_status(type='review_status')
        self.assertEqual(result['deleted'], 2)
        
        # Verify no statuses remain
        statuses = self.performance.get_statuses(type='review_status')
        self.assertEqual(statuses.count(), 0)

    def test_status_filtering_by_user(self):
        """Test filtering statuses by user."""
        other_user = User.objects.create_user(
            email='other@example.com',
            password='testpass123'
        )
        
        # Create statuses for different users
        self.performance.save_status(
            value='user1_status',
            user=self.user,
            type='review_status'
        )
        self.performance.save_status(
            value='user2_status',
            user=other_user,
            type='review_status'
        )
        
        # Test filtering by user
        user1_status = self.performance.get_status(
            type='review_status',
            user=self.user
        )
        user2_status = self.performance.get_status(
            type='review_status',
            user=other_user
        )
        
        self.assertEqual(user1_status, 'user1_status')
        self.assertEqual(user2_status, 'user2_status')

    def test_status_filtering_by_subtype(self):
        """Test filtering statuses by subtype."""
        # Create statuses with different subtypes
        self.performance.save_status(
            value='q1_status',
            user=self.user,
            type='quarterly',
            subtype='q1'
        )
        self.performance.save_status(
            value='q2_status',
            user=self.user,
            type='quarterly',
            subtype='q2'
        )
        
        # Test filtering by subtype
        q1_status = self.performance.get_status(
            type='quarterly',
            subtype='q1'
        )
        q2_status = self.performance.get_status(
            type='quarterly',
            subtype='q2'
        )
        
        self.assertEqual(q1_status, 'q1_status')
        self.assertEqual(q2_status, 'q2_status') 