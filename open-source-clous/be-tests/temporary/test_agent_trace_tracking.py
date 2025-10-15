#!/usr/bin/env python3
"""
Test script for agent trace tracking functionality.
This test verifies that AICall records are properly created and updated during agent runs.
"""

import pytest
import asyncio
import uuid
from unittest.mock import Mock, patch, MagicMock
from django.test import TestCase

# Setup Django before imports
import os
import sys
import django
from django.conf import settings

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

if not settings.configured:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    django.setup()

from services.autonomy.agents import AgentService
from services.context.tool import ToolContext
from services.context.llm import LLMContext
from engineering.models import AICall
from users.models import User, Company


class TestAgentTraceTracking(TestCase):
    """Test agent trace tracking functionality."""
    
    def setUp(self):
        """Set up test data."""
        self.agent_service = AgentService()
        
        # Create test company and user
        self.company = Company.objects.create(
            name="Test Company",
            website="https://testcompany.com"
        )
        
        self.user = User.objects.create(
            email="test@testcompany.com",
            first_name="Test",
            last_name="User",
            company=self.company
        )
        
        # Create test context
        self.tool_context = ToolContext(
            user_id=str(self.user.id),
            company_id=str(self.company.id),
            conversation_id=str(uuid.uuid4()),
            trace_id=f"trace_{uuid.uuid4()}"
        )
        
        self.llm_context = LLMContext()
    
    @patch('services.autonomy.agents.Runner.run_streamed')
    @patch('services.autonomy.agents.Agent')
    def test_ai_call_creation_and_update_success(self, mock_agent_class, mock_run_streamed):
        """Test that AICall is created before agent run and updated after completion."""
        
        # Mock agent
        mock_agent = MagicMock()
        mock_agent.name = "Test Agent"
        mock_agent.model = "gpt-4o"
        mock_agent.instructions = "Test instructions"
        mock_agent_class.return_value = mock_agent
        
        # Mock successful result
        mock_result = MagicMock()
        mock_result.trace.trace_id = "trace_actual_from_openai"
        mock_result.raw_responses = [
            MagicMock(usage=MagicMock(prompt_tokens=100, completion_tokens=50))
        ]
        mock_result.stream_events.return_value = iter([])  # Empty stream for simplicity
        mock_result.is_complete = True
        mock_run_streamed.return_value = mock_result
        
        # Count AICall records before
        initial_count = AICall.objects.count()
        
        # Run the agent
        result = asyncio.run(self.agent_service.process_agent_streamed(
            agent=mock_agent,
            messages=[{"role": "user", "content": "Test message"}],
            context=self.tool_context,
            llm_ctx=self.llm_context,
            websocket_group="test_group"
        ))
        
        # Verify AICall was created
        final_count = AICall.objects.count()
        self.assertEqual(final_count, initial_count + 1)
        
        # Get the created AICall
        ai_call = AICall.objects.latest('created_at')
        
        # Verify initial AICall data
        self.assertEqual(ai_call.model_name, "gpt-4o")
        self.assertEqual(ai_call.provider, AICall.Provider.OPENAI)
        self.assertEqual(ai_call.call_type, AICall.CallType.CHAT)
        self.assertEqual(ai_call.user_id, self.user.id)
        self.assertEqual(ai_call.company_id, self.company.id)
        self.assertEqual(ai_call.conversation_id, self.tool_context.conversation_id)
        self.assertEqual(ai_call.status, AICall.Status.SUCCEEDED)
        
        # Verify trace ID was updated to actual OpenAI trace ID
        self.assertEqual(ai_call.provider_call_id, "trace_actual_from_openai")
        
        # Verify metadata contains expected information
        metadata = ai_call.metadata
        self.assertIsNotNone(metadata)
        self.assertEqual(metadata['agent_name'], "Test Agent")
        self.assertEqual(metadata['agent_instructions'], "Test instructions")
        self.assertEqual(metadata['actual_trace_id'], "trace_actual_from_openai")
        self.assertTrue(metadata['is_agent_call'])
        self.assertTrue(metadata['workflow_completed'])
        
        # Verify token usage was recorded
        self.assertEqual(ai_call.prompt_tokens, 100)
        self.assertEqual(ai_call.completion_tokens, 50)
        self.assertIsNotNone(ai_call.latency_ms)
    
    @patch('services.autonomy.agents.Runner.run_streamed')
    @patch('services.autonomy.agents.Agent')
    def test_ai_call_failure_tracking(self, mock_agent_class, mock_run_streamed):
        """Test that AICall is marked as failed when agent run fails."""
        
        # Mock agent
        mock_agent = MagicMock()
        mock_agent.name = "Test Agent"
        mock_agent.model = "gpt-4o"
        mock_agent.instructions = "Test instructions"
        mock_agent_class.return_value = mock_agent
        
        # Mock exception during run
        mock_run_streamed.side_effect = Exception("Test error")
        
        # Count AICall records before
        initial_count = AICall.objects.count()
        
        # Run the agent (expecting it to fail)
        with self.assertRaises(Exception):
            asyncio.run(self.agent_service.process_agent_streamed(
                agent=mock_agent,
                messages=[{"role": "user", "content": "Test message"}],
                context=self.tool_context,
                llm_ctx=self.llm_context,
                websocket_group="test_group"
            ))
        
        # Verify AICall was created
        final_count = AICall.objects.count()
        self.assertEqual(final_count, initial_count + 1)
        
        # Get the created AICall
        ai_call = AICall.objects.latest('created_at')
        
        # Verify AICall was marked as failed
        self.assertEqual(ai_call.status, AICall.Status.FAILED)
        self.assertIsNotNone(ai_call.error_trace)
        self.assertIn("Test error", ai_call.error_trace)
        self.assertIsNotNone(ai_call.latency_ms)
    
    def test_traces_api_endpoint(self):
        """Test the traces API endpoint returns correct data."""
        
        # Create a test AICall for an agent
        ai_call = AICall.objects.create(
            model_name="gpt-4o",
            provider=AICall.Provider.OPENAI,
            call_type=AICall.CallType.CHAT,
            provider_call_id="trace_test_123",
            user_id=self.user.id,
            company_id=self.company.id,
            conversation_id=str(uuid.uuid4()),
            status=AICall.Status.SUCCEEDED,
            request_json=[{"role": "user", "content": "Test"}],
            response_json="Test response",
            metadata={
                'agent_name': 'Test Agent',
                'actual_trace_id': 'trace_actual_456',
                'is_agent_call': True,
                'workflow_completed': True
            }
        )
        
        # Test the traces endpoint
        from rest_framework.test import APIClient
        client = APIClient()
        client.force_authenticate(user=self.user)
        
        response = client.get('/api/engineering/aicalls/traces/')
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify response structure
        self.assertIn('traces', data)
        self.assertIn('count', data)
        self.assertEqual(data['count'], 1)
        
        # Verify trace data
        trace = data['traces'][0]
        self.assertEqual(trace['id'], str(ai_call.id))
        self.assertIn('trace_info', trace)
        
        trace_info = trace['trace_info']
        self.assertEqual(trace_info['trace_id'], 'trace_test_123')
        self.assertEqual(trace_info['actual_trace_id'], 'trace_actual_456')
        self.assertEqual(trace_info['agent_name'], 'Test Agent')
        self.assertTrue(trace_info['is_agent_call'])
        self.assertIn('openai_trace_url', trace_info)
    
    def test_trace_detail_api_endpoint(self):
        """Test the trace detail API endpoint returns comprehensive data."""
        
        # Create a test AICall for an agent
        ai_call = AICall.objects.create(
            model_name="gpt-4o",
            provider=AICall.Provider.OPENAI,
            call_type=AICall.CallType.CHAT,
            provider_call_id="trace_test_123",
            user_id=self.user.id,
            company_id=self.company.id,
            conversation_id=str(uuid.uuid4()),
            status=AICall.Status.SUCCEEDED,
            request_json=[{"role": "user", "content": "Test"}],
            response_json="Test response",
            metadata={
                'agent_name': 'Test Agent',
                'agent_instructions': 'Test instructions',
                'actual_trace_id': 'trace_actual_456',
                'thread_id': 'thread_789',
                'workflow_config': {'test': True},
                'is_agent_call': True,
                'workflow_completed': True
            }
        )
        
        # Test the trace detail endpoint
        from rest_framework.test import APIClient
        client = APIClient()
        client.force_authenticate(user=self.user)
        
        response = client.get(f'/api/engineering/aicalls/{ai_call.id}/trace_detail/')
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify response structure
        self.assertIn('trace_detail', data)
        
        trace_detail = data['trace_detail']
        self.assertEqual(trace_detail['trace_id'], 'trace_test_123')
        self.assertEqual(trace_detail['actual_trace_id'], 'trace_actual_456')
        self.assertEqual(trace_detail['agent_name'], 'Test Agent')
        self.assertEqual(trace_detail['agent_instructions'], 'Test instructions')
        self.assertEqual(trace_detail['thread_id'], 'thread_789')
        self.assertEqual(trace_detail['workflow_config'], {'test': True})
        self.assertTrue(trace_detail['is_agent_call'])
        self.assertTrue(trace_detail['workflow_completed'])
        self.assertTrue(trace_detail['can_poll_openai'])
        self.assertIn('openai_trace_url', trace_detail)


if __name__ == '__main__':
    # Run the tests
    import unittest
    unittest.main() 