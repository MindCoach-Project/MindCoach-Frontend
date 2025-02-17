import { useState } from "react";
import { Smile, Frown, Meh, Laugh, Angry } from "lucide-react";
import {Popup} from "../components/ui";

const emotions = [
  { id: 1, name: "Sad", icon: <Frown size={32} className="text-blue-500" />, description: "Bạn đang cảm thấy buồn và cần một ai đó chia sẻ." },
  { id: 2, name: "Angry", icon: <Angry size={32} className="text-red-500" />, description: "Bạn đang tức giận, hãy hít thở sâu để bình tĩnh lại." },
  { id: 3, name: "Happy", icon: <Laugh size={32} className="text-yellow-500" />, description: "Bạn cảm thấy vui vẻ và hạnh phúc!" },
  { id: 4, name: "Neutral", icon: <Meh size={32} className="text-gray-500" />, description: "Bạn đang cảm thấy bình thường, không quá vui cũng không buồn." },
  { id: 5, name: "Excited", icon: <Smile size={32} className="text-green-500" />, description: "Bạn đang cực kỳ phấn khích và tràn đầy năng lượng!" },
];

export default function EmotionPicker() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-20 font-regular text-brown">How do you feel?</h2>
      <div className="flex gap-12">
        {emotions.map((emotion) => (
          <div
            key={emotion.id}
            className="flex flex-col items-center bg-slate-100 w-[60px] h-[60px] p-2 rounded-full cursor-pointer relative"
            onClick={() => setSelectedEmotion(emotion)}
          >
            {emotion.icon}
            <span className="text-sm">{emotion.name}</span>
          </div>
        ))}
      </div>

      {/* Reusable Popup */}
      <Popup isOpen={!!selectedEmotion} onClose={() => setSelectedEmotion(null)} title={selectedEmotion?.name}>
        <p>{selectedEmotion?.description}</p>
      </Popup>
    </div>
  );
}
