import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { getTasksByDay, getTaskDetail } from "../api";
import { EventModal } from "../components/Task";

const TaskStatusPage = () => {
  const [date, setDate] = useState(dayjs());
  const [status, setStatus] = useState("Todo");
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [date, status]);

  const fetchTasks = async () => {
    try {
      const response = await getTasksByDay(date, status);
      setTasks(response);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const changeDate = (days) => {
    setDate(date.add(days, "day"));
  };

  const handleTaskClick = async (task) => {
    setIsLoading(true);

    try {
      const taskDetail = await getTaskDetail(task.id);

      const formattedTask = {
        id: taskDetail.id,
        title: taskDetail.title,
        description: taskDetail.description || "",
        priority: taskDetail.priority,
        status: taskDetail.status,
        start: taskDetail.startTime,
        end: taskDetail.endTime,
        subtasks: taskDetail.subTasks.map((subTask) => ({
          id: subTask.id,
          title: subTask.title,
          startTime: subTask.startTime,
          endTime: subTask.endTime,
          description: subTask.description || "",
          status: subTask.status,
        })),
      };

      setSelectedTask(formattedTask);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching task details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskUpdate = () => {
    fetchTasks();
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  const taskColors = [
    "bg-blue-100 border border-blue-300 border-l-4 border-l-blue-500",
    "bg-green-100 border border-green-300 border-l-4 border-l-green-500",
    "bg-yellow-100 border border-yellow-300 border-l-4 border-l-yellow-500",
    "bg-purple-100 border border-purple-300 border-l-4 border-l-purple-500",
    "bg-pink-100 border border-pink-300 border-l-4 border-l-pink-500",
  ];

  const priorityColors = {
    high: "bg-red-200 text-red-700 border-red-300",
    medium: "bg-yellow-200 text-yellow-700 border-yellow-300",
    low: "bg-green-200 text-green-700 border-green-300",
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeDate(-1)}>❮</button>
        <p className="text-brown text-18">{date.format("dddd, DD MMM YYYY")}</p>
        <button onClick={() => changeDate(1)}>❯</button>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        {["Todo", "Inprogress", "Done"].map((tab) => {
          const tabStyles = {
            Todo: "bg-purple-300 text-purple-800 scale-109",
            Inprogress: "bg-blue-300 text-blue-700 scale-109",
            Done: "bg-green-300 text-green-700 scale-109",
          };

          return (
            <button
              key={tab}
              className={`px-6 py-2 w-2/3 rounded-full transition-all duration-300 ${
                status === tab ? tabStyles[tab] : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setStatus(tab)}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="overflow-y-auto max-h-[60vh] space-y-4 scrollbar-hide">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`p-2 rounded cursor-pointer hover:bg-opacity-80 ${
              taskColors[index % taskColors.length]
            }`}
            onClick={() => handleTaskClick(task)}
          >
            <div className="flex justify-between">
              <h3 className="font-20 font-medium">{task.title}</h3>
              {task.type === "Task" && (
                <span
                  className={`text-sm px-2 py-1 rounded border ${
                    priorityColors[task.priority.toLowerCase()] ||
                    "bg-gray-300 text-gray-700 border-gray-400"
                  }`}
                >
                  {task.priority}
                </span>
              )}
            </div>
            <p>
              {dayjs(task.startTime).format("HH:mm")} -{" "}
              {dayjs(task.endTime).format("HH:mm")}
            </p>
          </div>
        ))}
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleTaskUpdate}
        defaultValues={selectedTask}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TaskStatusPage;
