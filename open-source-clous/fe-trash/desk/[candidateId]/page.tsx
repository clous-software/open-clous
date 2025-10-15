"use client";
import React, { useState, useEffect, useCallback } from "react";
import { IoMenuOutline } from "react-icons/io5";
import ChatComponent from "@/components/experience/chatComponent"; // Adjust the import path as needed
import { getTimeInsights } from "@/app/api/users/route"; // Adjust the import paths as needed
import { convertToBase64, formatTimeDifference } from "@/utils/formattingUtils"; // Adjust the import path as needed
import { createPostRequest } from "@/app/api/ai/route";
interface CV {
  file: string;
}
interface Resume {
  id: string;
  linkedin_url: string;
  insights: string;
  cvs: CV[];
}
interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  linkedin_url?: string;
  function?: string;
}
interface Qualification {
  status: string;
  insights: string;
  score?: number;
  feedback?: number;
  job: Job;
}
interface Interview {
  user: User;
  candidate: User;
  scheduled_datetime: string;
  transcription: string;
  summary: string;
  insights: string;
  inotes: string;
}
interface Reply {
  id: string;
  name: string | string[];
  candidate: User;
  insights: string;
  description: string;
  followup_question: string;
}
interface Question {
  id: string;
  job: string;
  question: string;
  reasoning: string | null;
  replies: Reply[];
}
interface Candidate {
  user: User;
  qualification: Qualification;
  resumes: Resume[];
  interviews?: Interview[];
  questions?: Question[];
}
interface Job {
  id: string;
  role: string;
  title: string;
  status: string;
  recruiter_notes?: string;
  monitor_status: number;
}
const progressStages = [
  { stage: 1, label: "Application Received" },
  { stage: 2, label: "Interview Scheduled" },
  { stage: 3, label: "Offer Extended" },
  { stage: 4, label: "Onboarding Started" },
];
const CandidateMonitor = ({
  params: { candidateId },
}: {
  params: {
    candidateId: string;
  };
}) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [candidateJobs, setCandidateJobs] = useState<Candidate[]>([]);
  const [insight, setInsight] = useState<string>("");
  const [refreshTime, setRefreshTime] = useState<number>(0); // Timestamp for next insights refresh
  const [isInitiated, setIsInitiated] = useState<boolean>(false);

  useEffect(() => {
    // Fetch candidate's jobs
    const fetchCandidateJobs = async () => {
      try {
        const response = await getCandidateJobs(candidateId);
        // Assuming the response is an array of Candidate objects
        setCandidateJobs(response);
      } catch (error) {
        console.error("Error fetching candidate jobs:", error);
      }
    };
    fetchCandidateJobs();
  }, [candidateId]);
  const fetchInsights = useCallback(async () => {
    const now = Date.now();
    if (now < refreshTime) {
      // Do not fetch insights if the refresh time has not been reached
      return;
    }
    try {
      const response = await getTimeInsights("monitor", "candidate");
      setInsight(response.data.insights);
      // Set next refresh time to 72 hours later
      const nextRefresh = now + 72 * 60 * 60 * 1000;
      setRefreshTime(nextRefresh);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  }, [refreshTime, candidateId]);
  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);
  const handleAssistantOpen = () => {
    setIsAssistantOpen(!isAssistantOpen);
  };
  const apiCall = async (message: string, files?: File[]) => {
    try {
      let uploadedFiles: any[] = [];
      if (files && files.length > 0) {
        uploadedFiles = await Promise.all(
          files.map(async (file) => {
            const base64 = await convertToBase64(file);
            return {
              file,
              name: file.name,
              type: file.type,
              size: file.size,
              preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
              base64: base64,
              uploading: false,
            };
          })
        );
      }
      const response = await createPostRequest(
        message,
        "candidate",
        uploadedFiles,
        [[candidateId, 'candidate']]
      );
      return response;
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  };
  // Helper function to get the current stage of the job
  const getCurrentStage = (monitor_status: number) => {
    return monitor_status || 0;
  };
  return (
    <main className={`h-screen w-screen overflow-hidden ${isAssistantOpen ? "pl-12" : "px-12"}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 ${isAssistantOpen ? "w-2/3" : "w-full"}`}>
          <h1 className="text-2xl font-semibold">Your job opportunities</h1>
          <button
            onClick={handleAssistantOpen}
            className="text-gray-600 hover:bg-gray-foreground/10 rounded-lg p-2"
          >
            <IoMenuOutline size={24} />
          </button>
        </div>
        <div className="flex flex-grow overflow-hidden rounded-3xl">
          {/* Main UI */}
          <div
            className={`flex flex-col flex-grow bg-gray-100 rounded-3xl ${isAssistantOpen ? "w-2/3" : "w-full"
              } transition-all duration-300`}
          >
            {/* Candidate Jobs */}
            <div className="flex flex-col px-6 space-y-6 overflow-y-auto pt-6">
              {candidateJobs.map((candidate) => {
                const job = candidate.qualification.job; // Access the job from the qualification
                const currentStage = getCurrentStage(job.monitor_status);
                return (
                  <div key={job.id} className="bg-white px-4 py-3 rounded-2xl hover:-translate-y-0.5 hover:shadow-sm long-transition">
                    {/* Job Title and Progress Bar */}
                    <div className="flex flex-col mb-4">
                      <h3 className="text-xl font-semibold">{job.role}</h3>
                      {/* Progress Bar and Stage Label */}
                      <div className="flex flex-col items-end">
                        {/* Stage Label */}
                        <div className="mb-2">
                          <p className="text-sm font-medium text-gray-foreground">
                            {progressStages.find((stage) => stage.stage === currentStage)?.label ||
                              "Process not started yet"}
                          </p>
                        </div>
                        {/* Progress Bar */}
                        <div className="flex items-center w-full">
                          {progressStages.map((stage, index) => (
                            <React.Fragment key={stage.stage}>
                              <div className={`flex-1 h-1 rounded-full ${currentStage > index ? "bg-primary" : "bg-gray-300"}`}></div>
                              {index < progressStages.length - 1 && (
                                <div className="w-1 h-1"></div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Job Details */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-foreground text-sm">Your status</h4>
                        <p className="text-sm capitalize">{candidate.qualification.status}</p>
                      </div>
                      {job.recruiter_notes && (
                        <div>
                          <h4 className="font-medium text-gray-foreground text-sm">Recruiter Notes</h4>
                          <p className="text-sm">{job.recruiter_notes}</p>
                        </div>
                      )}
                      {candidate.qualification.insights && (
                        <div>
                          <h4 className="font-medium text-gray-foreground text-sm">Insights</h4>
                          <p className="text-sm">{candidate.qualification.insights}</p>
                        </div>
                      )}
                      {/* Feedback, if any */}
                      {candidate.qualification.feedback && (
                        <div>
                          <h4 className="font-medium text-gray-foreground text-sm">Feedback</h4>
                          <p className="text-sm">{candidate.qualification.feedback}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* AI Assistant */}
          {isAssistantOpen && (
            <div className="w-1/3 pb-3 px-3">
              <ChatComponent
                size="small"
                position="bottom"
                type="candidate"
                isInitiated={isInitiated}
                setIsInitiated={setIsInitiated}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
export default CandidateMonitor;