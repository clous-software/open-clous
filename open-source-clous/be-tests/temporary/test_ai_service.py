import pytest
from unittest.mock import patch, Mock
from services.ai import AIService

def test_process_ai_request_gpt_happy_path():
    ai_service = AIService()
    model = "gpt-4o-mini"
    fallback_model = "gpt-4o-mini"
    max_tokens = 100
    temperature = 0.5
    system_prompt = "You are a helpful assistant."
    user_message = "Hello, how are you?"

    # Patch the OpenAI client used in process_ai_request
    with patch("services.ai.client.chat.completions.create") as mock_create:
        mock_response = Mock()
        mock_choice = Mock()
        mock_choice.message.content = "I'm good, thank you!"
        mock_response.choices = [mock_choice]
        mock_create.return_value = mock_response

        result = ai_service.process_ai_request(
            model=model,
            fallback_model=fallback_model,
            max_tokens=max_tokens,
            temperature=temperature,
            system_prompt=system_prompt,
            user_message=user_message,
        )

        assert result == "I'm good, thank you!"
        mock_create.assert_called_once() 