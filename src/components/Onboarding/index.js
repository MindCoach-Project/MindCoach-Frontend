import React from "react";
import { Routes, Route } from "react-router-dom";
import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";
// import Step4 from "./Step4";
// import Step5 from "./Step5";
// import Step6 from "./Step6";
import Step7 from "./Step7";

const Onboarding = () => {
  return (
    <Routes>
      <Route path="1" element={<Step1 />} />
      {/* <Route path="2" element={<Step2 />} />
      <Route path="3" element={<Step3 />} />
      <Route path="4" element={<Step4 />} />
      <Route path="5" element={<Step5 />} />
      <Route path="6" element={<Step6 />} />*/
      <Route path="7" element={<Step7 />} /> }
    </Routes>
  );
};

export default Onboarding;
