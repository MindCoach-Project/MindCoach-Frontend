import { TaskTemplateCard } from "./ui";
import { useNavigate } from "react-router-dom";
import { Home, Briefcase, Coffee, Bike } from "lucide-react";
import { site_path } from "../utils";
function TemplateSection() {
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      title: "Work",
      icon: <Briefcase size={32} />,
      path: site_path.TEMPLATE_WORK,
      className: "bg-yellow-200 border-yellow-400 hover:bg-yellow-400",
    },
    {
      id: 2,
      title: "Household",
      icon: <Home size={32} />,
      path: site_path.TEMPLATE_HOUSEHOLD,
      className: "bg-blue-200 border-blue-400 hover:bg-blue-400",
    },
    {
      id: 3,
      title: "Sport",
      icon: <Bike size={32} />,
      path: site_path.TEMPLATE_SPORT,
      className: "bg-green-200 border-green-400 hover:bg-green-400",
    },
    {
      id: 4,
      title: "Relax",
      icon: <Coffee size={32} />,
      path: site_path.TEMPLATE_RELAX,
      className: "bg-purple-200 border-purple-400 hover:bg-purple-400",
    },
  ];

  return (
    <>
      <h2 className="text-20 font-regular text-brown text-center">
        Choose a template
      </h2>
      <div className="grid grid-cols-2 gap-12">
        {templates.map((item) => (
          <TaskTemplateCard
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

export default TemplateSection;
