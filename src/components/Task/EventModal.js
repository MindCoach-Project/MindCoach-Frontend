"use client";

import { useState, useEffect } from "react";
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
import { format } from "date-fns";

export function EventModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  selectedTime,
  isLoading,
}) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false);
  const [selectedSubtask, setSelectedSubtask] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues.title || "");
      setPriority(defaultValues.priority?.toLowerCase() || "medium");
      setStatus(defaultValues.status?.toLowerCase() || "todo");
      setDescription(defaultValues.description || "");

      if (defaultValues.subtasks && Array.isArray(defaultValues.subtasks)) {
        const existingSubtaskIds = new Set(subtasks.map((st) => st.id));
        const newSubtasks = defaultValues.subtasks.filter(
          (st) => !existingSubtaskIds.has(st.id)
        );

        if (subtasks.length === 0) {
          setSubtasks(defaultValues.subtasks);
        } else if (newSubtasks.length > 0) {
          setSubtasks((prev) => [...prev, ...newSubtasks]);
        }
      } else {
        setSubtasks([]);
      }

      // Parse the ISO dates
      const startDateTime = defaultValues.start
        ? new Date(defaultValues.start)
        : new Date();
      const endDateTime = defaultValues.end
        ? new Date(defaultValues.end)
        : new Date();

      setStartDate(format(startDateTime, "yyyy-MM-dd"));
      setStartTime(format(startDateTime, "HH:mm"));
      setEndDate(format(endDateTime, "yyyy-MM-dd"));
      setEndTime(format(endDateTime, "HH:mm"));

      if (defaultValues.selectedSubtaskId) {
        const subtask = defaultValues.subtasks.find(
          (st) => st.id === defaultValues.selectedSubtaskId
        );
        if (subtask) {
          setSelectedSubtask(subtask);
          setIsSubtaskModalOpen(true);
        }
      }
    } else {
      const now = selectedTime || new Date();
      const later = new Date(now.getTime() + 60 * 60 * 1000);

      setTitle("");
      setPriority("medium");
      setStatus("todo");
      setDescription("");
      setSubtasks([]);
      setStartDate(format(now, "yyyy-MM-dd"));
      setStartTime(format(now, "HH:mm"));
      setEndDate(format(later, "yyyy-MM-dd"));
      setEndTime(format(later, "HH:mm"));
    }
  }, [defaultValues, selectedTime]);
  const handleAddSubtask = () => {
    setSelectedSubtask(null);
    setIsSubtaskModalOpen(true);
  };

  const handleEditSubtask = (subtask) => {
    setSelectedSubtask(subtask);
    setIsSubtaskModalOpen(true);
  };

  const handleSubtaskSubmit = (subtaskData) => {
    setSubtasks((prev) => {
      if (subtaskData.id) {
        return prev.map((st) => (st.id === subtaskData.id ? subtaskData : st));
      }
      return [...prev, { ...subtaskData, id: Date.now().toString() }];
    });
  };

  const handleRemoveSubtask = async (taskId, subTaskId) => {
    try {
      if (taskId) {
        await deleteSubTask(taskId, subTaskId);
      }
      setSubtasks((prev) => prev.filter((st) => st.id !== subTaskId));
    } catch (error) {
      setError("Failed to delete subtask");
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      onSubmit();
      onClose();
    } catch (error) {
      setError("Failed to delete task");
    }
  };

  const validateForm = () => {
    const start = new Date(`${startDate}T${startTime}:00`);
    const end = new Date(`${endDate}T${endTime}:00`);

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

    const startDateTime = new Date(`${startDate}T${startTime}:00`);
    const endDateTime = new Date(`${endDate}T${endTime}:00`);

    const processedSubtasks = subtasks.map((st) => {
      const isNewSubtask = !st.id.includes("-");

      return {
        ...(isNewSubtask ? {} : { id: st.id }),
        title: st.title,
        startTime: st.startTime,
        endTime: st.endTime,
        description: st.description || "",
        status: st.status || "todo",
      };
    });

    const eventData = {
      title,
      description,
      priority,
      status,
      startTime: format(startDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
      endTime: format(endDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
      subTasks: processedSubtasks,
    };

    try {
      if (defaultValues?.id) {
        await updateTask(defaultValues.id, eventData);
      } else {
        await createTask(eventData);
      }

      onSubmit();
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
              {defaultValues ? "Update Task" : "Create Task"}
              <div className="absolute right-2 top-2 flex space-x-3">
                {defaultValues?.id && (
                  <button
                    onClick={() => handleRemoveTask(defaultValues.id)}
                    className="text-red-500 hover:text-red-700"
                    disabled={isLoading}
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                )}
                <DialogClose className="rounded-sm opacity-70 hover:opacity-100">
                  <X className="h-5 w-5" />
                </DialogClose>
              </div>
            </DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 text-red-900 px-4 py-2 rounded-md mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    required
                  />
                </div>

                <div>
                  <Label>Time Range</Label>
                  <div className="grid gap-1">
                    <div>
                      <Label>Start</Label>
                      <div className="grid grid-cols-2 gap-1">
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          required
                        />
                        <Input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label>End</Label>
                      <div className="grid grid-cols-2 gap-1">
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
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <div>
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
                  <div>
                    <Label>Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="inprogress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <Label>Subtasks</Label>
                    <span className="text-xs text-muted-foreground">
                      {subtasks.length} subtask
                      {subtasks.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {subtasks.map((subtask) => (
                      <div
                        key={subtask.id}
                        className="flex items-center gap-2 group"
                      >
                        <div className="flex-1 p-2 border rounded-md">
                          <div className="font-medium">{subtask.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {format(
                              new Date(subtask.startTime),
                              "MMM d, HH:mm"
                            )}{" "}
                            -{format(new Date(subtask.endTime), "HH:mm")}
                          </div>
                        </div>
                        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditSubtask(subtask)}
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleRemoveSubtask(defaultValues?.id, subtask.id)
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

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

                <div className="flex justify-end space-x-2 pt-2">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {defaultValues ? "Update Task" : "Create Task"}
                  </Button>
                </div>
              </form>
            </>
          )}
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
