import { format } from "date-fns"
import { PushNotificationManager } from "../components/Notification"

export const scheduleNotification = (event) => {
  const { id, title, start } = event
  const notificationTime = new Date(start.getTime() - 2 * 60000) // 10 minutes before start time

  const notificationTitle = "Upcoming Task"
  const notificationBody = `${title} starts in 10 minutes (at ${format(start, "HH:mm")})`

  PushNotificationManager(id, notificationTitle, notificationBody, notificationTime)
}

