#!/usr/bin/env python
import os
import sys
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jobs.settings')
django.setup()

from users.models import Company
from services.reports import ReportService

def test_company_learning_report():
    """Test the company-wide learning report generation"""
    
    # Get the first company
    try:
        company = Company.objects.first()
        if not company:
            print("No companies found in the database. Please create a company first.")
            return
        
        print(f"Using company: {company.name} (ID: {company.id})")
        
        # Initialize report service
        report_service = ReportService()
        
        # Generate company learning report
        print("Generating company learning report...")
        insights, embedding, blocks, *extras = report_service._handle_report_document(
            company=company,
            report_type="company_learning",
            content="Generate a comprehensive learning report for the entire company."
        )
        
        print(f"Report generated successfully!")
        print(f"Insights length: {len(insights)}")
        print(f"Blocks: {len(blocks)} blocks generated")
        
        # Print the first few blocks as an example
        if blocks:
            print("\nExample blocks:")
            for idx, block in enumerate(blocks[:3]):
                print(f"Block {idx+1}: {block.get('type')} - {block.get('data', {}).get('text', '')[:100]}...")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_company_learning_report() 