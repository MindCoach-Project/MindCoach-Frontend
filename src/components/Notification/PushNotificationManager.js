"use client"

import { useEffect } from "react"
import { Capacitor } from "@capacitor/core"
import { LocalNotifications } from "@capacitor/local-notifications"

const PushNotificationManager = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      if (Capacitor.isNativePlatform()) {
        const permissionStatus = await LocalNotifications.requestPermissions()
        if (permissionStatus.display === "granted") {
          console.log("Notification permissions granted")
        } else {
          console.log("Notification permissions denied")
        }
      }
    }

    setupNotifications()
  }, [])

  return null // This component doesn't render anything
}

export const scheduleLocalNotification = async (id, title, body, scheduleTime) => {
  if (Capacitor.isNativePlatform()) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: id,
            title: title,
            body: body,
            schedule: { at: new Date(scheduleTime) },
            sound: null,
            attachments: null,
            actionTypeId: "",
            extra: null,
          },
        ],
      })
      console.log("Notification scheduled successfully for:", new Date(scheduleTime))
    } catch (error) {
      console.error("Error scheduling notification:", error)
    }
  } else {
    console.log("Notifications are only available on native platforms")
  }
}

export default PushNotificationManager

