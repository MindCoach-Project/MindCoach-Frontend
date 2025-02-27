import { TemplateLayout } from "../layouts";
import { TaskList } from "../components/Template";

const HouseholdTemplate = () => {
  const householdTasks = [
    { time: "08:00", title: "Cleaning" },
    { time: "09:30", title: "Cooking" },
    { time: "11:00", title: "Shopping" },
  ];

  return (
    <TemplateLayout title="Household Tasks">
      <TaskList tasks={householdTasks} />
    </TemplateLayout>
  );
};

export default HouseholdTemplate;
