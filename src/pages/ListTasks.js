"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarHeader, TimeGrid, EventModal } from "../components/Task";
import { getTasksByDay, getTasksByWeek, getTaskDetail } from "../api/task";
import { IconPlus } from "../components/ui";
import { formatVietnamDate } from "../utils/TimezoneUtils";
import { VoiceRecordingModal } from "../components/Task";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("day");
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const timeGridRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, [date, view]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const tasks =
        view === "day" ? await getTasksByDay(date) : await getTasksByWeek(date);

      const transformedEvents = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority.toLowerCase(),
        status: task.status.toLowerCase(),
        start: formatVietnamDate(task.startTime),
        end: formatVietnamDate(task.endTime),
        type: task.type,
        subtasks:
          task.subTasks?.map((st) => ({
            id: st.id,
            title: st.title,
            description: st.description,
            status: st.status.toLowerCase(),
            startTime: formatVietnamDate(st.startTime),
            endTime: formatVietnamDate(st.endTime),
          })) || [],
      }));

      setEvents(transformedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = async (event) => {
    try {
      setIsLoading(true);

      const taskDetails = await getTaskDetail(
        event.type === "SubTask" && event.parentId ? event.parentId : event.id
      );
      const transformedTask = {
        id: taskDetails.id,
        title: taskDetails.title,
        description: taskDetails.description,
        priority: taskDetails.priority.toLowerCase(),
        status: taskDetails.status.toLowerCase(),
        start: formatVietnamDate(taskDetails.startTime),
        end: formatVietnamDate(taskDetails.endTime),
        subtasks:
          taskDetails.subTasks?.map((st) => ({
            id: st.id,
            title: st.title,
            startTime: formatVietnamDate(st.startTime),
            endTime: formatVietnamDate(st.endTime),
            description: st.description,
            status: st.status.toLowerCase(),
          })) || [],
        ...(event.type === "SubTask" ? { selectedSubtaskId: event.id } : {}),
      };
      setSelectedEvent(transformedTask);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error loading task details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventSubmit = async () => {
    try {
      await fetchEvents();
      setIsModalOpen(false);
      setSelectedEvent(null);
      setSelectedTime(null);
    } catch (error) {
      console.error("Error handling event submission:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSelectedEvent(null);
    setSelectedTime(null);
  };

  const openVoiceRecordingModal = () => {
    setIsVoiceModalOpen(true);
  };

  const closeVoiceRecordingModal = () => {
    setIsVoiceModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <CalendarHeader
        date={date}
        view={view}
        onDateChange={setDate}
        onViewChange={setView}
      />
      <div ref={timeGridRef} className="flex-1 overflow-auto">
        <TimeGrid
          date={date}
          view={view}
          events={events}
          onTimeClick={handleTimeClick}
          onEventClick={handleEventClick}
        />
      </div>

      {/* Nút IconPlus để mở modal */}
      <div className="absolute bottom-20 right-6">
        <IconPlus
          onCalendarClick={openModal}
          onVoiceClick={openVoiceRecordingModal}
        />
      </div>

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
            setSelectedTime(null);
          }}
          onSubmit={handleEventSubmit}
          defaultValues={selectedEvent}
          selectedTime={selectedTime}
          isLoading={isLoading}
        />
      )}

      <VoiceRecordingModal
        isOpen={isVoiceModalOpen}
        onClose={closeVoiceRecordingModal}
      />
    </div>
  );
}
