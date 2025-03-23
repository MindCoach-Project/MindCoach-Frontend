"use client";
import { useState, useEffect } from "react";
import { updateReminderOffset } from "../api/reminder";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui";
import { useNavigate } from "react-router-dom";
import { site_path } from "../utils";
import { ToastMessage } from "../components/ui";

export default function ReminderPage() {
  const [selectedOffset, setSelectedOffset] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOffset = localStorage.getItem("reminderOffset");
    const initialOffset = storedOffset ? parseInt(storedOffset, 10) : 5;

    setCurrentOffset(initialOffset);
    setSelectedOffset(initialOffset);
  }, []);

  const handleOffsetSelection = (minutes) => {
    setSelectedOffset(minutes);
  };

  const handleSave = async () => {
    if (!selectedOffset) return;

    setIsLoading(true);

    try {
      const result = await updateReminderOffset({
        reminderOffsetMinutes: selectedOffset,
      });

      setCurrentOffset(result.reminderOffset);
      localStorage.setItem("reminderOffset", result.reminderOffset);

      setToast({ type: "success", message: "Updated successfully" });

      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      setToast({
        type: "error",
        message: "Failed to update reminder.",
      });

      setTimeout(() => setToast(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-2">
          <ArrowLeft
            size={28}
            className="cursor-pointer text-aqua hover:text-aqua"
            onClick={() => navigate(site_path.HOME)}
          />
          <h1 className="text-20 font-regular text-brown text-center flex-1">
            Reminder setting
          </h1>
        </div>

        <p className="text-brown">
          Choose how many minutes before a task you want to be notified:
        </p>
        <div className="w-1/2 items-center mx-auto text-center">
          <div className="flex flex-col gap-24">
            {[5, 10, 15].map((minutes) => (
              <Button
                key={minutes}
                className={`flex-1 ${
                  selectedOffset === minutes
                    ? "bg-[#b3ecdb] text-black py-12"
                    : "bg-[#F4FCFF] text-black py-12 border border-greenDark"
                }`}
                onClick={() => handleOffsetSelection(minutes)}
              >
                {minutes} minutes
              </Button>
            ))}
          </div>
        </div>
        {currentOffset !== null && (
          <p className="text-sm text-gray-500">
            Current setting:{" "}
            <span className="font-medium">{currentOffset} minutes</span> before
            task
          </p>
        )}

        <div className="flex justify-center">
          <Button
            onClick={handleSave}
            className="w-1/2 mt-30 text-white px-4 py-2"
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-4/5">
          <ToastMessage type={toast.type} message={toast.message} />
        </div>
      )}
    </div>
  );
}
