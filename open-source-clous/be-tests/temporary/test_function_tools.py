#!/usr/bin/env python3

import os
import sys
import django
from typing import Any

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cloush.settings')
django.setup()

# Test importing the function_tools module
try:
    print("Attempting to import function_tools...")
    from services.tools.function_tools import FUNCTION_TOOLS
    print(f"Import successful! Found {len(FUNCTION_TOOLS)} function tools.")
    
    # Print the names of the function tools
    for i, tool in enumerate(FUNCTION_TOOLS):
        print(f"  {i+1}. {getattr(tool, 'display_name', tool.__name__)}")
    
    print("\nSuccess! The fix for Pydantic model config is working.")
    
except Exception as e:
    print(f"Error importing function_tools: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1) 