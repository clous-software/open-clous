import json
import uuid
from datetime import timedelta
from unittest.mock import patch, MagicMock, call

from django.test import TestCase
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType

from services.intelligence import IntelligenceService
from jobs.models import (
    Resume, Pulse, Interview, Questions, Replies, 
    Metric, Notes, BooleanModel, Qualification, Forms, Job
)
from users.models import User, Company, Network


class IntelligenceServiceTestCase(TestCase):
    """
    Test case for the IntelligenceService class.
    Tests all methods of the IntelligenceService class with appropriate mocks.
    """
    
    def setUp(self):
        """Set up test data and initialize the IntelligenceService."""
        # Create test company
        self.company = Company.objects.create(
            name="Test Company",
            website="https://testcompany.com"
        )
        
        # Create test users
        self.candidate = User.objects.create(
            email="candidate@test.com",
            first_name="Test",
            last_name="Candidate",
            password="testpassword"
        )
        
        self.interviewer = User.objects.create(
            email="interviewer@test.com",
            first_name="Test",
            last_name="Interviewer",
            password="testpassword"
        )
        
        # Create test resume
        self.resume = Resume.objects.create(
            user=self.candidate,
            company=self.company
        )
        
        # Create test job
        self.job = Job.objects.create(
            role="Test Role",
            company=self.company
        )
        
        # Create test qualification
        self.qualification = Qualification.objects.create(
            candidate=self.resume,
            job=self.job
        )
        
        # Create test interview
        self.interview = Interview.objects.create(
            candidate=self.qualification
        )
        
        # Create test pulse
        self.pulse = Pulse.objects.create(
            type="team",
            company=self.company
        )
        
        # Initialize the service
        self.intelligence_service = IntelligenceService()
        
        # Mock content types
        self.resume_content_type = ContentType.objects.get_for_model(Resume)
        self.interview_content_type = ContentType.objects.get_for_model(Interview)
        self.forms_content_type = ContentType.objects.get_for_model(Forms)
        self.pulse_content_type = ContentType.objects.get_for_model(Pulse)
        self.qualification_content_type = ContentType.objects.get_for_model(Qualification)

    @patch('services.intelligence.retrieve_service.expansive_context_search')
    @patch('services.intelligence.ai_service.get_training_research')
    @patch('services.intelligence.ai_service.get_training_program')
    @patch('services.intelligence.ai_service.get_career_plan')
    @patch('services.intelligence.get_object_or_404')
    def test_handle_career_document(self, mock_get_object, mock_get_career_plan, 
                                   mock_get_training_program, mock_get_training_research,
                                   mock_expansive_context_search):
        """Test the _handle_career_document method."""
        # Set up mocks
        mock_get_object.side_effect = [self.candidate, self.resume]
        mock_expansive_context_search.return_value = "Test context"
        mock_get_training_research.return_value = "Test research"
        mock_get_training_program.return_value = "Test training program"
        mock_get_career_plan.return_value = "Test career plan with <Chart query=\"test query\"/> and more text"
        
        # Mock resume.get_content
        self.resume.get_content = MagicMock()
        self.resume.get_content.side_effect = [
            "Test metadata",  # metadata
            "Test skills analysis"  # skills analysis
        ]
        
        # Test data
        content = [
            {"question": "Test question", "reply": "Test reply"}
        ]
        
        # Call the method
        result = self.intelligence_service._handle_career_document(
            company=self.company,
            candidate_id=self.candidate.id,
            content=content,
            company_id=self.company.id
        )
        
        # Assertions
        self.assertEqual(len(result), 6)  # Should return 6 items
        insights_content, embedding_text, training_output, candidate, resume, blocks_list = result
        
        self.assertEqual(insights_content, "Test career plan with <Chart query=\"test query\"/> and more text")
        self.assertEqual(training_output, "Test training program")
        self.assertEqual(candidate, self.candidate)
        self.assertEqual(resume, self.resume)
        
        # Check blocks_list
        self.assertEqual(len(blocks_list), 3)
        self.assertEqual(blocks_list[0]['type'], 'text')
        self.assertEqual(blocks_list[1]['type'], 'chart')
        self.assertEqual(blocks_list[1]['query'], 'test query')
        self.assertEqual(blocks_list[2]['type'], 'text')
        
        # Verify mock calls
        mock_expansive_context_search.assert_called_once()
        mock_get_training_research.assert_called_once()
        mock_get_training_program.assert_called_once()
        mock_get_career_plan.assert_called_once()
        
        # Test with missing required fields
        with self.assertRaises(ValueError):
            self.intelligence_service._handle_career_document(
                company=self.company,
                candidate_id=None,
                content=content,
                company_id=None
            )

    @patch('services.intelligence.Job.objects.get')
    @patch('services.intelligence.IntelligenceService.retrieve_service.get_job_situation')
    @patch('services.intelligence.IntelligenceService.ai_service.process_ai_request')
    def test_handle_job_document(self, mock_process_ai_request, mock_get_job_situation, mock_job_get):
        """Test the _handle_job_document method."""
        # Set up mocks
        mock_job_get.return_value = self.job
        mock_get_job_situation.return_value = {
            'job_role': 'Test Role',
            'stage_counts': {'applied': 10, 'interview': 5},
            'candidates': [{'name': 'Test Candidate', 'score': 0.8}],
            'top_candidates': [{'name': 'Top Candidate', 'score': 0.9}],
            'pipeline_analysis': 'Test pipeline analysis'
        }
        mock_process_ai_request.return_value = "Test job document content"
        
        # Call the method
        result = self.intelligence_service._handle_job_document(
            company=self.company,
            job_id=self.job.id,
            content="Additional job information",
            subtype="test_subtype"
        )
        
        # Assertions
        self.assertEqual(len(result), 4)  # Should return 4 items
        insights_content, embedding_text, blocks_list, job = result
        
        self.assertEqual(insights_content, "Test job document content")
        self.assertEqual(embedding_text, "Test job document content")
        self.assertEqual(job, self.job)
        
        # Check blocks_list
        self.assertEqual(len(blocks_list), 1)
        self.assertEqual(blocks_list[0]['type'], 'text')
        self.assertEqual(blocks_list[0]['content'], "Test job document content")
        
        # Verify mock calls
        mock_job_get.assert_called_once_with(id=self.job.id)
        mock_get_job_situation.assert_called_once_with(self.job, self.company)
        mock_process_ai_request.assert_called_once()

    @patch('services.intelligence.get_object_or_404')
    @patch('services.intelligence.User.objects.get')
    @patch('services.intelligence.Questions.objects.filter')
    @patch('services.intelligence.BooleanModel.objects.get_or_create')
    @patch('services.intelligence.ai_service.get_interview_transcript')
    @patch('services.intelligence.ai_service.get_interview_report')
    @patch('services.intelligence.ai_service.cdqo_pipeline')
    @patch('services.intelligence.ai_service.get_skills_validation')
    @patch('services.intelligence.Transcription.objects.create')
    @patch('services.intelligence.Notes.objects.create')
    @patch('services.intelligence.Replies.objects.create')
    @patch('services.intelligence.Metric.objects.create')
    @patch('services.intelligence.metrics_service.record_metric')
    @patch('services.intelligence.transform_service.update_or_create_skills')
    @patch('services.intelligence.Interview.objects.get')
    @patch('services.intelligence.Interview.objects.create')
    def test_handle_interview_document(self, mock_interview_create, mock_interview_get,
                                      mock_update_skills, mock_record_metric, mock_metric_create,
                                      mock_replies_create, mock_notes_create, mock_transcription_create,
                                      mock_get_skills_validation, mock_cdqo_pipeline, 
                                      mock_get_interview_report, mock_get_interview_transcript,
                                      mock_boolean_get_or_create, mock_questions_filter,
                                      mock_user_get, mock_get_object):
        """Test the _handle_interview_document method."""
        # Set up mocks
        mock_get_object.side_effect = [self.candidate, self.resume]
        mock_user_get.return_value = self.interviewer
        
        # Mock question
        mock_question = MagicMock()
        mock_question.question = "Test question"
        mock_question.get_content.return_value = "Test reasoning"
        mock_questions_filter.return_value = [mock_question]
        
        # Mock interview transcript response
        mock_get_interview_transcript.return_value = {
            "notes": ["Test note"],
            "replies": [
                {
                    "name": "Test name",
                    "question": "Test question",
                    "qualification": 4,
                    "follow_ups": "Test follow-ups",
                    "quotes": "Test quotes",
                    "insights": "Test insights"
                }
            ]
        }
        
        # Mock other AI responses
        mock_get_interview_report.return_value = "Test interview report with <Chart query=\"test query\"/> and more text"
        mock_cdqo_pipeline.return_value = {"key": "value"}
        mock_get_skills_validation.return_value = {"skills": [{"name": "Python", "level": "Expert"}]}
        
        # Mock resume methods
        self.resume.get_content = MagicMock()
        self.resume.get_content.side_effect = [
            "Test metadata",  # metadata
            "Test insights",  # insights
            "Test insights"   # insights again for update_content
        ]
        self.resume.update_content = MagicMock()
        
        # Mock interview
        mock_interview = MagicMock()
        mock_interview.id = uuid.uuid4()
        mock_interview.status = None
        mock_interview_get.return_value = mock_interview
        mock_interview_create.return_value = mock_interview
        
        # Mock replies
        mock_reply = MagicMock()
        mock_reply.id = uuid.uuid4()
        mock_replies_create.return_value = mock_reply
        
        # Call the method with existing interview
        result = self.intelligence_service._handle_interview_document(
            company=self.company,
            candidate_id=self.candidate.id,
            user_id=self.interviewer.id,
            company_id=self.company.id,
            content="Test interview transcript",
            subtype="test_subtype",
            interview_id=mock_interview.id
        )
        
        # Assertions
        self.assertEqual(len(result), 7)  # Should return 7 items
        insights_content, embedding_text, training_output, candidate, job, interview, blocks_list = result
        
        self.assertEqual(insights_content, "Test interview report with <Chart query=\"test query\"/> and more text")
        self.assertEqual(candidate, self.candidate)
        self.assertEqual(interview, mock_interview)
        
        # Check blocks_list
        self.assertEqual(len(blocks_list), 3)
        self.assertEqual(blocks_list[0]['type'], 'text')
        self.assertEqual(blocks_list[1]['type'], 'chart')
        self.assertEqual(blocks_list[1]['query'], 'test query')
        self.assertEqual(blocks_list[2]['type'], 'text')
        
        # Verify mock calls
        mock_get_interview_transcript.assert_called_once()
        mock_get_interview_report.assert_called_once()
        mock_cdqo_pipeline.assert_called_once()
        mock_get_skills_validation.assert_called_once()
        mock_update_skills.assert_called_once()
        mock_record_metric.assert_called_once()
        
        # Test with missing required fields
        with self.assertRaises(ValueError):
            self.intelligence_service._handle_interview_document(
                company=self.company,
                candidate_id=None,
                user_id=None,
                company_id=None,
                content="Test content",
                subtype="test_subtype",
                interview_id=None
            )

    @patch('services.intelligence.Pulse.objects.get')
    @patch('services.intelligence.Forms.objects.filter')
    @patch('services.intelligence.Transcription.objects.filter')
    @patch('services.intelligence.IntelligenceService.retrieve_service.get_object_context')
    @patch('services.intelligence.IntelligenceService.retrieve_service.get_metrics')
    @patch('services.intelligence.IntelligenceService.ai_service.process_ai_request')
    @patch('concurrent.futures.ThreadPoolExecutor')
    def test_handle_pulse_document(self, mock_executor, mock_process_ai_request,
                                  mock_get_metrics, mock_get_object_context,
                                  mock_transcription_filter, mock_forms_filter,
                                  mock_pulse_get):
        """Test the _handle_pulse_document method."""
        # Set up mocks
        mock_pulse = MagicMock()
        mock_pulse.id = uuid.uuid4()
        mock_pulse_get.return_value = mock_pulse
        
        # Mock forms
        mock_form = MagicMock()
        mock_form.id = uuid.uuid4()
        mock_form.created_at = timezone.now()
        mock_forms_filter.return_value = MagicMock()
        mock_forms_filter.return_value.count.return_value = 5
        mock_forms_filter.return_value.exists.return_value = True
        mock_forms_filter.return_value.order_by.return_value.first.return_value = mock_form
        
        # Mock transcriptions
        mock_transcription = MagicMock()
        mock_transcription.id = uuid.uuid4()
        mock_transcription.content = {"question": "Test question", "answer": "Test answer"}
        mock_transcription_filter.return_value = [mock_transcription]
        
        # Mock context and metrics
        mock_get_object_context.return_value = "Test company context"
        mock_get_metrics.return_value = "Test metrics"
        
        # Mock AI responses for the dynamic report generation loop
        mock_process_ai_request.side_effect = [
            "Test synthesis summary",  # First call for synthesis
            "Test outline section",    # First outline section
            "filtered_group: id1, id2",  # First classifier
            "Test analysis result",    # First analysis
            "Test section content",    # First report section
            "END"                      # Second outline section (ends the loop)
        ]
        
        # Mock ThreadPoolExecutor
        mock_executor_instance = MagicMock()
        mock_executor.return_value.__enter__.return_value = mock_executor_instance
        
        # Call the method
        result = self.intelligence_service._handle_pulse_document(
            company=self.company,
            pulse_type="team",
            content="Test pulse content",
            user_id=self.interviewer.id
        )
        
        # Assertions
        self.assertEqual(len(result), 3)  # Should return 3 items
        final_report, embedding_text, blocks_list = result
        
        self.assertEqual(final_report, "\n\nTest section content")
        self.assertEqual(embedding_text, "\n\nTest section content")
        self.assertEqual(len(blocks_list), 1)
        self.assertEqual(blocks_list[0]['type'], 'text')
        
        # Verify mock calls
        mock_pulse_get.assert_called_once_with(type="team", company=self.company)
        mock_forms_filter.assert_called_once()
        mock_transcription_filter.assert_called_once()
        mock_get_object_context.assert_called_once_with(obj=self.company, object_type="company")
        self.assertEqual(mock_process_ai_request.call_count, 6)

    @patch('services.intelligence.retrieve_service.get_metrics_context')
    @patch('services.intelligence.retrieve_service.get_metrics')
    @patch('services.intelligence.retrieve_service.expansive_context_search')
    @patch('services.intelligence.ai_service.get_people_analytics')
    @patch('services.intelligence.ai_service.get_recommended_charts')
    @patch('services.intelligence.logger')
    def test_get_people_analytics(self, mock_logger, mock_get_recommended_charts,
                                 mock_get_people_analytics, mock_expansive_context_search,
                                 mock_get_metrics, mock_get_metrics_context):
        """Test the get_people_analytics static method."""
        # Set up mocks
        mock_get_metrics_context.return_value = {
            'metrics': [
                {'name': 'metric1', 'value': 10},
                {'name': 'metric2', 'value': 20},
                {'name': 'metric1', 'value': 15},
                {'name': 'metric3', 'value': 30},
                # Add more to meet the minimum requirements
                {'name': 'metric4', 'value': 40},
                {'name': 'metric5', 'value': 50},
                {'name': 'metric6', 'value': 60},
                {'name': 'metric7', 'value': 70},
                {'name': 'metric8', 'value': 80},
                {'name': 'metric9', 'value': 90},
                {'name': 'metric10', 'value': 100},
                {'name': 'metric11', 'value': 110},
                {'name': 'metric12', 'value': 120},
            ]
        }
        mock_expansive_context_search.return_value = "Test context"
        mock_get_people_analytics.return_value = {"key": "value"}
        mock_get_recommended_charts.return_value = {"charts": ["chart1", "chart2"]}
        
        # Test normal flow
        result = IntelligenceService.get_people_analytics(
            user_input="Test query",
            company=self.company,
            data_index="test_index",
            peer_context="Test peer context",
            card=False
        )
        
        # Assertions
        self.assertEqual(result, {"key": "value"})
        
        # Verify mock calls
        mock_get_metrics_context.assert_called_once()
        mock_expansive_context_search.assert_called_once()
        mock_get_people_analytics.assert_called_once()
        mock_get_recommended_charts.assert_not_called()
        
        # Reset mocks
        mock_get_metrics_context.reset_mock()
        mock_expansive_context_search.reset_mock()
        mock_get_people_analytics.reset_mock()
        
        # Test with card=True
        result = IntelligenceService.get_people_analytics(
            user_input="Test query",
            company=self.company,
            data_index="test_index",
            peer_context="Test peer context",
            card=True
        )
        
        # Assertions
        self.assertEqual(result, {"charts": ["chart1", "chart2"]})
        
        # Verify mock calls
        mock_get_metrics_context.assert_called_once()
        mock_expansive_context_search.assert_called_once()
        mock_get_people_analytics.assert_not_called()
        mock_get_recommended_charts.assert_called_once()
        
        # Test fallback path
        mock_get_metrics_context.reset_mock()
        mock_expansive_context_search.reset_mock()
        mock_get_people_analytics.reset_mock()
        mock_get_recommended_charts.reset_mock()
        
        # Set up for fallback
        mock_get_metrics_context.return_value = {
            'metrics': [
                {'name': 'metric1', 'value': 10},
                {'name': 'metric2', 'value': 20},
            ]
        }
        
        # Mock fallback metrics
        mock_metric = MagicMock()
        mock_metric.object_id = "test_id"
        mock_metric.name = "test_metric"
        mock_metric.value = 100
        mock_metric.timestamp = timezone.now()
        mock_metric.company = self.company
        mock_metric.properties = {"tag": "client"}
        
        # Create enough metrics to meet the minimum requirements
        fallback_metrics = [mock_metric] * 10
        mock_get_metrics.return_value = fallback_metrics
        
        # Test with fallback
        result = IntelligenceService.get_people_analytics(
            user_input="Test query",
            company=self.company,
            data_index="test_index",
            peer_context=None,
            card=False
        )
        
        # Assertions
        self.assertEqual(result, {"key": "value"})
        
        # Verify mock calls
        mock_get_metrics_context.assert_called_once()
        mock_get_metrics.assert_called_once()
        mock_expansive_context_search.assert_called_once()
        mock_get_people_analytics.assert_called_once()

    @patch('services.intelligence.timezone')
    @patch('services.intelligence.ContentType.objects.get_for_model')
    @patch('services.intelligence.Qualification.objects.filter')
    @patch('services.intelligence.Metric.objects.filter')
    @patch('services.intelligence.Instructions.objects.filter')
    @patch('services.intelligence.ai_service.get_qualification_score')
    @patch('services.intelligence.Metric.objects.delete')
    @patch('services.intelligence.metrics_service.record_metric')
    @patch('services.intelligence.logger')
    def test_qualification_score_cdq(self, mock_logger, mock_record_metric, mock_delete,
                                    mock_get_qualification_score, mock_instructions_filter,
                                    mock_metric_filter, mock_qualification_filter,
                                    mock_get_for_model, mock_timezone):
        """Test the qualification_score_cdq static method."""
        # Set up mocks
        mock_now = timezone.now()
        mock_timezone.now.return_value = mock_now
        
        # Mock ContentType
        mock_content_type = MagicMock()
        mock_get_for_model.return_value = mock_content_type
        
        # Mock qualifications
        mock_qualification = MagicMock()
        mock_qualification.id = uuid.uuid4()
        mock_qualification.stages = MagicMock()
        mock_qualification.stages.name = "Interview"
        mock_qualification.job = MagicMock()
        mock_qualification.job.company = self.company
        mock_qualification.candidate = MagicMock()
        mock_qualification.candidate.user = self.candidate
        mock_qualification_filter.return_value = [mock_qualification]
        
        # Mock metrics
        mock_metric = MagicMock()
        mock_metric.timestamp = mock_now - timedelta(hours=25)  # Older than 24 hours
        mock_metric.properties = {"qualification_stage": "Applied"}
        mock_metric_filter.return_value.order_by.return_value.first.return_value = mock_metric
        
        # Mock instructions
        mock_instruction = MagicMock()
        mock_instruction.instructions = "Test instructions"
        mock_instructions_filter.return_value.first.return_value = mock_instruction
        
        # Mock AI response
        mock_get_qualification_score.return_value = {
            "qualification_score": 85,
            "reasoning": "Test reasoning",
            "assumptions": "Test assumptions",
            "hypothesis": "Test hypothesis",
            "insights": "Test insights"
        }
        
        # Call the method
        result = IntelligenceService.qualification_score_cdq()
        
        # Assertions
        self.assertEqual(result, {"detail": "Qualification scores update process completed."})
        
        # Verify mock calls
        mock_qualification_filter.assert_called_once_with(job__isnull=False, stages__isnull=False)
        mock_metric_filter.assert_called_once()
        mock_instructions_filter.assert_called_once()
        mock_get_qualification_score.assert_called_once()
        mock_delete.assert_called_once()
        mock_record_metric.assert_called_once()

    @patch('services.intelligence.IntelligenceService.retrieve_service.get_network')
    @patch('services.intelligence.IntelligenceService.ai_service.create_network_connection')
    @patch('django.contrib.contenttypes.models.ContentType.objects.get_for_model')
    @patch('services.intelligence.Network.objects.create')
    def test_create_network_between_nodes(self, mock_network_create, mock_get_for_model,
                                         mock_create_network_connection, mock_get_network):
        """Test the create_network_between_nodes method."""
        # Set up mocks
        mock_get_network.return_value = "Existing network data"
        mock_create_network_connection.return_value = {
            "connection": "Test connection",
            "reference": "Test reference"
        }
        
        # Mock ContentType
        mock_content_type = MagicMock()
        mock_get_for_model.return_value = mock_content_type
        
        # Mock Network
        mock_network = MagicMock()
        mock_network_create.return_value = mock_network
        
        # Call the method
        result = self.intelligence_service.create_network_between_nodes(
            node_a=self.candidate,
            node_b=self.company,
            network_interaction="Test interaction"
        )
        
        # Assertions
        self.assertEqual(result, mock_network)
        
        # Verify mock calls
        mock_get_network.assert_called_once_with(targets=[self.candidate, self.company])
        mock_create_network_connection.assert_called_once_with(
            network_context="Test interactionExisting network data"
        )
        mock_get_for_model.assert_called_once_with(self.company)
        mock_network_create.assert_called_once_with(
            connector=self.candidate,
            content_type=mock_content_type,
            object_id=self.company.id,
            connection="Test connection",
            reference="Test reference"
        )
        
        # Test with no existing network
        mock_get_network.reset_mock()
        mock_create_network_connection.reset_mock()
        mock_get_for_model.reset_mock()
        mock_network_create.reset_mock()
        
        mock_get_network.return_value = None
        
        # Call the method again
        result = self.intelligence_service.create_network_between_nodes(
            node_a=self.candidate,
            node_b=self.company,
            network_interaction="Test interaction"
        )
        
        # Assertions
        self.assertEqual(result, mock_network)
        
        # Verify mock calls
        mock_get_network.assert_called_once_with(targets=[self.candidate, self.company])
        mock_create_network_connection.assert_called_once_with(
            network_context="Test interaction"
        )
        
        # Test with invalid AI response
        mock_get_network.reset_mock()
        mock_create_network_connection.reset_mock()
        
        mock_create_network_connection.return_value = {}
        
        # Call the method and expect an exception
        with self.assertRaises(Exception):
            self.intelligence_service.create_network_between_nodes(
                node_a=self.candidate,
                node_b=self.company,
                network_interaction="Test interaction"
            )

    @patch('services.intelligence.Network.objects.filter')
    @patch('services.intelligence.IntelligenceService.ai_service.global_cdqo')
    @patch('services.intelligence.IntelligenceService.retrieve_service.get_network')
    @patch('services.intelligence.IntelligenceService.ai_service.create_network_connection')
    @patch('django.contrib.contenttypes.models.ContentType.objects.get_for_model')
    @patch('services.intelligence.Network.objects.create')
    def test_create_or_update_network_between_nodes(self, mock_network_create, mock_get_for_model,
                                                  mock_create_network_connection, mock_get_network,
                                                  mock_global_cdqo, mock_network_filter):
        """Test the create_or_update_network_between_nodes method."""
        # Test case 1: Network doesn't exist, should create a new one
        mock_network_filter.return_value.first.return_value = None
        mock_get_network.return_value = "Existing network data"
        mock_create_network_connection.return_value = {
            "connection": "Test connection",
            "reference": "Test reference"
        }
        
        # Mock ContentType
        mock_content_type = MagicMock()
        mock_get_for_model.return_value = mock_content_type
        
        # Mock Network
        mock_network = MagicMock()
        mock_network_create.return_value = mock_network
        
        # Call the method
        result = self.intelligence_service.create_or_update_network_between_nodes(
            node_a=self.candidate,
            node_b=self.company,
            network_interaction="Test interaction"
        )
        
        # Assertions
        self.assertEqual(result, mock_network)
        
        # Verify mock calls
        mock_network_filter.assert_called_once()
        mock_get_network.assert_called_once_with(targets=[self.candidate, self.company])
        mock_create_network_connection.assert_called_once_with(
            network_context="Test interactionExisting network data"
        )
        mock_get_for_model.assert_called_once_with(self.company)
        mock_network_create.assert_called_once_with(
            connector=self.candidate,
            content_type=mock_content_type,
            object_id=self.company.id,
            connection="Test connection",
            reference="Test reference"
        )
        
        # Test case 2: Network exists, should update it
        mock_network_filter.reset_mock()
        mock_get_network.reset_mock()
        mock_create_network_connection.reset_mock()
        mock_get_for_model.reset_mock()
        mock_network_create.reset_mock()
        
        # Mock existing network
        existing_network = MagicMock()
        existing_network.connection = "Old connection"
        existing_network.reference = "Old reference"
        mock_network_filter.return_value.first.return_value = existing_network
        
        # Mock global_cdqo response
        mock_global_cdqo.return_value = "Updated connection information"
        
        # Call the method
        result = self.intelligence_service.create_or_update_network_between_nodes(
            node_a=self.candidate,
            node_b=self.company,
            network_interaction="New interaction"
        )
        
        # Assertions
        self.assertEqual(result, existing_network)
        self.assertEqual(existing_network.connection, "Updated connection information")
        
        # Verify mock calls
        mock_network_filter.assert_called_once()
        mock_global_cdqo.assert_called_once_with(
            "Existing connection: Old connection\nExisting reference: Old reference\nNew interaction: New interaction"
        )
        
        # Verify save was called
        existing_network.save.assert_called_once()
