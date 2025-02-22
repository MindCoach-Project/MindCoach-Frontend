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
import { X } from "lucide-react";

export function SubTaskModal({ isOpen, onClose, onSubmit, defaultValues }) {
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [startTime, setStartTime] = useState(
    defaultValues?.startTime || new Date().toISOString().slice(0, 16)
  );
  const [endTime, setEndTime] = useState(
    defaultValues?.endTime || new Date().toISOString().slice(0, 16)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: defaultValues?.id,
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-inherit">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Edit Subtask" : "Add Subtask"}
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter subtask title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Time Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {defaultValues ? "Update Subtask" : "Add Subtask"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
