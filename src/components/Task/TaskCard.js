"use client";

import { Badge } from "../ui";
import { cn } from "../../libs/utils";

export function TaskCard({ title, time, priority, isDone = false, onClick }) {
  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-blue-100 text-blue-800",
    low: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-3 rounded-lg border shadow-sm cursor-pointer transition-all",
        "hover:shadow-md",
        isDone ? "bg-gray-50" : "bg-white"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className={cn("font-medium", isDone && "line-through text-muted-foreground")}>{title}</h3>
          <p className="text-sm text-muted-foreground">{time}</p>
        </div>
        <Badge variant="secondary" className={priorityColors[priority]}>
          {priority}
        </Badge>
      </div>
    </div>
  );
}