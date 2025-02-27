import { Button } from "../ui";

export function TaskList({ tasks }) {
  const mid = Math.ceil(tasks.length / 2);
  const leftColumn = tasks.slice(0, mid);
  const rightColumn = tasks.slice(mid);
  return (
    <>
      <div className="border border-orange rounded-md p-3 grid grid-cols-2 gap-4">
      {[leftColumn, rightColumn].map((column, index) => (
        <div key={index} className="flex flex-col gap-2">
          {column.map((task, idx) => (
            <p
              key={idx}
              className={`p-2 rounded-md text-sm bg-[#D6EFD8]`}
            >
              {task.time} {task.title}
            </p>
          ))}
        </div>
      ))}
    </div>
      <Button size="sm" type="submit" className="mt-2 w-1/4">
        Apply
      </Button>
    </>
  );



}

