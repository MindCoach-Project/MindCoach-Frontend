"use client"

import { useState, useEffect, useRef } from "react"

export default function TimePicker({ initialHour = "09", initialMinute = "00", onTimeChange, lightMode = false }) {
  // Create arrays for hours and minutes
  const hoursBase = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutesBase = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

  // Create circular arrays by adding values at the beginning and end
  // For hours: add last few hours at beginning and first few hours at end
  const hours = [...hoursBase.slice(-3), ...hoursBase, ...hoursBase.slice(0, 3)]
  // For minutes: add last few minutes at beginning and first few minutes at end
  const minutes = [...minutesBase.slice(-3), ...minutesBase, ...minutesBase.slice(0, 3)]

  const [selectedHour, setSelectedHour] = useState(initialHour)
  const [selectedMinute, setSelectedMinute] = useState(initialMinute)

  const hourRef = useRef(null)
  const minuteRef = useRef(null)
  const itemHeight = 50
  const paddingItems = 3 // Number of items added as padding on each side

  // Add extra space at top and bottom to allow centering
  const paddingHeight = 120

  useEffect(() => {
    // Initial scroll to the selected values (offset by padding)
    const hourIndex = hoursBase.indexOf(selectedHour) + paddingItems
    const minuteIndex = minutesBase.indexOf(selectedMinute) + paddingItems

    if (hourIndex !== -1 && hourRef.current) {
      hourRef.current.scrollTop = hourIndex * itemHeight
    }

    if (minuteIndex !== -1 && minuteRef.current) {
      minuteRef.current.scrollTop = minuteIndex * itemHeight
    }
  }, [])

  const handleHourScroll = () => {
    if (hourRef.current) {
      // Calculate which hour is centered in the view
      const scrollTop = hourRef.current.scrollTop
      const index = Math.round(scrollTop / itemHeight)

      // Get the actual hour value (accounting for padding)
      const actualIndex = (index - paddingItems + hoursBase.length) % hoursBase.length
      const newHour = hoursBase[actualIndex]

      if (newHour !== selectedHour) {
        setSelectedHour(newHour)
        if (onTimeChange) {
          onTimeChange(newHour, selectedMinute)
        }
      }
    }
  }

  const handleMinuteScroll = () => {
    if (minuteRef.current) {
      // Calculate which minute is centered in the view
      const scrollTop = minuteRef.current.scrollTop
      const index = Math.round(scrollTop / itemHeight)

      // Get the actual minute value (accounting for padding)
      const actualIndex = (index - paddingItems + minutesBase.length) % minutesBase.length
      const newMinute = minutesBase[actualIndex]

      if (newMinute !== selectedMinute) {
        setSelectedMinute(newMinute)
        if (onTimeChange) {
          onTimeChange(selectedHour, newMinute)
        }
      }
    }
  }

  // Define text colors based on lightMode prop
  const textColor = lightMode ? "text-gray-800" : "text-white"
  const inactiveTextColor = lightMode ? "text-gray-400" : "text-gray-300"

  return (
    <div className="relative flex items-center space-x-2 mt-6">
      {/* Hour selector */}
      <div className="relative w-20 h-40 overflow-hidden flex justify-center">
        {/* Highlight for selected item */}
        <div className="absolute w-full h-[50px] top-1/2 -translate-y-1/2 bg-white/10 rounded-md pointer-events-none"></div>

        <div
          ref={hourRef}
          className="h-full overflow-y-scroll scrollbar-hide text-center snap-y snap-mandatory"
          onScroll={handleHourScroll}
          style={{
            msOverflowStyle: "none" /* IE and Edge */,
            scrollbarWidth: "none" /* Firefox */,
          }}
        >
          <div className="h-[120px]"></div> {/* Top padding for centering */}
          <div className="flex flex-col items-center">
            {hours.map((hour, index) => (
              <div
                key={index}
                className={`transition-all text-2xl py-2 snap-center ${
                  hour === selectedHour ? `${textColor} font-bold text-3xl` : inactiveTextColor
                }`}
                style={{ height: itemHeight }}
              >
                {hour}
              </div>
            ))}
          </div>
          <div className="h-[120px]"></div> {/* Bottom padding for centering */}
        </div>
      </div>

      <span className={`${textColor} text-3xl font-bold flex items-center`}>:</span>

      {/* Minute selector */}
      <div className="relative w-20 h-40 overflow-hidden flex justify-center">
        {/* Highlight for selected item */}
        <div className="absolute w-full h-[50px] top-1/2 -translate-y-1/2 bg-white/10 rounded-md pointer-events-none"></div>

        <div
          ref={minuteRef}
          className="h-full overflow-y-scroll scrollbar-hide text-center snap-y snap-mandatory"
          onScroll={handleMinuteScroll}
          style={{
            msOverflowStyle: "none" /* IE and Edge */,
            scrollbarWidth: "none" /* Firefox */,
          }}
        >
          <div className="h-[120px]"></div> {/* Top padding for centering */}
          <div className="flex flex-col items-center">
            {minutes.map((minute, index) => (
              <div
                key={index}
                className={`transition-all text-2xl py-2 snap-center ${
                  minute === selectedMinute ? `${textColor} font-bold text-3xl` : inactiveTextColor
                }`}
                style={{ height: itemHeight }}
              >
                {minute}
              </div>
            ))}
          </div>
          <div className="h-[120px]"></div> {/* Bottom padding for centering */}
        </div>
      </div>
    </div>
  )
}

