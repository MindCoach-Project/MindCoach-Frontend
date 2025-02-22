"use client";

import { format, addDays, startOfWeek, isSameDay, isToday } from "date-fns";
import { cn } from "../../libs/utils";

export function TimeGrid({ date, view, events, onTimeClick, onEventClick }) {
  // Create array of hours from 0 to 23 (24-hour format)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Get week days starting from Monday
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfWeek(date, { weekStartsOn: 1 }), i)
  );

  const handleEventClick = async (event) => {
    try {
      onEventClick(event);
    } catch (error) {
      console.error("Error handling event click:", error);
    }
  };

  // Update the event click handlers in both views
  const renderEvent = (event, dayIndex = null) => {
    const { top, height } = getEventPosition(event);
    const style =
      dayIndex !== null
        ? {
            left: `${(dayIndex * 100) / 7}%`,
            width: `${100 / 7}%`,
            top,
            height,
            minHeight: "20px",
          }
        : { top, height, minHeight: "20px" };

    return (
      <div
        key={event.id}
        className={cn(
          "absolute rounded-md border p-2 cursor-pointer",
          getEventStyle(event)
        )}
        style={style}
        onClick={() => handleEventClick(event)}
      >
        <div className="text-xs font-medium truncate">{event.title}</div>
        {view === "day" && (
          <div className="text-xs text-muted-foreground">
            {format(new Date(event.start), "HH:mm")} -{" "}
            {format(new Date(event.end), "HH:mm")}
          </div>
        )}
      </div>
    );
  };

  const getEventStyle = (event) => {
    const typeColors = {
      Report: "bg-orange-100 border-orange-200 text-orange-700",
      "Reply client": "bg-green-100 border-green-200 text-green-700",
      "Write docs": "bg-pink-100 border-pink-200 text-pink-700",
      Meeting: "bg-blue-100 border-blue-200 text-blue-700",
      default: "bg-gray-100 border-gray-200 text-gray-700",
    };
    return event.type && typeColors[event.type]
      ? typeColors[event.type]
      : typeColors.default;
  };

  const getEventPosition = (event) => {
    const startHour = new Date(event.start).getHours();
    const startMinute = new Date(event.start).getMinutes();
    const endHour = new Date(event.end).getHours();
    const endMinute = new Date(event.end).getMinutes();

    const top = startHour * 60 + startMinute;
    const height = endHour * 60 + endMinute - top;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  const renderWeekView = () => (
    <div className="flex flex-1 overflow-auto">
      {/* Time column */}
      <div className="flex-shrink-0 w-10 border-r sticky left-0 bg-background z-10">
        <div className="h-12 border-b pt-[40px]" /> {/* Header spacer */}
        {hours.map((hour) => (
          <div
            key={hour}
            className="h-[60px] border-b text-xs text-muted-foreground pl-2"
          >
            {`${hour.toString().padStart(2, "0")}:00`}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="flex-1 relative">
        {/* Week header */}
        <div className="sticky top-0 left-0 right-0 flex border-b bg-background z-20 pt-3 pb-4">
          {weekDays.map((day) => (
            <div
              key={day.toString()}
              className={cn(
                "flex-1 h-12 border-r flex flex-col items-center justify-center"
              )}
            >
              <div
                className={cn(
                  "text-sm font-medium",
                  isSameDay(day, new Date()) && "text-primary",
                  isToday(day) && "text-orange"
                )}
              >
                {format(day, "EEE")}
              </div>
              <div
                className={cn(
                  "text-sm text-muted-foreground",
                  isToday(day) && "text-orange"
                )}
              >
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div className="relative">
          {/* Grid lines */}
          <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-7">
            {weekDays.map((day) => (
              <div
                key={day.toString()}
                className={cn("border-r", isToday(day) && "")}
              >
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-[60px] border-b"
                    onClick={() => {
                      const newDate = new Date(day);
                      newDate.setHours(hour);
                      onTimeClick(newDate);
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Events */}
          {weekDays.map((day, dayIndex) => (
            <div
              key={day.toString()}
              className="absolute top-0 bottom-0"
              style={{ left: `${(dayIndex * 100) / 7}%`, width: `${100 / 7}%` }}
            >
              {events
                .filter((event) => isSameDay(new Date(event.start), day))
                .map((event) => renderEvent(event, dayIndex))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDayView = () => (
    <div className="flex flex-1 overflow-auto">
      <div className="flex-shrink-0 w-10 border-r sticky left-0 bg-background z-10">
        {hours.map((hour) => (
          <div
            key={hour}
            className="h-[60px] border-b text-xs text-muted-foreground pl-2"
          >
            {`${hour.toString().padStart(2, "0")}:00`}
          </div>
        ))}
      </div>
      <div className="flex-1 relative">
        <div className="absolute top-0 left-0 right-0 bottom-0">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-[60px] border-b"
              onClick={() => {
                const newDate = new Date(date);
                newDate.setHours(hour);
                onTimeClick(newDate);
              }}
            />
          ))}
          {events
            .filter((event) => isSameDay(new Date(event.start), date))
            .map((event) => renderEvent(event))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="min-h-[720px] mt-10">
          {" "}
          {view === "day" ? renderDayView() : renderWeekView()}
        </div>
      </div>
    </div>
  );
}
