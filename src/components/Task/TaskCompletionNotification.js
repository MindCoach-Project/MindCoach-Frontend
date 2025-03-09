"use client";
import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui";
import { motion } from "framer-motion"; 

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
];

export function TaskCompletionNotification({ isOpen, onClose }) {
  const [message, setMessage] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(30);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    console.log(":tada: Task Completed Notification Opened!");

    // Pick a random encouragement message
    const randomIndex = Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length);
    const selectedMessage = ENCOURAGEMENT_MESSAGES[randomIndex];
    setMessage(selectedMessage);

    // Trigger confetti
    triggerConfetti();

    // Speak the message
    speakMessage(selectedMessage);

    // Start 30s countdown
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          console.log("Task Completed Notification Closed!");
          clearInterval(timerRef.current);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isOpen]);

  const triggerConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const speakMessage = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      console.error(":x: Speech Synthesis not supported in this browser.");
    }
  };

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
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="text-5xl"
              >
                🎉
              </motion.div>
              <span>Task Completed!</span>
              <div className="absolute right-0 top-0 text-sm text-gray-500">
                {timeRemaining}s
              </div>
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

          {/* Close Button - Positioned at the Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 flex justify-center"
          >
            <DialogClose
              onClick={onClose}
              className="text-black font-regular w-[40px] h-[40px] rounded-full border border-greenDark"
            >
              x
            </DialogClose>
          </motion.div>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
