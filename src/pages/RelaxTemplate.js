import { TemplateLayout } from "../layouts";
import { TaskList } from "../components/Template";

const RelaxTemplate = () => {
  const relaxTasks = [
    { time: "08:00", title: "Meditation" },
    { time: "12:30", title: "Lunch with Friends" },
    { time: "15:00", title: "Reading Book" },
    { time: "21:00", title: "Watching Movie" },
  ];

  return (
    <TemplateLayout title="Relax Time">
      <TaskList tasks={relaxTasks} />
    </TemplateLayout>
  );
};

export default RelaxTemplate;
