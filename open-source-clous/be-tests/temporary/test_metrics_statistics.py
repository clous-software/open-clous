#!/usr/bin/env python3
"""
Test script for metrics statistics functionality.
This script tests the statistical calculations added to the RetrieveService.
"""

import os
import sys
import django
from django.conf import settings

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from services.retrieve.core import RetrieveService
from users.models import Metric, Company, User
from django.contrib.contenttypes.models import ContentType
import json

def test_metrics_statistics():
    """Test the metrics statistics functionality."""
    
    # Initialize the service
    retrieve_service = RetrieveService()
    
    # Create test data
    company, _ = Company.objects.get_or_create(
        name="Test Company for Statistics",
        defaults={'handle': 'test-stats-company'}
    )
    
    user, _ = User.objects.get_or_create(
        email="test-stats@example.com",
        defaults={'first_name': 'Test', 'last_name': 'User'}
    )
    
    # Create some test metrics with known values for predictable statistics
    test_values = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    
    # Clear any existing test metrics
    Metric.objects.filter(
        company=company,
        name__startswith='test_stat_'
    ).delete()
    
    # Create test metrics
    for i, value in enumerate(test_values):
        Metric.objects.create(
            name=f'test_stat_metric_{i}',
            value=value,
            company=company,
            content_type=ContentType.objects.get_for_model(User),
            object_id=user.id
        )
    
    print(f"Created {len(test_values)} test metrics with values: {test_values}")
    
    # Test the statistics functionality
    filters = {
        'company': company,
        'name__startswith': 'test_stat_'
    }
    
    print("\nTesting metrics retrieval with statistics...")
    result = retrieve_service.get_metrics_data(
        company_id=str(company.id),
        filters=filters,
        include_statistics=True
    )
    
    print(f"Result keys: {list(result.keys())}")
    print(f"Number of metrics: {len(result.get('metrics', []))}")
    
    if 'statistics' in result:
        stats = result['statistics']
        print("\nStatistical Results:")
        print(f"Count: {stats.get('count')}")
        print(f"Mean: {stats.get('mean')}")
        print(f"Median: {stats.get('median')}")
        print(f"Standard Deviation: {stats.get('std_deviation')}")
        print(f"Min: {stats.get('min')}")
        print(f"Max: {stats.get('max')}")
        print(f"Range: {stats.get('range')}")
        print(f"Quartiles: {stats.get('quartiles')}")
        print(f"Skewness: {stats.get('skewness')}")
        print(f"Kurtosis: {stats.get('kurtosis')}")
        
        # Verify expected values
        expected_mean = sum(test_values) / len(test_values)  # 55.0
        expected_min = min(test_values)  # 10
        expected_max = max(test_values)  # 100
        expected_range = expected_max - expected_min  # 90
        
        print(f"\nVerification:")
        print(f"Expected mean: {expected_mean}, Got: {stats.get('mean')}")
        print(f"Expected min: {expected_min}, Got: {stats.get('min')}")
        print(f"Expected max: {expected_max}, Got: {stats.get('max')}")
        print(f"Expected range: {expected_range}, Got: {stats.get('range')}")
        
        # Check if values are close (allowing for rounding)
        assert abs(stats.get('mean', 0) - expected_mean) < 0.01, f"Mean mismatch: {stats.get('mean')} vs {expected_mean}"
        assert stats.get('min') == expected_min, f"Min mismatch: {stats.get('min')} vs {expected_min}"
        assert stats.get('max') == expected_max, f"Max mismatch: {stats.get('max')} vs {expected_max}"
        assert stats.get('range') == expected_range, f"Range mismatch: {stats.get('range')} vs {expected_range}"
        
        print("✅ All statistical calculations are correct!")
    else:
        print("❌ No statistics found in result")
        return False
    
    # Test without statistics
    print("\nTesting metrics retrieval without statistics...")
    result_no_stats = retrieve_service.get_metrics_data(
        company_id=str(company.id),
        filters=filters,
        include_statistics=False
    )
    
    print(f"Result keys (no stats): {list(result_no_stats.keys())}")
    print(f"Has statistics key: {'statistics' in result_no_stats}")
    
    if 'statistics' not in result_no_stats:
        print("✅ Statistics correctly excluded when not requested")
    else:
        print("❌ Statistics should not be included when not requested")
        return False
    
    # Clean up test data
    Metric.objects.filter(
        company=company,
        name__startswith='test_stat_'
    ).delete()
    
    print("\n✅ All tests passed!")
    return True

if __name__ == "__main__":
    try:
        success = test_metrics_statistics()
        if success:
            print("\n🎉 Metrics statistics functionality is working correctly!")
        else:
            print("\n❌ Some tests failed!")
            sys.exit(1)
    except Exception as e:
        print(f"\n❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1) 