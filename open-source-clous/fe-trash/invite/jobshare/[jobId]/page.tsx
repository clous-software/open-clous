"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SetViewTokenPage({
  params: { jobId },
}: {
  params: {
    jobId: string;
  };
}) {

  useEffect(() => {
    // Ensure we have the jobId from the URL
    if (jobId) {
      // Generate a random token
      // Create the viewToken by combining the random token and jobId
      const jobShareToken = jobId;
      // Store the viewToken in localStorage
      localStorage.setItem('jobShareToken', jobShareToken);

      // Optionally, redirect to another page or perform another action
      window.open(`/job/edit/${jobId}`, '_self');
    }
  }, [jobId]);

  return null; // No content, just the side-effect
}

// const handleGenerateRandomToken = () => {
//   const tokenLength = 16;
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let token = '';
//   for (let i = 0; i < tokenLength; i++) {
//     token += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return token;
// };
