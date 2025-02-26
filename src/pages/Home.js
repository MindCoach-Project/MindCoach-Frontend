import React, { useState, useEffect } from "react";
import { ScheduleEvent, EmotionPicker, Template } from "../components";
import { IconPlus } from "../components/ui";
import { getTaskUpcoming } from "../api/task/getTaskUpcoming";
function Home() {
  const [dateTime, setDateTime] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime(now.toLocaleString());
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // write function to call api from api/home
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTaskUpcoming();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col gap-12">
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
            />
          ))
        ) : (
          <p className="text-brown">No upcoming events.</p>
        )}
      </div>

      <EmotionPicker />
      <Template />


      <div className="absolute bottom-20 right-6">
        <IconPlus
          onCalendarClick={() => console.log("Calendar Clicked")}
          onEmotionClick={() => console.log("Emotion Clicked")}
        />
      </div>
    </div>
  );
}

export default Home;
