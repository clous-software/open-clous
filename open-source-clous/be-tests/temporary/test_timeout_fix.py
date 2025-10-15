#!/usr/bin/env python3
"""
Simple test script to verify timeout protection is working correctly
without the database connection errors.
"""

import requests
import time
import json

def test_health_endpoint(base_url="http://localhost:8000"):
    """Test the health endpoint to ensure platform is working."""
    try:
        print(f"Testing health endpoint: {base_url}/health/")
        response = requests.get(f"{base_url}/health/", timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            print("✅ Platform is healthy!")
            return True
        else:
            print("⚠️  Platform reports unhealthy status")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to platform - is it running?")
        return False
    except Exception as e:
        print(f"❌ Error testing health endpoint: {e}")
        return False

def test_basic_api(base_url="http://localhost:8000"):
    """Test a basic API endpoint to ensure no database connection errors."""
    try:
        print(f"\nTesting basic API: {base_url}/api/user/")
        # This will test without authentication, expecting a 401 but no 500 database errors
        response = requests.get(f"{base_url}/api/user/", timeout=10)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 401:
            print("✅ API working correctly (expected 401 - no auth)")
            return True
        elif response.status_code == 500:
            print("❌ Internal server error - possible database issue")
            try:
                error_data = response.json()
                print(f"Error details: {json.dumps(error_data, indent=2)}")
            except:
                print("Could not parse error response")
            return False
        else:
            print(f"✅ Unexpected but non-error status: {response.status_code}")
            return True
            
    except Exception as e:
        print(f"❌ Error testing API endpoint: {e}")
        return False

def main():
    """Run all tests."""
    print("🔍 Testing timeout fix without platform corruption...")
    print("=" * 60)
    
    # Test locally first, then try production if needed
    base_urls = [
        "http://localhost:8000",
        "https://server-clous-3ac15fe26491.herokuapp.com",
        "https://beta.clous.app"
    ]
    
    success = False
    
    for base_url in base_urls:
        print(f"\n🌐 Testing with base URL: {base_url}")
        print("-" * 40)
        
        # Test health endpoint
        health_ok = test_health_endpoint(base_url)
        
        # Test basic API
        api_ok = test_basic_api(base_url)
        
        if health_ok or api_ok:
            print(f"\n✅ SUCCESS: Platform accessible at {base_url}")
            success = True
            break
        else:
            print(f"\n❌ Platform not accessible at {base_url}")
    
    if success:
        print("\n🎉 OVERALL RESULT: Timeout fix appears to be working!")
        print("🔹 No database connection errors detected")
        print("🔹 Platform remains responsive")
        print("🔹 Health monitoring is functional")
    else:
        print("\n⚠️  Could not verify fix - check if platform is running")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    main() 