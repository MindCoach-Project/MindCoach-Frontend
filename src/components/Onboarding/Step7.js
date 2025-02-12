import React from "react";
import { useNavigate } from "react-router-dom";

const Step7 = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    localStorage.setItem("hasSeenIntro", "true"); // Đánh dấu đã xem onboarding
    navigate("/"); // Chuyển về Home
  };

  return (
    <div>
      <h2>For the best use of the app, please allow permissions</h2>
      <button onClick={handleFinish}>Finish</button>
    </div>
  );
};

export default Step7;
