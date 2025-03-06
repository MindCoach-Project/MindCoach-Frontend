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

export function TaskCompletionNotification({ isOpen, onClose }) {
  const [message, setMessage] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // Effect for managing side effects when isOpen changes
useEffect(() => {
  if (!isOpen) return;

  console.log(":tada: Task Completed Notification Opened!");
  const randomIndex = Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length);
  setMessage(ENCOURAGEMENT_MESSAGES[randomIndex]);
  if (audioRef.current) {
      console.log(":loud_sound: Playing audio...");
      audioRef.current.play().catch(error => console.error(":x: Audio playback failed:", error));
  }
  triggerConfetti();
}, [isOpen]);

// Separate effect for managing the timer
useEffect(() => {
  if (!isOpen) return () => clearInterval(timerRef.current);

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

  

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src="/assets/sounds/audio.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Dialog open={isPopupOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
          <DialogHeader>
            <DialogTitle className="text-center text-green-700 relative">
              Task Completed!
              <div className="absolute right-0 top-0 text-sm text-gray-500">
                {timeRemaining}s
              </div>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
                <X className="h-4 w-4" />
              </DialogClose>
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-center text-lg font-medium text-gray-800">{message}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}