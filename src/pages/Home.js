import React, { useState, useEffect } from "react";
import { ScheduleEvent, EmotionPicker, Template, Relaxation } from "../components";
import { IconPlus } from "../components/ui";
import { getTaskUpcoming } from "../api/task/getTaskUpcoming";
import { EventModal } from "../components/Task";
function Home() {
  const [dateTime, setDateTime] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime(now.toLocaleString());
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Fetch upcoming tasks
  const fetchTasks = async () => {
    try {
      const data = await getTaskUpcoming();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Modal handlers
  const openModal = () => {
    setSelectedTask(null); // Reset selected task for creating new task
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleTaskUpdate = async () => {
    setIsLoading(true);
    try {
      // Will be handled by the EventModal's internal submit function
      await fetchTasks(); // Refresh the task list after update
    } catch (error) {
      console.error("Error updating tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 overflow-y-auto max-h-[80vh] scrollbar-hide">
      <p className="text-20 text-brown">{dateTime}</p>
      <div className="rounded-lg p-3 border border-orange flex flex-col gap-12">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <ScheduleEvent
              key={task.id}
              startTime={new Date(task.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              endTime={new Date(task.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              title={task.title}
              onClick={() => handleTaskClick(task)}
            />
          ))
        ) : (
          <p className="text-brown">No upcoming events.</p>
        )}
      </div>

      <EmotionPicker />
      <Template />
      <Relaxation />
      
      {/* Floating action button */}
      <div className="absolute bottom-20 right-6">
        <IconPlus
          onCalendarClick={openModal}
          onEmotionClick={() => console.log("Emotion Clicked")}
        />
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleTaskUpdate}
        defaultValues={selectedTask}
        selectedTime={selectedTime}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Home;