"use client";
import OnboardingLayout from "../../layouts/Onboarding";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
export default function OnBoard5() {
  const navigate = useNavigate();

  return (
    <OnboardingLayout
      currentStep={5}
      totalSteps={5}
      nextPath="/register"
      prevPath="/onboard/4"
      title=""
      bgColor="gradient"
      centerContent
      hideNextButton
      hideBackButton
    >
      <img
        src="/assets/images/mindcoach_logo.png"
        alt="MindCoach Logo"
        className="w-60 mb-12"
      />
      <h1 className="text-white text-3xl font-bold text-center leading-tight mb-12">
        Register account <br /> to connect with <br />
        <span className="text-white">MindCoach!</span>
      </h1>

      <Button
        onClick={() => navigate("/register")}
        className="flex items-center space-x-2"
      >
        <span>Register now</span>
        <ArrowRight size={24} />
      </Button>
    </OnboardingLayout>
  );
}
