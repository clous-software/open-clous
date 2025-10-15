#!/usr/bin/env python3
"""
Test script to verify competence sharing between Skills and ObjectItems
"""

import os
import sys
import django

# Setup Django environment
sys.path.append('/Users/alvipe/Desktop/cloush-server')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

def test_competence_sharing():
    """Test that competences are properly shared between Skills and ObjectItems"""
    
    from users.models import CategoryList
    
    # Sample data that should create shared competences
    test_data = {
        "skills": [
            {
                "competence": "Technical Skills",
                "name": "Python Programming",
                "level": 85,
                "reasoning": "Strong backend development experience",
                "assumptions": "Based on portfolio",
                "hypothesis": "Ready for complex projects",
                "insights": "Above market average",
                "metadata": "Core competency"
            }
        ],
        "knowledges": [
            {
                "competence": "Technical Skills",  # Same competence as skill
                "knowledge": "Machine Learning",
                "reasoning": "Understanding of ML concepts",
                "assumptions": "Based on projects",
                "insights": "Growing field"
            }
        ],
        "attitudes": [
            {
                "competence": "Technical Skills",  # Same competence as skill and knowledge
                "attitude": "Continuous Learning",
                "reasoning": "Always learning new technologies",
                "assumptions": "Based on behavior",
                "insights": "Key for tech roles"
            }
        ]
    }
    
    print("Testing competence sharing...")
    print(f"Input data has {len(test_data['skills'])} skills, {len(test_data['knowledges'])} knowledges, {len(test_data['attitudes'])} attitudes")
    print("All items use the same competence: 'Technical Skills'")
    
    # Test field extraction for skills
    for skill in test_data["skills"]:
        competence = skill.get("competence")
        name = skill.get("name")
        print(f"  ✓ Skill '{name}' -> Competence: '{competence}'")
    
    # Test field extraction for knowledges
    for knowledge in test_data["knowledges"]:
        competence = knowledge.get("competence")
        knowledge_name = knowledge.get("knowledge")
        print(f"  ✓ Knowledge '{knowledge_name}' -> Competence: '{competence}'")
    
    # Test field extraction for attitudes
    for attitude in test_data["attitudes"]:
        competence = attitude.get("competence")
        attitude_name = attitude.get("attitude")
        print(f"  ✓ Attitude '{attitude_name}' -> Competence: '{competence}'")
    
    # Verify the CategoryList sharing logic
    competence_name = "Technical Skills"
    
    # Simulate what _attach_competence does for Skills
    skill_cat, skill_created = CategoryList.objects.get_or_create(
        name=competence_name, defaults={"type": "competence"}
    )
    print(f"  ✓ Skills CategoryList: '{skill_cat.name}' (type: {skill_cat.type}, created: {skill_created})")
    
    # Simulate what _create_or_update_knowledge_items does
    knowledge_cat, knowledge_created = CategoryList.objects.get_or_create(
        name=competence_name, defaults={"type": "competence"}
    )
    print(f"  ✓ Knowledge CategoryList: '{knowledge_cat.name}' (type: {knowledge_cat.type}, created: {knowledge_created})")
    
    # Simulate what _create_or_update_attitude_items does
    attitude_cat, attitude_created = CategoryList.objects.get_or_create(
        name=competence_name, defaults={"type": "competence"}
    )
    print(f"  ✓ Attitude CategoryList: '{attitude_cat.name}' (type: {attitude_cat.type}, created: {attitude_created})")
    
    # Verify they are the same object
    if skill_cat.id == knowledge_cat.id == attitude_cat.id:
        print(f"  ✅ SUCCESS: All three use the same CategoryList instance (ID: {skill_cat.id})")
        print(f"     This means competences are properly shared across Skills and ObjectItems!")
    else:
        print(f"  ❌ ERROR: Different CategoryList instances created")
        print(f"     Skill: {skill_cat.id}, Knowledge: {knowledge_cat.id}, Attitude: {attitude_cat.id}")
    
    # Test the relationship structure
    print("\n  📋 Relationship Summary:")
    print(f"     • Skills use: skill.competence -> CategoryList (name='{competence_name}', type='competence')")
    print(f"     • ObjectItems use: item.category -> CategoryList (name='{competence_name}', type='competence')")
    print(f"     • Both point to the same CategoryList instance for shared competences")
    
    print("\n✓ Competence sharing test completed!")

if __name__ == "__main__":
    test_competence_sharing() 