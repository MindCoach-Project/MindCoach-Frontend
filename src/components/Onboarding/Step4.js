import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OnBoard4 = () => {
  const navigate = useNavigate();

  // Danh sách công việc
  const [selectedTasks, setSelectedTasks] = useState([]);
  const tasks = [
    { name: "Work", icon: "📅" },
    { name: "Personal", icon: "🧑‍💼" },
    { name: "Family", icon: "👨‍👩‍👧" },
    { name: "Travel", icon: "🌍" },
  ];

  // Toggle chọn task khi nhấn vào checkbox
  const toggleTask = (taskName) => {
    setSelectedTasks((prev) =>
      prev.includes(taskName)
        ? prev.filter((task) => task !== taskName)
        : [...prev, taskName]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 relative">
      {/* Progress Dots */}
      <div className="flex space-x-2 absolute top-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === 3 ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Câu hỏi */}
      <h2 className="text-black text-2xl font-semibold mb-20 text-center">
        What kind of tasks will you plan?
      </h2>

      {/* Danh sách Tasks */}
      <div className="mb-10 space-y-4 w-full max-w-xs">
        {tasks.map((task) => (
          <div
            key={task.name}
            className="flex items-center justify-between bg-white w-full p-3 rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            {/* Icon + Tên Task */}
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{task.icon}</span>
              <span className="text-lg font-medium">{task.name}</span>
            </div>

            {/* Checkbox (Bấm để chọn/bỏ chọn) */}
            <button
              onClick={() => toggleTask(task.name)}
              className="w-7 h-7 flex items-center justify-center border-2 rounded-full"
              style={{
                borderColor: selectedTasks.includes(task.name)
                  ? "#f87171"
                  : "#d1d5db",
                backgroundColor: selectedTasks.includes(task.name)
                  ? "#f87171"
                  : "transparent",
              }}
            >
              {selectedTasks.includes(task.name) && (
                <span className="text-white">✔</span>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Nút Back & Next */}
      <div className="relative w-full max-w-xs mt-14 flex items-center justify-center">
        {/* Back Button */}
        <button
          className="absolute left-0 text-gray-600 hover:text-black transition flex items-center"
          onClick={() => navigate("/onboard/3")}
        >
          ← Back
        </button>

        {/* Next Button */}
        <button
          className="w-16 h-16 flex items-center justify-center bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition text-2xl"
          onClick={() => navigate("/onboard/5")}
        >
          ➜
        </button>
      </div>
    </div>
  );
};

export default OnBoard4;
