"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "../ui"
import { Input } from "../ui"
import { Button } from "../ui"
import { Label } from "../ui"
import { Textarea } from "../ui"
import { Clock, X, Plus, Trash } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui"
import { createTask, updateTask, deleteSubTask, deleteTask } from "../../api/task"
import { SubTaskModal } from "./SubTaskModal"
import { format, parseISO } from "date-fns"

export function EventModal({ isOpen, onClose, onSubmit, defaultValues, selectedTime }) {
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("")
  const [priority, setPriority] = useState("medium")
  const [description, setDescription] = useState("")
  const [subtasks, setSubtasks] = useState([])
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false)
  const [selectedSubtask, setSelectedSubtask] = useState(null)
  const [error, setError] = useState("")

  // Initialize form data when modal opens or defaultValues change
  useEffect(() => {

    console.log("Initial vlaue...", defaultValues);

    if (defaultValues) {
      setTitle(defaultValues.title || "")
      setPriority(defaultValues.priority?.toLowerCase() || "medium")
      setDescription(defaultValues.description || "")
      setSubtasks(defaultValues.subtasks || [])

      // Parse the ISO dates
      const startDateTime = defaultValues.start ? parseISO(defaultValues.start) : new Date()
      const endDateTime = defaultValues.end ? parseISO(defaultValues.end) : new Date()

      setStartDate(format(startDateTime, "yyyy-MM-dd"))
      setStartTime(format(startDateTime, "HH:mm"))
      setEndDate(format(endDateTime, "yyyy-MM-dd"))
      setEndTime(format(endDateTime, "HH:mm"))
    } else {
      const now = selectedTime || new Date()
      const later = new Date(now.getTime() + 60 * 60 * 1000) // 1 hour later

      setTitle("")
      setPriority("medium")
      setDescription("")
      setSubtasks([])
      setStartDate(format(now, "yyyy-MM-dd"))
      setStartTime(format(now, "HH:mm"))
      setEndDate(format(later, "yyyy-MM-dd"))
      setEndTime(format(later, "HH:mm"))
    }
  }, [defaultValues, selectedTime])

  const handleAddSubtask = () => {
    setSelectedSubtask(null)
    setIsSubtaskModalOpen(true)
  }

  const handleEditSubtask = (subtask) => {
    setSelectedSubtask(subtask)
    setIsSubtaskModalOpen(true)
  }

  const handleSubtaskSubmit = (subtaskData) => {
    setSubtasks((prev) => {
      if (subtaskData.id) {
        return prev.map((st) => (st.id === subtaskData.id ? subtaskData : st))
      }
      return [...prev, { ...subtaskData, id: Date.now().toString() }]
    })
  }

  const handleRemoveSubtask = async (taskId, subTaskId) => {
    try {
      if (taskId) {
        await deleteSubTask(taskId, subTaskId)
      }
      setSubtasks((prev) => prev.filter((st) => st.id !== subTaskId))
    } catch (error) {
      setError("Failed to delete subtask")
    }
  }

  const handleRemoveTask = async (taskId) => {
    try {
      await deleteTask(taskId)
      onSubmit() // Trigger refresh
      onClose()
    } catch (error) {
      setError("Failed to delete task")
    }
  }

  const validateForm = () => {
    const start = new Date(`${startDate}T${startTime}:00`)
    const end = new Date(`${endDate}T${endTime}:00`)

    if (end <= start) {
      setError("End time must be after start time")
      return false
    }

    if (!title.trim()) {
      setError("Title is required")
      return false
    }

    setError("")
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const startDateTime = new Date(`${startDate}T${startTime}:00`)
    const endDateTime = new Date(`${endDate}T${endTime}:00`)

    const eventData = {
      title,
      description,
      priority,
      startTime: format(startDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
      endTime: format(endDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
      subTasks: subtasks.map((st) => ({
        title: st.title,
        startTime: st.startTime,
        endTime: st.endTime,
        description: st.description || "",
      })),
    }

    try {
      const result = defaultValues?.id ? await updateTask(defaultValues.id, eventData) : await createTask(eventData)

      onSubmit(result)
      onClose()
    } catch (error) {
      setError(error.message || "Error saving task")
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-inherit">
          <DialogHeader>
            <DialogTitle>
              {defaultValues ? "Edit Task" : "Create Task"}
              <div className="absolute right-2 top-2 flex space-x-3">
                {defaultValues?.id && (
                  <button
                    onClick={() => handleRemoveTask(defaultValues.id)}
                    className="text-red-500 hover:text-red-700"
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

          {error && <div className="bg-red-50 text-red-900 px-4 py-2 rounded-md mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task title" required />
            </div>

            <div className="space-y-2">
              <Label>Time Range</Label>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Start</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      // min={format(new Date(), "yyyy-MM-dd")}
                      required
                    />
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
                      // min={startDate}
                      required
                    />
                    <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                  </div>
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
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Subtasks</Label>
              {subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-2">
                  <div className="flex-1 p-2 border rounded-md">
                    <div className="font-medium">{subtask.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(parseISO(subtask.startTime), "PPp")} -{format(parseISO(subtask.endTime), "PPp")}
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleEditSubtask(subtask)}>
                    <Clock className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSubtask(defaultValues?.id, subtask.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" className="w-full" onClick={handleAddSubtask}>
                <Plus className="h-4 w-4 mr-2" />
                Add Subtask
              </Button>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{defaultValues ? "Update Task" : "Create Task"}</Button>
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
  )
}

