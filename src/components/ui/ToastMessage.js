import { useEffect, useState } from "react";

const ToastMessage = ({ type = "success", message, duration = 3000, bottomOffset = 10 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 p-3 rounded-lg shadow-lg text-white transition-opacity duration-300 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
      style={{
        bottom: `${bottomOffset}px`,
      }}
    >
      {message}
    </div>
  );
};

export default ToastMessage;
