"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import mixpanel from "mixpanel-browser";

export default function SetViewTokenPage({
  params: { companyId },
}: {
  params: {
    companyId: string;
  };
}) {
  useEffect(() => {
    // Ensure we have the jobId from the URL
    if (companyId) {
      // Create the viewToken by combining the random token and jobId
      const pulseToken = `${companyId}`;
      // Store the viewToken in localStorage
      localStorage.setItem('feedbackToken', pulseToken);

      // Optionally, redirect to another page or perform another action
      window.open(`/pulse/${companyId}`, '_self');
    }
  }, [companyId]);

  return null; // No content, just the side-effect
}