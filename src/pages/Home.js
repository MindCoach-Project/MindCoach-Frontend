import React, { useState, useEffect } from "react";
import { ScheduleEvent, EmotionPicker, Template } from "../components";
import { IconPlus } from "../components/ui";
function Home() {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime(now.toLocaleString());
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col gap-12 relative">
      <p className="text-20 text-brown">{dateTime}</p>
      <ScheduleEvent startTime="10:00" endTime="11:00" title="Write report" />
      <EmotionPicker />
      <Template />
  
      <div className="absolute bottom-6 right-6">
        <IconPlus
          onCalendarClick={() => console.log("Calendar Clicked")}
          onEmotionClick={() => console.log("Emotion Clicked")}
        />
      </div>
    </div>
  );
}

export default Home;
