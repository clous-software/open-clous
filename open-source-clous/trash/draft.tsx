import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useVoiceHandler } from '@/hooks/audioHandle';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import { ImAttachment } from 'react-icons/im';
import { IoArrowDown, IoClose, IoChatbubblesOutline, IoCloseOutline, IoArrowForwardOutline, IoCopy, IoCopyOutline, IoGitBranch, IoDocumentTextOutline, IoBriefcase, IoPersonCircle, IoPersonAdd, IoLogoLinkedin } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import ConversationButtons from '@/components/actions/conversationButton';
import useSimulateTyping from '@/hooks/animationEffects';
import { convertToBase64, formatResponseSmallText, formatResponseText } from '@/utils/formattingUtils';
import axios from 'axios';
import { PiWaveformBold, PiWaveform } from "react-icons/pi";
import { FaSquare } from "react-icons/fa";
import { ListRestart } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import ActionTooltip from "@/components/actions/ActionTooltip";
import { getTimeInsights } from '@/app/api/users/route';
import { FileWithPreview, Pill, PromptActions } from '@/types/smallTypes';
import createPostRequest, { createCanvasRequest, createNewDataRequest } from '@/app/api/ai/route';
import { useCompany } from '@/context/CompanyContext';
import Footer from '../navigation/Footer';
import PillsComponent from '../actions/PillsComponent';
import { Candidate, Company, Job, Question } from '@/types/types';
import { toast } from '../ui/use-toast';
import { ChatType } from '@/types/smallTypes';
import useKeyboardShortcuts from '@/utils/crossappActions';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { MdLightbulbOutline, MdOutlineLightbulb } from "react-icons/md";
import { formatTimeDifference } from "@/utils/formattingUtils";
import { Tags } from '@/types/richTypes';
import JobStateDetails from '@/components/hub/JobStateDetails';
import ReactDOMServer from 'react-dom/server';
import SelectionToolbar from '../actions/SelectionTooltip';
import useSelectionTooltip from '@/hooks/useSelectionTooltip';
import DataImportCard from '../cards/DataImportCard';
import { ContentItem } from '@/types/types';
import { getObjects, getObjectsList, recordMetric } from '@/app/api/service/route';
import { Player } from '@lottiefiles/react-lottie-player';
import canvasLoadingAnimation from '@/animations/VerticalLoader.json';
import MessageContent from './MessageContent';
import { stripHtmlTags } from '@/utils/formattingUtils';
import { BsSoundwave } from 'react-icons/bs';
import ProfileTooltip from '../actions/ProfileTooltip';
import CanvasPlaceholder from '@/components/cards/CanvasPlaceholder'; // Ensure correct import

function ArtifactInline({
    artifactName,
    artifactType,
    onCreateJob,
    onCreateQuestions
}: {
    artifactName: string;
    artifactType: string;
    onCreateJob?: (jobData: Job) => void;
    onCreateQuestions?: (questionsData: Question[]) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="my-4">
            <div
                className="cursor-pointer p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {artifactType === 'job' ? (
                            <IoBriefcase className="w-5 h-5 text-primary" />
                        ) : (
                            <IoChatbubblesOutline className="w-5 h-5 text-primary" />
                        )}
                        <span className="font-medium">
                            {artifactType === 'job' ? 'Job Description' : 'Interview Questions'}: {artifactName}
                        </span>
                    </div>
                    <IoIosArrowDown
                        className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>

            {isExpanded && (
                <div className="mt-2 p-4 border rounded-lg">
                    {/* Content will be handled by the parent component */}
                </div>
            )}
        </div>
    );
}
// Source Structure
interface Source {
    id: string;
    object: 'online' | 'resume' | 'job' | 'document';
    source_data: {
        // Resume fields
        name?: string;
        portfolio_url?: string;
        linkedin_url?: string;
        last_contacted?: string;
        last_interviewed?: string;
        status?: string;

        // Job fields
        role?: string;
        salary?: string;
        location?: string;
        business_area?: string;

        // Document fields
        type?: string;
        reasoning?: string;
        content?: string;

        // Online fields
        link?: string;
        title?: string;
    };
}

// Metadata Structure
interface ResponseMetadata {
    tags?: {
        flag: string[];
    };
    sources?: Source[];
    // Canvas specific fields
    canvasData?: {
        id: string;
        type: string;
        content: any;
        query: string;
        name: string;
    };
    // Pulse specific fields
    insights?: string[];
    recommendations?: string[];
    type?: string;
    data?: any;
}

// Updated Message Type
interface MessageType {
    sender: 'user' | 'bot';
    content: string;
    response?: string;
    metadata?: ResponseMetadata;
}

