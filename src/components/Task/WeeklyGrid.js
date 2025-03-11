"use client";

import { useState } from "react";
import { TaskCard } from "./TaskCard";
import { Button } from "../ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function WeeklyGrid({ tasks, onTaskClick }) {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getWeekDays = (date) => {
    const week = [];
    const current = new Date(date);
    current.setDate(current.getDate() - current.getDay());

    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  };

  const weekDays = getWeekDays(currentWeek);

  const nextWeek = () => {
    const next = new Date(currentWeek);
    next.setDate(next.getDate() + 7);
    setCurrentWeek(next);
  };

  const prevWeek = () => {
    const prev = new Date(currentWeek);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeek(prev);
  };

  return (
    <div className="space-y-4 bg-orange">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Weekly Schedule</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={prevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => (
          <div key={index} className="space-y-2">
            <div className="text-center">
              <div className="text-sm font-medium">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
              <div className="text-sm text-muted-foreground">{day.getDate()}</div>
            </div>
            <div className="space-y-2">
              {tasks
                .filter((task) => task.date.toDateString() === day.toDateString())
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    time={task.time}
                    priority={task.priority}
                    status = {task.status}
                    onClick={() => onTaskClick(task)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
