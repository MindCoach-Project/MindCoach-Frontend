import React, { useState } from "react";
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

export function VoiceRecordingModal({ isOpen, onClose }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "vi-VN";
  recognition.continuous = false;
  recognition.interimResults = false;

  const startRecording = () => {
    setIsRecording(true);
    setTranscript("");
    setResponseData(null);
    recognition.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognition.stop();
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    setTranscript(text);
    handleTranscribe(text);
  };

  const handleTranscribe = async (text) => {
    setIsProcessing(true);
    setIsRecording(false);
    const data = await callGeminiAPI(text);

    if (data) {
      const formattedData = {
        title: data.title,
        startTime: toISOStringUTC(data.startTime),
        endTime: toISOStringUTC(data.endTime),
      };
      setResponseData(formattedData);
    }
    setIsProcessing(false);
  };

  const handleCreateTask = async () => {
    if (!responseData) return;

    const eventData = {
      title: responseData.title,
      startTime: responseData.startTime,
      endTime: responseData.endTime,
    };

    await createTask(eventData);

    setToast({ type: "success", message: "Create task successful!" });

    onClose();
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
            <div className="mic-container flex justify-center mb-4">
              {isRecording ? (
                <div className="wave-animation">
                  Recording...
                  <button className="w-28 h-28 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition">
                    <CircleStop size={60} />
                  </button>
                </div>
              ) : (
                <button className="w-28 h-28 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition">
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
                <p className="text-blue-500 font-medium">⏳ Processing...</p>
              ) : responseData ? (
                <div className="text-left flex flex-col gap-12 p-4">
                  <p>📌 Title: {responseData.title}</p>
                  <p>🕒 Start time: {formatDate(responseData.startTime)}</p>
                  <p>🕓 End time: {formatDate(responseData.endTime)}</p>
                </div>
              ) : transcript ? (
                <p className="text-red-500 font-medium">⚠️ You try again!</p>
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
          </div>
        {toast && <ToastMessage type={toast.type} message={toast.message} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