// Component Props
interface ChatComponentProps {
    size: 'small' | 'large';
    position?: 'top' | 'bottom';
    type: ChatType;
    isInitiated: boolean;
    setIsInitiated: (value: boolean) => void;
    company?: Company;
    isFullMode?: boolean;
    isArtifact?: boolean;
    onCreateJob?: (jobData: Job) => void;
    onCreateQuestions?: (questionsData: Question[]) => void;
    onViewDocument?: (document: any) => void;
    onSourceClick?: (source: Source) => void;
    onCanvasClick?: () => void;
    onCanvas?: (event: any) => void;
    isShadowed?: boolean;
    setIsShadowed?: (value: boolean) => void;
    isAuthToken?: boolean;
    sidebarOpen?: boolean;
    actions?: Pill[];
    isLoadingProgress?: boolean;
    isJobCreated?: boolean;
    isQuestionsCreated?: boolean;
    selectedJobId?: string;
    prompt?: string;
    onChatHistoryChange?: (isEmpty: boolean) => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ type, size, position, isInitiated, isArtifact, isFullMode, setIsInitiated, isAuthToken, isShadowed, sidebarOpen, actions, onCanvas, onSourceClick, onCreateQuestions, onCreateJob,
    isJobCreated, isLoadingProgress, isQuestionsCreated,
    setIsShadowed, selectedJobId, prompt, onCanvasClick, onChatHistoryChange, ...props }) => {
    // State variables
    const [chatHistory, setChatHistory] = useState<MessageType[]>([]);
    const [userMessage, setUserMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [isArrowButtonDisabled, setIsArrowButtonDisabled] = useState(true);
    const [isCopied, setIsCopied] = useState(false);
    const [showCTA, setShowCTA] = useState(false);
    const [hasContent, setHasContent] = useState(false); // New state variable for placeholder
    const [recommendedActions, setRecommendedActions] = useState<string[]>([]);
    const [recommendedActionsText, setRecommendedActionsText] = useState<Array<{ action: string }>>([]);
    const [isRestarting, setIsRestarting] = useState(false);
    const [isRegeneratePulse, setIsRegeneratePulse] = useState(false);
    const [resetTime, setResetTime] = useState<string>('');
    const [showActions, setShowActions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [requestStartTime, setRequestStartTime] = useState<number | null>(null);
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

    const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
    const [showFollowUpQuestions, setShowFollowUpQuestions] = useState(false);

    const [followUpText, setFollowUpText] = useState<string>('');
    const [showFollowUpText, setShowFollowUpText] = useState(false);

    const { simulateTyping } = useSimulateTyping(10);

    // Refs
    const fileRef = useRef<HTMLInputElement>(null);
    const contentEditableRef = useRef<HTMLDivElement>(null);
    const chatHistoryRef = useRef<HTMLDivElement>(null);

    // For mentioning functionality
    const [showMentions, setShowMentions] = useState<boolean>(false);
    const [mentionQuery, setMentionQuery] = useState<string>('');
    const [mentions, setMentions] = useState<any[]>([]);
    const [mentionPosition, setMentionPosition] = useState<number | null>(null);

    const responseRef = useRef<HTMLDivElement>(null);

    const [apiResponse, setApiResponse] = useState('');
    const [showResponse, setShowResponse] = useState(false);

    const [isLongPrompt, setIsLongPrompt] = useState<boolean>(false);
    const [suggestedSearches, setSuggestedSearches] = useState<string[] | null>(null);

    const { company, loading } = useCompany();

    const [suggestionCallCount, setSuggestionCallCount] = useState(0);
    const [currentQueryId, setCurrentQueryId] = useState<string | null>(null);
    const [isProcessingMessage, setIsProcessingMessage] = useState(false);

    const [chatResponse, setChatResponse] = useState<string>('');
    const [followUpContext, setFollowUpContext] = useState<string>('');
    const [lastResponse, setLastResponse] = useState<string>('');
    const [responsibilities, setResponsibilities] = useState<string[]>([]);
    const [requirements, setRequirements] = useState<string[]>([]);
    const [benefits, setBenefits] = useState<string[]>([]);

    const [sources, setSources] = useState<any[]>([]);
    const [canvasMessage, setCanvasMessage] = useState<string>('');
    const [chatTags, setChatTags] = useState<Tags>();
    const [isErrorFix, setIsErrorFix] = useState(false);

    const [canvasResponse, setCanvasResponse] = useState<any>(null);
    const [canvasType, setCanvasType] = useState<string | null>(null);
    const [query, setQuery] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);

    const [recommendedTraining, setRecommendedTraining] = useState<string[]>([]);

    const [isQuestions, setIsQuestions] = useState(false);
    const [isJob, setIsJob] = useState(false);
    const [isImport, setIsImport] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const [jobDetails, setJobDetails] = useState<Job | null>(null);
    const [questionsDetails, setQuestionsDetails] = useState<Question[] | null>(null);

    const [isExcessFeedback, setIsExcessFeedback] = useState(false);
    const [isPMFFeedback, setIsPMFFeedback] = useState(false);
    const [isAuthRequired, setIsAuthRequired] = useState(false);

    const [responseType, setResponseType] = useState<string>('');

    const [showAnimation, setShowAnimation] = useState(true); // Initially show the animation

    const [jobList, setJobList] = useState<Job[]>([]);

    const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

    const [isCanvasLoading, setIsCanvasLoading] = useState(false);

    const [statusLogs, setStatusLogs] = useState<string[]>([]);
    const [phase, setPhase] = useState<string | null>(null);

    // Inside ChatComponent
    const { isRecording, isTranscriptionComplete, dBLevel } = useVoiceHandler({
        isVoiceMode,
        setUserMessage: (text: string) => {
            // Update the contentEditable div content
            if (contentEditableRef.current) {
                contentEditableRef.current.textContent = text;
                // Trigger the input handler to update state
                const event = new InputEvent('input', {
                    bubbles: true,
                    cancelable: true,
                });
                contentEditableRef.current.dispatchEvent(event);
            }
            setUserMessage(text);
        },
        operation: 'add',
        existingText: userMessage,
    });

    useEffect(() => {
        if (isTranscriptionComplete) {
            handleSendMessage();
        }
    }, [isTranscriptionComplete]);


    useEffect(() => {
        if (!isRecording && isVoiceMode) {
            setIsVoiceMode(false); // Stop the voice mode when recording stops
        }
    }, [isRecording, isVoiceMode]);

    // Scroll to bottom whenever chat history updates
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [chatHistory]);

    let typingTimer: NodeJS.Timeout;

    // Handle input change
    const handleInputChange = async (e: React.FormEvent<HTMLDivElement>) => {
        const text = e.currentTarget.textContent || '';
        setUserMessage(text);
        setIsArrowButtonDisabled(text.trim() === '');
        setHasContent(text.trim() !== '');

        // Reset suggestion call count when text changes significantly
        if (text.length < 4 || text.length > 16) {
            setSuggestionCallCount(0);
            setCurrentQueryId(null);
            setSuggestedSearches(null);
            return;
        }

        // Don't fetch suggestions if we're processing a message
        if (isProcessingMessage) return;

        // Don't fetch if we already have chat history with responses
        if (chatHistory.length > 0) {
            const lastMessage = chatHistory[chatHistory.length - 1];
            if (lastMessage.response) {
                setSuggestedSearches(null);
                return;
            }
        }

        if (text.length >= 4 && text.length <= 16) {
            setIsLongPrompt(false);
            clearTimeout(typingTimer);

            // Generate a new query ID
            const queryId = Date.now().toString();
            setCurrentQueryId(queryId);


        }

        // Handle mentions
        const selection = window.getSelection();
        if (selection && contentEditableRef.current) {
            const cursorPosition = selection.anchorOffset;
            const textBeforeCursor = contentEditableRef.current.innerText.substring(0, cursorPosition);
            const atIndex = textBeforeCursor.lastIndexOf('@');

            if (atIndex !== -1) {
                const query = textBeforeCursor.substring(atIndex + 1);
                setMentionQuery(query);
                setShowMentions(true);
                fetchMentions(query);
            } else {
                setShowMentions(false);
            }
        }
    };
    // Add this with your other process functions
    const processArtifactElements = (text: string): (string | JSX.Element)[] => {
        if (!text || typeof text !== 'string') {
            console.error("Invalid text input for processArtifactElements:", text);
            return [];
        }

        const artifactRegex = /<Artifact\s+name="(.*?)"\s+type="(.*?)"\s*\/>/g;
        let result: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        let match;

        while ((match = artifactRegex.exec(text)) !== null) {
            const [fullMatch, artifactName, artifactType] = match;

            // Add preceding text as plain strings
            const precedingText = text.slice(lastIndex, match.index);
            if (precedingText.trim()) {
                result.push(precedingText);
            }

            // Push ArtifactInline component
            result.push(
                <ArtifactInline
                    key={`artifact-${artifactType}-${artifactName}-${Date.now()}`}
                    artifactName={artifactName}
                    artifactType={artifactType}
                    onCreateJob={onCreateJob}
                    onCreateQuestions={onCreateQuestions}
                />
            );

            lastIndex = artifactRegex.lastIndex;
        }

        // Add remaining text as plain strings
        const remainingText = text.slice(lastIndex);
        if (remainingText.trim()) {
            result.push(remainingText);
        }

        return result;
    };


    const processCanvasElements = (text: string, peerContext: string): (string | JSX.Element)[] => {
        if (!text || typeof text !== 'string') {
            console.error("Invalid text input for processCanvasElements:", text);
            return [];
        }

        const canvasRegex = /<Canvas\s+type="(.*?)"\s+query="(.*?)"\s+name="(.*?)"(?:\s+needs_autonomy=(true|false))?(?:\s+update=(true|false))?\s*\/>/g;
        let result: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        let match;

        while ((match = canvasRegex.exec(text)) !== null) {
            const [fullMatch, canvasType, query, name, needsAutonomyStr, updateStr] = match;

            // Add preceding text as plain strings
            const precedingText = text.slice(lastIndex, match.index);
            if (precedingText.trim()) {
                result.push(precedingText);
            }

            // Parse boolean attributes
            const needsAutonomy = needsAutonomyStr === 'true';
            const update = updateStr === 'true';

            // Push CanvasPlaceholder immediately
            result.push(
                <CanvasPlaceholder
                    key={`${canvasType}-${name}-${Date.now()}`}
                    canvasId={`${canvasType}-${name}-${Date.now()}`}
                    canvasType={canvasType}
                    query={query}
                    name={name}
                    peerContext={peerContext}
                    needsAutonomy={needsAutonomy}
                    update={update}
                    onCanvas={onCanvas}
                />
            );

            lastIndex = canvasRegex.lastIndex;
        }

        // Add remaining text as plain strings
        const remainingText = text.slice(lastIndex);
        if (remainingText.trim()) {
            result.push(remainingText);
        }

        return result;
    };


    const processActionElements = (text: string): (string | JSX.Element)[] => {
        if (!text || typeof text !== 'string') {
            console.error("Invalid text input for processActionElements:", text);
            return [];
        }

        const actionRegex = /<Action\s+name="(.*?)"\s+query="(.*?)"\s*\/>/g;
        let result: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        let match;

        while ((match = actionRegex.exec(text)) !== null) {
            const [fullMatch, actionName, query] = match;

            // Add preceding text as plain strings
            const precedingText = text.slice(lastIndex, match.index);
            if (precedingText.trim()) {
                result.push(precedingText);
            }

            // Generate JSX for the Action component
            result.push(
                <div
                    key={`action-${actionName}`}
                    className="action-component my-2"
                    onClick={() => handleClick(query)}
                >
                    <p className="action-name font-bold">{actionName}</p>
                </div>
            );

            lastIndex = actionRegex.lastIndex;
        }

        // Add remaining text as plain strings
        const remainingText = text.slice(lastIndex);
        if (remainingText.trim()) {
            result.push(remainingText);
        }

        return result;
    };

    function processTooltipElements(text: string): Array<string | JSX.Element> {
        if (!text || typeof text !== 'string') return [];

        // Simplified regex that matches both patterns in one go
        const tooltipRegex = /\((.*?)\)(?:<(.*?)>|\{(.*?)\})/g;
        let result: Array<string | JSX.Element> = [];
        let lastIndex = 0;

        for (const match of text.matchAll(tooltipRegex)) {
            const [fullMatch, displayText, staticTooltip, dynamicId] = match;

            // Add text before the tooltip
            const precedingText = text.slice(lastIndex, match.index);
            if (precedingText) result.push(precedingText);

            if (staticTooltip) {
                // Static tooltip: (text)<tooltip>
                result.push(
                    <ActionTooltip
                        key={`tooltip-${Date.now()}-${Math.random()}`}
                        label={staticTooltip}
                        align="start"
                        side="bottom"
                    >
                        <span className="cursor-pointer underline decoration-dotted">
                            {displayText}
                        </span>
                    </ActionTooltip>
                );
            } else if (dynamicId) {
                // Dynamic tooltip: (text){id}
                const profileType =
                    dynamicId.includes('resumeId') ? 'resume' :
                        dynamicId.includes('documentId') ? 'document' :
                            dynamicId.includes('jobId') ? 'job' :
                                dynamicId.includes('employeeId') ? 'employee' :
                                    dynamicId.includes('candidateId') ? 'candidate' :
                                        dynamicId.includes('companyId') ? 'company' :
                                            dynamicId.includes('userId') ? 'member' : null;

                result.push(
                    <ProfileTooltip
                        key={`profile-${Date.now()}-${Math.random()}`}
                        profileType={profileType}
                        data={{ id: dynamicId }}
                    >
                        <span className="mention-tag cursor-pointer">
                            {displayText}
                        </span>
                    </ProfileTooltip>
                );
            }

            lastIndex = match.index! + fullMatch.length;
        }

        // Add remaining text
        const remainingText = text.slice(lastIndex);
        if (remainingText) result.push(remainingText);

        return result;
    }


    const formatJobResponse = (response: any) => {
        // Ensure `response` is a string
        if (typeof response !== "string") {
            console.error("formatJobResponse: Expected a string, but got:", typeof response, response);
            return {}; // Return an empty object or handle gracefully
        }

        const extractSection = (heading: string) => {
            const regex = new RegExp(`${heading}:\\s*([\\s\\S]*?)(?=\\n[A-Z]|$)`, 'g');
            const match = regex.exec(response);
            return match
                ? match[1]
                    .trim()
                    .split('\n')
                    .map((item) => item.trim().replace(/^-\s*/, '')) // Remove leading dash and whitespace
                    .filter(Boolean)
                : [];
        };

        // Extract specific sections
        const titleMatch = response.match(/Title:\s*(.*)/);
        const roleMatch = response.match(/Role:\s*(.*)/);
        const descriptionMatch = response.match(/Description:\s*([\s\S]*?)(?=\n[A-Z]|$)/);
        const businessMatch = response.match(/Business:\s*(.*)/);
        const locationMatch = response.match(/Location:\s*(.*)/);

        // Extract Salary
        const salarySectionMatch = response.match(/Salary:\s*([\s\S]*?)(?=\n[A-Z]|$)/);
        let minSalary = null;
        let maxSalary = null;
        if (salarySectionMatch) {
            const salarySection = salarySectionMatch[1];
            const minMatch = salarySection.match(/- Minimum:\s*([0-9,]+)/);
            const maxMatch = salarySection.match(/- Maximum:\s*([0-9,]+)/);
            minSalary = minMatch ? minMatch[1] : null;
            maxSalary = maxMatch ? maxMatch[1] : null;
        }

        // Extract Currency
        const currencySectionMatch = response.match(/Currency:\s*([\s\S]*?)(?=\n[A-Z]|$)/);
        let currency = null;
        if (currencySectionMatch) {
            const currencySection = currencySectionMatch[1];
            const currencyMatch = currencySection.match(/-?\s*(.*)/);
            currency = currencyMatch ? currencyMatch[1].trim() : null;
        }

        const contractMatch = response.match(/Contract:\s*(.*)/);
        const languages = extractSection('Languages');
        const tools = extractSection('Tools');
        const skills = extractSection('Skills');
        const responsibilities = extractSection('Responsibilities');
        const requirements = extractSection('Requirements');
        const benefits = extractSection('Benefits');

        // Return structured data with correct keys
        return {
            title: titleMatch ? titleMatch[1].trim() : null,
            role: roleMatch ? roleMatch[1].trim() : null,
            description: descriptionMatch ? descriptionMatch[1].trim() : null,
            business: businessMatch ? businessMatch[1].trim() : null,
            location: locationMatch ? locationMatch[1].trim() : null,
            minimum_salary: minSalary,
            maximum_salary: maxSalary,
            currency: currency,
            contract_type: contractMatch ? contractMatch[1].trim() : null,
            languages: languages ?? [],
            tools: tools ?? [],
            skills: skills ?? [],
            responsibilities: responsibilities ?? [],
            requirements: requirements ?? [],
            benefits: benefits ?? [],
        };
    };


    // Add this useEffect to handle the status message rotation
    useEffect(() => {
        let messageInterval: NodeJS.Timeout;
        let statusTimeout: NodeJS.Timeout;

        if (isTyping) {
            // Start rotating messages after 1 second
            statusTimeout = setTimeout(() => {
                let currentIndex = 0;
                messageInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % statusMessages.length;
                    setStatusMessage(statusMessages[currentIndex]);
                }, 2150);
            }, 600);
        }

        return () => {
            clearInterval(messageInterval);
            clearTimeout(statusTimeout);
        };
    }, [isTyping]);
    // Handle sending message
    const handleSendMessage = async (query?: string) => {
        console.log("Here's the userMessage:", userMessage);
        setUserMessage(contentEditableRef.current?.textContent || '');
        // if (!userMessage.trim()) return;

        resetFlags();
        manageClickCount(Date.now());

        setIsProcessingMessage(true);
        let messageContent = query || contentEditableRef.current?.textContent || userMessage;

        let peerContext = '';

        // Add content from text files
        const textFiles = uploadedFiles.filter(file => file.type === 'text');
        if (textFiles.length > 0) {
            peerContext += '\n\nThe user included the following text to better inform your response:\n' +
                textFiles.map(file => file.content).join('\n\n');
        }

        // Validate we have content before proceeding
        if (!messageContent.trim()) {
            console.log('No message content to send');
            return;
        }


        const mentionsData: { object_id: string; object_type: string }[] = [];

        let messageContentForAPI = '';
        let messageContentForDisplay = '';

        if (contentEditableRef.current) {
            // Clone content for API processing
            const clonedContentForAPI = contentEditableRef.current.cloneNode(true) as HTMLElement;
            // Clone content for display
            const clonedContentForDisplay = contentEditableRef.current.cloneNode(true) as HTMLElement;

            const mentionTags = clonedContentForAPI.querySelectorAll(".mention-tag");

            mentionTags.forEach((tag) => {
                const id = tag.getAttribute("data-id") || "";
                const type = tag.getAttribute("data-type") || "";
                mentionsData.push({ object_id: id, object_type: type });

                // For API: Replace with placeholder
                const placeholderNode = document.createTextNode(`{${type}}`);
                tag.replaceWith(placeholderNode);
            });

            // Get processed content for API
            messageContentForAPI = clonedContentForAPI.textContent || "";
            // Get HTML content for display (preserving mention tags)
            messageContentForDisplay = clonedContentForDisplay.outerHTML;
        }
        console.log("Here's the messageContent:", messageContentForDisplay);

        try {

            // Add user message to chat immediately
            const userChatMessage: MessageType = {
                sender: 'user',
                content: messageContentForDisplay,
            };
            setChatHistory(prev => [...prev, userChatMessage]);

            setHasContent(false);
            if (contentEditableRef.current) {
                contentEditableRef.current.textContent = '';
            }

            // Get previous user messages from chat history
            const previousUserMessages = chatHistory
                .filter(msg => msg.sender === 'user')
                .map(msg => msg.content)
                .reverse(); // Most recent first

            // Create the context string with previous messages
            let contextString = previousUserMessages.length > 0
                ? `\n\nAnd here are the previous asks from this user sorted by most recent:\n${previousUserMessages.join('\n- ')}`
                : '';

            if (followUpText) {
                contextString += `\n\nAnd here's what the user is higlighting, so that you know what they are referring to:${followUpText}`;
            }

            // 1. First, get the message content before clearing the contentEditable
            peerContext += contextString;



            const tempBotMessage: MessageType = {
                sender: 'bot',
                content: `
                    <div class="flex flex-col items-start gap-1">
                        <span class="text-sm sparkly-gradient-text">${statusMessage}</span>
                        <span class="cursorRound ml-1"></span>
                    </div>
                `,
                metadata: {
                    type: 'text'
                }
            };
            setChatHistory(prev => [...prev, tempBotMessage]);
            setIsTyping(true);

            console.log("Here's the uploaded files:", uploadedFiles);

            // Make API request
            const newResponse = await createPostRequest(
                messageContentForAPI,
                type,
                undefined,
                undefined,
                uploadedFiles,
                mentionsData,
                peerContext
            );

            console.log("Here's the new response:", newResponse.response);

            if (newResponse?.response?.response) {

                // Process the response
                const canvasProcessed = await processCanvasElements(
                    newResponse.response.response,
                    newResponse.response.peerContext
                );

                let finalProcessed = [];
                for (let item of canvasProcessed) {
                    if (typeof item === 'string') {
                        // First process artifacts
                        const artifactProcessed = processArtifactElements(item);

                        // Then process tooltips and actions for each artifact chunk
                        let processedChunks: Array<string | JSX.Element> = [];
                        for (let artifactChunk of artifactProcessed) {
                            if (typeof artifactChunk === 'string') {
                                // Process tooltips first
                                const tooltipProcessed = processTooltipElements(artifactChunk);

                                // Then process actions for each tooltip-processed chunk
                                for (let tooltipChunk of tooltipProcessed) {
                                    if (typeof tooltipChunk === 'string') {
                                        processedChunks.push(...processActionElements(tooltipChunk));
                                    } else {
                                        processedChunks.push(tooltipChunk);
                                    }
                                }
                            } else {
                                processedChunks.push(artifactChunk);
                            }
                        }

                        finalProcessed.push(...processedChunks);
                    } else {
                        finalProcessed.push(item);
                    }
                }

                // Format the processed response
                const formattedResponse = finalProcessed.map((chunk) =>
                    typeof chunk === 'string' ? formatResponseText(chunk) : chunk
                );


                // Create metadata object
                const metadata: ResponseMetadata = {
                    tags: newResponse.response.tags,
                    sources: newResponse.response.sources?.map((source: any) => ({
                        id: source.id,
                        object: source.object,
                        source_data: source.source_data
                    }))
                };

                console.log("Here's the metadata with the tags and sources:", metadata);

                const tagFlags = metadata.tags?.flag || null;

                let tooltipProcessed: Array<string | JSX.Element> = processTooltipElements(newResponse.response.response);


                // Update the last message for non-job responses
                await simulateTyping(formattedResponse, (typedContent) => {
                    setChatHistory(prev => {
                        const newHistory = [...prev];
                        const lastBotIndex = newHistory.length - 1;

                        newHistory[lastBotIndex] = {
                            sender: 'bot',
                            content: typedContent, // Preserve JSX directly
                            metadata: {
                                type: 'text',
                                ...metadata
                            }
                        };
                        return newHistory;
                    });
                });

                // Update other states after typing is complete
                setIsTyping(false);
                await setChatResponse(newResponse.response.response);
                setCanvasMessage(newResponse.response?.peerContext || newResponse.response?.canvasContext || '');

                setLastResponse(newResponse.response.response);
                setChatTags(newResponse.response?.tags);
                setSources(newResponse.response?.sources || []);

                // Handle additional responses
                await handleAdditionalResponses(newResponse.response.response, tagFlags || []);

                if (isAuthToken) {
                    await recordMetric("ai_use", 1);
                }

            }
        } catch (error) {
            console.error('Error:', error);
            setIsErrorFix(true);

            setChatHistory(prev => prev.slice(0, -1));

            setLastFailedMessage(messageContentForAPI);

            // Add error message to chat history
            const errorMessage: MessageType = {
                sender: 'bot',
                content: 'Sorry, I encountered an error processing your request.',
                metadata: {
                    type: 'error',
                }
            };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setUserMessage('');
            setFollowUpText('');
            setShowFollowUpText(false);
            setIsProcessingMessage(false);
            setIsTyping(false);
            setIsCanvasLoading(false); // Ensure loading state resets
        }
    };

    const handleAdditionalResponses = async (chatResponse: string, tagFlags?: string[]) => {
        if (!chatResponse) {
            console.error("The API response is not a valid string.");
            return;
        }

        // Reset response type by default
        setIsJob(false);
        setIsQuestions(false);
        setIsImport(false);

        // Check if it's a job response by validating required fields
        const isValidJobFormat = (response: string): boolean => {
            // Check for minimum required job fields
            const requiredFields = ['Title:', 'Role:', 'Description:'];
            return requiredFields.every(field => response.includes(field));
        };

        if (tagFlags && tagFlags.includes('is_job')) {
            if (isValidJobFormat(chatResponse)) {
                const jobDetails = formatJobResponse(chatResponse);

                // Only proceed if we have essential job details
                if (jobDetails.title && jobDetails.role && jobDetails.description) {
                    // Update only the last bot message with job metadata
                    setChatHistory((prev) => {
                        const newHistory = [...prev];
                        const lastBotMessageIndex = newHistory.findLastIndex(msg => msg.sender === 'bot');
                        if (lastBotMessageIndex !== -1) {
                            newHistory[lastBotMessageIndex] = {
                                ...newHistory[lastBotMessageIndex],
                                content: '',
                                metadata: {
                                    type: 'job',
                                    data: jobDetails,
                                    tags: {
                                        flag: tagFlags
                                    }
                                }
                            };
                        }
                        return newHistory;
                    });

                    setJobDetails(jobDetails as Job);
                }
            } else {
                console.log("Invalid job details structure, displaying as regular response");
                // Update chat history to show as regular response
                setChatHistory(prev => {
                    const newHistory = [...prev];
                    const lastBotMessageIndex = newHistory.findLastIndex(msg => msg.sender === 'bot');
                    if (lastBotMessageIndex !== -1) {
                        newHistory[lastBotMessageIndex] = {
                            sender: 'bot',
                            content: chatResponse,
                            metadata: {
                                type: 'text'
                            }
                        };
                    }
                    return newHistory;
                });
            }
        }
        // Handle questions format similarly
        if (tagFlags && tagFlags.includes('is_questions')) {
            // Define the keywords to look for in different languages
            const questionKeywords = [
                "Question", "Questions", // English
                "Pregunta", "Preguntas", // Spanish
                "Frage", "Fragen", // German
                "Domanda", "Domande", // Italian
                "Question", "Questions", // French
                "Pergunta", "Perguntas" // Portuguese
            ];

            // Split the chatResponse into lines and check the first four
            const lines = chatResponse.split('\n').slice(0, 4);

            // Check if any of the keywords appear in the first four lines
            const containsQuestionKeyword = lines.some(line =>
                questionKeywords.some(keyword => line.toLowerCase().includes(keyword.toLowerCase()))
            );

            if (containsQuestionKeyword) {
                setIsQuestions(true);
                setResponseType("questions");
            } else {
                console.log("Response doesn't match questions format, displaying as regular response");
            }
        }

        if (tagFlags && tagFlags.includes('import')) {
            setIsImport(true);
            setResponseType("import");
        }

        // Continue with follow-up questions...
        try {
            let contextContent = '';
            if (chatHistory.length > 1) {
                contextContent = "\n\nAnd here's some recent user asks, so that you know what they are referring to:" +
                    chatHistory.slice(0, -1).map((item, index) =>
                        `\nPrevious user ask: ${item.content}`
                    );
            }

            const fullContent = `Here is the user's current ask: ${userMessage}${contextContent}`;
            const followUpResponse = await getTimeInsights("recommended_followup", undefined, undefined, undefined, fullContent);

            let prompts = [];
            if (followUpResponse?.prompts) {
                if (Array.isArray(followUpResponse.prompts)) {
                    prompts = followUpResponse.prompts;
                } else if (typeof followUpResponse.prompts === 'string') {
                    prompts = [followUpResponse.prompts];
                } else if (typeof followUpResponse.prompts === 'object') {
                    prompts = Object.values(followUpResponse.prompts);
                }
            }

            if (prompts.length > 0) {
                setFollowUpQuestions(prompts);
                console.log("Here's the follow up questions:", prompts);
            }
        } catch (error) {
            console.error("Error fetching follow-up questions:", error);
        }

        setUploadedFiles([]);
        setShowCTA(true);
    }



    // Update the bot message whenever status changes
    useEffect(() => {
        if (isWaitingForResponse && chatHistory.length > 0) {
            setChatHistory((prev) => {
                const newHistory = [...prev];
                const lastMessage = newHistory[newHistory.length - 1];
                if (lastMessage.sender === 'bot') {
                    lastMessage.content = `<div class="flex flex-col gap-1">
                        <span class="fadeIn mb-1 text-gray-foreground font-normal text-sm sparkly-gradient-text">${statusMessage}</span>
                        <span class="cursorRound ml-1"></span>
                    </div>`;
                }
                return newHistory;
            });
        }
    }, [statusMessage, isWaitingForResponse]);

    // Render input area
    const renderInputArea = () => {
        return (
            <div
                className={`pl-4 relative flex items-center bg-[#F6F6F6] cursor-text max-h-48 rounded-full mx-auto w-full px-2 ${size == 'large' ? `h-auto min-h-14 ${isInitiated ? '' : ''}` : 'min-h-11 h-auto'} `}
            >

                {/* Mention Modal */}
                {showMentions && (
                    <div className="absolute top-16 rounded-2xl bg-background shadow-lg w-full max-h-48 overflow-y-auto z-50 mentions-scroll">
                        {mentions.map((item) => (
                            <div
                                key={`${item.type} -${item.id} `}
                                className="p-2 cursor-pointer text-xs font-medium hover:bg-[#F6F6F6] flex items-start gap-2"
                                onClick={() => handleMentionClick(item)}
                            >
                                {/* Icon or Logo */}
                                <div className="flex-shrink-0">
                                    {(item.type === 'team_member' || item.type === 'candidate') && (
                                        item.logo ? (
                                            <img src={item.logo} alt={item.name} className="w-8 h-8 rounded-full" />
                                        ) : (
                                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <IoPersonCircle className="w-5 h-5 text-primary" />
                                            </div>
                                        )
                                    )}
                                    {item.type === 'job' && (
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <IoBriefcase className="w-4 h-4 text-primary" />
                                        </div>
                                    )}
                                    {item.type === 'document' && (
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <IoDocumentTextOutline className="w-5 h-5 text-primary" />
                                        </div>
                                    )}
                                </div>
                                {/* Details */}
                                <div className="flex w-full">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <h5 className="font-medium">
                                                {item.name}
                                            </h5>
                                            <p className="text-gray-foreground text-xs">
                                                {item.type === 'team_member' || item.type === 'candidate' && `${item.email ? item.email : 'No email'}`}
                                            </p>
                                        </div>
                                        <span className="text-gray-500 text-xs">
                                            {item.type === 'team_member' || item.type === 'candidate' && `${item.function} • ${item.company}`}
                                            {item.type === 'job' && `${item.business_area ? item.business_area : 'No business area'} • ${item.location ? item.location : 'No location'} • ${item.salary ? item.salary : 'No salary'}`}
                                            {item.type === 'document' && item.involved && `${item.involved?.join(', ')} `}
                                        </span>
                                    </div>
                                    <p className="text-gray-foreground text-xs ml-auto font-normal">Last edited {formatTimeDifference(item.updated_at)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Follow Up Questions */}
                {showFollowUpText && (
                    <div className="group absolute top-16 rounded-2xl bg-[#F6F6F6] shadow-lg max-h-48 z-50 px-6 py-2">
                        <div className="flex gap-2">
                            <p className="text-gray-foreground text-xs">{followUpText}</p>
                        </div>
                        <IoCloseOutline className="opacity-0 group-hover:opacity-100 long-transition w-4 h-4 text-gray-foreground bg-[#EEEEEE] rounded-full p-0.5 absolute -top-1 -right-1 cursor-pointer" onClick={() => { setShowFollowUpText(false); setFollowUpText('') }} />
                    </div>
                )}

                {/* Placeholder */}
                {!hasContent && (
                    <div className="absolute left-4 text-gray-foreground text-sm pointer-events-none">
                        Message Peer...
                    </div>
                )}
                {/* Content Editable Div */}
                <div
                    className="w-full focus:outline-none border-none text-sm"
                    contentEditable
                    ref={contentEditableRef}
                    onInput={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    onPaste={(e) => {
                        e.preventDefault();
                        handlePaste(e);
                    }}
                    role="textbox"
                    aria-multiline="true"
                    spellCheck="false"
                    suppressContentEditableWarning={true}
                />
                {Array.isArray(suggestedSearches) && !isInitiated && suggestedSearches.length > 0 && renderSuggestedSearches()}

                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                        {/* File Upload Button */}
                        {includeFiles && (
                            <div className={`cursor-pointer hover:bg-gray-foreground/10 rounded-lg long-transition ${size === 'large' ? 'p-2' : 'p-1.5'}`} onClick={handleFileClick}>
                                <ImAttachment className={`text-gray-foreground ${size === 'large' ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
                                <input
                                    ref={fileRef}
                                    type="file"
                                    multiple
                                    accept="*/*"
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Send Button */}
                    {!hasContent ? (
                        <>
                            {isRecording ? (
                                <RecordingAnimation isRecording={isRecording} dBLevel={dBLevel} toggleVoiceMode={toggleVoiceMode} />
                            ) : (
                                <div
                                    className={`rounded-full  ml-1 flex items-center justify-center z-40 text-secondary p-1 cursor-pointer border bg-primary border-primary
                                        ${size === 'large' ? 'h-[1.85rem] w-[1.85rem]' : 'h-[1.6rem] w-[1.6rem]'}`}
                                    onClick={toggleVoiceMode}
                                >
                                    <BsSoundwave
                                        className={`text-secondary ${size === 'large' ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
                                </div>
                            )}
                        </>

                    ) : (
                        <div
                            className={`rounded-full  ml-1 flex items-center justify-center z-40 text-secondary p-1 cursor-pointer border ${isArrowButtonDisabled ? 'bg-accent' : 'bg-primary border-primary'
                                } ${size === 'large' ? 'h-[1.85rem] w-[1.85rem]' : 'h-[1.6rem] w-[1.6rem]'}`}
                            onClick={() => handleSendMessage()}
                        >
                            <IoArrowDown className="rotate-180" />
                        </div>
                    )}

                </div>



            </div>
        );
    };

    // Include ConversationButtons, updated to pass the index to the onCopy handler
    const renderConversationButtons = (index: number) => {

        const item = chatHistory[index];
        const messageType = item.metadata?.type || 'text';

        const handleJobClick = () => {
            onCreateQuestions?.(questionsDetails as Question[]);
        }

        return (
            <div className="mt-0 mb-0">
                <ConversationButtons
                    uploadedFiles={uploadedFiles}
                    type={messageType}
                    onCopy={() => handleCopyClick(index)}
                    isCopied={copiedIndices.has(index)}
                    isAuthToken={isAuthToken ?? false}
                    isLoadingProgress={isLoadingProgress ?? false}
                    isCreationDone={messageType === 'job' ? isJobCreated ?? false : messageType === 'questions' ? isQuestionsCreated ?? false : false}
                    jobData={jobList}
                    selectedJobId={selectedJobId ?? null}
                    onJobChange={() => handleJobClick()}
                    handleSaveJob={() => onCreateJob?.(jobDetails as Job)}
                    handleImportFile={handleImportFile}
                    size={size}
                />
            </div>
        );
    };
    // Render chat history
    const renderChatHistory = () => {
        if (chatHistory.length === 0) {
            return renderWelcomeSection();
        }

        return (
            <div className={`w-full overflow-y-auto overflow-x-visible h-screen mx-auto ${isShadowed ? 'hidden' : ''}`}>
                {/* Fixed top shadow */}

                {position !== 'top' && <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />}

                {/* Scrollable chat content */}
                <section
                    ref={chatHistoryRef}
                    className={`
                        h-fit pl-2
                        ${size === 'large' ? 'lg:max-w-[52rem] mx-auto' : ''}
                        pb-20 pt-4 
                        ${isArtifact ? isFullMode ? sidebarOpen ? 'max-w-[90vw] lg:max-w-[26rem]' : 'max-w-[90vw] lg:max-w-[36rem]' : size === 'large' ? 'max-w-[90vw] lg:max-w-[44rem]' : 'w-full' : 'max-w-[90vw] lg:max-w-[52rem]'}
                    `}
                >
                    {chatHistory.map((item, index) => (
                        <div
                            key={index}
                            className={`w-full flex h-full ${item.sender === 'user' ? 'ml-auto justify-end my-2 max-w-[80%]' : 'justify-start my-2'}`}
                        >
                            <div className={`h-full ${item.sender === 'bot' ? 'flex flex-col w-full' : ''}`}>
                                {/* Message Content */}

                                {item.metadata?.type === 'job' ? (
                                    <JobStateDetails jobData={item.metadata.data} />
                                ) : (
                                    <MessageContent content={item.content} sender={item.sender} />
                                )}

                                {/* Source Cards */}
                                {item.sender === 'bot' && !isTyping && item.metadata?.sources && item.metadata.sources.length > 0 && (
                                    <div className="mt-2 mb-3 pt-1 fadeIn">
                                        {item.metadata.type === 'job' && (
                                            <div className="flex items-center gap-2 mb-2">
                                                <p className="text-sm font-medium">Related {item.metadata.sources[0].type}s</p>
                                            </div>
                                        )}

                                        {item.metadata.sources.length > 3 ? (
                                            <Carousel opts={{ containScroll: 'trim' }} className="relative flex flex-col">
                                                <div className="relative ml-auto w-fit flex items-center gap-0">
                                                    <CarouselPrevious className={`relative z-50 -translate-y-0 -left-${isArtifact ? isFullMode ? sidebarOpen ? "4" : "0" : "0" : "0"}`} />
                                                    <CarouselNext className={`relative z-50 -translate-y-0 -right-${isArtifact ? isFullMode ? sidebarOpen ? "4" : "0" : "0" : "0"}`} />
                                                </div>
                                                <CarouselContent className="flex px-6 py-1">
                                                    {item.metadata.sources.map((source, idx) => (
                                                        <CarouselItem key={idx} className="w-1/3 px-2 basis-1/3 pl-1">
                                                            {renderSourceCard(source)}
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                <div className="absolute top-0 right-0 bottom-0 w-16 pointer-events-none shadow-carousel" />
                                            </Carousel>
                                        ) : (
                                            <div className="flex gap-3">
                                                {item.metadata.sources.map((source, idx) => (
                                                    <div key={idx} className="w-1/3">
                                                        {renderSourceCard(source)}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {/* Conversation Buttons */}
                                {!isTyping && item.sender === 'bot' && renderConversationButtons(index)}

                            </div>
                        </div>
                    ))}

                    {!isTyping && renderFollowUpQuestions()}
                    {isErrorFix && (
                        <aside className={`rounded-2xl flex flex-col`}>
                            <h2 className="text-center text-sm font-semibold text-[#333333]">There was an error with the response. Try again.</h2>
                            <p className="text-base bg-primary text-secondary cursor-pointer hover:opacity-90 font-semibold py-1.5 px-4 rounded-full mx-auto mt-2" onClick={() => {
                                setIsErrorFix(false);
                                handleSendMessage(lastFailedMessage ?? undefined);
                            }}>
                                Retry
                            </p>


                        </aside>
                    )}
                </section>

                {/* Fixed bottom shadow */}
                {position !== 'bottom' && (
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none z-50" />
                )}
            </div>
        );
    };

    useEffect(() => {
        if (!isRecording && isVoiceMode) {
            setIsVoiceMode(false); // Stop the voice mode when recording stops
        }
    }, [isRecording, isVoiceMode]);

    const {
        tooltipVisible,
        tooltipPosition,
        selectionInfo,
        allowedActions,
        rightClickVisible,
        rightClickPosition,
    } = useSelectionTooltip({
        contentRef: chatHistoryRef,
        allowedActions: ['explain', 'askPeerComment']
    });

    return (
        <div
            className={`flex flex-col${position === 'top' ? '-reverse' : ''} 
    w-full relative min-h-0 
    ${size === 'large' ? 'max-h-screen' : 'px-2'} 
    ${isArtifact
                    ? isFullMode
                        ? sidebarOpen
                            ? '-translate-x-44 max-w-[90vw] lg:max-w-[30rem]'
                            : '-translate-x-24 max-w-[90vw] lg:max-w-[38rem]'
                        : sidebarOpen
                            ? '-translate-x-44 max-w-[90vw] lg:max-w-[38rem]'
                            : '-translate-x-36 max-w-[90vw] lg:max-w-[48rem]'
                    : 'max-w-[90vw] lg:max-w-[56rem] mx-auto'
                } 
    `}
        >
            {renderChatHistory()}

            <SelectionToolbar
                visible={tooltipVisible}
                position={tooltipPosition}
                actions={allowedActions}
                selectionInfo={selectionInfo}
                onFollowUpText={(text) => {
                    setFollowUpText(text);
                    setShowFollowUpText(true);
                    contentEditableRef.current?.focus();
                }}
                rightClickVisible={rightClickVisible}
                rightClickPosition={rightClickPosition}
            />


            {isInitiated && (
                <div className={`
                            z-50
                            ${position === 'top' ? 'sticky top-0' : 'sticky bottom-2'}
                            ${size === 'large' ? 'px-4' : ''}
                            flex flex-col gap-2
                        `}>
                    {/* Render uploaded files based on position */}
                    {uploadedFiles.length > 0 && (
                        <div className={position === 'top' ? 'order-2' : 'order-1'}>
                            {renderUploadedFiles()}
                        </div>
                    )}
                    {/* Render input area */}
                    <div className={position === 'top' ? 'order-1' : 'order-2'}>
                        {renderInputArea()}
                    </div>
                </div>
            )}
            {/* File Drag & Drop Overlay */}
            {isDragging && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center"
                    style={{
                        background: "radial-gradient(circle, #FAFAFA 10%, rgba(255, 255, 255, 0.5) 60%)",
                    }}>
                    <div className="flex flex-col items-center gap-4 max-w-md mx-4">
                        <div className="p-4 rounded-full bg-primary/10">
                            <ImAttachment className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-center">Add any file</h3>
                        <p className="text-gray-foreground text-center">
                            Drop any file in here to add it to the conversation
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ChatComponent;
