"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarHeader } from "../components/Task";
import { TimeGrid } from "../components/Task";
import { EventModal } from "../components/Task";
import { getTasksByDay, getTasksByWeek, getTaskDetail } from "../api/task";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState("day")
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
      setIsLoading(true);
      const tasks = view === "day" ? await getTasksByDay(date) : await getTasksByWeek(date)
      
      // Transform API response to match the event format
      const transformedEvents = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority.toLowerCase(),
        status: task.status.toLowerCase(),
        start: new Date(task.startTime),
        end: new Date(task.endTime),
        type: task.type,
        subtasks: task.subTasks?.map((st) => ({
          id: st.id,
          title: st.title,
          description: st.description,
          status: st.status.toLowerCase(),
          startTime: st.startTime,
          endTime: st.endTime
        })) || [],
      }))

      setEvents(transformedEvents)
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setIsLoading(false);
    }
  }

  const handleEventClick = async (event) => {
    try {
      setIsLoading(true)
      

      if (event.type === "SubTask" && event.parentId) {
        const taskDetails = await getTaskDetail(event.parentId);
        
        const transformedTask = {
          id: taskDetails.id,
          title: taskDetails.title,
          description: taskDetails.description,
          priority: taskDetails.priority.toLowerCase(),
          status: taskDetails.status.toLowerCase(),
          start: taskDetails.startTime,
          end: taskDetails.endTime,
          subtasks: taskDetails.subTasks?.map((st) => ({
            id: st.id,
            title: st.title,
            startTime: st.startTime,
            endTime: st.endTime,
            description: st.description,
            status: st.status.toLowerCase(),
          })) || [],
          selectedSubtaskId: event.id 
        };
        
        setSelectedEvent(transformedTask);
      } else {
        const taskDetails = await getTaskDetail(event.id);
        
        const transformedTask = {
          id: taskDetails.id,
          title: taskDetails.title,
          description: taskDetails.description,
          priority: taskDetails.priority.toLowerCase(),
          status: taskDetails.status.toLowerCase(),
          start: taskDetails.startTime,
          end: taskDetails.endTime,
          subtasks: taskDetails.subTasks?.map((st) => ({
            id: st.id,
            title: st.title,
            startTime: st.startTime,
            endTime: st.endTime,
            description: st.description,
            status: st.status.toLowerCase(),
          })) || [],
        };
        
        setSelectedEvent(transformedTask);
      }
      
      setIsModalOpen(true);
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

  const handleEventSubmit = async () => {
    try {
      await fetchEvents() 
      setIsModalOpen(false)
      setSelectedEvent(null)
      setSelectedTime(null)
    } catch (error) {
      console.error("Error handling event submission:", error)
    }
  }

  return (
    <div className="flex flex-col h-full">
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