"use client";

import React, { useState, useEffect, useCallback } from "react";
import { IoChatbubblesOutline, IoPersonAdd, IoClose } from "react-icons/io5";
import ChatComponent from "@/components/experience/chatComponent";
import { getJobById, updateJob } from "@/app/api/jobs/route";
import { getCandidates, getTimeInsights } from "@/app/api/users/route";
import Footer from "@/components/navigation/Footer";
import { formatTimeDifference } from "@/utils/formattingUtils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ActionTooltip from "@/components/actions/ActionTooltip";
import { User } from "@/types/types";
import SharedNotes from "@/components/experience/SharedNotes";
import SearchAndSelect from "@/components/actions/SearchAndSelect";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CardChart } from "@/components/cards/CardChart";
import { MdLightbulbOutline } from "react-icons/md";
import { InsightItem } from "@/types/smallTypes";
import { Job } from "@/types/types";
import { ChartData } from "@/types/chart";
import { Pill } from "@/types/smallTypes";
import { aiFallbackPillsData } from "@/templates/aiFallback";
import useSimulateTyping from "@/hooks/animationEffects";

const statusOrder = ["applied", "firstInterview", "secondInterview", "thirdInterview", "fourthInterview", "fifthInterview", "onboarding"];

// Define the stages for the progress bar
const progressStages = [
  { stage: 1, label: "At least one candidate has applied" },
  { stage: 2, label: "At least one candidate has been interviewed" },
  { stage: 3, label: "At least 3 candidates are in the final stages (last and previous to last)" },
  { stage: 4, label: "At least one candidate has started onboarding (Onboarding stage)" },
];

interface InsightData {
  insight: InsightItem;
  help: InsightItem;
}


// hooks/useJobMonitorInsights.ts
import { useInsights } from "@/hooks/useInsights";

export function useJobMonitorInsights(jobId: string, currentStage: number) {
  // Build the custom message based on the stage.
  let userMessage = "";
  if (currentStage === 1) {
    userMessage = "We have candidates who applied. Provide additional hiring strategies at early stages.";
  } else if (currentStage === 2) {
    userMessage = "Candidates have been interviewed. Suggest insights to improve interview process.";
  } else if (currentStage === 3) {
    userMessage = "We have multiple candidates in final stages. Provide ways to narrow down and finalize.";
  } else if (currentStage === 4) {
    userMessage = "A candidate is onboarding. Provide post-hire and onboarding improvement suggestions.";
  }

  // Call the new hook for team insights.
  const teamInsights = useInsights({
    type: "monitor",
    subtype: "team",
    additionalParams: [jobId],
    localStorageKey: `insights-${jobId}-team`,
  });

  // Call the new hook for HR help insights.
  const helpInsights = useInsights({
    type: "monitor",
    subtype: "help_hr",
    additionalParams: [jobId, userMessage],
    localStorageKey: `insights-${jobId}-help`,
  });

  // Combine the results.
  const combinedData = {
    insight: teamInsights.insights,
    help: helpInsights.insights,
  };

  // Combine loading and error states.
  const loading = teamInsights.loading || helpInsights.loading;
  const error = teamInsights.error || helpInsights.error;

  // Create a combined refetch that calls both.
  const refetch = () => {
    teamInsights.refetch();
    helpInsights.refetch();
  };

  return { data: combinedData, loading, error, refetch };
}

