import { ReminderNotificationManager } from "../components/Notification/ReminderNotificationManager";
import { NotificationErrorBoundary } from "../components/Notification/NotificationErrorBoundary";
export default function ReminderPage() {
    return (
      <NotificationErrorBoundary>
        <ReminderNotificationManager />
        Rest of your page content
      </NotificationErrorBoundary>
    );
  }