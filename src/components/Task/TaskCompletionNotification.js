"use client";
import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import confetti from "canvas-confetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui";
import { Button } from "../ui";

const ENCOURAGEMENT_MESSAGES = [
  "Great job! You're making excellent progress!",
  "Task completed! You're on fire today!",
  "Awesome work! Keep up the momentum!",
  "Well done! One step closer to your goals!",
  "Amazing! You're crushing your to-do list!",
  "Fantastic job! You deserve a quick break!",
  "Bravo! Your productivity is impressive!",
  "Success! Nothing can stop you now!",
  "Excellent! You're really getting things done!",
  "Perfect! Keep knocking those tasks out!",
];


export function TaskCompletionNotification({ 
  isOpen, 
  onClose, 
  taskDetails 
}) {
  const [message, setMessage] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(30);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Select a random encouragement message
      const randomIndex = Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length);
      setMessage(ENCOURAGEMENT_MESSAGES[randomIndex]);

      // Play audio
      if (audioRef.current) {
        audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
      }

      // Trigger confetti
      triggerConfetti();

      // Start countdown
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Cleanup function
      return () => {
        clearInterval(timer);
      };
    }
  }, [isOpen]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src="/assets/sounds/audio.mp3" type="audio/mpeg" />
      </audio>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
          <DialogHeader>
            <DialogTitle className="text-center text-green-700 relative">
              Reminder: {taskDetails.title}
              <div className="absolute right-0 top-0 text-sm text-gray-500">
                {timeRemaining}s
              </div>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
                <X className="h-4 w-4" />
              </DialogClose>
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <p className="text-center text-lg font-medium text-gray-800">
              {message}
            </p>

            {taskDetails.description && (
              <p className="text-center text-sm text-gray-600 mt-2">
                {taskDetails.description}
              </p>
            )}
          </div>

          <div className="flex justify-center mt-2">
            <Button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}