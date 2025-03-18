"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  nextPath,
  prevPath,
  title,
  bgColor = "light",
  centerContent = false,
  hideNextButton = false,
  hideBackButton = false,
  nextButtonAction,
}) {
  const navigate = useNavigate();

  const handleNext = () => {
    if (nextButtonAction) {
      nextButtonAction();
    } else {
      navigate(nextPath);
    }
  };

  const getBgColor = () => {
    if (bgColor === "gradient") {
      return "bg-gradient-to-b from-[#F97316] to-[#059669]";
    }
    return "bg-gray-100";
  };
  const getTextColor = () => {
    return bgColor === "gradient" ? "text-white" : "text-black";
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen px-6 py-12 ${getBgColor()}`}
    >
      {/* Progress Dots */}
      <div className="flex space-x-2 absolute top-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === currentStep - 1 ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Title */}
      <h2
        className={`text-xl font-medium mt-20 mb-6 text-center ${getTextColor()}`}
      >
        {title}
      </h2>

      {/* Content */}
      <div
        className={`w-full max-w-xs ${
          centerContent ? "flex flex-col items-center justify-center" : ""
        }`}
      >
        {children}
      </div>

      <div className="relative w-full max-w-xs flex items-center justify-between mt-2 mb-4">
        {!hideBackButton && (
          <button
            className="flex items-center space-x-2 text-black hover:text-gray-700 transition"
            onClick={() => navigate(prevPath)}
          >
            <span className="text-2xl">
              {" "}
              <ArrowLeft size={24} />
            </span>{" "}
            <span>Back</span>
          </button>
        )}

        {!hideNextButton && (
          <Button onClick={handleNext} className="flex items-center space-x-2">
            <span>Next</span>
            <ArrowRight size={24} />
          </Button>
        )}
      </div>
    </div>
  );
}
