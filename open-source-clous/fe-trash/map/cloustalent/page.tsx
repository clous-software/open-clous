"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

import * as z from "zod"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoArrowUp } from "react-icons/io5";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { updateJob } from "@/app/api/jobs/route"

import { applyJob } from "@/app/api/users/route"
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect, useCallback, useRef } from "react"
import { ToastAction } from "@/components/ui/toast"
import mixpanel from "mixpanel-browser";
import InfiniteLogoCarousel from '@/components/ui/infiniteloop';
import { IoLogoGithub } from 'react-icons/io';
import { FaXTwitter } from 'react-icons/fa6';
import { IoIosGlobe } from 'react-icons/io';
import { IoLogoLinkedin } from 'react-icons/io';
import Textarea from 'react-expanding-textarea';
import { createUser, loginUser } from "@/app/api/users/route";
import { Card, CardContent } from "@/components/ui/card";
import FileInput from "@/components/ui/fileInput";
import { PiWaveformBold, PiWaveform } from "react-icons/pi";
import {
  IoShareOutline,
  IoCopy,
  IoArrowForwardOutline,
  IoAddCircleOutline,
} from "react-icons/io5";
import { init, track, add, Identify, setUserId } from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';
import { getDataProcessing } from "@/app/api/processingClient";

type ApplyData = {
  first_name?: string,
  last_name?: string,
  email?: string,
  linkedin_url?: string,
  github_url?: string,
  portfolio_url?: string,
  motivation_letter?: string,
};

