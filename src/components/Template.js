import { Card } from "../components/ui";
import { useNavigate } from "react-router-dom";
import { Users, Briefcase, Plane, Bike } from "lucide-react";

function Template() {
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      title: "Family",
      icon: <Users size={32} />,
      path: "/template/family",
      className: "bg-blue-200 border-blue-400 hover:bg-blue-400",
    },
    {
      id: 2,
      title: "Work",
      icon: <Briefcase size={32} />,
      path: "/template/work",
      className: "bg-yellow-200 border-yellow-400 hover:bg-yellow-400",
    },
    {
      id: 3,
      title: "Travel",
      icon: <Plane size={32} />,
      path: "/template/travel",
      className: "bg-green-200 border-green-400 hover:bg-green-400",
    },
    {
      id: 4,
      title: "Activity",
      icon: <Bike size={32} />,
      path: "/template/activity",
      className: "bg-purple-200 border-purple-400 hover:bg-purple-400",
    },
  ];

  return (
    <>
      <h2 className="text-20 font-regular text-brown text-center">
        Choose a template
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((item) => (
          <Card
            key={item.id}
            icon={item.icon}
            title={item.title}
            onClick={() => navigate(item.path)}
            className={item.className}
          />
        ))}
      </div>
    </>
  );
}

export default Template;
