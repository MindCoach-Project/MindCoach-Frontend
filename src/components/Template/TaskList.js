import { Button } from "../ui";

export function TaskList({ tasks }) {
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {tasks.map((template) => (
        <div key={template.id} className="mb-4">
          <h2 className="font-bold text-lg mb-2">{template.title}</h2>
          
          <div className="border border-orange rounded-md p-3 grid grid-cols-2 gap-4">
            {template.tasks.length > 0 ? (
              [0, 1].map((colIndex) => (
                <div key={colIndex} className="flex flex-col gap-2">
                  {template.tasks
                    .filter((_, index) => index % 2 === colIndex)
                    .map((task) => (
                      <div key={task.id} className="p-2 rounded-md text-sm bg-[#D6EFD8]">
                        {/* Hiển thị thời gian + title */}
                        <p className="font-sm">
                          {formatTime(task.startTime)} - {formatTime(task.endTime)} {task.title}
                        </p>
                      </div>
                    ))}
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-2 text-center">No tasks available</p>
            )}
          </div>
      <Button size="sm" type="submit" className="w-1/4 mt-2">
        Apply
      </Button>
        </div>
      ))}

    </>
  );
}
