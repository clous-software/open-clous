"""
Advanced MCP Client for Notion Integration.
This client provides a sophisticated interface for interacting with Notion services
through the Model Context Protocol (MCP).
"""

import json
import logging
import asyncio
from typing import Dict, Any, List, Optional, Union, Tuple, Callable, Awaitable, Sequence
from functools import wraps
from datetime import datetime, timedelta

import os
from pathlib import Path
from dotenv import load_dotenv

from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import TextContent
from services.tools.integrations.notion_tools import (
    get_notion_tools,
    notion_list_databases,
    notion_query_database,
    notion_create_page,
    notion_update_page,
    notion_search,
    notion_get_block_children,
    notion_append_block_children,
    notion_add_comment
)

logger = logging.getLogger("notion_mcp")
logging.basicConfig(level=logging.INFO)

# Load environment variables from .env
project_root = Path(__file__).parent.parent
env_path = project_root / ".env"
if not env_path.exists():
    logger.warning(f".env file not found at {env_path}, will use environment variables")
    NOTION_API_KEY = os.getenv("NOTION_API_KEY")
else:
    load_dotenv(env_path)
    NOTION_API_KEY = os.getenv("NOTION_API_KEY")

if not NOTION_API_KEY:
    logger.warning("Missing NOTION_API_KEY in environment variables")

# Type definitions for better type hinting
MCPResult = Dict[str, Any]
MCPToolFunction = Callable[..., Union[str, Dict[str, Any]]]
AsyncMCPToolFunction = Callable[..., Awaitable[Union[str, Dict[str, Any]]]]

