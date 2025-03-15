import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OnBoard2 = () => {
  const navigate = useNavigate();

  // Danh sách các vấn đề có thể chọn
  const options = [
    "Procrastination",
    "I forgot about important things",
    "Hard to balance my job and personal",
    "I often delay things",
    "Struggle with focus and attention",
  ];

  // State để lưu lựa chọn của người dùng
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Hàm xử lý toggle chọn/bỏ chọn
  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Progress Dots */}
      <div className="flex space-x-2 absolute top-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === 2 ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Câu hỏi */}
      <h2 className="text-black text-2xl font-semibold mb-20 text-center">
        What problem do you face?
      </h2>

      {/* Danh sách lựa chọn */}
      <div className="w-full max-w-xs mb-10 space-y-4">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md cursor-pointer"
            onClick={() => toggleOption(option)}
          >
            <span className="text-gray-700">{option}</span>
            {selectedOptions.includes(option) ? (
              <span className="text-red-500 text-xl">✔</span>
            ) : (
              <div className="w-5 h-5 border border-gray-400 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
      {/* Nút Back & Next */}
      <div className="relative w-full max-w-xs mt-14 flex items-center justify-center">
        {/* Back Button */}
        <button
          className="absolute left-0 text-gray-600 hover:text-black transition"
          onClick={() => navigate("/onboard/2")}
        >
          ← Back
        </button>

        {/* Next Button */}
        <button
          className="w-16 h-16 flex items-center justify-center bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition text-2xl"
          onClick={() => navigate("/onboard/4")}
        >
          ➜
        </button>
      </div>
    </div>
  );
};

export default OnBoard2;
