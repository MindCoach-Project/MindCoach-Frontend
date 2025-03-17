import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Logo, PageTitle } from "../components/ui";
import { Link } from "react-router-dom";
import { site_path } from "../utils";
const Intro = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    const isFirstLogin = JSON.parse(
      localStorage.getItem("firstLogin") || "false"
    );
    if (!isFirstLogin) {
      navigate("/onboard/1");
    } else {
      navigate(site_path.LOGIN);
    }
  };
  //   useEffect(() => {
  //     const hasSeenIntro = localStorage.getItem("hasSeenIntro");

  //     if (hasSeenIntro) {
  //       navigate("/"); // Nếu đã xem intro, chuyển về Home
  //     } else {
  //       setTimeout(() => {
  //         navigate("/onboarding/1"); // Tự động chuyển sang màn đầu tiên sau 2s
  //       }, 2000);
  //     }
  //   }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center text-center gap-24">
      <div className="mt-24">
        <Logo />
      </div>
      <PageTitle title="Welcome to MindCoach" />
      <p className="text-brown text-20">
        Your personal assistant Let me handle the smart task management,
        Reminder and schedules
      </p>
      <img
        src="../../assets/images/img-intro.png"
        alt="image intro"
        width={240}
      />
      <Button onClick={handleGetStarted} size="lg">
        <Link href="#">Get started</Link>
      </Button>
    </div>
  );
};

export default Intro;
