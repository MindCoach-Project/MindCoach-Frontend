"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui"
import { Input } from "../ui"
import { Button } from "../ui"
import { Label } from "../ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui"
import { DatePicker } from "./DatePicker"
import { format } from "date-fns"

export function TaskModal({ isOpen, onClose, onSubmit, defaultValues }) {
  const [title, setTitle] = useState(defaultValues?.title || "")
  const [priority, setPriority] = useState(defaultValues?.priority || "medium")
  const [date, setDate] = useState(defaultValues?.date ? new Date(defaultValues.date) : new Date())
  const [startTime, setStartTime] = useState(format(defaultValues?.start || new Date(), "HH:mm"))
  const [endTime, setEndTime] = useState(
    format(defaultValues?.end || new Date().setHours(new Date().getHours() + 1), "HH:mm"),
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate times
    const start = new Date(date)
    const [startHours, startMinutes] = startTime.split(":").map(Number)
    start.setHours(startHours, startMinutes)

    const end = new Date(date)
    const [endHours, endMinutes] = endTime.split(":").map(Number)
    end.setHours(endHours, endMinutes)

    if (end <= start) {
      alert("End time must be after start time")
      return
    }

    onSubmit({
      title,
      priority,
      start,
      end,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Edit Task" : "Add Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <DatePicker
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md"
              disabled={(date) => date < new Date()}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
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

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{defaultValues ? "Update Task" : "Create Task"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