const ShareWithUs = ({
}) => {
  const [candidateId, setCandidateId] = useState<string>('');

  const [joinedSuccess, setJoinedSuccess] = useState(false);
  const [isAuthToken, setIsAuthToken] = useState(false);
  const [applyData, setApplyData] = useState<ApplyData | null>(null);
  const [isResumeVerified, setIsResumeVerified] = useState(false);
  const [isUser, setIsUser] = useState(false);
  // const [talentData, setTalentData] = useState<TalentData | null>(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeBase64, setResumeBase64] = useState('');
  const [resumeSuccessMessage, setResumeSuccessMessage] = useState(""); // State to hold the success message

  const [cardTitle, setCardTitle] = useState<string>('');

  const [isAppliedSuccess, setIsAppliedSuccess] = useState(false);
  const [isAppliedProgress, setIsAppliedProgress] = useState(false);

  const [progress, setProgress] = useState(0); // Progress in percentage

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast()
  const router = useRouter();

  const [isVoiceMode, setIsVoiceMode] = useState(false);

  useEffect(() => {
    // Initialize Session Replay plugin if needed
    const sessionReplay = sessionReplayPlugin({
      sampleRate: 1.0, // Adjust the sampling rate as needed
    });

    // Initialize Amplitude
    init('af32f14ff1a0a447f901f765311fec1f', undefined, {
      defaultTracking: {
        sessions: true,
        pageViews: true,
        formInteractions: true,
      },
      serverZone: 'EU',
    });

    // Add the Session Replay plugin
    add(sessionReplay);

    // Track an initial page view event
    track('Page View', { page: 'Clous Talent' });
  }, []);

  const handleFileInputChange = async (e: any) => {
    console.log("File updated");
    const file = e.target.files[0];
    setResumeFile(file);
    const base64 = await convertToBase64(file);
    setResumeBase64(base64);
    setResumeSuccessMessage("Successfully uploaded resume!");
    console.log("This is the resume!", resumeBase64);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleIsFollowing = async () => {
    try {
      setIsFollowing(!isFollowing);
      // const response = await updateCandidateCompany(candidateId, isFollowing, jobId);
    } catch (error) {
      console.error("Error al copiar al portapapeles:", error);
    }
  };

  const handleSignOn = async (email: string) => {
    try {
      const user = await loginUser(email);
      // Check if the user data exists
      localStorage.setItem('userId', user.id);
      if (user) {
        setIsUser(true);
        setIsResumeVerified(user.is_candidate);
        setIsAuthToken(true);
      } else {
        setIsUser(false);
      }

      console.log("The user data is", user);


      if (isResumeVerified) {
        toast({
          variant: "default",
          title: "You are all set!",
          description: "Just a motivation letter to make sure you're human.",
          action: (
            <ToastAction
              altText="Apply to job"
              className="border hover:none"
              onClick={() => handleApplyClick()}
            >
              Apply to job
            </ToastAction>
          ),
        });
      }
      // else {
      //   toast({
      //     variant: "default",
      //     title: "Need additional data to apply",
      //     description: "This data creates your candidate profile.",
      //     action: (
      //       <ToastAction
      //         altText="Apply to job"
      //         className="border hover:none"
      //         onClick={() => handleApplyClick()}
      //       >
      //         Apply to job
      //       </ToastAction>
      //     ),
      //   });
      // }

    } catch (error) {
      setIsUser(false);
      console.error("Error fetching user data", error);
    }
  };

  const handleApplyClick = () => {
    // Handle case where URL is not available
    console.error('Job URL not found');

    // Focus on the Apply form
    const applyForm = document.getElementById('apply-form'); // Assuming the ID of the Apply form is 'apply-form'
    if (applyForm) {
      applyForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleApply = useCallback(async () => {
    try {
      console.log("Starting handleApply...");
      console.log("Form data:", applyData);
      // console.log("Resume data:", resumeBase64);
      const requiredFields = ["email", "linkedin_url"];

      if (!applyData || requiredFields.some(field => !(field in applyData))) {
        toast({
          variant: "destructive",
          title: "Incomplete data",
          description: "Please fill in all fields before submitting your application.",
        });
        return;
      }

      if (applyData.linkedin_url && /^https?:\/\/[^\s$.?#].[^\s]*$/.test(applyData.linkedin_url)) {
        console.log("Valid LinkedIn URL:", applyData.linkedin_url);
      } else {
        toast({
          variant: "destructive",
          title: "Write your Linkedin URL",
          description: "You should write your 'https://' address to verify your resume.",
        });
        return;
      }

      if (!resumeBase64) {

        toast({
          variant: "destructive",
          title: "Upload your resume first",
          description: "You must upload your resume to apply to this job.",
        });
        return;
      }

      setIsAppliedProgress(true);
      setProgress(0); // Reset progress to 0

      // Start the progress animation
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev < 100) return prev + 1; // Increment progress
          return prev;
        });
      }, 30); // Update every 30ms to fill in 3 seconds

      // Perform the API call
      const responsePromise = applyJob(applyData);

      // Wait for the API response while progress is filling
      const response = await responsePromise;

      console.log("API response:", response);

      // Stop the progress animation
      clearInterval(intervalRef.current as NodeJS.Timeout);
      setProgress(100); // Ensure progress is filled
      setIsAppliedProgress(false);

      // setIsRegisterRequest(true);

      setCandidateId(response.id);
      localStorage.setItem('candidateId', response.id);
      setIsAppliedSuccess(true);
      console.log("States updated: isAppliedSuccess and isRegisterRequest set to true");

      toast({
        variant: "default",
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      });
      localStorage.setItem('userId', response.id);
    } catch (error) {
      console.error("Error submitting application:", error);
      setIsAppliedSuccess(false);
      setIsAppliedProgress(false);
      // setIsRegisterRequest(false);
      console.log("States updated due to error: isAppliedSuccess and isRegisterRequest set to false");
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
      });
    }
  }, [applyData]);

  const handleClick = (title: string) => {
    setCardTitle(title);
    console.log("Here is the title:", title);
  };


  const toggleVoiceMode = () => {
    setIsVoiceMode((prev) => !prev);
  };

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    const handleVoiceMode = async () => {
      if (isVoiceMode) {
        try {
          const transcript = await startRecording();
          setUserMessage((userMessage + transcript));

          setApplyData((prevApply) => {
            const currentMotivation = prevApply?.motivation_letter || ''; // Safely access or set to empty string
            return {
              ...prevApply,
              motivation_letter: currentMotivation + (currentMotivation ? ' ' : '') + transcript, // Append the transcript
            };
          });

          await new Promise(resolve => setTimeout(resolve, 500));
          setIsVoiceMode(false);
        } catch (error) {
          console.error('Error in voice mode:', error);
        }
      } else {
        stopRecording();
      }
    };

    handleVoiceMode();
  }, [isVoiceMode]);

  const startRecording = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        let chunks: Blob[] = [];
        let silenceTimer: NodeJS.Timeout | null = null;
        const silenceThreshold = -22; // db
        const silenceDuration = 1350; // ms

        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);

        const checkSilence = () => {
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyser.getByteFrequencyData(dataArray);

          const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
          const dB = 20 * Math.log10(average / 255);

          if (dB < silenceThreshold) {
            if (!silenceTimer) {
              silenceTimer = setTimeout(() => {
                console.log('Silence detected, stopping recording');
                mediaRecorder.stop();
              }, silenceDuration);
            }
          } else {
            if (silenceTimer) {
              clearTimeout(silenceTimer);
              silenceTimer = null;
            }
          }
        };

        const silenceInterval = setInterval(checkSilence, 80);

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          clearInterval(silenceInterval);
          if (silenceTimer) clearTimeout(silenceTimer);

          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          setAudioChunks([]);
          const formData = new FormData();
          formData.append('audio', audioBlob, 'audio.webm');

          try {
            console.log('Sending audio data to API...');
            const responseTranscript = await getDataProcessing(formData, 'action', 'transcribe');
            console.log('API response:', responseTranscript);

            if (responseTranscript && responseTranscript.transcript) {
              resolve(responseTranscript.transcript);
            } else {
              reject(new Error('Transcript not found in the response'));
            }
          } catch (error) {
            console.error('Error processing audio:', error);
            reject(error);
          } finally {
            stream.getTracks().forEach(track => track.stop());
            audioContext.close();
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
      }).catch(error => {
        console.error('Error accessing microphone:', error);
        reject(error);
      });
    });
  };

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    setIsRecording(false);
  };



  return (
    <main className="pt-6 pb-12 w-full bg-[#FAFAFA] bg-pattern bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex justify-between px-32 mb-8">
        <div className="flex items-center gap-3">
          {/* <Image
                  width={26}
                  height={24}
                  className="object-cover"
                  src="/logo.png"
                  alt="Clous Logo"
                /> */}
          <h1 className="text-2xl -translate-y-0.5" onClick={() => window.open("https://www.clous.app")}>Clous</h1>
        </div>
        <Button className="mh-8" variant="default" size="sm" onClick={() => window.open('https://x.com/cloushq', '_self')}>Follow us<IoArrowUp className="rotate-45 w-4 h-4" /></Button>

      </div>
      {!isAppliedSuccess && (
        <>
          <h3 className="font-semibold text-xl sm:text-2xl">Apply for this job</h3>
          <div id="apply-form" className="w-full lg:w-4/6">
            <div className="flex flex-col gap-3 mb-3 pt-6">
              {!isAuthToken && (
                <>
                  <div className="flex items-start gap-2">
                    <div className="flex flex-col gap-2 items-start w-full">
                      {resumeSuccessMessage ? (
                        <p className="text-gray-foreground">{resumeSuccessMessage}</p>

                      ) : (
                        <FileInput
                          isResume={true}
                          onChange={(e) => {
                            handleFileInputChange(e);
                          }}
                        />
                      )}

                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-gray-foreground text-sm font-medium ">{"Your portfolio"}</label>
                      <Input
                        type="text"
                        placeholder={"https://www.myportfolio.com"}
                        value={applyData?.portfolio_url}
                        onChange={(e) =>
                          setApplyData((prevApply) => ({
                            ...prevApply,
                            ['portfolio_url']: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <Input
                    type="email"
                    placeholder="Email address"
                    value={applyData?.email || ""}
                    onChange={(e) =>
                      setApplyData((prevApply) => ({
                        ...prevApply,
                        email: e.target.value,
                      }))
                    }
                    onBlur={() => handleSignOn(applyData?.email)}
                  />
                  {!isUser && (

                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="First name"
                        value={applyData?.first_name || ""}
                        onChange={(e) =>
                          setApplyData((prevApply) => ({
                            ...prevApply,
                            first_name: e.target.value,
                          }))
                        }
                      />
                      <Input
                        type="text"
                        placeholder="Last name"
                        value={applyData?.last_name || ""}
                        onChange={(e) =>
                          setApplyData((prevApply) => ({
                            ...prevApply,
                            last_name: e.target.value,
                          }))
                        }
                      />

                    </div>
                  )}



                </>
              )}

              {!isResumeVerified && (
                <Input
                  type="linkedin_url"
                  placeholder="Linkedin URL"
                  value={applyData?.linkedin_url || ""}
                  onChange={(e) =>
                    setApplyData((prevApply) => ({
                      ...prevApply,
                      linkedin_url: e.target.value,
                    }))
                  }
                />
              )}
              <div className="relative w-full">
                <Textarea
                  className="w-full bg-transparent p-2 text-sm min-h-[6rem] focus:border-primary outline-primary border rounded-lg"
                  placeholder="Anything you would like us to know? (optional)"
                  value={applyData?.motivation_letter}
                  onChange={(e) =>
                    setApplyData((prevApply) => ({
                      ...prevApply,
                      motivation_letter: e.target.value,
                    }))
                  }
                  onPaste={(e) => e.preventDefault()}
                />
                <div className={`absolute bottom-3 right-2 mt-1 p-2 flex justify-center items-center rounded-lg bg-gray-foreground/10 hover:bg-primary hover:text-secondary cursor-pointer  ${isVoiceMode ? "text-primary" : ""}`} onClick={toggleVoiceMode}>
                  <PiWaveformBold className="w-4 h-4" />
                </div>
              </div>
            </div>
            <p className="text-gray-foreground text-xs mt-1 mb-3">By continuing you agree to our <a href="https://docs.google.com/document/d/1j8XX7VQOm0lcV1_8blV1bjmUVCG3Cvc7mKGX3hkRb0o/edit?usp=sharing" target="_blank" className="font-semibold">Privacy Policy</a> and our <a href="https://docs.google.com/document/d/1j8XX7VQOm0lcV1_8blV1bjmUVCG3Cvc7mKGX3hkRb0o/edit?usp=sharing" target="_blank" className="font-semibold">Terms and Conditions</a>.</p>
            <Button onClick={() => handleApply()} className="w-full h-10">Apply</Button>
            {isAppliedProgress && (
              <div className="w-full h-[6px] bg-gray-foreground/10 rounded-full overflow-hidden relative mt-2">
                <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
              </div>
            )}
          </div>
        </>
      )}
      {isAppliedSuccess && (
        <div className="text-center flex flex-col">
          <h3 className="text-2xl">
            We&apos; will get back to you!
          </h3>
          <p className="mb-3 mt-1">
            In the meantime, you can ask about the hiring and onboarding process from Clous, or visit their website for more information.
          </p>
          <Button variant="secondary" size="default" className="text-sm max-w-[12rem] mx-auto mb-3" onClick={() => window.open("https://x.com/cloushq", "_blank")}><IoAddCircleOutline className='h-4 w-4 ' />Follow us</Button>
          {/* <div className="mx-auto grid grid-cols-3 gap-3">
                <Card
                        className="text-xs flex items-between h-36 text-muted hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 delay-100 cursor-pointer px-3 relative rounded-3xl"
                        onClick={() => handleClick("How does the hiring process work?")}
                      >
                        <CardContent className="grid grid-cols-1 gap-2 h-full w-full justify-start items-between p-2">
                          <div className=" bg-primary/10 rounded-full flex justify-center items-center w-8 h-8">
                            <IoChatbubblesOutline className="h-4 w-4 text-primary"/>
                          </div>
                          <h3 className="font-medium text-xs lg:text-sm text-gray-foreground mt-auto text-left">How does the hiring process work?</h3>
                        </CardContent>
                      </Card>
                      <Card
                        className="text-xs flex items-between h-36 text-muted hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 delay-100 cursor-pointer px-3 relative rounded-3xl"
                        onClick={() => handleClick("What questions can I be asked in an interview?")}
                      >
                        <CardContent className="grid grid-cols-1 gap-2 h-full w-full justify-start items-between p-2">
                          <div className=" bg-primary/10 rounded-full flex justify-center items-center w-8 h-8">
                            <IoChatbubblesOutline className="h-4 w-4 text-primary"/>
                          </div>
                          <h3 className="font-medium text-xs lg:text-sm text-gray-foreground mt-auto text-left">What questions can I be asked in an interview?</h3>
                        </CardContent>
                      </Card>
                      <Card
                        className="text-xs flex items-between h-36 text-muted hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 delay-100 cursor-pointer px-3 relative rounded-3xl"
                        onClick={() => handleClick("Do my skills align well with this role?")}
                      >
                        <CardContent className="grid grid-cols-1 gap-2 h-full w-full justify-start items-between p-2">
                          <div className=" bg-primary/10 rounded-full flex justify-center items-center w-8 h-8">
                            <IoChatbubblesOutline className="h-4 w-4 text-primary"/>
                          </div>
                          <h3 className="font-medium text-xs lg:text-sm text-gray-foreground mt-auto text-left">Do my skills align well with this role?</h3>
                        </CardContent>
                      </Card>
                </div> */}
        </div>
      )}
      <Link href="/" className={`px-4 py-2 mt-8 mx-auto w-[38rem] shadow-sm bg-[#F9F9F9] rounded-3xl border flex gap-2 items-center justify-start hover:-translate-y-0.5 transition-all duration-200 delay-100`}>
        <p className="px-2 py-1 bg-primary text-sm font-semibold text-secondary rounded-xl">NEW</p>
        <p className="font-medium text-base">Meet Clous 0.5, our most powerful model for hiring teams yet.</p>
      </Link>
      <aside className="fixed bottom-2 right-0 left-0 mx-auto text-gray-foreground font-medium text-xs">
        <div className="flex justify-center gap-4 mx-auto">
          <Link href="/getintouch" className="">Talk to the founders</Link>
          <Link href="/login" className="">Login</Link>
          {/* <Link href="/library" className="">Library</Link> */}
          {/* <Link href="/feedback" className="">Feedback</Link> */}
          {/* <Link href="/resources" className="">Resources</Link> */}
          <Link target="_blank" href="https://www.clous.app/terms" className="">Terms of Use</Link>
        </div>
      </aside>
    </main>

  )
}
export default ShareWithUs;
