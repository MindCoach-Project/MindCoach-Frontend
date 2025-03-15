import { useState } from "react";
import { Smile, Frown, Meh, Laugh, Angry } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../components/ui";
import { X } from "lucide-react";

const emotions = [
  {
    id: 1,
    name: "Angry",
    icon: <Angry size={32} />,
    description: "You are angry, take a deep breath to calm down.",
    color: "text-red-500",
  },
  {
    id: 2,
    name: "Sad",
    icon: <Frown size={32} />,
    description: "You are feeling sad and need someone to share with.",
    color: "text-blue-500",
  },
  {
    id: 3,
    name: "Neutral",
    icon: <Meh size={32} />,
    description: "You are feeling neutral, not too happy nor sad.",
    color: "text-gray-500",
  },
  {
    id: 4,
    name: "Happy",
    icon: <Laugh size={32} />,
    description: "You feel joyful and happy!",
    color: "text-yellow-500",
  },
  {
    id: 5,
    name: "Excited",
    icon: <Smile size={32} />,
    description: "You are extremely excited and full of energy!",
    color: "text-green-500",
  },
];

export default function EmotionPicker() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-20 font-regular text-brown">How do you feel?</h2>
      <div className="flex gap-12">
        {emotions.map((emotion) => {
          const isSelected = selectedEmotion?.id === emotion.id;

          return (
            <div
              key={emotion.id}
              className={`flex flex-col items-center w-[56px] h-[56px] p-2 rounded-full cursor-pointer transition-all duration-300
                bg-gray-200 hover:bg-gray-300
                ${isSelected ? "scale-[1.2] border-2 border-orange" : ""}`}
              onClick={() => {
                setSelectedEmotion(emotion);
                setIsPopupOpen(true);
              }}
            >
              <div className={`${emotion.color} opacity-80`}>{emotion.icon}</div>
              <span className={`${isSelected ? "text-12 text-orange -mt-2" : "text-12 text-gray-600"}`}>{emotion.name}</span>
            </div>
          );
        })}
      </div>

      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="bg-inherit py-12">
          <DialogHeader className="flex items-center gap-3">
            {selectedEmotion?.icon && (
              <div className={`${selectedEmotion.color} flex items-center`}>
                {selectedEmotion.icon}
              </div>
            )}{" "}
            <DialogTitle>{selectedEmotion?.name}</DialogTitle>
            <DialogDescription>
              {selectedEmotion?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="absolute right-2 top-2 flex space-x-3">
            <DialogClose className="rounded-sm opacity-70 hover:opacity-100">
              <X className="h-5 w-5" />
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
