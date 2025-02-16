"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarHeader } from "../components/Task";
import { TimeGrid } from "../components/Task";
import { EventModal } from "../components/Task";
import { Plus } from "lucide-react";
import { Button } from "../components/ui";
import { PushNotificationManager } from "../components/Notification";

// Example events data matching the screenshot
const initialEvents = [
  {
    id: "1",
    title: "Check email",
    start: new Date(2024, 1, 13, 8, 0),
    end: new Date(2024, 1, 13, 8, 30),
    type: "Reply client",
  },
  {
    id: "2",
    title: "Write documentation",
    start: new Date(2024, 1, 13, 10, 0),
    end: new Date(2024, 1, 13, 11, 0),
    type: "Write docs",
  },
  {
    id: "3",
    title: "Monthly Report",
    start: new Date(2024, 1, 13, 14, 0),
    end: new Date(2024, 1, 13, 15, 0),
    type: "Report",
  },
  {
    id: "4",
    title: "Team Meeting",
    start: new Date(2024, 1, 13, 16, 0),
    end: new Date(2024, 1, 13, 17, 0),
    type: "Meeting",
  },
]

export default function CalendarPage() {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState("week")
  const [events, setEvents] = useState(initialEvents)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  const timeGridRef = useRef(null)

  useEffect(() => {
    if (timeGridRef.current) {
      const scrollToEightAM = 8 * 60 // 8 hours * 60px per hour
      timeGridRef.current.scrollTop = scrollToEightAM
    }
  }, [])

  const handleEventSubmit = (eventData) => {
    if (selectedEvent) {
      setEvents(events.map((event) => (event.id === selectedEvent.id ? { ...event, ...eventData } : event)))
    } else {
      setEvents([...events, eventData])
    }
  }

  const handleTimeClick = (time) => {
    setSelectedTime(time)
    setSelectedEvent(null)
    setIsModalOpen(true)
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setSelectedTime(null)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col h-screen">
      <PushNotificationManager />
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
      <Button
        className="fixed bottom-4 right-4 rounded-full shadow-lg"
        onClick={() => {
          setSelectedEvent(null)
          setSelectedTime(new Date())
          setIsModalOpen(true)
        }}
      >
        <Plus className="h-4 w-4" />
      </Button>
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
      />
    </div>
  )
}

