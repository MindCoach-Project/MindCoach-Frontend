"use client";

import { format, addDays, startOfWeek, isSameDay, isToday } from "date-fns";
import { cn } from "../../libs/utils";

export function TimeGrid({ date, view, events, onTimeClick, onEventClick }) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfWeek(date, { weekStartsOn: 1 }), i)
  );


  const handleEventClick = (event) => {
    if (event.type === "SubTask") {
      onEventClick({
        id: event.parentId,
        selectedSubtaskId: event.id,
        subtasks: processedEvents
          .filter(e => e.parentId === event.parentId && e.type === "SubTask")
      });
    } else {
      // For regular tasks
      onEventClick(event);
    }
  };

  // Process events to include subtasks as separate events for display
  const processedEvents = events.flatMap(event => {
    const mainEvent = {
      ...event,
      isParent: event.subtasks && event.subtasks.length > 0
    };
    
    // Convert subtasks to event format for rendering
    const subtaskEvents = (event.subtasks || []).map(subtask => ({
      id: subtask.id,
      title: subtask.title,
      description: subtask.description,
      status: subtask.status.toLowerCase(),
      start: new Date(subtask.startTime),
      end: new Date(subtask.endTime),
      type: "SubTask",
      parentId: event.id,
      parentTitle: event.title
    }));
    
    return [mainEvent, ...subtaskEvents];
  });

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

  const renderEvent = (event, dayIndex = null, isWeekView = false) => {
    const { top, height } = getEventPosition(event);
    const style = dayIndex !== null 
      ? { left: `${(dayIndex * 100) / 7}%`, width: `${100 / 7}%`, top, height } 
      : { top, height };

    const priorityColors = {
      high: "bg-red-200 text-red-700 border-red-300",
      medium: "bg-yellow-200 text-yellow-700 border-yellow-300",
      low: "bg-green-200 text-green-700 border-green-300",
    };

    const statusColors = {
      todo: "bg-gray-200 text-gray-700 border-gray-300",
      inprogress: "bg-blue-200 text-blue-700 border-blue-300",
      done: "bg-green-200 text-green-700 border-green-300",
    };

    // Different styling for week view vs day view
    const baseClasses = cn(
      "absolute rounded-lg border p-2 cursor-pointer transition-colors",
      event.type === "SubTask" 
        ? (isWeekView 
          ? "ml-2 w-[calc(100%-0.5rem)] border-dashed" 
          : "ml-4 w-[calc(100%-1rem)] border-dashed")
        : "",
      isWeekView 
        ? "bg-sky-400 hover:bg-sky-600 text-white" 
        : cn(
            "bg-sky-50 hover:bg-sky-100", 
            priorityColors[event.priority?.toLowerCase() || "medium"]
          )
    );
    
    return (
      <div
        key={event.id}
        className={baseClasses}
        style={style}
        onClick={() => handleEventClick(event)}
      >
        <div className="space-y-1">
          {/* Title */}
          <div className="flex items-center justify-between gap-1">
            <h3 className={cn(
              "font-medium truncate flex-1",
              isWeekView ? "text-xs" : "text-sm"
            )}>
              {event.type === "SubTask" && "↳ "}
              {event.title}
            </h3>
            
            {!isWeekView && (
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap",
                  priorityColors[event.priority?.toLowerCase() || "medium"]
                )}
              >
                {event.priority}
              </span>
            )}
          </div>

          {/* Time and Status */}
          <div className="flex items-center justify-between gap-1">
            <span className={cn(
              "text-xs",
              isWeekView ? "text-white" : "text-muted-foreground"
            )}>
              {format(new Date(event.start), "HH:mm")} - {format(new Date(event.end), "HH:mm")}
            </span>
            
            {!isWeekView && event.status && (
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap",
                  statusColors[event.status?.toLowerCase() || "todo"]
                )}
              >
                {event.status}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderWeekView = () => (
    <div className="flex flex-1 overflow-auto scrollbar-hide">
      {/* Time column */}
      <div className="flex-shrink-0 w-10 border-r sticky left-0 bg-background z-10">
        <div className="h-12 border-b pt-[40px]" />
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
                  isToday(day) && "text-primary"
                )}
              >
                {format(day, "EEE")}
              </div>
              <div
                className={cn(
                  "text-sm text-muted-foreground",
                  isToday(day) && "text-primary"
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
                className={cn("border-r", isToday(day) && "bg-slate-50")}
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
              style={{
                left: `${(dayIndex * 100) / 7}%`,
                width: `${100 / 7}%`,
              }}
            >
              {processedEvents
                .filter((event) => isSameDay(new Date(event.start), day))
                .map((event) => renderEvent(event, dayIndex, true))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDayView = () => (
    <div className="flex flex-1 overflow-auto scrollbar-hide">
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
          
          {/* Day view events */}
          {processedEvents
            .filter((event) => isSameDay(new Date(event.start), date))
            .map((event) => renderEvent(event, null, false))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 overflow-hidden scrollbar-hide">
      <div className="flex-1 overflow-auto">
        <div className=" overflow-y-auto max-h-[80vh] scrollbar-hide mt-10">
          {view === "day" ? renderDayView() : renderWeekView()}
        </div>
      </div>
    </div>
  );
}