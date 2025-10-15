"""
MCP Resource Client for Merge HRIS integrations.
This client provides MCP-compatible resource endpoints for Merge HRIS data.
"""

import logging
from typing import Dict, Any, List, Optional, Union
from django.conf import settings

from services.integrations.servers.merge_server import MergeServer, MergeServerError, MergeAuthError, MergeAPIError

# Configure logging
logger = logging.getLogger(__name__)

class MCPResourceClient:
    """
    MCP-compatible resource client for Merge HRIS integrations.
    This client provides standardized resource endpoints for accessing
    and managing HRIS data through the Merge API.
    """
    
    def __init__(self, user_id: Optional[str] = None):
        """
        Initialize the MCP Resource Client.
        
        Args:
            user_id: Optional user ID to associate with the client
        """
        self.user_id = user_id
        self.merge = MergeServer(user_id=user_id)
    
    def _format_resource_response(self, result: Dict[str, Any]) -> Dict[str, Any]:
        """
        Format a server response into an MCP-compatible resource response.
        
        Args:
            result: The result from a MergeServer method
            
        Returns:
            An MCP-compatible resource response dictionary
        """
        if not result.get("success", False):
            error_message = result.get("error", "Unknown error")
            requires_auth = result.get("requires_auth", False)
            
            response = {
                "success": False,
                "error": error_message
            }
            
            if requires_auth:
                response["requires_auth"] = True
                response["auth_type"] = "merge"
                
            return response
        
        return {
            "success": True,
            "data": result.get("response", {})
        }
    
    def read_resource(
        self,
        resource_type: str,
        resource_id: str,
        provider: Optional[str] = None,
        include_remote_data: bool = False,
        include_sensitive_fields: bool = False,
        **kwargs
    ) -> Dict[str, Any]:
        """
        Read a specific resource from Merge.
        
        Args:
            resource_type: The type of resource to read (employee, team, time_off)
            resource_id: The ID of the resource
            provider: Optional provider name to filter by
            include_remote_data: Whether to include data from the underlying provider
            include_sensitive_fields: Whether to include sensitive fields
            **kwargs: Additional parameters to pass to the API
            
        Returns:
            A dictionary with the resource data or error
        """
        try:
            if resource_type == "employee":
                result = self.merge.get_employee(
                    user_id=self.user_id,
                    employee_id=resource_id,
                    provider=provider,
                    include_remote_data=include_remote_data,
                    include_sensitive_fields=include_sensitive_fields,
                    **kwargs
                )
                return self._format_resource_response(result)
                
            elif resource_type == "team":
                # Teams don't have a direct get method, so we list and filter
                result = self.merge.list_teams(
                    user_id=self.user_id,
                    provider=provider,
                    include_remote_data=include_remote_data,
                    **kwargs
                )
                
                if result.get("success"):
                    teams = result["response"]["teams"]
                    team = next((t for t in teams if t["id"] == resource_id), None)
                    
                    if team:
                        return {
                            "success": True,
                            "data": {"team": team}
                        }
                    else:
                        return {
                            "success": False,
                            "error": f"Team with ID {resource_id} not found"
                        }
                        
                return self._format_resource_response(result)
                
            elif resource_type == "time_off":
                # Time off doesn't have a direct get method, so we list and filter
                result = self.merge.list_time_off(
                    user_id=self.user_id,
                    provider=provider,
                    include_remote_data=include_remote_data,
                    **kwargs
                )
                
                if result.get("success"):
                    time_off_records = result["response"]["time_off"]
                    record = next((r for r in time_off_records if r["id"] == resource_id), None)
                    
                    if record:
                        return {
                            "success": True,
                            "data": {"time_off": record}
                        }
                    else:
                        return {
                            "success": False,
                            "error": f"Time off record with ID {resource_id} not found"
                        }
                        
                return self._format_resource_response(result)
                
            else:
                return {
                    "success": False,
                    "error": f"Unsupported resource type: {resource_type}"
                }
                
        except MergeAuthError as e:
            return {
                "success": False,
                "error": str(e),
                "requires_auth": True,
                "auth_type": "merge"
            }
        except (MergeServerError, MergeAPIError) as e:
            return {
                "success": False,
                "error": str(e)
            }
        except Exception as e:
            logger.exception(f"Error reading resource: {e}")
            return {
                "success": False,
                "error": f"Failed to read resource: {str(e)}"
            }
    
    def list_resources(
        self,
        resource_type: str,
        provider: Optional[str] = None,
        company_id: Optional[str] = None,
        employment_status: Optional[str] = None,
        employment_type: Optional[str] = None,
        employee_id: Optional[str] = None,
        approver_id: Optional[str] = None,
        request_type: Optional[str] = None,
        status: Optional[str] = None,
        include_remote_data: bool = False,
        include_sensitive_fields: bool = False,
        modified_after: Optional[str] = None,
        modified_before: Optional[str] = None,
        page_size: int = 100,
        **kwargs
    ) -> Dict[str, Any]:
        """
        List resources from Merge.
        
        Args:
            resource_type: The type of resources to list (employees, teams, time_off)
            provider: Optional provider name to filter by
            company_id: Optional company ID to filter by (for employees)
            employment_status: Optional employment status to filter by (for employees)
            employment_type: Optional employment type to filter by (for employees)
            employee_id: Optional employee ID to filter by (for time off)
            approver_id: Optional approver ID to filter by (for time off)
            request_type: Optional request type to filter by (for time off)
            status: Optional status to filter by (for time off)
            include_remote_data: Whether to include data from the underlying provider
            include_sensitive_fields: Whether to include sensitive fields
            modified_after: Optional modified date after which to filter
            modified_before: Optional modified date before which to filter
            page_size: Maximum number of results to return
            **kwargs: Additional parameters to pass to the API
            
        Returns:
            A dictionary with the list of resources or error
        """
        try:
            params = {
                "user_id": self.user_id,
                "provider": provider,
                "include_remote_data": include_remote_data,
                "modified_after": modified_after,
                "modified_before": modified_before,
                "page_size": page_size,
                **kwargs
            }
            
            if resource_type == "employees":
                params.update({
                    "company_id": company_id,
                    "employment_status": employment_status,
                    "employment_type": employment_type,
                    "include_sensitive_fields": include_sensitive_fields
                })
                result = self.merge.list_employees(**params)
                
            elif resource_type == "teams":
                result = self.merge.list_teams(**params)
                
            elif resource_type == "time_off":
                params.update({
                    "employee_id": employee_id,
                    "approver_id": approver_id,
                    "request_type": request_type,
                    "status": status
                })
                result = self.merge.list_time_off(**params)
                
            else:
                return {
                    "success": False,
                    "error": f"Unsupported resource type: {resource_type}"
                }
                
            return self._format_resource_response(result)
            
        except MergeAuthError as e:
            return {
                "success": False,
                "error": str(e),
                "requires_auth": True,
                "auth_type": "merge"
            }
        except (MergeServerError, MergeAPIError) as e:
            return {
                "success": False,
                "error": str(e)
            }
        except Exception as e:
            logger.exception(f"Error listing resources: {e}")
            return {
                "success": False,
                "error": f"Failed to list resources: {str(e)}"
            }
    
    def create_resource(
        self,
        resource_type: str,
        resource_data: Dict[str, Any],
        provider: Optional[str] = None,
        **kwargs
    ) -> Dict[str, Any]:
        """
        Create a new resource in Merge.
        
        Args:
            resource_type: The type of resource to create (employee, time_off)
            resource_data: The data for the new resource
            provider: Optional provider name to filter by
            **kwargs: Additional parameters to pass to the API
            
        Returns:
            A dictionary with the created resource or error
        """
        try:
            if resource_type == "employee":
                result = self.merge.create_employee(
                    user_id=self.user_id,
                    employee_data=resource_data,
                    provider=provider,
                    **kwargs
                )
                
            elif resource_type == "time_off":
                result = self.merge.create_time_off(
                    user_id=self.user_id,
                    time_off_data=resource_data,
                    provider=provider,
                    **kwargs
                )
                
            else:
                return {
                    "success": False,
                    "error": f"Unsupported resource type: {resource_type}"
                }
                
            return self._format_resource_response(result)
            
        except MergeAuthError as e:
            return {
                "success": False,
                "error": str(e),
                "requires_auth": True,
                "auth_type": "merge"
            }
        except (MergeServerError, MergeAPIError) as e:
            return {
                "success": False,
                "error": str(e)
            }
        except Exception as e:
            logger.exception(f"Error creating resource: {e}")
            return {
                "success": False,
                "error": f"Failed to create resource: {str(e)}"
            }
    
    def force_sync(self, provider: Optional[str] = None) -> Dict[str, Any]:
        """
        Force a sync of data from the HRIS provider.
        
        Args:
            provider: Optional provider name to filter by
            
        Returns:
            A dictionary with the sync status or error
        """
        try:
            result = self.merge.force_sync(
                user_id=self.user_id,
                provider=provider
            )
            return self._format_resource_response(result)
            
        except MergeAuthError as e:
            return {
                "success": False,
                "error": str(e),
                "requires_auth": True,
                "auth_type": "merge"
            }
        except (MergeServerError, MergeAPIError) as e:
            return {
                "success": False,
                "error": str(e)
            }
        except Exception as e:
            logger.exception(f"Error forcing sync: {e}")
            return {
                "success": False,
                "error": f"Failed to force sync: {str(e)}"
            }
    
    def get_sync_status(self, provider: Optional[str] = None) -> Dict[str, Any]:
        """
        Get the sync status for the HRIS provider.
        
        Args:
            provider: Optional provider name to filter by
            
        Returns:
            A dictionary with the sync status or error
        """
        try:
            result = self.merge.get_sync_status(
                user_id=self.user_id,
                provider=provider
            )
            return self._format_resource_response(result)
            
        except MergeAuthError as e:
            return {
                "success": False,
                "error": str(e),
                "requires_auth": True,
                "auth_type": "merge"
            }
        except (MergeServerError, MergeAPIError) as e:
            return {
                "success": False,
                "error": str(e)
            }
        except Exception as e:
            logger.exception(f"Error getting sync status: {e}")
            return {
                "success": False,
                "error": f"Failed to get sync status: {str(e)}"
            } 