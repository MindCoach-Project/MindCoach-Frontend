"use client";

import { useState } from "react";
import OnboardingLayout from "../components/Onboarding/Onboarding";
import SelectionOption from "../components/Onboarding/SelectOption";

export default function OnBoard4() {
  const tasks = [
    { name: "Work", icon: "📅" },
    { name: "Household", icon: "🏡" },
    { name: "Sport", icon: "⚽" },
    { name: "Relax", icon: "😌" },
  ];

  const [selectedTasks, setSelectedTasks] = useState([]);

  const toggleTask = (taskName) => {
    setSelectedTasks((prev) =>
      prev.includes(taskName)
        ? prev.filter((task) => task !== taskName)
        : [...prev, taskName]
    );
  };

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={5}
      nextPath="/onboard/5"
      prevPath="/onboard/3"
      title="What kind of tasks will you plan?"
      bgColor="light"
    >
      <div className="w-full space-y-4">
        {tasks.map((task) => (
          <SelectionOption
            key={task.name}
            label={task.name}
            icon={task.icon}
            selected={selectedTasks.includes(task.name)}
            onClick={() => toggleTask(task.name)}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}
