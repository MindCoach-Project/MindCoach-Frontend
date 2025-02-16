"use client";

import { useState } from "react";
import { format } from "date-fns";
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
import { Clock, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";
import { scheduleNotification } from "../../utils";

export function EventModal({ isOpen, onClose, onSubmit, defaultValues, selectedTime }) {
  const [title, setTitle] = useState(defaultValues?.title || "")
  const [startTime, setStartTime] = useState(format(defaultValues?.start || selectedTime || new Date(), "HH:mm"))
  const [endTime, setEndTime] = useState(
    format(
      defaultValues?.end || new Date(selectedTime || new Date()).setHours((selectedTime || new Date()).getHours() + 1),
      "HH:mm",
    ),
  )
  const [startDate, setStartDate] = useState(format(defaultValues?.start || selectedTime || new Date(), "yyyy-MM-dd"))
  const [endDate, setEndDate] = useState(format(defaultValues?.end || selectedTime || new Date(), "yyyy-MM-dd"))
  const [priority, setPriority] = useState(defaultValues?.priority || "medium")
  const [description, setDescription] = useState(defaultValues?.description || "")
  const [subtasks, setSubtasks] = useState(defaultValues?.subtasks || [])

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { id: Date.now().toString(), title: "" }])
  }

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter((task) => task.id !== id))
  }

  const handleUpdateSubtask = (id, title) => {
    setSubtasks(subtasks.map((task) => (task.id === id ? { ...task, title } : task)))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const start = new Date(`${startDate}T${startTime}`)
    const end = new Date(`${endDate}T${endTime}`)

    const eventData = {
      id: defaultValues?.id || Date.now().toString(),
      title,
      start,
      end,
      priority,
      description,
      subtasks: subtasks.filter((task) => task.title.trim() !== ""),
    }

    onSubmit(eventData)

    // Schedule notification for the event
    scheduleNotification(eventData)

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-inherit">
        <DialogHeader>
          <DialogTitle>The task</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="border-input bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base">Time</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex gap-2">
                <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-24" />
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-24" />
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-24 bg-red-50 border-red-100 text-red-900">
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
            <Label className="text-base">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            {subtasks.map((task) => (
              <div key={task.id} className="flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0 text-gray-500" />
                <Input
                  value={task.title}
                  onChange={(e) => handleUpdateSubtask(task.id, e.target.value)}
                  placeholder="Subtask"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleRemoveSubtask(task.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" className="w-full" onClick={handleAddSubtask}>
              + Subtask
            </Button>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="w-full">
              {defaultValues ? "Update task" : "Create task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

