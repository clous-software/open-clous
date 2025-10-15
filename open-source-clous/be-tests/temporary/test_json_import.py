"""
This is a minimal test script that only checks if the json module is properly imported
within the gdrive_search function, avoiding Django configuration issues.
"""

import os
import sys
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_json_import():
    """Test that the json module import in gdrive_search works correctly"""
    try:
        # Get the content of the gsuite_tools.py file
        file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 
                               'tools', 'integrations', 'gsuite_tools.py')
        
        logger.info(f"Reading file: {file_path}")
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Find the gdrive_search function
        gdrive_search_start = content.find('@mcp.tool()\ndef gdrive_search')
        if gdrive_search_start == -1:
            logger.error("Could not find gdrive_search function in the file!")
            return False
            
        # Look for the docstring end and function body beginning
        docstring_end = content.find('"""', gdrive_search_start + 100)  # Skip the opening docstring
        if docstring_end == -1:
            logger.error("Could not find end of docstring in gdrive_search function!")
            return False
            
        # Get the first few lines after the docstring
        function_body_start = docstring_end + 4  # Skip the closing """
        function_body = content[function_body_start:function_body_start+50]
        
        logger.info(f"Function body after docstring: {function_body.strip()}")
        
        # Check for import json
        if 'import json' in function_body:
            logger.info("✅ SUCCESS: 'import json' found in gdrive_search function!")
            return True
        else:
            logger.error("❌ FAILED: 'import json' NOT found in gdrive_search function!")
            return False
            
    except Exception as e:
        logger.error(f"Error during test: {e}")
        return False

if __name__ == "__main__":
    success = test_json_import()
    if not success:
        sys.exit(1) 