def handle_result(func):
    """
    Decorator to standardize result handling for MCP tool functions.
    Parses JSON strings and handles errors consistently.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            result = func(*args, **kwargs)
            
            # Parse the result if it's a string (JSON)
            if isinstance(result, str):
                try:
                    return json.loads(result)
                except json.JSONDecodeError:
                    # If it's not JSON, return it as is in a result field
                    return {"result": result, "success": True}
            else:
                # If it's already a dict or other object, return it as is
                return {"result": result, "success": True}
                
        except Exception as e:
            logger.exception(f"Error in MCP tool {func.__name__}: {e}")
            return {"error": str(e), "success": False}
    
    return wrapper

class NotionServer:
    """
    Server for interacting with Notion through MCP.
    Provides methods for working with databases, pages, blocks and comments.
    """
    
    def __init__(self, user_id: Optional[str] = None):
        """
        Initialize the Notion server.
        
        Args:
            user_id: Optional user ID to use for all requests
        """
        self.user_id = user_id
        logger.debug(f"Initialized Notion server for user_id: {user_id}")
    
    @handle_result
    def list_databases(self, user_id: Optional[str] = None) -> MCPResult:
        """
        List all databases the integration has access to.
        
        Args:
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with list of databases
        """
        effective_user_id = user_id or self.user_id
        return notion_list_databases(user_id=effective_user_id)
    
    @handle_result
    def query_database(
        self, 
        database_id: str, 
        filter: Optional[Dict] = None, 
        sorts: Optional[List] = None,
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Query a Notion database for pages based on filter and sort criteria.
        
        Args:
            database_id: The ID of the database to query
            filter: Filter conditions for the query
            sorts: Sorting criteria for the results
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with query results
        """
        effective_user_id = user_id or self.user_id
        return notion_query_database(
            user_id=effective_user_id,
            database_id=database_id,
            filter=filter,
            sorts=sorts
        )
    
    @handle_result
    def create_page(
        self, 
        parent_id: str, 
        properties: Dict, 
        children: Optional[List] = None,
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Create a new page in a Notion database or as a child of another page.
        
        Args:
            parent_id: The ID of the parent database or page
            properties: Page properties conforming to the database schema
            children: Optional content blocks for the page
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with the created page details
        """
        effective_user_id = user_id or self.user_id
        return notion_create_page(
            user_id=effective_user_id,
            parent_id=parent_id,
            properties=properties,
            children=children
        )
    
    @handle_result
    def update_page(
        self, 
        page_id: str, 
        properties: Dict, 
        archived: bool = False,
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Update an existing Notion page's properties or archive it.
        
        Args:
            page_id: The ID of the page to update
            properties: Updated properties
            archived: Flag to archive the page
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with the updated page
        """
        effective_user_id = user_id or self.user_id
        return notion_update_page(
            user_id=effective_user_id,
            page_id=page_id,
            properties=properties,
            archived=archived
        )
    
    @handle_result
    def search(
        self, 
        query: str, 
        filter: Optional[Dict] = None, 
        sort: Optional[Dict] = None,
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Search Notion content across databases.
        
        Args:
            query: Search query text
            filter: Optional search filters
            sort: Optional sorting criteria
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with search results
        """
        effective_user_id = user_id or self.user_id
        return notion_search(
            user_id=effective_user_id,
            query=query,
            filter=filter,
            sort=sort
        )
    
    @handle_result
    def get_block_children(
        self, 
        block_id: str, 
        page_size: int = 100,
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Retrieve children blocks of a page or block.
        
        Args:
            block_id: The ID of the block (can be a page ID)
            page_size: Maximum number of blocks to return
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with child blocks
        """
        effective_user_id = user_id or self.user_id
        return notion_get_block_children(
            user_id=effective_user_id,
            block_id=block_id,
            page_size=page_size
        )
    
    @handle_result
    def append_block_children(
        self, 
        block_id: str, 
        children: List,
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Append child blocks to an existing block or page.
        
        Args:
            block_id: The ID of the parent block (can be a page ID)
            children: List of child block objects to append
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with result of the append operation
        """
        effective_user_id = user_id or self.user_id
        return notion_append_block_children(
            user_id=effective_user_id,
            block_id=block_id,
            children=children
        )
    
    @handle_result
    def add_comment(
        self, 
        comment_text: str,
        page_id: Optional[str] = None, 
        discussion_id: Optional[str] = None,
        user_id: Optional[str] = None
    ) -> MCPResult:
        """
        Add a comment to a page or respond to a discussion thread.
        
        Args:
            comment_text: The text content of the comment
            page_id: The ID of the page to comment on
            discussion_id: The ID of the discussion thread to respond to
            user_id: Optional user ID (overrides the one set in constructor)
            
        Returns:
            Dictionary with created comment
        """
        effective_user_id = user_id or self.user_id
        return notion_add_comment(
            user_id=effective_user_id,
            page_id=page_id,
            discussion_id=discussion_id,
            comment_text=comment_text
        )

# Initialize MCP Server for Notion
server = Server("notion-mcp")

@server.list_tools()
async def list_tools() -> List[Any]:
    """
    Returns the list of available Notion tools.
    """
    return get_notion_tools()

@server.call_tool()
async def call_tool(name: str, arguments: Any) -> Sequence[Any]:
    """
    Dispatch tool calls to the corresponding Notion client method.
    Uses asyncio.to_thread() to run blocking API calls.
    """
    try:
        if name == "list_databases":
            databases = await asyncio.to_thread(notion_list_databases)
            return [TextContent(type="text", text=str(databases))]
        
        elif name == "query_database":
            database_id = arguments.get("database_id")
            if not database_id:
                raise ValueError("database_id is required")
            results = await asyncio.to_thread(
                notion_query_database,
                database_id=database_id,
                filter=arguments.get("filter"),
                sorts=arguments.get("sorts")
            )
            return [TextContent(type="text", text=str(results))]
        
        elif name == "create_page":
            parent_id = arguments.get("parent_id")
            properties = arguments.get("properties")
            if not parent_id or not properties:
                raise ValueError("parent_id and properties are required")
            page = await asyncio.to_thread(
                notion_create_page,
                parent_id=parent_id,
                properties=properties,
                children=arguments.get("children")
            )
            return [TextContent(type="text", text=str(page))]
        
        elif name == "update_page":
            page_id = arguments.get("page_id")
            properties = arguments.get("properties")
            if not page_id or not properties:
                raise ValueError("page_id and properties are required")
            page = await asyncio.to_thread(
                notion_update_page,
                page_id=page_id,
                properties=properties,
                archived=arguments.get("archived", False)
            )
            return [TextContent(type="text", text=str(page))]
        
        elif name == "search":
            query = arguments.get("query")
            if not query:
                raise ValueError("query is required")
            results = await asyncio.to_thread(
                notion_search,
                query=query,
                filter=arguments.get("filter"),
                sort=arguments.get("sort")
            )
            return [TextContent(type="text", text=str(results))]
        
        elif name == "get_block_children":
            block_id = arguments.get("block_id")
            if not block_id:
                raise ValueError("block_id is required")
            children = await asyncio.to_thread(
                notion_get_block_children,
                block_id=block_id,
                page_size=arguments.get("page_size", 100)
            )
            return [TextContent(type="text", text=str(children))]
        
        elif name == "append_block_children":
            block_id = arguments.get("block_id")
            children = arguments.get("children")
            if not block_id or not children:
                raise ValueError("block_id and children are required")
            result = await asyncio.to_thread(
                notion_append_block_children,
                block_id=block_id,
                children=children
            )
            return [TextContent(type="text", text=str(result))]
        
        elif name == "add_comment":
            comment_text = arguments.get("comment_text")
            if not comment_text:
                raise ValueError("comment_text is required")
            
            # Need either page_id or discussion_id
            page_id = arguments.get("page_id")
            discussion_id = arguments.get("discussion_id")
            if not page_id and not discussion_id:
                raise ValueError("Either page_id or discussion_id must be provided")
                
            comment = await asyncio.to_thread(
                notion_add_comment,
                comment_text=comment_text,
                page_id=page_id,
                discussion_id=discussion_id
            )
            return [TextContent(type="text", text=str(comment))]
        
        else:
            raise ValueError(f"Unknown tool: {name}")
    except Exception as e:
        logger.error(f"Error executing tool {name}: {e}", exc_info=True)
        return [TextContent(type="text", text=f"Error: {str(e)}")]

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream, server.create_initialization_options())

if __name__ == "__main__":
    asyncio.run(main())
