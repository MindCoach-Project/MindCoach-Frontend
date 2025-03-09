import React, { useEffect, useState } from "react";
import { TemplateLayout } from "../layouts";
import { TaskList } from "../components/Template";
import { getTemplates } from "../api/template";

const WorkTemplate = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templatesData = await getTemplates("work");

        const formattedTemplates = templatesData.map((item) => ({
          id: item.id,
          title: item.name,
          tasks: item.unifiedTasks || [],
        }));
        setTemplates(formattedTemplates);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <TemplateLayout title="Work Tasks">
      {templates.map((template, index) => (
        <TaskList key={index} tasks={[template]} />
      ))}
    </TemplateLayout>
  );
};

export default WorkTemplate;
