"use client"

import { useState } from "react"
import OnboardingLayout from "../../layouts/Onboarding"
import TimePicker from "./TimePicker"

export default function OnBoard2() {
  const [selectedHour, setSelectedHour] = useState("22")
  const [selectedMinute, setSelectedMinute] = useState("00")

  const handleTimeChange = (hour, minute) => {
    setSelectedHour(hour)
    setSelectedMinute(minute)
  }

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={5}
      nextPath="/onboard/3"
      prevPath="/onboard/1"
      title="What time do you go to bed?"
      bgColor="gradient"
      centerContent
    >
      <img src="/assets/images/moon.png" alt="Moon" className="w-40" />

      <TimePicker initialHour={selectedHour} initialMinute={selectedMinute} onTimeChange={handleTimeChange} />
    </OnboardingLayout>
  )
}

