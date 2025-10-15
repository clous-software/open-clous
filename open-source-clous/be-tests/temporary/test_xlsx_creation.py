#!/usr/bin/env python3
"""
Test script for XLSX file creation functionality.
This script tests the FileCreationService with XLSX file type.
"""

import json
import os
import sys
import django

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from services.file_creation import FileCreationService


def test_xlsx_creation():
    """Test XLSX file creation with different content types."""
    
    # Test 1: JSON array of objects
    print("Test 1: JSON array of objects")
    json_content = json.dumps([
        {"name": "John Doe", "age": 30, "department": "Engineering"},
        {"name": "Jane Smith", "age": 25, "department": "Marketing"},
        {"name": "Bob Johnson", "age": 35, "department": "Sales"}
    ])
    
    service = FileCreationService()
    try:
        file_url = service.create_file(
            content=json_content,
            file_type="xlsx",
            should_improve=False,
            branding_options={
                "title": "Employee Data",
                "author": "HR Department",
                "companyName": "Test Company",
                "publicationDate": "2024-01-15"
            }
        )
        print(f"✅ JSON to XLSX successful: {file_url}")
    except Exception as e:
        print(f"❌ JSON to XLSX failed: {e}")
    
    print()
    
    # Test 2: CSV content
    print("Test 2: CSV content")
    csv_content = """name,age,department,city
John Doe,30,Engineering,New York
Jane Smith,25,Marketing,Los Angeles
Bob Johnson,35,Sales,Chicago
Alice Brown,28,HR,Boston"""
    
    try:
        file_url = service.create_file(
            content=csv_content,
            file_type="xlsx",
            should_improve=False,
            branding_options={
                "title": "Employee Directory",
                "author": "Admin",
                "companyName": "Test Corp"
            }
        )
        print(f"✅ CSV to XLSX successful: {file_url}")
    except Exception as e:
        print(f"❌ CSV to XLSX failed: {e}")
    
    print()
    
    # Test 3: Single JSON object
    print("Test 3: Single JSON object")
    single_object = json.dumps({
        "product": "Laptop",
        "price": 999.99,
        "category": "Electronics",
        "in_stock": True
    })
    
    try:
        file_url = service.create_file(
            content=single_object,
            file_type="xlsx",
            should_improve=False,
            branding_options={
                "title": "Product Info"
            }
        )
        print(f"✅ Single object to XLSX successful: {file_url}")
    except Exception as e:
        print(f"❌ Single object to XLSX failed: {e}")
    
    print()
    
    # Test 4: Plain text (fallback)
    print("Test 4: Plain text fallback")
    text_content = """Line 1: This is some text data
Line 2: Another line of information
Line 3: Final line of the dataset"""
    
    try:
        file_url = service.create_file(
            content=text_content,
            file_type="xlsx",
            should_improve=False
        )
        print(f"✅ Text to XLSX successful: {file_url}")
    except Exception as e:
        print(f"❌ Text to XLSX failed: {e}")


if __name__ == "__main__":
    print("Testing XLSX file creation functionality...")
    print("=" * 50)
    test_xlsx_creation()
    print("=" * 50)
    print("Test completed!") 