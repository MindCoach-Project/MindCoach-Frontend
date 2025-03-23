import { useState } from "react";
import { Button } from "../ui";
import { createTaskFromTemplate } from "../../api/template";
import ToastMessage from "../ui/ToastMessage";
import { site_path } from "../../utils";
import { useNavigate } from "react-router-dom";

export function TaskList({ tasks }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [toast, setToast] = useState(null);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleApply = async (templateId) => {
    setLoading(templateId);
    try {
      await createTaskFromTemplate(templateId);
      setToast({ type: "success", message: "Sync successful!" });

      setTimeout(() => {
        setToast(null);
        navigate(site_path.TASKS);
      }, 2000);
    } catch (error) {
      setToast({ type: "error", message: "Sync failed." });
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      {tasks.map((template) => (
        <div key={template.id} className="mb-4">
          <h2 className="font-regular text-brown text-lg mb-2">{template.title}</h2>

          <div className="border border-orange rounded-md p-3 grid grid-cols-2 gap-4">
            {template.tasks.length > 0 ? (
              [0, 1].map((colIndex) => (
                <div key={colIndex} className="flex flex-col gap-2">
                  {template.tasks
                    .filter((_, index) => index % 2 === colIndex)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="p-2 rounded-md text-sm bg-[#D6EFD8]"
                      >
                        <p className="font-sm">
                          {formatTime(task.startTime)} -{" "}
                          {formatTime(task.endTime)} {task.title}
                        </p>
                      </div>
                    ))}
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-2 text-center">
                No tasks available
              </p>
            )}
          </div>

          <Button
            size="sm"
            type="submit"
            className="w-1/4 mt-2"
            onClick={() => handleApply(template.id)}
            disabled={loading === template.id}
          >
            {loading === template.id ? "Applying..." : "Apply"}
          </Button>
          {toast && (
            <ToastMessage
              type={toast.type}
              message={toast.message}
              bottomOffset={100}
            />
          )}
        </div>
      ))}
    </>
  );
}
