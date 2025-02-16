"use client"

import { useEffect } from "react"
import { PushNotifications } from "@capacitor/push-notifications"
import { LocalNotifications } from "@capacitor/local-notifications"

const PushNotificationManager = () => {
  useEffect(() => {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === "granted") {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register()
      } else {
        // Show some error
      }
    })

    // On success, we should be able to receive notifications
    PushNotifications.addListener("registration", (token) => {
      console.log("Push registration success, token: " + token.value)
      // Send this token to your server for sending push notifications
    })

    // Some issue with our setup and push will not work
    PushNotifications.addListener("registrationError", (error) => {
      alert("Error on registration: " + JSON.stringify(error))
    })

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener("pushNotificationReceived", (notification) => {
      console.log("Push received: " + JSON.stringify(notification))
      // You can handle the notification here, e.g., update UI, show an alert, etc.
    })

    // Method called when tapping on a notification
    PushNotifications.addListener("pushNotificationActionPerformed", (notification) => {
      console.log("Push action performed: " + JSON.stringify(notification))
      // You can handle the notification action here, e.g., navigate to a specific screen
    })

    // Initialize Local Notifications
    LocalNotifications.requestPermissions()
  }, [])

  return null // This component doesn't render anything
}

export const scheduleLocalNotification = async (id, title, body, scheduleTime) => {
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
}

export const cancelLocalNotification = async (id) => {
  await LocalNotifications.cancel({ notifications: [{ id: id }] })
}

export default PushNotificationManager

