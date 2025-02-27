import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { site_path } from "../utils";

const TemplateLayout = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <ArrowLeft
          size={28}
          className="cursor-pointer text-aqua hover:text-aqua"
          onClick={() => navigate(site_path.HOME)}
        />
        <h1 className="text-20 font-regular text-brown text-center flex-1">
          {title}
        </h1>
      </div>
      <div className="overflow-y-auto max-h-[72vh] scrollbar-hide">
        {children}
      </div>
    </div>
  );
};

export default TemplateLayout;
