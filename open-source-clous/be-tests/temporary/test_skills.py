from django.test import TestCase
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from jobs.models import Skills, Resume, Company, User, Job, Questions, Training
import uuid

class UpdateSkillsTest(TestCase):
    def setUp(self):
        """Set up test environment with users, company, and skills"""
        self.user = User.objects.create(
            id=uuid.uuid4(), 
            first_name="Test", 
            last_name="User", 
            email="test@example.com"
        )
        self.company = Company.objects.create(
            id=uuid.uuid4(), 
            name="Test Company"
        )
        self.resume = Resume.objects.create(
            user=self.user, 
            company=self.company
        )
        self.skill_data = [
            {"name": "Python", "level": 80, "reasoning": "Highly experienced"},
            {"name": "Django", "level": 70, "reasoning": "Used for 3 years"}
        ]

    def test_update_skills_candidate(self):
        """Test updating skills for a candidate"""
        from services.transform import TransformService

        transform_service = TransformService()
        transform_service.update_skills(target=self.user, skills_data=self.skill_data, company=self.company, update_type="candidate")

        # Verify that skills were added
        python_skill = Skills.objects.filter(name="Python").first()
        django_skill = Skills.objects.filter(name="Django").first()

        self.assertIsNotNone(python_skill, "Python skill was not created")
        self.assertIsNotNone(django_skill, "Django skill was not created")
        self.assertEqual(python_skill.level, 80, "Python skill level is incorrect")
        self.assertEqual(django_skill.level, 70, "Django skill level is incorrect")

    def test_update_skills_company(self):
        """Test updating skills for a company"""
        from services.transform import TransformService

        transform_service = TransformService()
        transform_service.update_skills(target=None, skills_data=self.skill_data, company=self.company, update_type="company")

        # Check if skills exist in the company skills relation
        self.assertTrue(self.company.skills.filter(name="Python").exists(), "Python skill not added to company")
        self.assertTrue(self.company.skills.filter(name="Django").exists(), "Django skill not added to company")

    def test_update_skills_job(self):
        """Test updating skills for a job"""
        job = Job.objects.create(
            id=uuid.uuid4(),
            title="Software Engineer",
            company=self.company,
            status="published"
        )

        from services.transform import TransformService

        transform_service = TransformService()
        transform_service.update_skills(target=job, skills_data=self.skill_data, company=self.company, update_type="job")

        # Verify that skills were added to job
        self.assertTrue(job.skills.filter(name="Python").exists(), "Python skill not added to job")
        self.assertTrue(job.skills.filter(name="Django").exists(), "Django skill not added to job")

    def test_update_skills_questions(self):
        """Test updating skills for a question"""
        question = Questions.objects.create(
            id=uuid.uuid4(),
            question="How do you optimize Django performance?"
        )

        from services.transform import TransformService

        transform_service = TransformService()
        transform_service.update_skills(target=question, skills_data=self.skill_data, company=self.company, update_type="question")

        # Verify that skills were added to question
        self.assertTrue(question.skills.filter(name="Python").exists(), "Python skill not added to question")
        self.assertTrue(question.skills.filter(name="Django").exists(), "Django skill not added to question")

    def test_update_skills_training(self):
        """Test updating skills for a training"""
        training = Training.objects.create(
            id=uuid.uuid4(),
            title="Advanced Python Training"
        )

        from services.transform import TransformService

        transform_service = TransformService()
        transform_service.update_skills(target=training, skills_data=self.skill_data, company=self.company, update_type="training")

        # Verify that skills were added to training
        self.assertTrue(training.skills.filter(name="Python").exists(), "Python skill not added to training")
        self.assertTrue(training.skills.filter(name="Django").exists(), "Django skill not added to training")
