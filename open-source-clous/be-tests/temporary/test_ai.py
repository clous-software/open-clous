import pytest
from unittest.mock import Mock, patch
from typing import List, Optional, Type
from pydantic import BaseModel
import uuid

from services.ai import AIService
from services.middleware.open_graph import OpenGraphService

# Test data
class TestResponseFormat(BaseModel):
    title: str
    description: str

@pytest.fixture
def ai_service():
    return AIService()

@pytest.fixture
def mock_open_graph_service():
    with patch('services.ai.open_graph_service') as mock:
        mock.fetch_open_graph_data.return_value = {
            "title": "Test Title",
            "description": "Test Description",
            "image": "http://test.com/image.jpg",
            "site_name": "Test Site"
        }
        yield mock

def test_process_ai_request(ai_service):
    # Test data
    model = "gpt-4o-mini"
    fallback_model = "gpt-4o-mini"
    max_tokens = 1000
    temperature = 0.7
    system_prompt = "You are a helpful assistant"
    user_message = "Hello, how are you?"
    
    # Mock the necessary methods
    with patch.object(ai_service, 'process_perplexity_request') as mock_perplexity, \
         patch.object(ai_service, 'process_claude_request') as mock_claude:
        
        # Test with default parameters
        result = ai_service.process_ai_request(
            model=model,
            fallback_model=fallback_model,
            max_tokens=max_tokens,
            temperature=temperature,
            system_prompt=system_prompt,
            user_message=user_message
        )
        
        # Verify the calls
        mock_perplexity.assert_not_called()
        mock_claude.assert_called_once()

def test_process_perplexity_request(ai_service):
    # Test data
    model = "sonar"
    messages = [
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Hello"}
    ]
    max_tokens = 1000
    temperature = 0.7
    
    # Mock the API call
    with patch('services.ai.perplexity_client') as mock_client:
        mock_client.chat.completions.create.return_value = Mock(
            choices=[Mock(message=Mock(content="Test response"))]
        )
        
        result = ai_service.process_perplexity_request(
            model=model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature
        )
        
        assert result == "Test response"
        mock_client.chat.completions.create.assert_called_once()

def test_handle_citations(ai_service, mock_open_graph_service):
    # Test data
    urls = ["http://test1.com", "http://test2.com"]
    
    # Test successful citations
    citations = ai_service.handle_citations(urls)
    
    assert len(citations) == 2
    assert all(isinstance(citation, dict) for citation in citations)
    assert all("url" in citation for citation in citations)
    assert all("title" in citation for citation in citations)
    assert all("description" in citation for citation in citations)
    
    # Test error handling
    mock_open_graph_service.fetch_open_graph_data.side_effect = Exception("Test error")
    citations = ai_service.handle_citations(urls)
    
    assert len(citations) == 2
    assert "error" in citations[0]

def test_process_claude_request(ai_service):
    # Test data
    model = "claude-3-opus-20240229"
    messages = [
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Hello"}
    ]
    max_tokens = 1000
    temperature = 0.7
    pipeline_id = uuid.uuid4()
    slug = "test-slug"
    
    # Mock the API call
    with patch('services.ai.anthropic_client') as mock_client:
        mock_client.messages.create.return_value = Mock(
            content=[Mock(text="Test response")]
        )
        
        result = ai_service.process_claude_request(
            model=model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature,
            pipeline=pipeline_id,
            slug=slug
        )
        
        assert result == "Test response"
        mock_client.messages.create.assert_called_once()

def test_process_reasoning(ai_service):
    # Test data
    user_message = "What is the capital of France?"
    system_prompt = "You are a helpful assistant"
    reasoning = "Let me think about this step by step"
    max_tokens = 15000
    temperature = 0.4
    reasoning_effort = "medium"
    provider = "openai"
    
    # Mock the API call
    with patch('services.ai.openai_client') as mock_client:
        mock_client.chat.completions.create.return_value = Mock(
            choices=[Mock(message=Mock(content="Test reasoning"))]
        )
        
        result = ai_service.process_reasoning(
            user_message=user_message,
            system_prompt=system_prompt,
            reasoning=reasoning,
            max_tokens=max_tokens,
            temperature=temperature,
            reasoning_effort=reasoning_effort,
            provider=provider
        )
        
        assert result == "Test reasoning"
        mock_client.chat.completions.create.assert_called_once()

def test_get_reasoning(ai_service):
    # Test data
    system_prompt = "You are a helpful assistant"
    user_message = "What is the capital of France?"
    max_tokens = 16000
    provider = "openai"
    reasoning_effort = "medium"
    
    # Mock the API call
    with patch('services.ai.openai_client') as mock_client:
        mock_client.chat.completions.create.return_value = Mock(
            choices=[Mock(message=Mock(content="Test reasoning"))]
        )
        
        result = ai_service.get_reasoning(
            system_prompt=system_prompt,
            user_message=user_message,
            max_tokens=max_tokens,
            provider=provider,
            reasoning_effort=reasoning_effort
        )
        
        assert result == "Test reasoning"
        mock_client.chat.completions.create.assert_called_once() 