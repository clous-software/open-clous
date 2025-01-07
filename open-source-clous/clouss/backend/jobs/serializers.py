from rest_framework import serializers
from .models import CompensationsList, JobList, Conversation, ToolList, RequirementList, LanguageList, ResponsibilitiesList, BenefitsList

class ToolListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolList
        fields = '__all__'

class RequirementListSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequirementList
        fields = '__all__'

class LanguageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = LanguageList
        fields = '__all__'

class ResponsibilitiesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponsibilitiesList
        fields = '__all__'

class BenefitsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BenefitsList
        fields = '__all__'

class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolList
        fields = '__all__'
class CompensationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompensationsList
        fields = '__all__'

# Define el serializador principal (JobList) que incluirá los campos anidados

class JobListSerializer(serializers.ModelSerializer):
    compensation = CompensationSerializer(many=True)
    tools = ToolListSerializer(many=True)
    requirements = RequirementListSerializer(many=True)
    languages = LanguageListSerializer(many=True)
    responsibilities = ResponsibilitiesListSerializer(many=True)
    benefits = BenefitsListSerializer(many=True)

    class Meta:
        model = JobList
        fields = '__all__'
    
    

class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = '__all__'
        read_only_fields = ('created_at',)
