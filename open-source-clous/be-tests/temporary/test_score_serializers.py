from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from unittest.mock import patch, MagicMock

# Import the serializers and required models
from jobs.serializers import ScoreSerializer, QualificationSerializer
from users.serializers import ResumeSerializer
from users.models import Company, Resume, Metric
from jobs.models import Qualification, Stage
from django.contrib.contenttypes.models import ContentType

User = get_user_model()

class ScoreSerializerTestCase(TestCase):
    def setUp(self):
        # Create a test company
        self.company = Company.objects.create(name="Test Company")
        
        # Create a test user
        self.user = User.objects.create(
            email="test@example.com",
            first_name="Test",
            last_name="User"
        )
        
        # Create a test resume
        self.resume = Resume.objects.create(user=self.user, company=self.company)
        
        # Create a test metric
        self.metric = Metric.objects.create(
            name="test_score",
            value=85.5,
            company=self.company,
            timestamp=timezone.now()
        )

    def test_score_serializer_basic_fields(self):
        """Test that ScoreSerializer includes basic fields"""
        serializer = ScoreSerializer(self.metric)
        data = serializer.data
        
        self.assertIn('id', data)
        self.assertIn('score', data)
        self.assertEqual(data['score'], 85.5)

    def test_score_serializer_content_model_field(self):
        """Test that ScoreSerializer includes content_model field"""
        serializer = ScoreSerializer(self.metric)
        data = serializer.data
        
        self.assertIn('content_model', data)
        self.assertIsInstance(data['content_model'], dict)

    def test_score_serializer_retrieval_levels(self):
        """Test that ScoreSerializer respects retrieval levels"""
        # Test basic level
        serializer = ScoreSerializer(self.metric, context={'retrieval_level': 'basic'})
        data = serializer.data
        
        self.assertIn('id', data)
        self.assertIn('score', data)
        # content_model should be excluded at basic level
        self.assertNotIn('content_model', data)

class QualificationSerializerTestCase(TestCase):
    def setUp(self):
        # Create a test company
        self.company = Company.objects.create(name="Test Company")
        
        # Create a test user
        self.user = User.objects.create(
            email="test@example.com",
            first_name="Test",
            last_name="User"
        )
        
        # Create a test resume
        self.resume = Resume.objects.create(user=self.user, company=self.company)
        
        # Create a test stage
        self.stage = Stage.objects.create(name="Initial", order=1, company=self.company)
        
        # Create a test qualification
        self.qualification = Qualification.objects.create(
            resume=self.resume,
            stages=self.stage,
            created_at=timezone.now()
        )

    def test_qualification_serializer_fields(self):
        """Test that QualificationSerializer includes all required fields"""
        serializer = QualificationSerializer(self.qualification)
        data = serializer.data
        
        self.assertIn('id', data)
        self.assertIn('resume', data)
        self.assertIn('stages', data)
        self.assertIn('qualification_score', data)
        self.assertIn('created_at', data)
        self.assertIn('updated_at', data)

    def test_qualification_score_field(self):
        """Test that qualification_score field is present and properly formatted"""
        serializer = QualificationSerializer(self.qualification)
        data = serializer.data
        
        # qualification_score should be None if no metrics exist
        self.assertIsNone(data['qualification_score'])

class ResumeSerializerTestCase(TestCase):
    def setUp(self):
        # Create a test company
        self.company = Company.objects.create(name="Test Company")
        
        # Create a test user
        self.user = User.objects.create(
            email="test@example.com",
            first_name="Test",
            last_name="User"
        )
        
        # Create a test resume
        self.resume = Resume.objects.create(user=self.user, company=self.company)

    def test_resume_serializer_fields(self):
        """Test that ResumeSerializer includes prioritization_score field"""
        serializer = ResumeSerializer(self.resume)
        data = serializer.data
        
        self.assertIn('id', data)
        self.assertIn('user', data)
        self.assertIn('company', data)
        self.assertIn('prioritization_score', data)
        self.assertIn('content_model', data)

    def test_prioritization_score_field(self):
        """Test that prioritization_score field is present and properly formatted"""
        serializer = ResumeSerializer(self.resume)
        data = serializer.data
        
        # prioritization_score should be None if no metrics exist
        self.assertIsNone(data['prioritization_score'])

    def test_resume_serializer_retrieval_levels(self):
        """Test that ResumeSerializer respects retrieval levels"""
        # Test basic level
        serializer = ResumeSerializer(self.resume, context={'retrieval_level': 'basic'})
        data = serializer.data
        
        self.assertIn('id', data)
        self.assertIn('user', data)
        self.assertIn('company', data)
        # Heavy fields should be excluded at basic level
        self.assertNotIn('documents', data)
        self.assertNotIn('trainings', data)
        self.assertNotIn('assessments', data)
        self.assertNotIn('performances', data) 