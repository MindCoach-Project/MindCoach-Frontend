"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarHeader } from "../components/Task";
import { TimeGrid } from "../components/Task";
import { EventModal } from "../components/Task";
import { Plus } from "lucide-react";
import { Button } from "../components/ui";
import { PushNotificationManager } from "../components/Notification";
import { scheduleLocalNotification } from "../components/Notification/PushNotificationManager"
import { scheduleNotification } from "../utils";
// Example events data matching the screenshot
const initialEvents = [
  {
    id: "1",
    title: "Check email",
    start: new Date(2025, 2, 16, 21, 0),
    end: new Date(2025, 2, 16, 21, 30),
    type: "Reply client",
  },
  {
    id: "2",
    title: "Write documentation",
    start: new Date(2025, 2, 16, 21, 30),
    end: new Date(2025, 2, 16, 21, 50),
    type: "Write docs",
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
    scheduleNotification(eventData)
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

  const testNotification = () => {
    const now = new Date()
    const testNotificationTime = new Date(now.getTime() + 5000) // 5 seconds from now
    scheduleLocalNotification(
      9999,
      "Test Notification",
      "This is a test notification",
      testNotificationTime.toISOString(),
    )
    console.log("Test notification scheduled for", testNotificationTime)
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
      <Button className="fixed bottom-16 right-4 rounded-full shadow-lg" onClick={testNotification}>
        Test Notification
      </Button>
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

