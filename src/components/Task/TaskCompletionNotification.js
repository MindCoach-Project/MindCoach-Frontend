"use client"
import { useEffect, useState, useRef } from "react"
import confetti from "canvas-confetti"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui"
import { motion } from "framer-motion"
import { Capacitor } from "@capacitor/core"
import { TextToSpeech } from "@capacitor-community/text-to-speech"

const ENCOURAGEMENT_MESSAGES = [
  "🎉 Great job! You're making excellent progress!",
  "🔥 Task completed! You're on fire today!",
  "🌟 Awesome work! Keep up the momentum!",
  "💪 Well done! One step closer to your goals!",
  "🎯 Amazing! You're crushing your to-do list!",
  "🏆 Fantastic job! You deserve a quick break!",
  "👏 Bravo! Your productivity is impressive!",
  "🚀 Success! Nothing can stop you now!",
  "✅ Excellent! You're really getting things done!",
  "🌈 Perfect! Keep knocking those tasks out!",
]

export function TaskCompletionNotification({ isOpen, onClose }) {
  const [message, setMessage] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(30)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const randomIndex = Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)
    const selectedMessage = ENCOURAGEMENT_MESSAGES[randomIndex]
    setMessage(selectedMessage)

    triggerConfetti()

    // Clean the message for speech (remove emojis)
    const cleanMessage = selectedMessage.replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
      "",
    )

    speakMessage(cleanMessage)

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          console.log("Task Completed Notification Closed!")
          clearInterval(timerRef.current)
          onClose()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(timerRef.current)

      // Stop speech when component unmounts
      if (Capacitor.isNativePlatform()) {
        TextToSpeech.stop()
      } else if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isOpen, onClose])

  const triggerConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
  }

  const speakMessage = async (text) => {
    try {
      if (Capacitor.isNativePlatform()) {
        // Use Capacitor Text-to-Speech plugin for mobile devices
        await TextToSpeech.speak({
          text: text,
          lang: "en-US",
          rate: 1.0,
          pitch: 1.0,
          volume: 1.0,
          category: "ambient",
        })
      } else if ("speechSynthesis" in window) {
        // Use Web Speech API for browsers
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = "en-US"
        utterance.rate = 1
        utterance.pitch = 1
        utterance.volume = 1
        window.speechSynthesis.speak(utterance)
      } else {
        console.error("Speech Synthesis not supported in this browser.")
      }
    } catch (error) {
      console.error("Error speaking message:", error)
    }
  }

  return (
    <Dialog open={isOpen}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <DialogContent className="sm:max-w-[450px] bg-white rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-orange-700 text-2xl font-bold relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                className="text-5xl"
              >
                🎉
              </motion.div>
              <span>Task Completed!</span>
              <div className="absolute right-0 top-0 text-sm text-gray-500">{timeRemaining}s</div>
            </DialogTitle>
          </DialogHeader>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center text-lg font-medium text-gray-800 mt-4 px-4"
          >
            {message}
          </motion.p>
        </DialogContent>
      </motion.div>
    </Dialog>
  )
}

