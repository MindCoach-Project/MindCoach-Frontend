import { useState } from "react";
import { Smile, Frown, Meh, Laugh, Angry } from "lucide-react";
import { Popup } from "../components/ui";

const emotions = [
  { id: 1, name: "Angry", icon: <Angry size={32} />, description: "You are angry, take a deep breath to calm down.", color: "text-red-500" },
  { id: 2, name: "Sad", icon: <Frown size={32} />, description: "You are feeling sad and need someone to share with.", color: "text-blue-500" },
  { id: 3, name: "Neutral", icon: <Meh size={32} />, description: "You are feeling neutral, not too happy nor sad.", color: "text-gray-500" },
  { id: 4, name: "Happy", icon: <Laugh size={32} />, description: "You feel joyful and happy!", color: "text-yellow-500" },
  { id: 5, name: "Excited", icon: <Smile size={32} />, description: "You are extremely excited and full of energy!", color: "text-green-500" },
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
              className={`flex flex-col items-center w-[66px] h-[66px] p-2 rounded-full cursor-pointer relative 
                transition-all duration-300
                ${isSelected ? "bg-opacity-100 bg-gray-100 border border-orange scale-108" : "bg-opacity-50 bg-gray-200"}`}
              onClick={() => {
                setSelectedEmotion(emotion);
                setIsPopupOpen(true);
              }}
            >
              <div className={`${emotion.color} ${isSelected ? "opacity-100" : "opacity-70"}`}>
                {emotion.icon}
              </div>
              <span className={`text-sm ${isSelected ? "font-medium" : "text-gray-600"}`}>
                {emotion.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Popup Hiển thị thông tin cảm xúc */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} title={selectedEmotion?.name}>
        <p>{selectedEmotion?.description}</p>
      </Popup>
    </div>
  );
}
