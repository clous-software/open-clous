import pytest
import asyncio
from unittest.mock import MagicMock, patch
from services.autonomy.streaming import stream_tool_event
from services.tools.metadata import ToolCategory, ToolSpec

class FakeToolCallEvent:
    def __init__(self, name, input_data):
        self.type = "tool_call_item"
        self.item = MagicMock()
        self.item.name = name
        self.item.input = input_data
        self.context = {"user_id": "123"}

class FakeToolOutputEvent:
    def __init__(self, name, output_data):
        self.type = "tool_output_item"
        self.item = MagicMock()
        self.item.name = name
        self.item.output = output_data
        self.context = {"user_id": "123"}

class FakeWebsocketGroup:
    def __init__(self):
        self.sent = []
        
    async def send(self, data):
        self.sent.append(data)

@pytest.fixture
def fake_ws():
    ws = FakeWebsocketGroup()
    
    # Mock the send_result function
    async def mock_send_result(group, results, tool_name, phase, detail, **kwargs):
        await ws.send({
            "type": "send_result",
            "data": {
                "results": results,
                "tool_name": tool_name,
                "phase": phase,
                "detail": detail,
                **kwargs
            }
        })
    
    # Mock the ws_send function
    async def mock_ws_send(group, data):
        await ws.send(data)
    
    # Apply the mocks
    with patch("services.service_utils.channels_helpers.send_result", mock_send_result), \
         patch("services.service_utils.channels_helpers.ws_send", mock_ws_send), \
         patch("services.autonomy.agents.AgentService.normalise_params", lambda self, params: params), \
         patch("services.memory.persistence.persist_tool_result", new=MagicMock()):
        yield ws

@pytest.mark.asyncio
async def test_read_object_streams_args_and_output(fake_ws):
    # Arrange - READ_OBJECT streams both args and output
    with patch("services.tools.metadata.get_tool_spec", return_value=ToolSpec(
        name="read_candidate_data",
        category=ToolCategory.READ_OBJECT,
        stream_policy="both"
    )):
        evt_in = FakeToolCallEvent("read_candidate_data", {"candidate_id": 123})
        evt_out = FakeToolOutputEvent("read_candidate_data", {"name": "Ada"})
        
        # Act
        await stream_tool_event(evt_in, fake_ws)
        await stream_tool_event(evt_out, fake_ws)
        
        # Assert
        assert len(fake_ws.sent) == 2
        assert fake_ws.sent[0]["data"]["phase"] == "tool_call"
        assert fake_ws.sent[0]["data"]["detail"] == "args"
        assert fake_ws.sent[0]["data"]["results"] == {"candidate_id": 123}
        
        assert fake_ws.sent[1]["data"]["phase"] == "tool_output"
        assert fake_ws.sent[1]["data"]["detail"] == "output"
        assert fake_ws.sent[1]["data"]["results"] == {"name": "Ada"}

@pytest.mark.asyncio
async def test_canvas_function_streams_output_with_open_canvas_phase(fake_ws):
    # Arrange - CANVAS_FUNCTION uses "open_canvas" phase
    with patch("services.tools.metadata.get_tool_spec", return_value=ToolSpec(
        name="create_diagram",
        category=ToolCategory.CANVAS_FUNCTION,
        stream_policy="output"
    )):
        evt_out = FakeToolOutputEvent("create_diagram", {"canvas_id": "abc123"})
        
        # Act
        await stream_tool_event(evt_out, fake_ws)
        
        # Assert
        assert len(fake_ws.sent) == 1
        assert fake_ws.sent[0]["data"]["phase"] == "open_canvas"
        assert fake_ws.sent[0]["data"]["results"] == {"canvas_id": "abc123"}

@pytest.mark.asyncio
async def test_async_canvas_function_sends_immediate_notification(fake_ws):
    # Arrange - ASYNC_CANVAS_FUNCTION sends immediate notification and streams args
    with patch("services.tools.metadata.get_tool_spec", return_value=ToolSpec(
        name="recommendation",
        category=ToolCategory.ASYNC_CANVAS_FUNCTION,
        stream_policy="both"
    )):
        evt_in = FakeToolCallEvent("recommendation", {"type": "skills"})
        
        # Act
        await stream_tool_event(evt_in, fake_ws)
        
        # Assert
        assert len(fake_ws.sent) == 2
        assert fake_ws.sent[0]["data"]["phase"] == "open_canvas"
        assert fake_ws.sent[0]["data"]["results"] == {"type": "skills"}
        assert fake_ws.sent[1]["type"] == "send_status"
        assert fake_ws.sent[1]["data"]["phase"] == "open_canvas"

@pytest.mark.asyncio
async def test_update_confirmation_sends_confirmation_request(fake_ws):
    # Arrange - UPDATE_CONFIRMATION sends confirmation request
    with patch("services.tools.metadata.get_tool_spec", return_value=ToolSpec(
        name="update_job_posting",
        category=ToolCategory.UPDATE_CONFIRMATION,
        stream_policy="output",
        confirmation="update"
    )), patch("uuid.uuid4", return_value="test-uuid"):
        evt_out = FakeToolOutputEvent("update_job_posting", {"job_id": 123, "updates": {"title": "New Title"}})
        
        # Act
        confirm_id = await stream_tool_event(evt_out, fake_ws)
        
        # Assert
        assert confirm_id == "test-uuid"
        assert len(fake_ws.sent) == 1
        assert fake_ws.sent[0]["data"]["phase"] == "confirm_update"
        assert fake_ws.sent[0]["data"]["confirm_id"] == "test-uuid"

@pytest.mark.asyncio
async def test_auth_confirmation_sends_auth_required(fake_ws):
    # Arrange - CONFIRMATION with "auth" sends auth_required
    with patch("services.tools.metadata.get_tool_spec", return_value=ToolSpec(
        name="request_manual_authentication_with_integration",
        category=ToolCategory.CONFIRMATION,
        stream_policy="output",
        confirmation="auth"
    )), patch("uuid.uuid4", return_value="auth-uuid"):
        evt_out = FakeToolOutputEvent("request_manual_authentication_with_integration", {"integration": "google"})
        
        # Act
        confirm_id = await stream_tool_event(evt_out, fake_ws)
        
        # Assert
        assert confirm_id == "auth-uuid"
        assert len(fake_ws.sent) == 1
        assert fake_ws.sent[0]["type"] == "send_status"
        assert fake_ws.sent[0]["data"]["phase"] == "auth_required"
        assert fake_ws.sent[0]["data"]["confirm_id"] == "auth-uuid" 