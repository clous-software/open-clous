"use client"
import { IoMenuOutline } from "react-icons/io5";

import { FaSquare } from "react-icons/fa";
import { useEffect, useRef, useCallback } from "react";
import { candidateDeskRequest } from "@/app/api/ai/route";
import { IoCopyOutline,
  IoCopy, IoArrowDown, IoArrowUp } from "react-icons/io5";
import { MdOutlineFullscreen, MdFullscreenExit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import Textarea from 'react-expanding-textarea'; // Import the Textarea component
import FileInputButton from "../buttons/FileInputButton";
import Image from "next/image";
import { ArrowUpRight, Minus, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { IoHelpCircleOutline } from "react-icons/io5";
import ActionTooltip from "../actions/ActionTooltip";
import AuthModal from '@/components/experience/authModal';
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { getUser } from "@/app/api/users/route";
import { formatResponseSmallText } from "@/utils/formattingUtils";

interface HistoryItem {
  userMessage: string;
  response: string;
}


interface DeskItem {
  id: string;
  text: string | null;
}

interface Desk {
  id: string;
  name: string | null;
}

interface DeskModalProps {
  candidateId?: string;
  jobId?: string;
  cardTitle?: string; // to send API calls to AI models
  type?: string;
}

type User = {
  id: any;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};

const DeskModal: React.FC<DeskModalProps> = ({ candidateId, jobId, cardTitle, type }) => {

  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [isDeskOpen, setIsDeskOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isErrorFix, setIsErrorFix] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [showSections, setShowSections] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [isArrowButtonDisabled, setIsArrowButtonDisabled] = useState(true);
  const [isFormattedResponse, setIsFormattedResponse] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  let [userMessage, setUserMessage] = useState("");
  const [response, setResponse] = useState("");
  const [responses, setResponses] = useState<HistoryItem[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isDeskActive, setIsDeskActive] = useState(false);
  const [isCandidateDesk, setIsCandidateDesk] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [isPeer, setIsPeer] = useState(false);
  const [isAuthToken, setIsAuthToken] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHubMode, setIsHubMode] = useState(false);
  const [isRegisterRequest, setIsRegisterRequest] = useState(false);
  const [emailValueParam, setIsEmailValueParam] = useState("");
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [initialGeneration, setInitialGeneration] = useState(false);


  useEffect(() => {

    if (candidateId && jobId) {
      setIsCandidateDesk(true);
      setIsDeskActive(true);
      setIsMinimized(true);

    }
    if (jobId && !candidateId) {
      setIsRecruiter(true);
      setIsDeskActive(false);
      setIsMinimized(true);

    }

    const refreshToken = localStorage.getItem('refreshToken');
    console.log("the auth token in refresh is:", refreshToken);
    if (refreshToken) {
      setIsAuthToken(true);
    }
  }, []);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');

    const userId = localStorage.getItem('userId');
    async function loadUserData() {
      if (refreshToken) {
        try {
          if (userId) {
            const userData = await getUser(userId);

            setProfileUser(userData);
          } else {
            console.log("The userId wasn't retrieved or doesn't exist")
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setIsAuthToken(false);
        }
      }
    }
  
    loadUserData();
  }, []);

  const handleHubMode = async () => {
    if (!isHubMode) {
      setIsHubMode(true);
      setIsMaximized(true);
    } else {
      setIsHubMode(false);
    }

  };

  const handleReset = () => {
    try {
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenAuth = async () => {
    if (!isAuthOpen) {
      setIsAuthOpen(true);
    } else {
      setIsAuthOpen(false);
    }

  };

  const handleCopyClick = async () => {
     try {
      const contentCopy = stripHtmlTags(response);
        await navigator.clipboard.writeText(contentCopy); 
      // Copiar el texto limpio al portapapeles
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Error al copiar al portapapeles:", error);
    }

  };

  const stripHtmlTags = (html: string) => {
    if (typeof document === 'undefined') {
      return html;
    }
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

const showWaitingCursor = () => {
  let isCursorVisible = true;
  const cursorInterval = setInterval(() => {
    setResponse(isCursorVisible ? '<span class="cursorRound"></span>' : '<span class="cursorNone"></span>');
    isCursorVisible = !isCursorVisible;
  }, 500); // Ajusta la velocidad del parpadeo aquí

  return () => clearInterval(cursorInterval);
};

useEffect(() => {
  if (cardTitle) {
    console.log("Here are the data", cardTitle, initialGeneration);
    setIsMinimized(false);
    handleGenerateClick();
    setInitialGeneration(false);
  }

}, [cardTitle]);

  const handleGenerateClick = async () => {
    // if (isArrowButtonDisabled) return;
    localStorage.removeItem('threadId');
    setIsError(false);
    setIsErrorFix(false);
    setShowCTA(false);
    setShowSections(false);
    setIsTyping(true);
    setIsWaitingForResponse(true);
    const stopWaitingCursor = showWaitingCursor();
   
    if (cardTitle && !initialGeneration) {
      userMessage = cardTitle;
      console.log("Here are the data", userMessage);

    }

    console.log("Here are the data", userMessage);

    let newChatHistoryItem = { userMessage };
    let reFormattedResponse = "";
    let newResponse = "";
    let job_data = [];

    try {
      // userMessage = userMessage; // Assign original userMessage if not in a thread
      console.log("This is the user message:", userMessage);
      setChatHistory([...chatHistory, newChatHistoryItem]);
     
      const chatResponse = await candidateDeskRequest(userMessage, jobId ?? undefined, candidateId ?? undefined);

      setInitialGeneration(true);

      setLastResponse(chatResponse.response);
      
      localStorage.setItem('chatResponse', chatResponse.response);
      setUserMessage("");
      newResponse = formatResponseSmallText(chatResponse.response);
      reFormattedResponse = formatResponseSmallText(newResponse);


        if (!isFormattedResponse) {
          newChatHistoryItem = { ...newChatHistoryItem, response: newResponse };
        } else {
          newChatHistoryItem = { ...newChatHistoryItem, response: newResponse };
        }
        setIsFormattedResponse(false);
        console.log("This is the chat response:", chatResponse);
        console.log("This is the new response:", newResponse);
        console.log("This is the reformatted response:", reFormattedResponse);
        setChatHistory([...chatHistory, newChatHistoryItem]);
        setResponses((prevResponses) => [
          ...prevResponses,
          { userMessage, response: chatResponse.response },
        ]);
      
      if (chatResponse) {


        let responseText = "";

        const formattedResponse = formatResponseSmallText(chatResponse.response);
        responseText = formattedResponse;
        simulateTyping(responseText);
        setIsTyping(false);
      } else {
        console.error("La respuesta de la API no es una cadena.");
      }
    } catch (error) {
      console.error(error);
      console.log("Here's the chatResponse", response);
      setIsErrorFix(true);
      
    } finally {
      stopWaitingCursor();
      setIsWaitingForResponse(false);
      
    }
  };

  const simulateTyping = (textToType: string) => {
    const words = textToType.split(" ");
    let currentIndex = 0;
  
    const animateTyping = () => {
      if (currentIndex < words.length) {
        const partialText = words.slice(0, currentIndex + 1).join(" ");
        setResponse(
          partialText +
          '<span class="fade-in"></span>' +
          (currentIndex === words.length - 1 ? "" : '<span class="cursorRound ml-1"></span>')
        );
        currentIndex++;
        requestAnimationFrame(animateTyping);  // Use requestAnimationFrame for smoother updates
      } else {
        setIsTypingComplete(true);
        setIsArrowButtonDisabled(false);
      }
    };
  
    // Start the animation
    requestAnimationFrame(animateTyping);
  };
  
  const handleIconClick = () => {
    setIsSectionVisible(!isSectionVisible);
  };
  

  const handleCloseClick = () => {
    setIsSectionVisible(false);
    setIsMinimized(false); // Ensure the card is maximized when closed
  };

  const handleMinimizeClick = () => {
    setIsMaximized(false);
    setIsMinimized(true);
    setIsDeskOpen(false);
  };

  const handleMaximizeClick = () => {
    if (!isMaximized) {
      // setIsMinimized(false);
      setIsMaximized(true);
    } else {
      setIsMaximized(false);
    }
  };

  const handleDeskOpenClick = () => {
    setIsDeskOpen(true);
    setIsMinimized(false);

  };

  const getWidth = (text: string) => {
    const maxWidthPercentage = 0.9; // Puedes ajustar este porcentaje según tus necesidades
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context) {
      context.font = "18px Montserrat, sans-serif";

      // Obtener el ancho máximo permitido
      const maxWidth = window.innerWidth * maxWidthPercentage;

      // Calcular el ancho del texto
      const width = text ? context.measureText(text).width : 42;

      // Retornar el ancho, limitándolo al ancho máximo
      return width > maxWidth ? maxWidth : width + 8;
    }

    return "auto";
  };

  return (
    <>


    
    <main className="">
    
        <Card
          className={`fixed lg:bottom-6 lg:top-auto lg:block hidden right-4 z-50 w-auto border-0 transition-all duration-200 delay-100 ${
            isDeskOpen ? "max-w-[28rem] min-w-[28rem]" : "minimized rounded-full"
          } ${isMaximized ? "w-full h-full rounded-none max-w-[100rem] lg:bottom-0 right-0" : "rounded-2xl"}`}
        >
              {(isAuthOpen || isRegisterRequest) ? (
      <AuthModal isDesk={true} isCandidate={true} emailValue={emailValueParam}/>
    ) : (
      <>
          <CardContent className={`flex z-10 font-medium py-2 w-full items-center justify-between ${isMinimized ? "px-2 rounded-full bg-primary" : "border px-6 rounded-t-3xl"} ${isMaximized ? "rounded-t-none" : ""}`}>
          {/* <IoArrowBackOutline className={`p-1 hover:bg-gray-foreground/10 rounded-lg cursor-pointer w-6 h-6 ${
            isMinimized ? "hidden" : ""
          } ${isCandidate ? "hidden" : "" } ${isMaximized ? "hidden" : ""}`} onClick={() => setIsDeskActive(false)}/> */}
          <div className={`flex gap-2 hidden items-center pl-16 ${
            isMaximized ? "" : "hidden"
          }`}>

                <h1 className="text-2xl text-gray-foreground">Clous</h1>
            </div>
          <div className={`flex gap-3`}>
              {isMinimized ? (
                <>
                <div className="cursor-pointer h-full w-full bg-primary" onClick={handleDeskOpenClick}>
                <IoMenuOutline className="w-6 h-6 text-white"/>
                </div>
                
                </>
              ) : (
                <>

                {isMaximized ? (
                 <MdFullscreenExit onClick={handleMaximizeClick} className="cursor-pointer my-2 w-4 h-4" />
                ) : (
                  <MdOutlineFullscreen onClick={handleMaximizeClick} className="cursor-pointer my-2 w-4 h-4" />

                )}
                <Minus onClick={handleMinimizeClick} className="cursor-pointer my-2 w-4 h-4" />
                <X onClick={handleCloseClick} className="hidden cursor-pointer my-2 w-4 h-4" />
                </>
              )}
            </div>
            {/* {isAuthToken && !isMinimized && (
            <>

              <div className="text-gray-foreground rounded-full  group flex p-1 hover:bg-muted/5 justify-center text-sm font-semibold items-center cursor-pointer leading-none overflow-x-hidden gap-4" onClick={() => handleHubMode()}>
                            <Avatar
                              className="w-8 h-8 rounded-full bg-primary font-normal flex items-center justify-center text-white"
                            >
                              {profileUser?.first_name && profileUser.first_name[0]}
                              {profileUser?.last_name && profileUser.last_name[0]}
                            </Avatar>
                            
                      </div>
                      {isHubMode && (
                <>
                 <HubModal 
                isHub={true}
                />
                              </>
              )}
                      </>)}
            {!isAuthToken && !isMinimized && isCandidate && (
              <Button className={`relative flex max-w-[5rem] gap-1 ${isMaximized ? "text-base " : "text-sm h-6"}`} onClick={() => handleOpenAuth()}>Login <IoArrowUp className="h-4 w-4 rotate-45"/></Button>
            )} */}
            
            
          </CardContent>
          {!isMinimized && isSectionVisible && (
            <>
                       
            <CardContent className="border rounded-3xl h-full rounded-t-none px-0 pt-0 pb-6">
            <>
            <div className={`space-y-2 relative bg-transparent overflow-y-auto min-h-[20rem] max-h-[30rem] h-auto text-muted pt-2 pl-2 w-full mx-auto ${isMaximized ? "mt-4 w-full" : "max-w-[28rem]"}`}>
                <div id="board" className="overflow-hidden relative ">
                      <div className={`overflow-y-auto h-full relative px-4 pb-24 ${isMaximized ? "px-64" : ""}`}>
                            {chatHistory.slice(0).map((item, index) => (
                              
                              <div key={index} className={`select:primary rounded-lg w-full flex items-center justify-between bg-[#FAFAFA]`}>
                                
                                <div className="flex flex-col gap-3 relative w-full">
                                
                                <div className={`py-2 px-3 text-gray-foreground flex-col flex bg-muted/5 rounded-xl font-semibold max-w-[80%] ml-auto overflow-hidden ${isMaximized ? "text-base" : "text-sm"}`} dangerouslySetInnerHTML={{ __html: item.userMessage }}>       
                                  </div>
                                  
                                  {index < chatHistory.length - 1 && ( // Check if it's not the last item in chatHistory
                                  <div className="group">
                                    <div className={`font-normal max-w-[80%] overflow-hidden ${isMaximized ? "text-base" : "text-sm"}`} dangerouslySetInnerHTML={{ __html: chatHistory[index]?.response }}>
                                    </div>
                                    <div className="opacity-0 flex mt-2 gap-2 group-hover:opacity-100 transition-all duration-300 delay-100">
                                    <ActionTooltip
                                    label="Copy Content"
                                    side="bottom"
                                    align="end"
                                    
                                  >
                                    <div
                                      className="p-2 h-8 items-center rounded-lg hover:bg-muted/5 cursor-pointer relative "
                                      onClick={handleCopyClick}
                                    >
                                      {isCopied ? (
                                        <IoCopy className="w-4 h-4" />
                                      ) : (
                                        <IoCopyOutline className="w-4 h-4" />
                                      )}
                                    </div>
                                  </ActionTooltip>
                                    </div>
                                    
                                  </div>
                                  )}
                                  </div>
                              </div>
                            ))}
                              <div
                              className={`mt-3 whitespace-pre-wrap ${isMaximized ? "text-base" : "text-sm"}`}
                              dangerouslySetInnerHTML={{ __html: response }}
                              // ref={lastUserMessageRef}
                            ></div>
                            {response && (
                              <div className="flex gap-2">
                              <ActionTooltip
                                      label="Copy Content"
                                      side="bottom"
                                      align="end"
                                      
                                    >
                                      <div
                                        className="p-2 h-8 items-center rounded-lg hover:bg-muted/5 cursor-pointer relative "
                                        onClick={handleCopyClick}
                                      >
                                        {isCopied ? (
                                          <IoCopy className="w-4 h-4" />
                                        ) : (
                                          <IoCopyOutline className="w-4 h-4" />
                                        )}
                                      </div>
                                    </ActionTooltip>
                              </div>

                            )}
                            
                          
                          </div>
                          <div className="relative mx-auto max-w-[55rem] items-center justify-center flex">
                          <Textarea
                        placeholder="Ask about this job or the hiring process..."
                        className={`h-auto min-h-6 max-h-24 fixed border z-30 bottom-8 bg-[#FAFAFA] w-[27rem] shadow-2xl shadow-[0_-16px_16px_16px_rgb(250,250,250)] rounded-3xl overflow-hidden whitespace-normal py-3 pl-4 pr-8 text-sm focus:border-orange focus:outline-primary ${
                          isTyping ? "outline-primary" : " "
                        } ${isMaximized ? "h-auto min-h-12 max-h-24 border z-30 bg-[#FAFAFA] max-w-[80vw] w-[55rem] shadow-2xl shadow-[0_16px_16px_16px_rgb(250,250,250)] rounded-3xl overflow-hidden whitespace-normal pt-3.5 pl-4 pr-0 lg:pr-12 text-sm focus:border-orange focus:outline-primary" : ""}`}
                        value={userMessage}
                        onChange={(e) => {
                          setUserMessage(e.target.value);
                          setIsArrowButtonDisabled(e.target.value.trim() === ""); // Habilitar si el campo no está vacío
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Prevent default Enter behavior (e.g., adding a new line)
                            handleGenerateClick()}
                        }}// Pasa la función como prop
                        autoFocus // Asegura que el campo de entrada obtenga el foco automáticamente
                      /> 
                    

                  <p
                    className={`rounded-full fixed flex items-center justify-center z-40 text-secondary p-1 cursor-pointer border max-h-[2rem] ${isArrowButtonDisabled ? "bg-accent" : "bg-primary border-primary"} ${isTyping ? "border-2 border-primary bg-primary min-h-[1.5rem] min-w-[1.5rem]" : "min-h-[1.5rem] min-w-[1.5rem]"} ${isMaximized ? "bottom-10 right-72" : "bottom-10 right-7"}`}
                  >
                  {isTyping ? (
                      <FaSquare
                        className="text-secondary"
                        onClick={handleReset}
                        size={10}
                      />
                    ) : (
                      <IoArrowDown onClick={handleGenerateClick} size={18} className="rotate-180"/>
                    )}
                  </p>
                  </div>
                </div>
                
              </div>
           </>
         </CardContent>
         </>
          )}
          </>
        )}


        </Card>
    </main>

    </>
  );
};

export default DeskModal;