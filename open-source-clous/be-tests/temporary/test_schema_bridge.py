"""
Tests for the schema bridge that converts agent tools to OpenAI schemas.
"""

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")  # Replace with your actual settings module

import django
django.setup()

import unittest
from unittest.mock import patch, MagicMock

from services.tooling.schema_bridge import (
    tool_to_openai_schema,
    tools_to_schemas,
    build_tools_and_dispatch_map,
)
from services.tools import retrieval_tools
from services.tools.retrieval_tools import read_candidate_data


# Create a simple mock function tool for testing
def create_mock_function_tool(name="test_tool"):
    def test_tool(param1: str, param2: int = 42, optional_param: str = None):
        return {"param1": param1, "param2": param2, "optional_param": optional_param}
    mock_tool = MagicMock()
    mock_tool.__name__ = name
    mock_tool.name = name
    mock_tool.description = f"{name} for unit tests."
    mock_tool.__wrapped__ = test_tool
    mock_tool.is_tool = True
    return mock_tool


class TestSchemaBridge(unittest.TestCase):
    def test_tool_to_openai_schema(self):
        # Create a mock function tool
        mock_tool = create_mock_function_tool()
        
        # Convert it to an OpenAI schema
        schema = tool_to_openai_schema(mock_tool)
        
        # Verify the schema structure
        self.assertEqual(schema["type"], "function")
        self.assertEqual(schema["function"]["name"], "test_tool")
        self.assertEqual(schema["function"]["description"], "test_tool for unit tests.")
        
        # Verify the parameters
        params = schema["function"]["parameters"]
        self.assertEqual(params["type"], "object")
        
        # Check properties
        properties = params["properties"]
        self.assertIn("param1", properties)
        self.assertIn("param2", properties)
        self.assertIn("optional_param", properties)
        
        # Check types
        self.assertEqual(properties["param1"]["type"], "string")
        self.assertEqual(properties["param2"]["type"], "integer")
        
        # Check required parameters
        self.assertIn("param1", params["required"])
        self.assertNotIn("optional_param", params["required"])
    
    def test_tools_to_schemas(self):
        # Create multiple mock tools
        mock_tools = [create_mock_function_tool() for _ in range(3)]
        
        # Convert them to schemas
        schemas = tools_to_schemas(mock_tools)
        
        # Verify the result
        self.assertEqual(len(schemas), 3)
        for schema in schemas:
            self.assertEqual(schema["type"], "function")
            self.assertEqual(schema["function"]["name"], "test_tool")
    
    def test_build_tools_and_dispatch_map(self):
        # Create multiple mock tools with unique names
        mock_tools = [create_mock_function_tool(f"test_tool_{i}") for i in range(3)]
        schemas, dispatch_map = build_tools_and_dispatch_map(mock_tools)
        self.assertEqual(len(schemas), 3)
        self.assertEqual(len(dispatch_map), 3)
        for i in range(3):
            self.assertIn(f"test_tool_{i}", dispatch_map)
            result = dispatch_map[f"test_tool_{i}"]( "test", 99)
            self.assertEqual(result["param1"], "test")
            self.assertEqual(result["param2"], 99)

    def test_build_tools_and_dispatch_map_with_real_tool(self):
        # Use a real function from retrieval_tools
        from services.tools.retrieval_tools import RETRIEVAL_TOOLS
        real_tool = next(t for t in RETRIEVAL_TOOLS if getattr(t, 'name', None) == 'read_candidate_data')
        schemas, dispatch_map = build_tools_and_dispatch_map([real_tool])

        schemas, dispatch_map = build_tools_and_dispatch_map([real_tool])
        self.assertEqual(len(schemas), 1)
        self.assertEqual(len(dispatch_map), 1)
        self.assertIn("read_candidate_data", dispatch_map)
        # Optionally, check schema structure
        schema = schemas[0]
        self.assertEqual(schema["type"], "function")
        self.assertEqual(schema["function"]["name"], "read_candidate_data")


if __name__ == "__main__":
    unittest.main() 