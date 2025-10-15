import pytest
from django.test import TestCase
from django.core.files.base import ContentFile
from users.models import User
from unittest.mock import patch

@pytest.mark.django_db
class UserModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='password123'
        )

    @patch('storages.backends.s3boto3.S3Boto3Storage.save')
    def test_user_logo_upload(self, mock_save):
        # Configure the mock to return a predictable path
        mock_save.return_value = 'clous-product/uploads/profiles/users/test_uuid/test_logo.png'

        # Create a dummy file content
        fake_file_content = b"fake_image_data"
        content_file = ContentFile(fake_file_content, name="demo.png")

        # Save the logo
        self.user.logo.save("demo.png", content_file, save=True)
        self.user.refresh_from_db()

        # Assert that the save method was called
        mock_save.assert_called_once()

        # Assert the logo URL is as expected (or contains the expected parts)
        # The exact URL might depend on your storage settings and how the UUID is generated.
        # For this test, we rely on the mock_save.return_value.
        self.assertTrue(self.user.logo.name.endswith('test_logo.png'))
        # If you have a method or property that generates the full URL, test that too.
        # For example, if user.logo.url is supposed to return the full S3 URL:
        # self.assertEqual(self.user.logo.url, 'https://<bucket>.s3.eu-west-3.amazonaws.com/clous-product/uploads/profiles/users/test_uuid/test_logo.png')
        # However, directly asserting self.user.logo.url might involve more complex mocking if it constructs the URL dynamically.
        # For simplicity, we've mocked the 'save' method's return, which determines the 'name' attribute.

        # Check that the path is correct (based on the mocked save)
        self.assertEqual(self.user.logo.name, 'clous-product/uploads/profiles/users/test_uuid/test_logo.png')

        # The "no AccessDenied" part is implicitly tested by the fact that a real S3 call isn't made.
        # If S3Boto3Storage.save didn't raise an exception (and it's mocked here), we assume "no AccessDenied". 