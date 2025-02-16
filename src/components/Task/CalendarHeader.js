"use client";

import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui";

function CalendarHeader({ date, view, onDateChange, onViewChange }) {
  const navigateDate = (direction) => {
    const newDate = new Date(date);
    if (view === "day") {
      newDate.setDate(date.getDate() + (direction === "next" ? 1 : -1));
    } else {
      newDate.setDate(date.getDate() + (direction === "next" ? 7 : -7));
    }
    onDateChange(newDate);
  };

  return (
    <div className="fixed flex items-center border-b z-20">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{format(date, view === "day" ? "EEEE, dd MMMM" : "MMMM yyyy")}</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => navigateDate("prev")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Select value={view} onValueChange={(v) => onViewChange(v)}>
          <SelectTrigger className="w-[110px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={() => navigateDate("next")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export { CalendarHeader };
