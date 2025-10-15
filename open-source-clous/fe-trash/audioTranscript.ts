import { useState, useRef, useEffect } from "react";
import getAudioTranscript from "@/app/api/ai/route";

interface UseVoiceRecorderProps {
  isVoiceMode: boolean;
  setUserMessage: (message: string) => void;
  setShouldGenerate?: (value: boolean) => void;
}

export const useVoiceRecorder = ({ isVoiceMode, setUserMessage, setShouldGenerate }: UseVoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    const handleVoiceMode = async () => {
      if (isVoiceMode) {
        try {
          const transcript = await startRecording();
          setUserMessage(transcript);
          await new Promise(resolve => setTimeout(resolve, 500));
          setShouldGenerate?.(true);
        } catch (error) {
          console.error("Error in voice mode:", error);
        }
      } else {
        stopRecording();
      }
    };
    handleVoiceMode();
  }, [isVoiceMode, setUserMessage, setShouldGenerate]);

  const startRecording = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          let chunks: Blob[] = [];
          let silenceTimer: NodeJS.Timeout | null = null;
          const silenceThreshold = -22; // db
          const silenceDuration = 960; // ms

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
                  console.log("Silence detected, stopping recording");
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

          mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
              chunks.push(event.data);
            }
          };

          mediaRecorder.onstop = async () => {
            clearInterval(silenceInterval);
            if (silenceTimer) clearTimeout(silenceTimer);

            const audioBlob = new Blob(chunks, { type: "audio/webm" });
            const formData = new FormData();
            formData.append("audio", audioBlob, "audio.webm");

            try {
              console.log("Sending audio data to API...");
              const responseTranscript = await getAudioTranscript(formData, "en"); // Assuming getAudioTranscript is defined elsewhere
              console.log("API response:", responseTranscript);

              if (responseTranscript && responseTranscript.transcript) {
                resolve(responseTranscript.transcript);
              } else {
                reject(new Error("Transcript not found in the response"));
              }
            } catch (error) {
              console.error("Error processing audio:", error);
              reject(error);
            } finally {
              stream.getTracks().forEach(track => track.stop());
              audioContext.close();
              setIsRecording(false);
            }
          };

          mediaRecorder.start();
          setIsRecording(true);
        })
        .catch(error => {
          console.error("Error accessing microphone:", error);
          reject(error);
        });
    });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    setIsRecording(false);
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
};
