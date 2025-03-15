import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OnBoard2 = () => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState("09:00");

  // Danh sách giờ mẫu (bạn có thể làm dynamic nếu cần)
  const times = ["07:58", "08:59", "09:00", "10:01"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-orange-300 px-4">
      {/* Progress Dots */}
      <div className="flex space-x-2 absolute top-14">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === 0 ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <h2 className="text-white text-3xl font-semibold mt-2 text-center">
        What time do you go to bed?
      </h2>

      {/* Hình ảnh mặt trời */}
      <img src="/assets/images/moon.png" alt="Sun" className="w-40 h-15 my-1" />

      {/* Time Picker */}
      {/* Time Picker */}
      <div className="relative w-60 h-40 overflow-hidden mb-6">
        <div className="flex flex-col items-center text-white text-2xl space-y-2">
          {times.map((time, index) => (
            <span
              key={index}
              className={`transition ${
                time === selectedTime
                  ? "text-white font-bold text-3xl"
                  : "text-gray-200"
              }`}
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* Button Next */}
      <button
        className="mt-10 w-16 h-16 flex items-center justify-center bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition text-2xl"
        onClick={() => navigate("/onboard/3")}
      >
        ➜
      </button>
    </div>
  );
};

export default OnBoard2;
