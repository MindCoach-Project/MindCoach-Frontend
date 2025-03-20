"use client";

import { useState } from "react";
import OnboardingLayout from "../components/Onboarding/Onboarding";
import TimePicker from "../components/Onboarding/TimePicker";

export default function OnBoard1() {
  const [selectedHour, setSelectedHour] = useState("09");
  const [selectedMinute, setSelectedMinute] = useState("00");

  const handleTimeChange = (hour, minute) => {
    setSelectedHour(hour);
    setSelectedMinute(minute);
  };

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={5}
      nextPath="/onboard/2"
      prevPath="/"
      title="What time do you usually start the day?"
      bgColor="gradient"
      centerContent
    >
      <div className="flex flex-col items-center justify-center">
        <img
          src="/assets/images/sun.png"
          alt="Sun"
          className="w-32 h-32 mb-8"
        />

        <TimePicker
          initialHour={selectedHour}
          initialMinute={selectedMinute}
          onTimeChange={handleTimeChange}
        />
      </div>
    </OnboardingLayout>
  );
}
