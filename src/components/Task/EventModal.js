"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui";
import { Input } from "../ui";
import { Button } from "../ui";
import { Label } from "../ui";
import { Textarea } from "../ui";
import { Clock, X, Plus, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";
import {
  createTask,
  updateTask,
  deleteSubTask,
  deleteTask,
} from "../../api/task";
import { SubTaskModal } from "./SubTaskModal";
import { toZonedTime, format } from "date-fns-tz";
const timeZone = "Asia/Ho_Chi_Minh";

const convertToUTC = (date, time) => {
  const localTime = new Date(`${date}T${time}`);
  return format(
    toZonedTime(localTime, timeZone),
    "yyyy-MM-dd'T'HH:mm:ss.SSSX",
    { timeZone: "UTC" }
  );
};

export function EventModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  selectedTime,
}) {
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [startTime, setStartTime] = useState(
    format(defaultValues?.start || selectedTime || new Date(), "HH:mm")
  );
  const [endTime, setEndTime] = useState(
    format(
      defaultValues?.end ||
        new Date(selectedTime || new Date()).setHours(
          (selectedTime || new Date()).getHours() + 1
        ),
      "HH:mm"
    )
  );
  const [startDate, setStartDate] = useState(
    format(defaultValues?.start || selectedTime || new Date(), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(
    format(defaultValues?.end || selectedTime || new Date(), "yyyy-MM-dd")
  );
  const [priority, setPriority] = useState(defaultValues?.priority || "medium");
  const [description, setDescription] = useState(
    defaultValues?.description || ""
  );
  const [subtasks, setSubtasks] = useState(defaultValues?.subtasks || []);
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false);
  const [selectedSubtask, setSelectedSubtask] = useState(null);
  const [error, setError] = useState("");

  const handleAddSubtask = () => {
    setSelectedSubtask(null);
    setIsSubtaskModalOpen(true);
  };

  const handleEditSubtask = (subtask) => {
    setSelectedSubtask(subtask);
    setIsSubtaskModalOpen(true);
  };

  const handleSubtaskSubmit = (subtaskData) => {
    if (selectedSubtask) {
      setSubtasks(
        subtasks.map((st) =>
          st.id === selectedSubtask.id ? { ...st, ...subtaskData } : st
        )
      );
    } else {
      setSubtasks([...subtasks, { ...subtaskData, id: Date.now().toString() }]);
    }
  };

  const handleRemoveSubtask = async (id) => {
    const isDeleted = await deleteSubTask(id);

    if (isDeleted) {
      setSubtasks(subtasks.filter((task) => task.id !== id));
    } else {
      alert("Failed to delete subtask. Please try again.");
    }
  };

  const handleRemoveTask = async (taskId) => {
    console.log("id task", taskId);
    const isDeleted = await deleteTask(taskId);
    if (isDeleted) {
      onClose();
    } else {
      alert("Failed to delete task. Please try again.");
    }
  };

  const validateForm = () => {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    if (end <= start) {
      setError("End time must be after start time");
      return false;
    }

    if (!title.trim()) {
      setError("Title is required");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const eventData = {
      title,
      description,
      priority,
      startTime: convertToUTC(startDate, startTime),
      endTime: convertToUTC(endDate, endTime),
      subTasks: subtasks.map((st) => ({
        ...(st.id && { id: st.id }),
        title: st.title,
        startTime: convertToUTC(st.startDate, st.startTime),
        endTime: convertToUTC(st.endDate, st.endTime),
        description: st.description || "",
      })),
    };

    try {
      const result = defaultValues?.id
        ? await updateTask(defaultValues.id, eventData)
        : await createTask(eventData);

      onSubmit(result);
      onClose();
    } catch (error) {
      setError(error.message || "Error saving task");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-inherit">
          <DialogHeader>
            <DialogTitle>
              {defaultValues ? "Edit Task" : "Create Task"}
            </DialogTitle>

            <div className="absolute right-4 top-4 flex space-x-3">
              {defaultValues?.id && (
                <button
                  onClick={() => handleRemoveTask(defaultValues?.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="h-5 w-5" />
                </button>
              )}

              <DialogClose className="rounded-sm opacity-70 hover:opacity-100">
                <X className="h-5 w-5" />
              </DialogClose>
            </div>
          </DialogHeader>

          {error && (
            <div className="bg-red-50 text-red-900 px-4 py-2 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Time Range</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={format(new Date(), "yyyy-MM-dd")}
                    required
                  />
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    required
                  />
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Subtasks</Label>
              {subtasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2">
                  <div className="flex-1 p-2 border rounded-md">
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(task.startTime), "PPp")} -
                      {format(new Date(task.endTime), "PPp")}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditSubtask(task)}
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSubtask(task.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="noborder"
                className="w-full"
                onClick={handleAddSubtask}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Subtask
              </Button>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {defaultValues ? "Update Task" : "Create Task"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <SubTaskModal
        isOpen={isSubtaskModalOpen}
        onClose={() => setIsSubtaskModalOpen(false)}
        onSubmit={handleSubtaskSubmit}
        defaultValues={selectedSubtask}
      />
    </>
  );
}
