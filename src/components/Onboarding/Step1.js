import React from "react";
import { useNavigate } from "react-router-dom";

const Step1 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>What time do you usually start the day?</h2>
      <button onClick={() => navigate("/onboarding/2")}>Next</button>
    </div>
  );
};

export default Step1;
