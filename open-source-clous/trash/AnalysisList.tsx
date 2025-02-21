"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ActionTooltip from "@/components/actions/ActionTooltip";
import { getAnalysis, submitPulse, getPulse } from "@/app/api/jobs/route";
import { parseHiringNeeds, parsePipelineAnalysis } from "@/utils/parsingUtils";
import { formatTimeDifference, formatResponseSmallText } from "@/utils/formattingUtils";
import { IoCopyOutline, IoCopy, IoAdd, IoChatbubblesOutline } from "react-icons/io5";
import { ListRestart } from 'lucide-react';
import { LuPanelRightOpen } from "react-icons/lu";

interface AnalysisProps {
  jobId: string | null;
  jobStatus?: string | null;
  onViewDocument?: (pulseData: any) => void;
}

interface Analysis {
  type: string;
  name: string;
  content: string | null;
}

const AnalysisList: React.FC<AnalysisProps> = ({ jobId, jobStatus, onViewDocument }) => {
  const [analysisData, setAnalysisData] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [openInsight, setOpenInsight] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<Record<string, { content: string; improvement?: string[]; reasoning?: string }> | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("hiring"); // Changed default category
  const [showChoices, setShowChoices] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (jobId) {
      handleViewAnalysis(jobId);
    }
  }, [jobId]);

  const handleViewAnalysis = async (jobId: string) => {
    setLoading(true);
    try {
      const res = await getPulse(false, undefined, undefined, jobId, "analysis");
      setAnalysisData(res);
    } catch (error) {
      console.error("Error fetching analysis:", error);
    }
    setLoading(false);
  };

  const handleRegenerateAnalysis = async (content: string, category: string) => {
    setIsGenerating(true);
    try {
      const response = await submitPulse(false, undefined, undefined, jobId ?? "", "analysis", content, category ?? selectedCategory);
      handleViewAnalysis(jobId ?? "");
      setShowChoices(false);
      console.log("Regeneration successful!");
    } catch (error) {
      console.error("Error regenerating:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleInsight = (type: string, content: string | null) => {
    setOpenInsight(openInsight === type ? null : type);

    if (type === "pipeline" && content) {
      const parsed = parsePipelineAnalysis(content); // Parse the unstructured text into a structured object
      setParsedData(parsed);
    }
  };

  const stripHtmlTags = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const handleCopyClick = async (text: string) => {
    try {
      const contentCopy = stripHtmlTags(text);
      await navigator.clipboard.writeText(contentCopy);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const handleOpenChoices = () => {
    setShowChoices(true);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    handleRegenerateAnalysis("", category);
    setShowChoices(false);
  };

  const handleViewReport = (analysis: Analysis) => {
    if (onViewDocument && analysis.content) {
      const pulseData = {
        from: "candidate",
        type: analysis.type,
        content: analysis.content,
        name: analysis.name
      };
      onViewDocument(pulseData);
    }
  };

  return (
    <section className={`h-full w-full relative pb-10`}>
      <div className="w-full overflow-y-auto max-h-[36rem]">
        {showChoices ? (
          <div className="flex flex-col items-center justify-center h-full mt-6">
            <div className="grid grid-cols-3 gap-3 w-full px-3">
              {[
                { id: 'hiring', name: 'hiring_report' },
                { id: 'contract', name: 'contract_analysis' },
                { id: 'pipeline', name: 'pipeline_analysis' }
              ].map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col items-start gap-2 px-2 py-1 border rounded-xl cursor-pointer bg-transparent hover:-translate-y-0.5 hover:shadow-sm long-transition"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className=" bg-primary/10 rounded-full flex justify-center items-center w-8 h-8">
                    <IoChatbubblesOutline className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-gray-foreground">{category.name.replace('_', ' ').charAt(0).toUpperCase() + category.name.replace('_', ' ').slice(1)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center gap-1 my-5">
            <h4 className="text-sm font-medium">
              Generating analysis...
            </h4>
            <p className="text-xs text-gray-foreground">
              In a few seconds, you will be able to view the analysis.
            </p>
            <div className="w-full h-[3px] bg-primary rounded-full overflow-hidden relative mt-4">
              <div className="spark-animation absolute top-0 left-0 h-[3px] bg-white/50 w-[20px] rounded-full"></div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full">
            {analysisData.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-1 my-5">
                <h4 className="text-sm font-medium">
                  No analysis created
                </h4>
                <p className="text-xs text-gray-foreground">
                  Create an analysis to get started.
                </p>
                <Button onClick={() => handleOpenChoices()} disabled={isGenerating} variant="default" size="sm" className="flex items-center gap-1 hover:-translate-y-0.5 hover:shadow-sm short-transition">
                  Create analysis
                </Button>
              </div>
            ) : (
              analysisData.map((analysis) => (
                <div key={analysis.type} className={`group relative flex justify-between items-center py-3 px-3 cursor-pointer ${openInsight === analysis.type && analysis.content !== null ? "" : "hover:bg-gray-foreground/10"}`}>
                  <div className="relative flex justify-between items-start w-full">
                    <div className="flex items-center gap-2 group" onClick={() => handleViewReport(analysis)}>
                      <div className="flex flex-col gap-1 w-full">
                        <p className="text-sm font-medium flex flex-col">
                          {analysis.name ? `${analysis.name}` : `Untitled`}
                          {analysis.content === null && <span className="text-xs text-gray-foreground font-medium">No insights available</span>}
                        </p>

                        {/* Toggle insights display */}
                        {openInsight === analysis.type && analysis.content !== null && (
                          <>
                            <div className="p-1 rounded-md">
                              {analysis.type !== "pipeline_analysis" ? (
                                <div className="text-sm leading-5" dangerouslySetInnerHTML={{ __html: formatResponseSmallText(analysis.content) }}></div>
                              ) : (
                                <ul className="space-y-3">
                                  {parsedData &&
                                    Object.entries(parsedData).map(([date, { content, improvement, reasoning }], index) => (
                                      <li key={index} className="flex flex-col gap-2">
                                        <h3 className="text-sm text-gray-foreground font-medium whitespace-nowrap mt-2">{formatTimeDifference(date)}</h3>
                                        <div className="text-gray-foreground text-sm bg-transparent" dangerouslySetInnerHTML={{ __html: formatResponseSmallText(content) }}></div>
                                      </li>
                                    ))}
                                </ul>
                              )}
                            </div>
                            <div className="flex gap-2 items-center ml-auto">
                              <ActionTooltip label="View report" side="bottom" align="end">
                                <div
                                  className="p-2 h-8 items-center rounded-lg hover:bg-muted/5 cursor-pointer relative"
                                  onClick={() => handleViewReport(analysis)}
                                >
                                  <LuPanelRightOpen className="w-4 h-4" />
                                </div>
                              </ActionTooltip>
                              <ActionTooltip label="Create again" side="bottom" align="end">
                                <div
                                  className="p-2 h-8 items-center rounded-lg hover:bg-muted/5 cursor-pointer relative"
                                  onClick={() => handleRegenerateAnalysis(analysis.content ?? "")}
                                >
                                  <ListRestart className="w-4 h-4" />
                                </div>
                              </ActionTooltip>
                              <ActionTooltip label="Copy email" side="bottom" align="end">
                                <div
                                  className="p-2 h-8 items-center rounded-lg hover:bg-muted/5 cursor-pointer relative"
                                  onClick={() => handleCopyClick(analysis.content ?? "")}
                                >
                                  {isCopied ? <IoCopy className="w-4 h-4" /> : <IoCopyOutline className="w-4 h-4" />}
                                </div>
                              </ActionTooltip>
                            </div>
                          </>
                        )}

                      </div>
                      <div
                        className="opacity-0 group-hover:opacity-100 px-2 py-1 rounded-lg hover:bg-muted/5 cursor-pointer relative text-xs border flex items-center gap-1 text-gray-foreground font-medium"
                        onClick={() => handleViewReport(analysis)}
                      >
                        <LuPanelRightOpen className="w-3 h-3" />
                        Open
                      </div>
                    </div>

                    {analysis.content === null ? (
                      // Create button condition for 'hiring_report'
                      analysis.type === "hiring_report" && (jobStatus === "closed" || jobStatus === "inactive") ? (
                        <Button size="sm" onClick={() => handleRegenerateAnalysis("")}>
                          Create
                        </Button>
                      ) : analysis.type !== "hiring_report" ? (
                        <Button size="sm" onClick={() => handleRegenerateAnalysis("")}>
                          Create
                        </Button>
                      ) : null
                    ) : (
                      <p className="text-xs text-gray-foreground border px-1.5 py-0.5 rounded-lg font-medium flex items-center gap-0.5" onClick={() => toggleInsight(analysis.type, analysis.content)}>
                        {openInsight === analysis.type ? "Hide" : "View"}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {!showChoices && !loading && analysisData.length > 0 && (
        <div className="absolute bottom-2 right-2 flex justify-end">
          <Button onClick={handleOpenChoices} disabled={isGenerating} variant="fourtiary" size="sm" className="flex items-center gap-1 hover:-translate-y-0.5 hover:shadow-sm short-transition">
            {isGenerating ? 'Generating...' : 'Create analysis'}
          </Button>
        </div>
      )}
    </section>
  );
};

export default AnalysisList;
