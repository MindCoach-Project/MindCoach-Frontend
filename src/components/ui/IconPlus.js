import { useState } from "react";
import { Plus, Calendar, Mic } from "lucide-react";

export default function IconPlus({ onCalendarClick, onVoiceClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-orange text-white shadow-md hover:bg-orange transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus size={40} />
      </button>

      {isOpen && (
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex flex-col gap-3">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white shadow-md hover:bg-yellow-700 transition"
            onClick={onVoiceClick}
          >
            <Mic size={20} />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white shadow-md hover:bg-green-700 transition"
            onClick={onCalendarClick}
          >
            <Calendar size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
