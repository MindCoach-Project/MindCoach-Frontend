import { TemplateLayout } from "../layouts";
import { TaskList } from "../components/Template";

const SportTemplate = () => {
  const sportTasks = [
    { time: "06:00", title: "Morning Jog" },
    { time: "07:30", title: "Yoga Session" },
    { time: "17:00", title: "Gym Workout" },
    { time: "19:00", title: "Swimming" },
  ];

  return (
    <TemplateLayout title="Sport Activities">
      <TaskList tasks={sportTasks} />
    </TemplateLayout>
  );
};

export default SportTemplate;
