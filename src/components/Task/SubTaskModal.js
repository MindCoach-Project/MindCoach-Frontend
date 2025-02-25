"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "../ui"
import { Input } from "../ui"
import { Button } from "../ui"
import { Label } from "../ui"
import { X } from "lucide-react"
import { format, parseISO } from "date-fns"

export function SubTaskModal({ isOpen, onClose, onSubmit, defaultValues }) {
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("")

  // Reset form when modal opens/closes or defaultValues change
  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues.title || "")

      // Parse the ISO dates
      const startDateTime = defaultValues.startTime ? parseISO(defaultValues.startTime) : new Date()
      const endDateTime = defaultValues.endTime ? parseISO(defaultValues.endTime) : new Date()

      setStartDate(format(startDateTime, "yyyy-MM-dd"))
      setStartTime(format(startDateTime, "HH:mm"))
      setEndDate(format(endDateTime, "yyyy-MM-dd"))
      setEndTime(format(endDateTime, "HH:mm"))
    } else {
      const now = new Date()
      const later = new Date(now.getTime() + 30 * 60 * 1000) // 1 hour later

      setTitle("")
      setStartDate(format(now, "yyyy-MM-dd"))
      setStartTime(format(now, "HH:mm"))
      setEndDate(format(later, "yyyy-MM-dd"))
      setEndTime(format(later, "HH:mm"))
    }
  }, [defaultValues])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Create ISO date strings without timezone offset
    const startDateTime = new Date(`${startDate}T${startTime}:00`)
    const endDateTime = new Date(`${endDate}T${endTime}:00`)

    if (endDateTime <= startDateTime) {
      alert("End time must be after start time")
      return
    }

    onSubmit({
      id: defaultValues?.id,
      title,
      startTime: format(startDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
      endTime: format(endDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-inherit">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Edit Subtask" : "Add Subtask"}</DialogTitle>
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
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Start</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                  <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>End</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    required
                  />
                  <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{defaultValues ? "Update Subtask" : "Add Subtask"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

