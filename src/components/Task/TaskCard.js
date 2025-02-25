"use client";

import { cn } from "../../libs/utils";

export function TaskCard({ title, time, priority, status, onClick }) {
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
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1"> 
          <h3 className={cn("font-medium", "line-through text-muted-foreground")}>{title} {priority}  </h3>
          <p className="text-sm text-muted-foreground">{status}</p>
          <p className="text-sm text-muted-foreground">{time}</p>
        </div>
      </div>
    </div>
  );
}