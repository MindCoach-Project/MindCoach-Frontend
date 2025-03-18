"use client"

import { useState } from "react"
import OnboardingLayout from "../../layouts/Onboarding"
import TimePicker from "./TimePicker"

export default function OnBoard1() {
  const [selectedHour, setSelectedHour] = useState("09")
  const [selectedMinute, setSelectedMinute] = useState("00")

  const handleTimeChange = (hour, minute) => {
    setSelectedHour(hour)
    setSelectedMinute(minute)
  }

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
      <img src="/assets/images/sun.png" alt="Sun" className="w-40" />

      <TimePicker initialHour={selectedHour} initialMinute={selectedMinute} onTimeChange={handleTimeChange} />
    </OnboardingLayout>
  )
}

