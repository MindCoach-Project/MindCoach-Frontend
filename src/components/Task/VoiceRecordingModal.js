"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "../ui/Dialog"
import { Button } from "../ui/Button"
import { createTask, callGeminiAPI } from "../../api/task"
import { toISOStringUTC, formatDate } from "../../utils/TimezoneUtils"
import { X, Mic, CircleStop } from "lucide-react"
import ToastMessage from "../ui/ToastMessage"
import { Capacitor } from "@capacitor/core"

export function VoiceRecordingModal({ isOpen, onClose }) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [responseData, setResponseData] = useState(null)
  const [toast, setToast] = useState(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.lang = "en-US"
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
      }
    } else {
      // Check if Cordova plugin is available on Android
      if (window.plugins && window.plugins.speechRecognition) {
        window.plugins.speechRecognition.isRecognitionAvailable((available) => {
          if (!available) {
            setToast({
              type: "error",
              message: "Speech recognition is not available on this device",
            })
          }
        })
      }
    }

    return () => {
      if (isRecording) {
        stopRecording()
      }
    }
  }, [])

  const startRecording = () => {
    setIsRecording(true)
    setTranscript("")
    setResponseData(null)

    try {
      if (!Capacitor.isNativePlatform()) {
        // Web browser implementation
        if (recognitionRef.current) {
          recognitionRef.current.onresult = (event) => {
            const text = event.results[0][0].transcript
            setTranscript(text)
            handleTranscribe(text)
          }

          recognitionRef.current.onerror = (event) => {
            console.error("Speech recognition error:", event.error)
            setToast({
              type: "error",
              message:
                event.error === "no-speech"
                  ? "No speech detected. Please speak clearly into your microphone."
                  : `Recognition error: ${event.error}`,
            })
            setIsRecording(false)
          }

          recognitionRef.current.start()
        } else {
          setToast({ type: "error", message: "Speech recognition not supported in this browser" })
          setIsRecording(false)
        }
      } else {
        // Android implementation using Cordova plugin
        if (window.plugins && window.plugins.speechRecognition) {
          window.plugins.speechRecognition.startListening(
            (results) => {
              if (results && results.length > 0) {
                const text = results[0]
                setTranscript(text)
                handleTranscribe(text)
              }
              setIsRecording(false)
            },
            (error) => {
              console.error("Speech recognition error:", error)
              setToast({ type: "error", message: "Speech recognition failed" })
              setIsRecording(false)
            },
            {
              language: "en-US",
              showPopup: true,
              showPartial: false,
            },
          )
        } else {
          // Fallback for Android if plugin is not available
          setToast({
            type: "error",
            message: "Speech recognition plugin not available. Please install the Cordova Speech Recognition plugin.",
          })
          setIsRecording(false)
        }
      }
    } catch (error) {
      console.error("Error starting recording:", error)
      setIsRecording(false)
      setToast({ type: "error", message: `Failed to start recording: ${error.message}` })
    }
  }

  const stopRecording = () => {
    setIsRecording(false)

    if (!Capacitor.isNativePlatform()) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {
        }
      }
    } else {
      if (window.plugins && window.plugins.speechRecognition) {
        window.plugins.speechRecognition.stopListening(
          () => {
            console.log("Stopped listening successfully")
          },
          (error) => {
            console.error("Error stopping speech recognition:", error)
          },
        )
      }
    }
  }

  const handleTranscribe = async (text) => {
    if (!text || text.trim() === "") {
      setToast({ type: "error", message: "No text to process" })
      return
    }

    setIsProcessing(true)
    try {
      console.log("Processing text:", text)
      const data = await callGeminiAPI(text)
      if (data) {
        setResponseData({
          title: data.title,
          startTime: toISOStringUTC(data.startTime),
          endTime: toISOStringUTC(data.endTime),
        })
      } else {
        setToast({ type: "error", message: "Failed to process text with Gemini API" })
      }
    } catch (error) {
      console.error("Error processing text:", error)
      setToast({ type: "error", message: "Failed to process voice input" })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCreateTask = async () => {
    if (!responseData) return

    try {
      const eventData = {
        title: responseData.title,
        startTime: responseData.startTime,
        endTime: responseData.endTime,
      }

      await createTask(eventData)
      setToast({ type: "success", message: "Create task successful!" })
      onClose()
    } catch (error) {
      console.error("Error creating task:", error)
      setToast({ type: "error", message: "Failed to create task" })
    }
  }

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
            <div className="flex justify-center mb-4">
              {isRecording ? (
                <div>
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
              <Button onClick={isRecording ? stopRecording : startRecording} className="text-white px-4 py-2">
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
                <Button onClick={handleCreateTask} className="mt-2 text-white px-4 py-2">
                  Create Task
                </Button>
              )}
            </div>
          </div>
          {toast && <ToastMessage type={toast.type} message={toast.message} />}
        </DialogContent>
      </Dialog>
    </>
  )
}

