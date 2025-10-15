"use client";
import { useEffect, useState } from 'react';

export default function SetViewTokenPage({
  params: { jobId },
}: {
  params: {
    jobId: string;
  };
}) {
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  useEffect(() => {
    // Indicate that the component has mounted
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && jobId) {
      // Extract the current URL parameters from window.location
      const url = new URL(window.location.href);
      const approvalUserId = url.searchParams.get("user_id");

      // Store the jobId in localStorage
      localStorage.setItem('jobShareToken', jobId);
      
      // Store the approvalUserId in localStorage if it exists
      if (approvalUserId) {
        localStorage.setItem('approvalUserId', approvalUserId);
      }

      // Redirect to the job edit page using window.location
      window.location.href = `/job/edit/${jobId}`;
    }
  }, [isMounted, jobId]);

  return null; // No content, just the side-effect
}
