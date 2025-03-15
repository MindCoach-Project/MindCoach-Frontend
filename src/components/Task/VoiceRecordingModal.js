import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/Dialog";
import { Button } from "../ui/Button";
import { createTask, callGeminiAPI } from "../../api/task";
import { toISOStringUTC, formatDate } from "../../utils/TimezoneUtils";
import { X, Mic, CircleStop } from "lucide-react";
import ToastMessage from "../ui/ToastMessage";
import { site_path } from "../../utils";
import { useNavigate } from "react-router-dom";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { Microphone } from "@mozartec/capacitor-microphone"
import { Capacitor } from "@capacitor/core"

export function VoiceRecordingModal({ isOpen, onClose }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [toast, setToast] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // Request permissions when component mounts
    if (Capacitor.isNativePlatform()) {
      requestPermissions();
    } else {
      setHasPermission(true); // Web platform doesn't need explicit permission
    }

    // Initialize speech recognition
    if (Capacitor.isNativePlatform()) {
      SpeechRecognition.available().then((result) => {
        if (result.available) {
          SpeechRecognition.initialize({
            language: "vi-VN",
            maxResults: 1,
            prompt: "Speak now",
            partialResults: false,
            popup: false,
          });
        }
      });
    }

    return () => {
      // Clean up
      if (isRecording) {
        stopRecording();
      }
    };
  }, []);

  const requestPermissions = async () => {
    try {
      // Request microphone permission
      const micPermission = await Microphone.requestPermissions();

      // Request speech recognition permission
      await SpeechRecognition.requestPermission();

      setHasPermission(micPermission.microphone === "granted");
    } catch (error) {
      console.error("Error requesting permissions:", error);
      setHasPermission(false);
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
    setTranscript("");
    setResponseData(null);

    try {
      if (Capacitor.isNativePlatform()) {
        // Start recording with Capacitor plugins
        await Microphone.start();

        // Start speech recognition
        SpeechRecognition.start({
          language: "vi-VN",
          maxResults: 1,
          prompt: "Speak now",
          partialResults: false,
          popup: false,
        });

        // Listen for speech recognition results
        SpeechRecognition.addListener("speechRecognition", (data) => {
          if (data.matches && data.matches.length > 0) {
            const text = data.matches[0];
            setTranscript(text);
            handleTranscribe(text);
          }
        });
      } else {
        // Fallback to Web Speech API for web browser
        const SpeechRecognitionWeb =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognitionWeb) {
          const recognition = new SpeechRecognitionWeb();
          recognition.lang = "vi-VN";
          recognition.continuous = false;
          recognition.interimResults = false;

          recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            handleTranscribe(text);
          };

          recognition.start();
        }
      }
    } catch (error) {
      console.error("Error starting recording:", error);
      setIsRecording(false);
      setToast({ type: "error", message: "Failed to start recording" });
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);

    try {
      if (Capacitor.isNativePlatform()) {
        // Stop microphone recording
        await Microphone.stop();

        // Stop speech recognition
        await SpeechRecognition.stop();
        SpeechRecognition.removeAllListeners();
      } else {
        // Web Speech API doesn't need explicit stop in this implementation
        // as we're using continuous: false
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  const handleTranscribe = async (text) => {
    setIsProcessing(true);
    setIsRecording(false);

    try {
      // Call your Gemini API
      const data = await callGeminiAPI(text);

      if (data) {
        const formattedData = {
          title: data.title,
          startTime: toISOStringUTC(data.startTime),
          endTime: toISOStringUTC(data.endTime),
        };
        setResponseData(formattedData);
      }
    } catch (error) {
      console.error("Error processing transcript:", error);
      setToast({ type: "error", message: "Failed to process voice input" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateTask = async () => {
    if (!responseData) return;

    try {
      const eventData = {
        title: responseData.title,
        startTime: responseData.startTime,
        endTime: responseData.endTime,
      };

      await createTask(eventData);
      setToast({ type: "success", message: "Create task successful!" });
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      setToast({ type: "error", message: "Failed to create task" });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-inherit p-24">
          <DialogHeader>
            <DialogTitle>Record</DialogTitle>
            <div className="absolute right-2 top-2 flex space-x-3">
              <DialogClose className="rounded-sm opacity-70 hover:opacity-100">
                <X className="h-5 w-5" />
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="py-4">
            {!hasPermission && Capacitor.isNativePlatform() ? (
              <div className="text-center">
                <p className="text-red-500 mb-4">
                  Microphone permission is required
                </p>
                <Button onClick={requestPermissions}>Grant Permission</Button>
              </div>
            ) : (
              <>
                <div className="mic-container flex justify-center mb-4">
                  {isRecording ? (
                    <div className="wave-animation">
                      Recording...
                      <button
                        onClick={stopRecording}
                        className="w-28 h-28 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
                      >
                        <CircleStop size={60} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={startRecording}
                      className="w-28 h-28 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
                    >
                      <Mic size={60} />
                    </button>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    className="text-white px-4 py-2"
                  >
                    {isRecording ? "Stop recording" : "Start recording"}
                  </Button>
                </div>

                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium">🎯 Task information</h3>

                  {isProcessing ? (
                    <p className="text-blue-500 font-medium">
                      ⏳ Processing...
                    </p>
                  ) : responseData ? (
                    <div className="text-left flex flex-col gap-12 p-4">
                      <p>📌 Title: {responseData.title}</p>
                      <p>🕒 Start time: {formatDate(responseData.startTime)}</p>
                      <p>🕓 End time: {formatDate(responseData.endTime)}</p>
                    </div>
                  ) : transcript ? (
                    <p className="text-red-500 font-medium">
                      ⚠️ You try again!
                    </p>
                  ) : null}

                  {responseData && (
                    <Button
                      onClick={handleCreateTask}
                      className="mt-2 text-white px-4 py-2"
                    >
                      Create task
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
          {toast && <ToastMessage type={toast.type} message={toast.message} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
