"use client"

import { useState } from "react"
import OnboardingLayout from "../../layouts/Onboarding"
import SelectionOption from "./SelectOption"

export default function OnBoard3() {
  // List of problems
  const options = [
    "Procrastination",
    "I forgot about important things",
    "Hard to balance my job and personal",
    "I often delay things",
    "Struggle with focus and attention",
  ]

  // State to store user selections
  const [selectedOptions, setSelectedOptions] = useState([])

  // Toggle selection function
  const toggleOption = (option) => {
    setSelectedOptions((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]))
  }

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={5}
      nextPath="/onboard/4"
      prevPath="/onboard/2"
      title="What problem do you face?"
      bgColor="light"
    >
      <div className="w-full space-y-4">
        {options.map((option, index) => (
          <SelectionOption
            key={index}
            label={option}
            selected={selectedOptions.includes(option)}
            onClick={() => toggleOption(option)}
          />
        ))}
      </div>
    </OnboardingLayout>
  )
}

