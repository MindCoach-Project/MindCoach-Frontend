"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarHeader } from "../components/Task";
import { TimeGrid } from "../components/Task";
import { EventModal } from "../components/Task";
// import { Plus } from "lucide-react";
// import { Button } from "../components/ui";
// import { PushNotificationManager } from "../components/Notification";
// import { scheduleNotification } from "../utils";
import { getTasksByDay, getTasksByWeek, getTaskDetail } from "../api/task";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState("week")
  const [events, setEvents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const timeGridRef = useRef(null)

  useEffect(() => {
    fetchEvents()
  }, [date, view])

  const fetchEvents = async () => {
    try {
      const tasks = view === "week" ? await getTasksByWeek(date) : await getTasksByDay(date)
      console.log("Events", tasks);

      // Transform API response to match the event format
      const transformedEvents = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority.toLowerCase(),
        start: new Date(task.startTime),
        end: new Date(task.endTime),
        type: task.type,
        subtasks:
          task.subTasks?.map((st) => ({
            id: st.id,
            title: st.title,
            startTime: new Date(st.startTime),
            endTime: new Date(st.endTime),
            description: st.description,
          })) || [],
      }))

      setEvents(transformedEvents)
    } catch (error) {
      console.error("Error fetching events:", error)
    }
  }

  const handleEventClick = async (event) => {
    try {
      setIsLoading(true)
      // Fetch full task details when clicking an event
      const taskDetails = await getTaskDetail(event.id)

      // Transform the task details to match the expected format
      const transformedTask = {
        id: taskDetails.id,
        title: taskDetails.title,
        description: taskDetails.description,
        priority: taskDetails.priority.toLowerCase(),
        start: new Date(taskDetails.startTime),
        end: new Date(taskDetails.endTime),
        subtasks:
          taskDetails.subTasks?.map((st) => ({
            id: st.id,
            title: st.title,
            startTime: new Date(st.startTime),
            endTime: new Date(st.endTime),
            description: st.description,
          })) || [],
      }

      setSelectedEvent(transformedTask)
      setIsModalOpen(true)
    } catch (error) {
      console.error("Error loading task details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTimeClick = (time) => {
    setSelectedTime(time)
    setSelectedEvent(null)
    setIsModalOpen(true)
  }

  const handleEventSubmit = async (eventData) => {
    try {
      await fetchEvents() // Refresh events after submission
      setIsModalOpen(false)
      setSelectedEvent(null)
      setSelectedTime(null)
    } catch (error) {
      console.error("Error handling event submission:", error)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <CalendarHeader date={date} view={view} onDateChange={setDate} onViewChange={setView} />
      <div ref={timeGridRef} className="flex-1 overflow-auto">
        <TimeGrid
          date={date}
          view={view}
          events={events}
          onTimeClick={handleTimeClick}
          onEventClick={handleEventClick}
        />
      </div>
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedEvent(null)
            setSelectedTime(null)
          }}
          onSubmit={handleEventSubmit}
          defaultValues={selectedEvent}
          selectedTime={selectedTime}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