const JobMonitorTeam = ({
  params: { jobId },
}: {
  params: {
    jobId: string;
  };
}) => {


  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [editedJob, setEditedJob] = useState<Job | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);

  const [currentTab, setCurrentTab] = useState<string>("insight");

  const [candidatesData, setCandidatesData] = useState<Record<string, User[]>>({});
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  const [isInitiated, setIsInitiated] = useState<boolean>(false);
  const [isAuthToken, setIsAuthToken] = useState<boolean>(false);
  const [isAddTeamMember, setIsAddTeamMember] = useState<boolean>(false);

  const [chartDataList, setChartDataList] = useState<ChartData[]>([]);


  const [recommendedActions, setRecommendedActions] = useState<Pill[]>([]);
  const [initialTitle, setInitialTitle] = useState<string>("");

  const { toast } = useToast();
  const { simulateTyping } = useSimulateTyping(30);

  useEffect(() => {

    if (!isInitiated) {
      let initialTitleRender = "Understand your HR colleagues";
      simulateTyping(initialTitleRender, setInitialTitle);
    }
  }, []);



  useEffect(() => {
    async function loadJobDetails() {
      if (jobId) {
        const res = await getJobById(jobId);
        setEditedJob(res);
        if (res && res.company) {
          const { company } = res;
          localStorage.setItem("companyId", company.id);
          setCompanyId(company.id);
        }
      }
    }
    loadJobDetails();
  }, [jobId]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const candidateDataResponse = await getCandidates(jobId);
        const groupedData: Record<string, User[]> = {};

        statusOrder.forEach((status) => {
          groupedData[status] = [];
        });

        candidateDataResponse.forEach((candidate: User) => {
          const stageName = candidate.qualification?.current_stage?.name || "No Stage";
          if (!groupedData[stageName]) {
            groupedData[stageName] = [];
          }
          groupedData[stageName].push(candidate);
        });

        // Remove empty stages
        Object.keys(groupedData).forEach((status) => {
          if (groupedData[status].length < 1) {
            delete groupedData[status];
          }
        });

        setCandidatesData(groupedData);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, [jobId]);

  // Determine the current stage of the hiring process
  const determineCurrentStage = (): number => {
    // Stage 1: At least one candidate applied
    const hasApplied = !!candidatesData['applied'] && candidatesData['applied'].length > 0;

    // Stage 2: At least one candidate interviewed
    // Check any status that contains 'Interview'
    const interviewedStages = Object.keys(candidatesData).filter(stage => stage.toLowerCase().includes('interview'));
    const hasInterviewed = interviewedStages.some(stage => candidatesData[stage].length > 0);

    // Stage 3: At least 3 candidates in final stages (assume last two are final: 'fifthInterview', 'onboarding')
    const finalStages = ['fifthInterview', 'onboarding'];
    const countFinalStageCandidates = finalStages.reduce((acc, stage) => acc + (candidatesData[stage]?.length || 0), 0);
    const hasThreeInFinal = countFinalStageCandidates >= 3;

    // Stage 4: At least one candidate in onboarding
    const hasOnboarding = !!candidatesData['onboarding'] && candidatesData['onboarding'].length > 0;

    if (hasOnboarding) return 4;
    if (hasThreeInFinal) return 3;
    if (hasInterviewed) return 2;
    if (hasApplied) return 1;
    return 0;
  };

  const currentStage = determineCurrentStage();


  const handleAssistantOpen = () => {
    setIsAssistantOpen(!isAssistantOpen);
  };

  const handleCandidateClick = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
  };

  const renderSuggestion = (user: User, onSelect: (item: User) => void) => (
    <div
      key={user.id}
      onClick={() => onSelect(user)}
      className="p-2 hover:bg-gray-100 cursor-pointer flex gap-1"
    >
      <Avatar className="w-[32px] h-[32px]">
        {user.logo ? (
          <AvatarImage src={user.logo} alt={`${user.first_name} ${user.last_name}`} />
        ) : (
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {user.first_name?.[0]}
            {user.last_name?.[0]}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex flex-col">
        <p className="text-sm font-medium">
          {user.first_name} {user.last_name}
        </p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
    </div>
  );

  const renderSelectedItem = (user: User, onRemove: (id: string) => void) => (
    <div
      key={user.id}
      className="group flex items-center gap-1 bg-gray-foreground/10 pr-1.5 pl-5 py-1 rounded-full"
    >
      <p className="text-sm font-medium text-gray-foreground group-hover:mr-1 longest-transition w-full">
        {user.first_name} {user.last_name}
      </p>
      <button
        onClick={() => onRemove(user.id)}
        className="text-gray-foreground cursor-pointer opacity-0 group-hover:opacity-100 longest-transition"
      >
        <IoClose />
      </button>
    </div>
  );

  const handleInviteClick = async (selectedMembers: User[]) => {
    if (selectedMembers.length === 0) {
      toast({
        variant: "destructive",
        title: "No team members selected",
        description: "Please select at least one team member to invite.",
      });
      return;
    }

    const teamMemberIds = selectedMembers.map(member => member.id);

    try {
      await updateJob(jobId, { invited: teamMemberIds });
      setIsAddTeamMember(false);
      toast({
        variant: "default",
        title: "Invitation sent!",
        description: "The selected team members have been invited.",
      });
    } catch (error) {
      console.error("Error inviting team members:", error);
      toast({
        variant: "destructive",
        title: "Couldn't send the invite!",
        description: "There was a problem inviting your colleagues.",
      });
    }
  };

  const { data: insightsData, loading, error, refetch } = useJobMonitorInsights(jobId, currentStage);

  return (
    <main className={`flex flex-grow h-screen w-screen bg-white overflow-hidden ${isAssistantOpen ? "pl-12" : "px-12"}`}>
      <div className={`flex flex-col h-full ${isAssistantOpen ? "w-2/3" : "w-full"}`}>
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4`}>
          <h1 className="text-2xl font-semibold">{editedJob?.title}</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="default"
              size="sm"
              onClick={() => window.open(`/job/${jobId}`, '_blank')}
            >
              View job
            </Button>
            <button onClick={handleAssistantOpen} className="text-gray-600 hover:bg-gray-foreground/10 rounded-lg p-2">
              <IoChatbubblesOutline size={24} />
            </button>
          </div>
        </div>

        <div className="flex flex-grow overflow-hidden rounded-t-3xl">
          {/* Main UI */}
          <div className={`flex flex-grow bg-[#FAFAFA] rounded-t-3xl  ${isAssistantOpen ? "w-2/3" : "w-full"} transition-all duration-300`}>
            <div className={`flex flex-col flex-grow rounded-3xl w-3/4`}>
              {/* Progress Bar and Stage Label */}
              <div className="px-6 pt-6">
                <div className="flex flex-col items-end mb-4">
                  {/* Stage Label */}
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-foreground">
                      {progressStages.find((stage) => stage.stage === currentStage)?.label || "The hiring process is not started yet"}
                    </p>
                  </div>
                  {/* Progress Bar */}
                  <div className="flex items-center w-full gap-1">
                    {progressStages.map((stageObj, index) => {
                      const isCompleted = currentStage > index;
                      return (
                        <div key={stageObj.stage} className="flex-1 h-1 rounded-full relative overflow-hidden">
                          <div className={isCompleted ? "bg-primary w-full h-full" : "bg-gray-300 w-full h-full"}></div>
                          {isCompleted && (
                            <div className="spark-animation absolute top-0 left-0 h-[3px] bg-white/50 w-[20px] rounded-full"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {chartDataList.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-4 px-6">
                  {chartDataList.map((chartData, index) => (
                    <CardChart key={index} data={chartData} onPrompt={() => { }} />
                  ))}
                </div>
              )}

              {/* Insights */}

              <div className="p-6">
                <Tabs defaultValue="insight" className="w-full" onValueChange={setCurrentTab}>
                  <div className="flex items-center justify-between">
                    <TabsList className="w-fit flex items-center gap-4">
                      <TabsTrigger value="insight" className="text-sm">Insight</TabsTrigger>
                      <TabsTrigger value="help" className="text-sm">How can I help?</TabsTrigger>
                    </TabsList>
                    {currentTab === "insight" && (
                      <div className={`z-40 flex items-center rounded-lg gap-1`}>
                        {insightsData?.insight?.action && (
                          <ActionTooltip
                            label="Ask AI"
                            side="bottom"
                            align="start"
                            style="dark"
                          >
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => window.open(`https://beta.clous.app/?q=${encodeURIComponent(insightsData.insight.action)}`, '_blank')}
                              className="text-sm"
                            >
                              Ask Peer
                            </Button>
                          </ActionTooltip>
                        )}
                        <ActionTooltip
                          label={insightsData?.insight?.explain}
                          side="bottom"
                          align="start"
                        >
                          <div className="cursor-help p-1.5 rounded-lg bg-gray-foreground/10 hover:bg-transparent group">
                            <MdLightbulbOutline className="w-3.5 h-3.5 text-gray-foreground" />
                          </div>
                        </ActionTooltip>
                      </div>
                    )}
                  </div>

                  <TabsContent value="insight" className="mt-4">
                    {insightsData?.insight ? (
                      <div className="flex flex-col gap-2">
                        <p className="text-gray-foreground text-sm">{insightsData.insight.insights}</p>
                      </div>
                    ) : (
                      <p className="text-gray-foreground text-sm">
                        There are no specific insights available at the moment.
                      </p>
                    )}
                  </TabsContent>

                  <TabsContent value="help" className="mt-4">
                    {insightsData?.help ? (
                      <div className="flex flex-col gap-2">
                        <p className="text-gray-foreground text-sm">{insightsData?.help?.insights}</p>
                        <div className="flex items-center gap-2">
                          <ActionTooltip
                            label={insightsData?.help?.explain}
                            side="bottom"
                            align="start"
                          >
                            <div className="cursor-help p-1.5 rounded-lg bg-gray-foreground/10 hover:bg-transparent group">
                              <MdLightbulbOutline className="w-3.5 h-3.5 text-gray-foreground" />
                            </div>
                          </ActionTooltip>
                          {insightsData?.help?.action && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => window.open(`https://beta.clous.app/?q=${encodeURIComponent(insightsData.help.action)}`, '_blank')}
                            >
                              Ask Peer
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-foreground text-sm">
                        No recommended actions at this time.
                      </p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {(!editedJob?.invited || editedJob.invited.length === 0) ? (
                <div className="px-6">
                  <p className="text-gray-foreground font-medium">No team member invited nor involved</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-6">
                  <div className="flex items-center gap-1">
                    {isAddTeamMember ? (
                      <div className="relative flex flex-col mr-4">
                        <SearchAndSelect<User>
                          type="team_member"
                          onSubmit={handleInviteClick}
                          renderSuggestion={renderSuggestion}
                          renderSelectedItem={renderSelectedItem}
                          submitButtonLabel="Invite"
                          inputPlaceholder="Search team members"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center bg-gray-foreground/10 px-2 py-1 rounded-lg cursor-pointer mr-6" onClick={() => setIsAddTeamMember(true)}>
                        <ActionTooltip label="Add team members"
                          side="bottom"
                          align="end"
                        >
                          <h4 className="flex items-center gap-1 text-xs text-gray-foreground font-medium">
                            <IoPersonAdd />
                            Add
                          </h4>
                        </ActionTooltip>
                      </div>
                    )}

                    {editedJob?.invited?.slice(0, 3).map((member) => (
                      <ActionTooltip
                        key={member.id}
                        label={`${member.first_name} ${member.last_name}\n${member.company_user?.company ? `${member.company_user?.company} · ` : ""}${member.company_user?.function}`}
                        side="bottom"
                        align="end"
                      >
                        <Avatar
                          className="w-6 h-6 rounded-full p-0 flex items-center justify-center"
                        >
                          {member.logo ? (
                            <AvatarImage
                              src={member.logo}
                              alt={`${member.first_name} ${member.last_name}`}
                            />
                          ) : (
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs w-6 h-6 rounded-full flex items-center justify-center">
                              {member.first_name?.[0]}
                              {member.last_name?.[0]}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </ActionTooltip>
                    ))}

                    {editedJob?.invited && editedJob?.invited?.length > 0 ? (
                      editedJob?.invited?.length > 5 ? (
                        <span className="text-xs text-gray-foreground font-medium ml-1">
                          +{editedJob?.invited?.length - 5} members
                        </span>
                      ) : (
                        <h4 className="text-xs text-gray-foreground font-medium ml-3 mt-1">joined the hiring process</h4>
                      )
                    ) : (
                      <h4 className="text-xs text-gray-foreground font-medium ml-3 mt-1">No team members added yet</h4>
                    )}

                    {(editedJob?.invited && editedJob.invited.length > 0) && (
                      <div className="px-6 mt-2 flex items-center gap-1">
                        <div className="flex -space-x-2">
                          {editedJob.invited.slice(0, 3).map((user) => (
                            <ActionTooltip
                              key={user.id}
                              label={`${user.first_name} ${user.last_name}${user.company_user?.company ? `\n${user.company_user?.company} · ` : ""}${user.company_user?.function || ""}`}
                              side="bottom"
                              align="end"
                            >
                              <Avatar
                                className="w-6 h-6 rounded-full p-0 flex items-center justify-center"
                              >
                                {user.logo ? (
                                  <AvatarImage
                                    src={user.logo}
                                    alt={`${user.first_name} ${user.last_name}`}
                                  />
                                ) : (
                                  <AvatarFallback className="bg-primary text-primary-foreground text-xs w-6 h-6 rounded-full flex items-center justify-center">
                                    {user.first_name?.[0]}
                                    {user.last_name?.[0]}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                            </ActionTooltip>
                          ))}
                        </div>

                        {editedJob.invited.length > 3 ? (
                          <span className="text-xs text-gray-foreground font-medium ml-1">
                            +{editedJob.invited.length - 3} invited
                          </span>
                        ) : (
                          <h4 className="text-xs text-gray-foreground font-medium ml-3 mt-1">invited to join</h4>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Candidates Kanban Board */}
              <div className="flex overflow-x-auto p-4 space-x-4">
                {Object.keys(candidatesData).length > 0 ? (
                  Object.keys(candidatesData).map((status) => (
                    <div key={status} className="w-80 flex-shrink-0">
                      <div className={`mb-2 text-sm inline-flex rounded-full flex gap-1.5 items-center justify-center px-2 py-0.5 font-semibold bg-[#FAEBDD]`}>
                        <div className={`w-2 h-2 rounded-full bg-[#D9730D]`} />
                        <span className="whitespace-nowrap flex inline-flex text-[#D9730D] capitalize">
                          {status}
                        </span>
                      </div>
                      {candidatesData[status].map((candidate) => {
                        const lastAppliedDate = candidate.qualification?.created_at
                          ? new Date(candidate.qualification.created_at)
                          : null;
                        const lastInterviewedDate =
                          candidate.interviews && candidate.interviews.length > 0
                            ? new Date(candidate.interviews[0].created_at)
                            : null;

                        let mostRecentDate = lastAppliedDate;
                        let mostRecentLabel = "Last applied";

                        if (lastInterviewedDate && lastInterviewedDate > (lastAppliedDate || 0)) {
                          mostRecentDate = lastInterviewedDate;
                          mostRecentLabel = "Last interviewed";
                        }

                        if (!mostRecentDate) {
                          mostRecentLabel = "No activity recorded";
                        }
                        return (
                          <div
                            key={candidate.id}
                            onClick={() => handleCandidateClick(candidate.id)}
                            className="px-3 py-2 rounded-2xl mb-1 cursor-pointer hover:-translate-y-0.5 hover:shadow-sm long-transition bg-white"
                          >
                            <div className="flex justify-between items-center">
                              <p className="font-medium">
                                {candidate.first_name} {candidate.last_name}
                              </p>
                            </div>
                            {mostRecentDate ? (
                              <p className="text-gray-foreground text-xs ml-auto mt-1">
                                {mostRecentLabel}{" "}
                                {formatTimeDifference(mostRecentDate.toISOString())}
                              </p>
                            ) : (
                              <p className="text-gray-foreground text-xs ml-auto">
                                No recent activity
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))
                ) : (
                  <div className="w-full flex flex-col items-center justify-center py-8">
                    <p className="text-gray-foreground text-sm font-medium">No candidates applied yet</p>
                    <p className="text-xs text-gray-foreground mt-1">Share the job posting to start receiving applications</p>
                  </div>
                )}
              </div>
            </div>
            {/* Job Details Sidebar */}
            <div className="w-1/4">
              <div className="flex-grow overflow-y-auto text-gray-foreground px-4 py-3 rounded-2xl flex flex-col max-h-[320px] mt-6 mr-6 bg-platinum">
                <ul className="space-y-6">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-medium">Contract</h4>
                    <p className="text-base font-medium">{editedJob?.contract}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-medium">Location</h4>
                    <p className="text-base font-medium">{editedJob?.location}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-medium">Compensation</h4>
                    <p className="text-base font-medium">
                      {editedJob?.min_salary} - {editedJob?.max_salary} {editedJob?.currency}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-medium">Team</h4>
                    {/* @ts-ignore */}
                    <p className="text-base font-medium">{editedJob?.business?.name}</p>
                  </div>
                </ul>
              </div>
              {/* <Footer /> */}
              <div className="pt-6 pr-3">
                <header className="flex justify-between items-center pb-1 border-b mb-2 pr-3">
                  <h4 className="text-base font-semibold">Shared notes</h4>
                </header>
                <SharedNotes objectType="job" objectId={jobId} />
              </div>
            </div>

          </div>


        </div>

      </div>
      {/* AI Assistant */}
      {isAssistantOpen && (
        <div className="w-1/3 px-3">
          {!isInitiated && (
            <div className="top-0 left-0 z-50 mx-auto">
              <div className="text-muted text-xl font-semibold text-center" dangerouslySetInnerHTML={{ __html: initialTitle }} />
            </div>
          )}
          <ChatComponent
            size="small"
            position="bottom"
            type="leader"
            isInitiated={isInitiated}
            setIsInitiated={setIsInitiated}
            actions={recommendedActions.length > 0 ? recommendedActions : aiFallbackPillsData}
          />
        </div>
      )}
    </main>
  );
};

export default JobMonitorTeam;
