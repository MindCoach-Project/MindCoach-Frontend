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
import { X } from "lucide-react";
import { format, isAfter } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";

export function SubTaskModal({ isOpen, onClose, onSubmit, defaultValues }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("todo");

  // Error states
  const [titleError, setTitleError] = useState("");
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues.title || "");
      setStatus(defaultValues.status || "todo");

      const startDateTime = defaultValues.startTime;
      const endDateTime = defaultValues.endTime;

      setStartDate(format(startDateTime, "yyyy-MM-dd"));
      setStartTime(format(startDateTime, "HH:mm"));
      setEndDate(format(endDateTime, "yyyy-MM-dd"));
      setEndTime(format(endDateTime, "HH:mm"));
    } else {
      const now = new Date();
      const later = new Date(now.getTime() + 30 * 60 * 1000); 

      setTitle("");
      setStatus("todo");
      setStartDate(format(now, "yyyy-MM-dd"));
      setStartTime(format(now, "HH:mm"));
      setEndDate(format(later, "yyyy-MM-dd"));
      setEndTime(format(later, "HH:mm"));
    }
  }, [defaultValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError("");
    setTimeError("");

    if (!title.trim()) {
      setTitleError("Title is required.");
      return;
    }

    // Create Date objects
    const startDateTime = new Date(`${startDate}T${startTime}:00`);
    const endDateTime = new Date(`${endDate}T${endTime}:00`);

    if (!isAfter(endDateTime, startDateTime)) {
      setTimeError("End time must be after start time.");
      return;
    }

    onSubmit({
      id: defaultValues?.id,
      title,
      status,
      startTime: format(startDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
      endTime: format(endDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-inherit">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Update Subtask" : "Add Subtask"}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Title Input */}
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter subtask title" />
            {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
          </div>

          {/* Time Range Inputs */}
          <div>
            <Label>Time Range</Label>
            <div className="grid gap-4">
              <div>
                <Label>Start</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                  <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
              </div>
              <div>
                <Label>End</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} required />
                  <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </div>
              </div>
            </div>
            {timeError && <p className="text-red-500 text-sm">{timeError}</p>}
          </div>

          {/* Status Select */}
          <div className="w-1/2">
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

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{defaultValues ? "Update Subtask" : "Add Subtask"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
