"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react"

// Create a context for toast management
const ToastContext = createContext()

// Toast component that follows your template
const Toast = ({ type = "success", message, duration = 3000, bottomOffset = 10 }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  // Get the appropriate background color based on toast type
  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      case "warning":
        return "bg-yellow-500"
      case "info":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 p-3 rounded-lg shadow-lg text-white transition-opacity duration-300 flex items-center ${getBgColor()}`}
      style={{
        bottom: `${bottomOffset}px`,
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  )
}

// Toast Provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (type, message, duration = 3000) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, type, message, duration }])

    // Remove toast after it's done
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, duration + 300) // Add a little extra time for animation
  }

  // Helper functions for different toast types
  const showToast = {
    success: (message, duration) => addToast("success", message, duration),
    error: (message, duration) => addToast("error", message, duration),
    warning: (message, duration) => addToast("warning", message, duration),
    info: (message, duration) => addToast("info", message, duration),
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            duration={toast.duration}
            bottomOffset={10 + toasts.indexOf(toast) * 60} // Stack toasts vertically
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Hook to use the toast
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context.showToast
}

// For backward compatibility with direct imports
export const showToast = {
  success: (message, duration) => {
    const toast = document.createElement("div")
    toast.className = `fixed left-1/2 transform -translate-x1/2 p-3 rounded-lg shadow-lg text-white bg-green-500 flex items-center`
    toast.style.bottom = "10px"
    toast.style.zIndex = "9999"
    toast.style.transform = "translateX(-50%)"


    const text = document.createTextNode(message)

    toast.appendChild(text)
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.style.opacity = "0"
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, duration || 3000)
  },

  error: (message, duration) => {
    const toast = document.createElement("div")
    toast.className = `fixed left-1/2 transform -translate-x-1/2 p-3 rounded-lg shadow-lg text-white bg-red-500 flex items-center`
    toast.style.bottom = "10px"
    toast.style.zIndex = "9999"
    toast.style.transform = "translateX(-50%)"

    const text = document.createTextNode(message)

    toast.appendChild(text)
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.style.opacity = "0"
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, duration || 3000)
  },

  warning: (message, duration) => {
    const toast = document.createElement("div")
    toast.className = `fixed left-1/2 transform -translate-x-1/2 p-3 rounded-lg shadow-lg text-white bg-yellow-500 flex items-center`
    toast.style.bottom = "10px"
    toast.style.zIndex = "9999"
    toast.style.transform = "translateX(-50%)"

    const text = document.createTextNode(message)
    toast.appendChild(text)
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.style.opacity = "0"
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, duration || 3000)
  },

  info: (message, duration) => {
    const toast = document.createElement("div")
    toast.className = `fixed left-1/2 transform -translate-x-1/2 p-3 rounded-lg shadow-lg text-white bg-blue-500 flex items-center`
    toast.style.bottom = "10px"
    toast.style.zIndex = "9999"
    toast.style.transform = "translateX(-50%)"

    const text = document.createTextNode(message)

    toast.appendChild(text)
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.style.opacity = "0"
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, duration || 3000)
  },
}

