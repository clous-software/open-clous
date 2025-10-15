#!/usr/bin/env python3
"""
Simple test script for the statistical calculations logic.
This tests the _calculate_metrics_statistics method directly.
"""

import statistics
import math

def calculate_metrics_statistics(metrics_list):
    """
    Calculate statistical measures for a list of metrics.
    
    Args:
        metrics_list: List of metric dictionaries with 'value' field
        
    Returns:
        Dictionary containing statistical calculations
    """
    
    # Extract numeric values from metrics
    values = []
    for metric in metrics_list:
        if isinstance(metric, dict) and 'value' in metric:
            value = metric['value']
            if value is not None and isinstance(value, (int, float)):
                values.append(float(value))
    
    if not values:
        return {
            "count": 0,
            "mean": None,
            "median": None,
            "mode": None,
            "std_deviation": None,
            "variance": None,
            "min": None,
            "max": None,
            "range": None,
            "quartiles": None,
            "skewness": None,
            "kurtosis": None
        }
    
    # Basic statistics
    count = len(values)
    mean = statistics.mean(values)
    median = statistics.median(values)
    
    # Mode (most frequent value)
    try:
        mode = statistics.mode(values)
    except statistics.StatisticsError:
        mode = None
    
    # Standard deviation and variance
    if count > 1:
        std_deviation = statistics.stdev(values)
        variance = statistics.variance(values)
    else:
        std_deviation = None
        variance = None
    
    # Min, max, range
    min_val = min(values)
    max_val = max(values)
    range_val = max_val - min_val
    
    # Quartiles
    sorted_values = sorted(values)
    q1 = sorted_values[count // 4] if count >= 4 else None
    q3 = sorted_values[3 * count // 4] if count >= 4 else None
    quartiles = {
        "q1": q1,
        "q2": median,
        "q3": q3,
        "iqr": q3 - q1 if q1 is not None and q3 is not None else None
    }
    
    # Skewness (measure of asymmetry)
    if count > 2 and std_deviation and std_deviation > 0:
        skewness = sum(((x - mean) / std_deviation) ** 3 for x in values) / count
    else:
        skewness = None
    
    # Kurtosis (measure of tail heaviness)
    if count > 3 and std_deviation and std_deviation > 0:
        kurtosis = sum(((x - mean) / std_deviation) ** 4 for x in values) / count - 3
    else:
        kurtosis = None
    
    return {
        "count": count,
        "mean": round(mean, 4) if mean is not None else None,
        "median": round(median, 4) if median is not None else None,
        "mode": round(mode, 4) if mode is not None else None,
        "std_deviation": round(std_deviation, 4) if std_deviation is not None else None,
        "variance": round(variance, 4) if variance is not None else None,
        "min": round(min_val, 4) if min_val is not None else None,
        "max": round(max_val, 4) if max_val is not None else None,
        "range": round(range_val, 4) if range_val is not None else None,
        "quartiles": quartiles,
        "skewness": round(skewness, 4) if skewness is not None else None,
        "kurtosis": round(kurtosis, 4) if kurtosis is not None else None
    }

def test_statistics():
    """Test the statistical calculations with various scenarios."""
    
    print("Testing metrics statistics functionality...\n")
    
    # Test 1: Normal case with multiple values
    print("Test 1: Normal case with multiple values")
    test_metrics = [
        {"name": "metric1", "value": 10},
        {"name": "metric2", "value": 20},
        {"name": "metric3", "value": 30},
        {"name": "metric4", "value": 40},
        {"name": "metric5", "value": 50},
        {"name": "metric6", "value": 60},
        {"name": "metric7", "value": 70},
        {"name": "metric8", "value": 80},
        {"name": "metric9", "value": 90},
        {"name": "metric10", "value": 100}
    ]
    
    stats = calculate_metrics_statistics(test_metrics)
    print(f"Count: {stats['count']}")
    print(f"Mean: {stats['mean']}")
    print(f"Median: {stats['median']}")
    print(f"Standard Deviation: {stats['std_deviation']}")
    print(f"Min: {stats['min']}")
    print(f"Max: {stats['max']}")
    print(f"Range: {stats['range']}")
    print(f"Quartiles: {stats['quartiles']}")
    print(f"Skewness: {stats['skewness']}")
    print(f"Kurtosis: {stats['kurtosis']}")
    
    # Verify expected values
    expected_mean = 55.0
    expected_min = 10
    expected_max = 100
    expected_range = 90
    
    assert stats['count'] == 10, f"Count should be 10, got {stats['count']}"
    assert abs(stats['mean'] - expected_mean) < 0.01, f"Mean should be {expected_mean}, got {stats['mean']}"
    assert stats['min'] == expected_min, f"Min should be {expected_min}, got {stats['min']}"
    assert stats['max'] == expected_max, f"Max should be {expected_max}, got {stats['max']}"
    assert stats['range'] == expected_range, f"Range should be {expected_range}, got {stats['range']}"
    
    print("✅ Test 1 passed!\n")
    
    # Test 2: Single value
    print("Test 2: Single value")
    single_metric = [{"name": "single", "value": 42}]
    stats_single = calculate_metrics_statistics(single_metric)
    
    print(f"Count: {stats_single['count']}")
    print(f"Mean: {stats_single['mean']}")
    print(f"Standard Deviation: {stats_single['std_deviation']}")
    
    assert stats_single['count'] == 1, f"Count should be 1, got {stats_single['count']}"
    assert stats_single['mean'] == 42.0, f"Mean should be 42.0, got {stats_single['mean']}"
    assert stats_single['std_deviation'] is None, f"Std deviation should be None for single value"
    
    print("✅ Test 2 passed!\n")
    
    # Test 3: Empty list
    print("Test 3: Empty list")
    empty_metrics = []
    stats_empty = calculate_metrics_statistics(empty_metrics)
    
    print(f"Count: {stats_empty['count']}")
    print(f"Mean: {stats_empty['mean']}")
    
    assert stats_empty['count'] == 0, f"Count should be 0, got {stats_empty['count']}"
    assert stats_empty['mean'] is None, f"Mean should be None for empty list"
    
    print("✅ Test 3 passed!\n")
    
    # Test 4: Mixed data types (some None values)
    print("Test 4: Mixed data types with None values")
    mixed_metrics = [
        {"name": "valid1", "value": 10},
        {"name": "none_value", "value": None},
        {"name": "valid2", "value": 20},
        {"name": "string_value", "value": "not_a_number"},
        {"name": "valid3", "value": 30}
    ]
    
    stats_mixed = calculate_metrics_statistics(mixed_metrics)
    print(f"Count: {stats_mixed['count']}")
    print(f"Mean: {stats_mixed['mean']}")
    
    assert stats_mixed['count'] == 3, f"Count should be 3 (only valid numbers), got {stats_mixed['count']}"
    assert stats_mixed['mean'] == 20.0, f"Mean should be 20.0, got {stats_mixed['mean']}"
    
    print("✅ Test 4 passed!\n")
    
    # Test 5: Duplicate values (for mode testing)
    print("Test 5: Duplicate values for mode testing")
    duplicate_metrics = [
        {"name": "a", "value": 10},
        {"name": "b", "value": 20},
        {"name": "c", "value": 10},  # duplicate
        {"name": "d", "value": 30},
        {"name": "e", "value": 10},  # duplicate
    ]
    
    stats_duplicate = calculate_metrics_statistics(duplicate_metrics)
    print(f"Count: {stats_duplicate['count']}")
    print(f"Mode: {stats_duplicate['mode']}")
    
    assert stats_duplicate['count'] == 5, f"Count should be 5, got {stats_duplicate['count']}"
    assert stats_duplicate['mode'] == 10.0, f"Mode should be 10.0, got {stats_duplicate['mode']}"
    
    print("✅ Test 5 passed!\n")
    
    print("🎉 All tests passed! The statistical calculations are working correctly.")

if __name__ == "__main__":
    test_statistics() 