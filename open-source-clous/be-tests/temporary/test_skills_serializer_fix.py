from django.test import TestCase
from unittest.mock import Mock, patch
from users.serializers import SkillsSerializer, ResumeSerializer
from users.models import Resume, User, Skills
from jobs.models import Company
from django.contrib.contenttypes.models import ContentType
import uuid


class TestSkillsSerializerIndividualRetrieval(TestCase):
    """Test that SkillsSerializer correctly returns level fields for individual retrieval"""
    
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user_id = str(uuid.uuid4())
        self.resume_id = str(uuid.uuid4())
        self.company_id = str(uuid.uuid4())
        self.skill_id = str(uuid.uuid4())
        
    def test_individual_retrieval_includes_level_fields_basic(self):
        """Test that individual retrieval includes level fields even with basic retrieval level"""
        # Arrange
        mock_skill = Mock()
        mock_skill.id = self.skill_id
        mock_skill.name = 'Python'
        
        # Mock the level and pool_level methods to return values
        with patch.object(SkillsSerializer, 'get_level', return_value=4.5) as mock_get_level, \
             patch.object(SkillsSerializer, 'get_pool_level', return_value=3.8) as mock_get_pool_level:
            
            context = {
                'resume_context': True,
                'retrieval_type': 'individual',
                'user_id': self.user_id,
                'retrieval_level': 'basic',
                'company': Mock()
            }
            
            serializer = SkillsSerializer(mock_skill, context=context)
            
            # Act
            result = serializer.to_representation(mock_skill)
            
            # Assert
            self.assertIn('level', result)
            self.assertIn('pool_level', result)
            self.assertEqual(result['level'], 4.5)
            self.assertEqual(result['pool_level'], 3.8)
            
            # Verify the methods were called
            mock_get_level.assert_called_once_with(mock_skill)
            mock_get_pool_level.assert_called_once_with(mock_skill)
    
    def test_individual_retrieval_includes_level_fields_detailed(self):
        """Test that individual retrieval includes level fields with detailed retrieval level"""
        # Arrange
        mock_skill = Mock()
        mock_skill.id = self.skill_id
        mock_skill.name = 'Python'
        
        # Mock the level and pool_level methods to return values
        with patch.object(SkillsSerializer, 'get_level', return_value=4.5) as mock_get_level, \
             patch.object(SkillsSerializer, 'get_pool_level', return_value=3.8) as mock_get_pool_level:
            
            context = {
                'resume_context': True,
                'retrieval_type': 'individual',
                'user_id': self.user_id,
                'retrieval_level': 'detailed',
                'company': Mock()
            }
            
            serializer = SkillsSerializer(mock_skill, context=context)
            
            # Act
            result = serializer.to_representation(mock_skill)
            
            # Assert
            self.assertIn('level', result)
            self.assertIn('pool_level', result)
            self.assertEqual(result['level'], 4.5)
            self.assertEqual(result['pool_level'], 3.8)
            
            # Verify the methods were called
            mock_get_level.assert_called_once_with(mock_skill)
            mock_get_pool_level.assert_called_once_with(mock_skill)
    
    def test_global_retrieval_excludes_level_fields_basic(self):
        """Test that global retrieval excludes level fields with basic retrieval level"""
        # Arrange
        mock_skill = Mock()
        mock_skill.id = self.skill_id
        mock_skill.name = 'Python'
        
        context = {
            'retrieval_type': 'global',
            'retrieval_level': 'basic',
            'company': Mock()
        }
        
        serializer = SkillsSerializer(mock_skill, context=context)
        
        # Act
        result = serializer.to_representation(mock_skill)
        
        # Assert - level fields should be excluded for global basic retrieval
        self.assertNotIn('level', result)
        self.assertNotIn('pool_level', result)
    
    def test_resume_serializer_uses_detailed_retrieval_level(self):
        """Test that ResumeSerializer.get_skills uses detailed retrieval level"""
        # Arrange
        mock_resume = Mock()
        mock_resume.id = self.resume_id
        mock_resume.user.id = self.user_id
        
        mock_skill1 = Mock()
        mock_skill1.id = str(uuid.uuid4())
        mock_skill1.name = 'Python'
        
        mock_skill2 = Mock()
        mock_skill2.id = str(uuid.uuid4())
        mock_skill2.name = 'JavaScript'
        
        mock_resume.skills.all.return_value = [mock_skill1, mock_skill2]
        
        context = {
            'company': Mock(),
            'request': Mock()
        }
        
        serializer = ResumeSerializer(mock_resume, context=context)
        
        # Act
        with patch('users.serializers.SkillsSerializer') as mock_skills_serializer:
            mock_skills_serializer.return_value.data = [
                {'name': 'Python', 'level': 4.5, 'pool_level': 3.8},
                {'name': 'JavaScript', 'level': 4.0, 'pool_level': 3.5}
            ]
            
            result = serializer.get_skills(mock_resume)
            
            # Assert
            # Verify SkillsSerializer was called with detailed retrieval level
            mock_skills_serializer.assert_called_once()
            call_args = mock_skills_serializer.call_args
            self.assertEqual(call_args[1]['context']['retrieval_level'], 'detailed')
            self.assertEqual(call_args[1]['context']['retrieval_type'], 'individual')
            self.assertEqual(call_args[1]['context']['resume_context'], True)
            self.assertEqual(call_args[1]['context']['user_id'], self.user_id)
            
            # Verify the result contains level fields
            self.assertEqual(len(result), 2)
            self.assertIn('level', result[0])
            self.assertIn('pool_level', result[0])
            self.assertIn('level', result[1])
            self.assertIn('pool_level', result[1])


# Import the APIRequestFactory for the test
from django.test import APIRequestFactory 