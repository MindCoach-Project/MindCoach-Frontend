"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui";
import { Input } from "../ui";
import { Button } from "../ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui";
import { DatePicker } from "./DatePicker";

export function TaskModal({ isOpen, onClose, onSubmit, defaultValues }) {
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [priority, setPriority] = useState(defaultValues?.priority || "medium");
  const [date, setDate] = useState(defaultValues?.date ? new Date(defaultValues.date) : undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      priority,
      date,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task title" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <DatePicker mode="single" selected={date} onSelect={setDate} className="border rounded-md" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Task</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
