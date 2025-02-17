import { useEffect, useState } from "react";

const ToastMessage = ({ type = "success", message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`fixed left-1/2 bottom-5 transform -translate-x-1/2 p-2 rounded-lg shadow-lg text-white ${type === "success" ? "bg-green-500" : "bg-red-500"}`}>
      {message}
    </div>
  );
};

export default ToastMessage;
