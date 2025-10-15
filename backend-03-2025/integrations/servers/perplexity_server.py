"""
Advanced MCP Client for Perplexity AI Integration.
This client provides a sophisticated interface for interacting with Perplexity AI services
through the Model Context Protocol (MCP).
"""

import json
import logging
import asyncio
import re
from typing import Dict, Any, List, Optional, Union, Tuple, Callable, Awaitable
from functools import wraps
from datetime import datetime, timedelta

from django.conf import settings

logger = logging.getLogger(__name__)

# Type definitions for better type hinting
MCPResult = Dict[str, Any]
MCPToolFunction = Callable[..., Union[str, Dict[str, Any]]]
AsyncMCPToolFunction = Callable[..., Awaitable[Union[str, Dict[str, Any]]]]

class PerplexityServerError(Exception):
    """Exception raised for Perplexity server errors."""
    pass

def handle_result(func):
    """
    Decorator to standardize result handling for MCP tool functions.
    Parses JSON strings and handles errors consistently.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            result = func(*args, **kwargs)
            
            # If result is already a dict, return it
            if isinstance(result, dict):
                return result
                
            # If result is a string, try to parse it as JSON
            if isinstance(result, str):
                try:
                    return json.loads(result)
                except json.JSONDecodeError:
                    # If it's not valid JSON, return it as text content
                    return {"text": result, "ok": True}
            
            return result
        except Exception as e:
            logger.exception(f"Error in {func.__name__}: {str(e)}")
            return {"error": str(e), "ok": False}
    
    return wrapper

async def async_handle_result(func):
    """
    Decorator to standardize result handling for async MCP tool functions.
    Parses JSON strings and handles errors consistently.
    """
    @wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            result = await func(*args, **kwargs)
            
            # If result is already a dict, return it
            if isinstance(result, dict):
                return result
                
            # If result is a string, try to parse it as JSON
            if isinstance(result, str):
                try:
                    return json.loads(result)
                except json.JSONDecodeError:
                    # If it's not valid JSON, return it as text content
                    return {"text": result, "ok": True}
            
            return result
        except Exception as e:
            logger.exception(f"Error in {func.__name__}: {str(e)}")
            return {"error": str(e), "ok": False}
    
    return wrapper

class PerplexityServer:
    """
    Server for interacting with Perplexity AI API through MCP.
    Provides methods for advanced question answering and research capabilities.
    """
    
    # Available Perplexity models
    MODELS = {
        "sonar-small-online": "Cost-effective model with real-time web search",
        "sonar-medium-online": "Balanced model with enhanced comprehension and online search",
        "sonar-large-online": "Advanced model with superior reasoning and online search",
        "sonar-small-chat": "Cost-effective model for chat-based interactions (no search)",
        "sonar-medium-chat": "Balanced model for chat-based interactions (no search)",
        "sonar-large-chat": "Advanced model for complex chat-based interactions (no search)",
        "mixtral-8x7b-instruct": "Powerful open-source model with strong reasoning capabilities",
        "llama-3-70b-instruct": "Latest LLaMA model with excellent instruction following",
        "claude-3-opus-20240229": "Anthropic's most capable model with strong reasoning",
        "claude-3-sonnet-20240229": "Balanced Anthropic model for general use cases",
        "claude-3-haiku-20240307": "Fast and efficient Anthropic model",
        "gpt-4-turbo": "OpenAI's most capable model with broad knowledge",
        "gpt-3.5-turbo": "Faster OpenAI model for routine tasks",
        "gemini-1.5-pro": "Google's most capable model with multimodal capabilities",
        "gemini-pro": "Google's balanced model for general use cases"
    }
    
    # Default model to use
    DEFAULT_MODEL = "sonar-medium-online"
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize the Perplexity client.
        
        Args:
            api_key: Optional API key to override settings.PERPLEXITY_API_KEY
        """
        self.api_key = api_key or getattr(settings, 'PERPLEXITY_API_KEY', None)
        if not self.api_key:
            logger.warning("Perplexity API key not provided and not found in settings")
            
        self.base_url = "https://api.perplexity.ai"
        
    async def _make_api_request(self, endpoint: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Make an asynchronous request to the Perplexity API.
        
        Args:
            endpoint: The API endpoint (relative to base URL)
            data: The request payload
            
        Returns:
            The JSON response as a dictionary
        """
        import aiohttp
        
        if not self.api_key:
            raise PerplexityServerError("Perplexity API key is required but not provided")
        
        url = f"{self.base_url}/{endpoint}"
        headers = {
            "Content-Type": "application/json", 
            "Authorization": f"Bearer {self.api_key}"
        }
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url, json=data, headers=headers) as response:
                    if response.status != 200:
                        error_text = await response.text()
                        raise PerplexityServerError(
                            f"Perplexity API error: {response.status} {response.reason}\n{error_text}")
                    
                    return await response.json()
        except aiohttp.ClientError as e:
            raise PerplexityServerError(f"Network error while calling Perplexity API: {str(e)}")
        except json.JSONDecodeError as e:
            raise PerplexityServerError(f"Failed to parse JSON response from Perplexity API: {str(e)}")

    def _make_sync_api_request(self, endpoint: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Make a synchronous request to the Perplexity API.
        
        Args:
            endpoint: The API endpoint (relative to base URL)
            data: The request payload
            
        Returns:
            The JSON response as a dictionary
        """
        import requests
        
        if not self.api_key:
            raise PerplexityServerError("Perplexity API key is required but not provided")
        
        url = f"{self.base_url}/{endpoint}"
        headers = {
            "Content-Type": "application/json", 
            "Authorization": f"Bearer {self.api_key}"
        }
        
        try:
            response = requests.post(url, json=data, headers=headers)
            if response.status_code != 200:
                raise PerplexityServerError(
                    f"Perplexity API error: {response.status_code} {response.reason}\n{response.text}")
            
            return response.json()
        except requests.RequestException as e:
            raise PerplexityServerError(f"Network error while calling Perplexity API: {str(e)}")
        except json.JSONDecodeError as e:
            raise PerplexityServerError(f"Failed to parse JSON response from Perplexity API: {str(e)}")
    
    @handle_result
    def ask(self, query: str, model: str = None, temperature: float = 0.7, 
            max_tokens: int = 1024, include_citations: bool = True) -> MCPResult:
        """
        Ask a question to Perplexity AI (synchronous version).
        
        Args:
            query: The question or prompt to send to Perplexity
            model: The model to use (defaults to DEFAULT_MODEL)
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum number of tokens to generate
            include_citations: Whether to include citations in the response
            
        Returns:
            Dictionary with the Perplexity response
        """
        model = model or self.DEFAULT_MODEL
        
        payload = {
            "model": model,
            "messages": [{"role": "user", "content": query}],
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        response = self._make_sync_api_request("chat/completions", payload)
        
        # Extract the main content
        message_content = response["choices"][0]["message"]["content"]
        
        # Format the response with citations if available and requested
        formatted_response = {
            "text": message_content,
            "model": model,
            "ok": True
        }
        
        if include_citations and "citations" in response and response["citations"]:
            citations = response["citations"]
            formatted_response["citations"] = citations
            
            # Add citations to the text for easier consumption
            citation_text = "\n\nCitations:\n"
            for i, citation in enumerate(citations):
                citation_text += f"[{i+1}] {citation}\n"
            
            formatted_response["text_with_citations"] = message_content + citation_text
        
        return formatted_response
    
    @async_handle_result
    async def ask_async(self, query: str, model: str = None, temperature: float = 0.7, 
                       max_tokens: int = 1024, include_citations: bool = True) -> MCPResult:
        """
        Ask a question to Perplexity AI (asynchronous version).
        
        Args:
            query: The question or prompt to send to Perplexity
            model: The model to use (defaults to DEFAULT_MODEL)
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum number of tokens to generate
            include_citations: Whether to include citations in the response
            
        Returns:
            Dictionary with the Perplexity response
        """
        model = model or self.DEFAULT_MODEL
        
        payload = {
            "model": model,
            "messages": [{"role": "user", "content": query}],
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        response = await self._make_api_request("chat/completions", payload)
        
        # Extract the main content
        message_content = response["choices"][0]["message"]["content"]
        
        # Format the response with citations if available and requested
        formatted_response = {
            "text": message_content,
            "model": model,
            "ok": True
        }
        
        if include_citations and "citations" in response and response["citations"]:
            citations = response["citations"]
            formatted_response["citations"] = citations
            
            # Add citations to the text for easier consumption
            citation_text = "\n\nCitations:\n"
            for i, citation in enumerate(citations):
                citation_text += f"[{i+1}] {citation}\n"
            
            formatted_response["text_with_citations"] = message_content + citation_text
        
        return formatted_response
    
    @handle_result
    def chat(self, messages: List[Dict[str, str]], model: str = None, 
            temperature: float = 0.7, max_tokens: int = 1024) -> MCPResult:
        """
        Have a multi-turn conversation with Perplexity AI (synchronous version).
        
        Args:
            messages: List of message dictionaries with 'role' and 'content' keys
            model: The model to use (defaults to DEFAULT_MODEL)
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum number of tokens to generate
            
        Returns:
            Dictionary with the Perplexity response
        """
        model = model or self.DEFAULT_MODEL
        
        # Validate messages format
        for msg in messages:
            if not isinstance(msg, dict) or 'role' not in msg or 'content' not in msg:
                raise PerplexityServerError("Each message must be a dictionary with 'role' and 'content' keys")
            
            if msg['role'] not in ['system', 'user', 'assistant']:
                raise PerplexityServerError("Message role must be 'system', 'user', or 'assistant'")
        
        payload = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        response = self._make_sync_api_request("chat/completions", payload)
        
        # Format the response
        formatted_response = {
            "text": response["choices"][0]["message"]["content"],
            "model": model,
            "ok": True
        }
        
        # Include the full response for advanced uses
        formatted_response["full_response"] = response
        
        return formatted_response
    
    @async_handle_result
    async def chat_async(self, messages: List[Dict[str, str]], model: str = None, 
                        temperature: float = 0.7, max_tokens: int = 1024) -> MCPResult:
        """
        Have a multi-turn conversation with Perplexity AI (asynchronous version).
        
        Args:
            messages: List of message dictionaries with 'role' and 'content' keys
            model: The model to use (defaults to DEFAULT_MODEL)
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum number of tokens to generate
            
        Returns:
            Dictionary with the Perplexity response
        """
        model = model or self.DEFAULT_MODEL
        
        # Validate messages format
        for msg in messages:
            if not isinstance(msg, dict) or 'role' not in msg or 'content' not in msg:
                raise PerplexityServerError("Each message must be a dictionary with 'role' and 'content' keys")
            
            if msg['role'] not in ['system', 'user', 'assistant']:
                raise PerplexityServerError("Message role must be 'system', 'user', or 'assistant'")
        
        payload = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        response = await self._make_api_request("chat/completions", payload)
        
        # Format the response
        formatted_response = {
            "text": response["choices"][0]["message"]["content"],
            "model": model,
            "ok": True
        }
        
        # Include the full response for advanced uses
        formatted_response["full_response"] = response
        
        return formatted_response
    
    @handle_result
    def research(self, query: str, model: str = None, temperature: float = 0.7, 
                max_tokens: int = 2048, focus_level: int = 3) -> MCPResult:
        """
        Perform in-depth research on a topic using an online model.
        
        Args:
            query: The research question or topic
            model: The model to use (must be an online model)
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum number of tokens to generate
            focus_level: Level of focus on the query (1-5, with 5 being most focused)
            
        Returns:
            Dictionary with the research results and citations
        """
        # Ensure we're using an online model for research
        if model and not model.endswith('-online'):
            if model in self.MODELS and not model.endswith('-online'):
                logger.warning(f"Model {model} does not support online search, using {self.DEFAULT_MODEL} instead")
                model = self.DEFAULT_MODEL
        
        model = model or self.DEFAULT_MODEL
        
        # Create a system message that instructs the model to perform in-depth research
        system_message = {
            "role": "system", 
            "content": (
                f"You are a research assistant with access to the web. "
                f"Perform in-depth research on the query with a focus level of {focus_level}/5. "
                f"Be thorough, accurate, and cite your sources. "
                f"For focus level {focus_level}, {'stay very closely focused on the specific query and provide detailed analysis' if focus_level >= 3 else 'provide a broader overview covering related aspects of the query'}. "
                "Organize your findings in a structured manner."
            )
        }
        
        user_message = {"role": "user", "content": query}
        
        payload = {
            "model": model,
            "messages": [system_message, user_message],
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        response = self._make_sync_api_request("chat/completions", payload)
        
        # Extract the content and citations
        message_content = response["choices"][0]["message"]["content"]
        citations = response.get("citations", [])
        
        # Format the research results
        formatted_response = {
            "text": message_content,
            "model": model,
            "citations": citations,
            "ok": True
        }
        
        # Add citations to the text
        if citations:
            citation_text = "\n\nSources:\n"
            for i, citation in enumerate(citations):
                citation_text += f"[{i+1}] {citation}\n"
            
            formatted_response["text_with_citations"] = message_content + citation_text
        
        return formatted_response
    
    @handle_result
    def list_models(self) -> MCPResult:
        """
        List all available Perplexity AI models with descriptions.
        
        Returns:
            Dictionary with the list of models and their descriptions
        """
        return {
            "models": self.MODELS,
            "default_model": self.DEFAULT_MODEL,
            "ok": True
        }