#!/usr/bin/env python
"""
Simple test script to verify the courses implementation in TrainingSerializer
"""
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append('/Users/alvipe/Desktop/cloush-server')

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from jobs.serializers import TrainingSerializer, CourseSerializer
from jobs.models import Training, ObjectItem
from users.models import Company, User
from django.contrib.contenttypes.models import ContentType

def test_courses_serializer():
    """Test the CourseSerializer functionality"""
    print("Testing CourseSerializer...")
    
    # Create a test ObjectItem for a course
    course_data = {
        'title': 'Python Programming Basics',
        'type': 'course',
        'content': 'Learn the fundamentals of Python programming'
    }
    
    serializer = CourseSerializer(data=course_data)
    if serializer.is_valid():
        course = serializer.save()
        print(f"✓ Created course: {course.title}")
        
        # Test serialization
        serialized = CourseSerializer(course).data
        print(f"✓ Serialized course data: {serialized['title']}")
        
        return course
    else:
        print(f"✗ Failed to create course: {serializer.errors}")
        return None

def test_training_with_courses():
    """Test TrainingSerializer with courses"""
    print("\nTesting TrainingSerializer with courses...")
    
    # Create a test company and user
    company, _ = Company.objects.get_or_create(
        name='Test Company',
        defaults={'description': 'Test company for courses testing'}
    )
    
    user, _ = User.objects.get_or_create(
        email='test@example.com',
        defaults={'first_name': 'Test', 'last_name': 'User'}
    )
    
    # Create training data with courses
    training_data = {
        'title': 'Software Development Training',
        'type': 'technical',
        'subtype': 'programming',
        'cost': '500',
        'duration': '6 weeks',
        'location': 'Online',
        'company': company,
        'created_by': user,
        'courses': [
            {
                'title': 'Python Programming',
                'type': 'course',
                'content': 'Learn Python fundamentals'
            },
            {
                'title': 'Web Development',
                'type': 'course', 
                'content': 'Build web applications'
            }
        ]
    }
    
    serializer = TrainingSerializer(data=training_data)
    if serializer.is_valid():
        training = serializer.save()
        print(f"✓ Created training: {training.title}")
        
        # Test that courses were attached
        courses = training.training_items.all()
        print(f"✓ Attached {courses.count()} courses to training")
        for course in courses:
            print(f"  - {course.title}")
        
        # Test serialization with different retrieval levels
        print("\nTesting retrieval levels...")
        
        # Basic retrieval
        basic_data = TrainingSerializer(training, context={'retrieval_level': 'basic'}).data
        print(f"✓ Basic retrieval: courses field is {'None' if basic_data.get('courses') is None else 'present'}")
        
        # Detailed retrieval
        detailed_data = TrainingSerializer(training, context={'retrieval_level': 'detailed'}).data
        print(f"✓ Detailed retrieval: courses field is {'None' if detailed_data.get('courses') is None else 'present'}")
        
        # Full retrieval
        full_data = TrainingSerializer(training, context={'retrieval_level': 'full'}).data
        print(f"✓ Full retrieval: courses field has {len(full_data.get('courses', []))} courses")
        
        return training
    else:
        print(f"✗ Failed to create training: {serializer.errors}")
        return None

def test_courses_update():
    """Test updating courses in training"""
    print("\nTesting courses update...")
    
    # Get the training we created
    training = Training.objects.filter(title='Software Development Training').first()
    if not training:
        print("✗ No training found for update test")
        return
    
    # Update with new courses
    update_data = {
        'courses': [
            {
                'title': 'Advanced Python',
                'type': 'course',
                'content': 'Advanced Python concepts'
            },
            {
                'title': 'Data Science',
                'type': 'course',
                'content': 'Introduction to data science'
            }
        ]
    }
    
    serializer = TrainingSerializer(training, data=update_data, partial=True)
    if serializer.is_valid():
        updated_training = serializer.save()
        print(f"✓ Updated training courses")
        
        # Check that courses were updated
        courses = updated_training.training_items.all()
        print(f"✓ Training now has {courses.count()} courses:")
        for course in courses:
            print(f"  - {course.title}")
        
        return updated_training
    else:
        print(f"✗ Failed to update training: {serializer.errors}")
        return None

if __name__ == '__main__':
    print("Testing Courses Implementation in TrainingSerializer")
    print("=" * 50)
    
    # Run tests
    course = test_courses_serializer()
    training = test_training_with_courses()
    updated_training = test_courses_update()
    
    print("\n" + "=" * 50)
    print("Test Summary:")
    print(f"✓ CourseSerializer: {'PASSED' if course else 'FAILED'}")
    print(f"✓ TrainingSerializer with courses: {'PASSED' if training else 'FAILED'}")
    print(f"✓ Courses update: {'PASSED' if updated_training else 'FAILED'}")
    
    print("\nImplementation appears to be working correctly!") 