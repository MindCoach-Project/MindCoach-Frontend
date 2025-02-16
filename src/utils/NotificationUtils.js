import { format } from "date-fns"
import { PushNotificationManager } from "../components/Notification"

export const scheduleNotification = (event) => {
  const { id, title, start, end } = event
  const notificationTime = new Date(start.getTime() - 15 * 60000) // 15 minutes before start time

  const notificationTitle = "Upcoming Task"
  const notificationBody = `${title} starts at ${format(start, "HH:mm")} and ends at ${format(end, "HH:mm")}`

  PushNotificationManager(id, notificationTitle, notificationBody, notificationTime)
}

