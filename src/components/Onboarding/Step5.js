import React from "react";
import { useNavigate } from "react-router-dom";

const OnBoard5 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-[#6A1B9A] to-[#FC9F2E] px-6 py-12">
      {/* Progress Dots */}
      <div className="flex space-x-2 absolute top-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === 4 ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      {/* Logo */}
      <img
        src="/assets/images/mindcoach_logo.png"
        alt="MindCoach Logo"
        className="w-60 mt-16"
      />
      {/* Title */}
      <h1
        className="text-white text-3xl mt-[-10px] font-bold text-center leading-tight"
        style={{ position: "relative", top: "-15x0px" }}
      >
        Register account <br /> to connect with <br />
        <span className="text-white">MindCoach!</span>
      </h1>
      {/* Navigation Buttons */}
      <div
        className="relative w-full max-w-xs flex items-center justify-center mb-4"
        style={{ position: "relative", top: "-220px" }}
      >
        {/* Back Button */}
        <button
          className="absolute text-gray-600  left-0 flex items-center space-x-1 text-black text-lg font-medium"
          onClick={() => navigate("/onboard/4")}
        >
          <span className="text-2xl">←</span> <span>Back</span>
        </button>

        {/* Next Button */}
        <button
          className="w-16 h-16 flex items-center justify-center bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition text-2xl"
          onClick={() => navigate("/register")}
        >
          ➜
        </button>
      </div>
    </div>
  );
};

export default OnBoard5;
