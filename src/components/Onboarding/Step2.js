import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const OnBoard2 = () => {
  const navigate = useNavigate();
  const hours = Array.from({ length: 24 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const [selectedHour, setSelectedHour] = useState("09");
  const [selectedMinute, setSelectedMinute] = useState("00");

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const itemHeight = 50;
  useEffect(() => {
    scrollToSelected(hourRef, hours.indexOf(selectedHour));
    scrollToSelected(minuteRef, minutes.indexOf(selectedMinute));
  }, []);

  const scrollToSelected = (ref, index) => {
    if (ref.current) {
      ref.current.scrollTop = index * itemHeight;
    }
  };

  const handleScroll = (ref, setValue, list) => {
    if (ref.current) {
      const index = Math.round(ref.current.scrollTop / itemHeight);
      setValue(list[index]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-gradient px-4">
      {/* Progress Dots */}
      <div className="flex space-x-2 absolute top-14">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === 1 ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <h2 className="text-white text-3xl font-semibold mt-2 text-center">
        What time do you go to bed?
      </h2>

      <img src="/assets/images/moon.png" alt="Sun" className="w-50 h-15 mt-4" />

      {/* Time Picker */}
      <div className="relative flex items-center space-x-2 mt-6">
        <div className="relative w-20 h-40 overflow-hidden flex justify-center">
          <div
            ref={hourRef}
            className="h-full overflow-y-scroll scrollbar-hide text-center"
            onScroll={() => handleScroll(hourRef, setSelectedHour, hours)}
          >
            <div className="flex flex-col items-center py-16">
              {hours.map((hour, index) => (
                <div
                  key={index}
                  className={`transition-all text-2xl py-2 ${
                    hour === selectedHour
                      ? "text-white font-bold text-3xl"
                      : "text-gray-300"
                  }`}
                  style={{ height: itemHeight }}
                >
                  {hour}
                </div>
              ))}
            </div>
          </div>
        </div>

        <span className="text-white text-3xl font-bold flex items-center">
          :
        </span>

        <div className="relative w-20 h-40 overflow-hidden flex justify-center">
          <div
            ref={minuteRef}
            className="h-full overflow-y-scroll scrollbar-hide text-center"
            onScroll={() => handleScroll(minuteRef, setSelectedMinute, minutes)}
          >
            <div className="flex flex-col items-center py-16">
              {minutes.map((minute, index) => (
                <div
                  key={index}
                  className={`transition-all text-2xl py-2 ${
                    minute === selectedMinute
                      ? "text-white font-bold text-3xl"
                      : "text-gray-300"
                  }`}
                  style={{ height: itemHeight }}
                >
                  {minute}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-xs mt-10 flex items-center justify-center">
        {/* Back Button */}
        <button
          className="absolute left-0 text-gray-600 hover:text-black transition"
          onClick={() => navigate("/onboard/1")}
        >
          ← Back
        </button>

        {/* Next Button */}
        <button
          className="w-16 h-16 flex items-center justify-center bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition text-2xl"
          onClick={() => navigate("/onboard/3")}
        >
          ➜
        </button>
      </div>
    </div>
  );
};

export default OnBoard2;
