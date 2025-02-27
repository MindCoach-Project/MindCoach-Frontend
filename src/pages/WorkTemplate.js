import { TemplateLayout } from "../layouts";
import { TaskList } from "../components/Template";

const WorkTemplate = () => {
  const workTasks = [
    { time: "10:00", title: "Meeting" },
    { time: "12:00", title: "Meeting" },
    { time: "13:00", title: "Meeting" },
    { time: "14:00", title: "Meeting" },
  ];

  return (
    <TemplateLayout title="Work Tasks">
      <TaskList tasks={workTasks} />
    </TemplateLayout>
  );
};

export default WorkTemplate;
