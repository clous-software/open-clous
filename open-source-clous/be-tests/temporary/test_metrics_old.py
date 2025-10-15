import unittest
from unittest.mock import MagicMock

class TestHandleAnalyticsCanvas(unittest.TestCase):
    def setUp(self):
        # Set up mock services and data
        self.retrieve_service = MagicMock()
        self.ai_service = MagicMock()
        self.ConversationSerializer = MagicMock()
        self.Response = MagicMock()

        self.company = MagicMock()
        self.company.id = 1

        self.user_input = "Sample user input"
        self.data_index = "metrics_index"
        self.peer_context = "Sample peer context"

    def test_fallback_to_get_metrics(self):
        # Mock get_metrics_context to return insufficient data
        self.retrieve_service.get_metrics_context.return_value = {
            "context": "Sample context",
            "metrics": [{"metric1": "value1"}]  # Only 1 metric, below threshold
        }

        # Mock get_metrics to return fallback metrics
        fallback_metrics = [
            MagicMock(object_id=1, name="metric2", value=200, timestamp=timezone.now(), company=self.company, properties={}),
            MagicMock(object_id=2, name="metric3", value=300, timestamp=timezone.now(), company=self.company, properties={}),
        ]
        self.retrieve_service.get_metrics.return_value = fallback_metrics

        # Mock expansive_context_search
        self.retrieve_service.expansive_context_search.return_value = "Additional context"

        # Mock AI service response
        self.ai_service.get_people_analytics.return_value = {"analytics": "data"}

        # Mock serializer
        serializer_instance = MagicMock()
        serializer_instance.is_valid.return_value = True
        serializer_instance.data = {"id": 1}
        self.ConversationSerializer.return_value = serializer_instance

        # Call the function
        response = handle_analytics_canvas(
            canvas_type='analytics',
            company=self.company,
            user_input=self.user_input,
            data_index=self.data_index,
            peer_context=self.peer_context,
            retrieve_service=self.retrieve_service,
            ai_service=self.ai_service,
            ConversationSerializer=self.ConversationSerializer,
            Response=self.Response
        )

        # Assertions
        self.assertEqual(response.status_code, 200)
        self.retrieve_service.get_metrics_context.assert_called_once()
        self.retrieve_service.get_metrics.assert_called_once_with(
            company=self.company,
            filters={'properties__tag': 'client'}
        )
        self.ai_service.get_people_analytics.assert_called_once()
        self.ConversationSerializer.assert_called_once()
        self.assertIn('metrics', response.json())

if __name__ == '__main__':
    unittest.main()
