"use client";
import { useEffect, useState } from "react";
import { X, Clock, ArrowDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui";
import { formatVietnamDate } from "../../utils/TimezoneUtils";
const formatTime = (dateString) => {
  if (!dateString) return "";
  
  try {
    const date = formatVietnamDate(dateString); 
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch (error) {
    console.error("Invalid date format:", error);
    return dateString;
  }
};


// Utility function to check if times match
const timesMatch = (time1, time2) => {
  if (!time1 || !time2) return false;
  
  try {
    const date1 = formatVietnamDate(time1);
    const date2 = formatVietnamDate(time2);
    return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
  } catch (error) {
    console.error("Error comparing times:", error);
    return false;
  }
};


export function ReminderForm({ 
  isOpen, 
  onClose, 
  taskDetails 
}) {
  const [timeRemaining, setTimeRemaining] = useState(30); 
  
  const hasSubtasks = taskDetails?.subtaskMessages?.length > 0;
  const showSubtasksOnly = hasSubtasks && taskDetails.subtaskMessages.some(
    subtask => new Date(subtask.startTime) < new Date(taskDetails.startTime)
  );
  
  const allTimesMatch = hasSubtasks && taskDetails.subtaskMessages.every(
    subtask => timesMatch(subtask.startTime, taskDetails.startTime)
  );
  
  const getOrderedTasks = () => {
    if (!hasSubtasks) return [];
    
    return [...taskDetails.subtaskMessages].sort((a, b) => 
      formatVietnamDate(a.startTime) - formatVietnamDate(b.startTime)
    );
  };
  
  const orderedSubtasks = getOrderedTasks();

  useEffect(() => {
    if (isOpen) {
      setTimeRemaining(30);
      
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isOpen, onClose]);
  
  if (!taskDetails) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-inherit">
        <DialogHeader>
          <DialogTitle className="text-center text-green-700 relative">
            {showSubtasksOnly ? "Upcoming Subtask" : "Reminder"}
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Clock className="h-10 w-10 text-green-600" />
            </div>
          </div>

          {/* Case TH1: Show task and subtasks when all start times match */}
          {allTimesMatch && (
            <div className="space-y-4">
              {/* Main task */}
              <div className="bg-white p-3 rounded-lg border border-green-100">
                <h3 className="font-medium text-green-800">{taskDetails.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Start at {formatTime(taskDetails.startTime)}</span>
                </div>
              </div>

              {/* Subtasks */}
              <div className="space-y-2">
                <div className="flex justify-center">
                  <ArrowDown className="h-5 w-5 text-green-600" />
                </div>
                {taskDetails.subtaskMessages.map((subtask, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border border-green-100 ml-4">
                    <h4 className="font-medium text-green-700">{subtask.title}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Start at {formatTime(subtask.startTime)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Case TH2: Show only task when no subtasks */}
          {!hasSubtasks && (
            <div className="bg-white p-4 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-800 text-center">{taskDetails.title}</h3>
              <div className="flex items-center justify-center text-sm text-gray-600 mt-2">
                <Clock className="h-4 w-4 mr-1" />
                <span>Start at {formatTime(taskDetails.startTime)}</span>
              </div>
            </div>
          )}

          {/* Case TH3: Show only subtasks with earlier start times */}
          {showSubtasksOnly && (
            <div className="space-y-3">
              {orderedSubtasks.filter(subtask => 
                new Date(subtask.startTime) < new Date(taskDetails.startTime)
              ).map((subtask, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-green-100">
                  <h3 className="font-medium text-green-700">{subtask.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Start at {formatTime(subtask.startTime)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Case with subtasks but not falling into TH1 or TH3 */}
          {hasSubtasks && !allTimesMatch && !showSubtasksOnly && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-green-100">
                <h3 className="font-medium text-green-800">{taskDetails.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Start at {formatTime(taskDetails.startTime)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                {orderedSubtasks.map((subtask, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border border-green-100 ml-4">
                    <h4 className="font-medium text-green-700">{subtask.title}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Start at {formatTime(subtask.startTime)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-2">
              {timeRemaining}s
        </div>
      </DialogContent>
    </Dialog>
  );
}