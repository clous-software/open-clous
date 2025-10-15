from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import patch
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model

User = get_user_model()

class MCPTestAPIViewTestCase(APITestCase):
    def setUp(self):
        # Create and force authenticate a test user (JWT or similar)
        self.user = User.objects.create_user(
            email="avillalba@clous.app",
            username="avillalba",
            password=make_password("testpass")
        )
        self.client.force_authenticate(user=self.user)
        # Update this URL or reverse lookup as per your URL conf
        self.url = reverse("mcp-test")  # e.g., path('api/mcp-test/', MCPTestAPIView.as_view(), name='mcp-test-api')

    @patch("services.integrations.mcp_service.MCPService")  # <-- Replace 'your_app.views' with the actual module path
    def test_post_success(self, mock_mcp_service):
        # Arrange: Set up the mock to return a dummy response
        dummy_result = {"result": "dummy"}
        instance = mock_mcp_service.return_value
        instance.mcp_tool_router.return_value = dummy_result

        # Payload includes required "query" (which acts as user_input) and an extra parameter.
        payload = {
            "query": "Search for files in my Google Drive",
            "force_agent": True,
            "server_name": "google_drive",
            "extra_param": "extra_value"  # This should be passed along as extra_kwargs
        }

        # Act: Send POST request to the API endpoint
        response = self.client.post(self.url, payload, format="json")

        # Assert: Check for a successful response and proper routing call.
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), dummy_result)
        instance.mcp_tool_router.assert_called_once_with(
            user_input=payload["query"],
            company=None,
            user=self.user,
            force_agent=True,
            extra_param="extra_value"
        )

    def test_post_missing_query(self):
        # Arrange: Payload missing the required "query" parameter
        payload = {
            "force_agent": True,
            "server_name": "google_drive"
        }

        # Act: Send POST request without "query"
        response = self.client.post(self.url, payload, format="json")

        # Assert: Verify that a 400 error is returned with an appropriate error message.
        self.assertEqual
