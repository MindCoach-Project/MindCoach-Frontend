// components/Chart/TaskStatusChart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TaskStatusChart = ({ data }) => {
  return (
    <div>
      <h3 className="text-16 font-medium mt-4">
        Tasks Status for Current Week
      </h3>
      <div className="flex justify-center">
        <div className="w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="To Do" stackId="a" fill="#ffbf69" />
              <Bar dataKey="In Progress" stackId="a" fill="#cbf3f0" />
              <Bar dataKey="Done" stackId="a" fill="#2ec4b6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TaskStatusChart;
