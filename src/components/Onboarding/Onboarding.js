"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "../ui";
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
    } else if (nextPath) {
      navigate(nextPath);
    }
  };

  const handleBack = () => {
    if (prevPath) {
      navigate(prevPath);
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
    <div className={`flex flex-col items-center min-h-screen ${getBgColor()}`}>
      <div className="w-full max-w-md mx-auto px-6 py-12 px-24 flex flex-col items-center min-h-screen">
        <div className="flex space-x-2 mb-10 mt-20">
          {[...Array(totalSteps)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentStep - 1 ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {title && (
          <h2 className={`text-2xl font-medium text-center ${getTextColor()}`}>
            {title}
          </h2>
        )}

        <div
          className={`w-full flex-grow ${
            centerContent ? "flex flex-col items-center justify-center" : ""
          }`}
        >
          {children}
        </div>

        <div className="w-full flex items-center justify-between mb-20">
          {!hideBackButton ? (
            <button
              className={`flex items-center space-x-2 ${
                bgColor === "gradient" ? "text-white" : "text-gray-700"
              } hover:opacity-80 transition`}
              onClick={handleBack}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {!hideNextButton && nextPath && (
            <Button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-[#0D9488] hover:bg-[#0D9488]/90 text-white px-6 py-2 rounded-full"
            >
              <span>Next</span>
              <ArrowRight size={20} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
