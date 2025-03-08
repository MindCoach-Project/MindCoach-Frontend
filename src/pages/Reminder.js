"use client";
import { useState, useEffect } from "react";
import { updateReminderOffset } from "../api/reminder";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";
import { Button } from "../components/ui";
import { useNavigate } from "react-router-dom";
import { site_path } from "../utils";
export default function ReminderPage() {
  const [selectedOffset, setSelectedOffset] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentOffset(5);
    setSelectedOffset(5);
  }, []);

  const handleOffsetSelection = (minutes) => {
    setSelectedOffset(minutes);
  };

  const handleSave = async () => {
    if (!selectedOffset) return;

    setIsLoading(true);
    setNotification({ type: "", message: "" });

    try {
      const result = await updateReminderOffset({
        reminderOffset: selectedOffset,
      });
      setCurrentOffset(result.reminderOffset);
      setNotification({
        type: "success",
        message: "Reminder notification time updated successfully",
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to update reminder settings. Please try again.",
      });
    } finally {
      setIsLoading(false);

      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setNotification({ type: "", message: "" });
      }, 5000);
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

        {/* Notification */}
        {notification.message && (
          <div
            className={`mb-4 p-3 rounded-md ${
              notification.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            <div className="flex items-center">
              {notification.type === "success" ? (
                <Check className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              <p className="text-sm">{notification.message}</p>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            onClick={handleSave}
            disabled={isLoading || selectedOffset === currentOffset}
            className="w-1/2 mt-30 bg-[#028E89]"
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
}
