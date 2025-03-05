"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { TaskCompletionNotification } from "../Task/TaskCompletionNotification";
export function ReminderNotificationManager() {
  // State to manage notification visibility and content
  const [notifications, setNotifications] = useState([]);
  const connectionRef = useRef(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Callback to close a specific notification
  const handleCloseNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  // Robust connection establishment function
  const establishConnection = useCallback(async () => {
    // Prevent multiple connection attempts
    if (isConnecting || connectionRef.current) return;

    setIsConnecting(true);

    try {
      // Create SignalR connection (check alw)
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5001/reminderHub", {
          accessTokenFactory: () => {
            return localStorage.getItem("token") || "";
          },
          // headers: {
          //   "X-Reminder-Offset": localStorage.getItem("reminderOffset") || "30",
          // },
          // Add skipNegotiation and transport to improve connection reliability
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            // Exponential backoff with jitter
            const baseDelay = 1000; // 1 second
            const maxDelay = 30000; // 30 seconds
            const jitter = Math.random() * 1000; // Random jitter up to 1 second

            return Math.min(
              baseDelay * Math.pow(2, retryContext.previousRetryCount) + jitter,
              maxDelay
            );
          },
        })
        .build();

      // Setup event listeners for connection state
      connection.onclose(async (error) => {
        console.error("Connection closed:", error);
        connectionRef.current = null;
        setIsConnecting(false);

        // Attempt to reconnect
        await attemptReconnection();
      });

      // Set up event listener for reminders
      connection.on("ReceiveReminder", (notification) => {
        console.log("📩 Received notification:", notification);

        // Add new notification to the list
        setNotifications((prev) => [
          ...prev,
          {
            ...notification,
            id: notification.id || `reminder-${Date.now()}`,
          },
        ]);
      });

      // Start the connection
      await connection.start();

      console.log("✅ Connected to SignalR Reminder Hub");
      connectionRef.current = connection;
      setIsConnecting(false);
    } catch (err) {
      console.error("❌ Connection error:", err);
      connectionRef.current = null;
      setIsConnecting(false);

      // Attempt to reconnect
      await attemptReconnection();
    }
  }, [isConnecting]);

  // Reconnection attempt function
  const attemptReconnection = useCallback(async () => {
    // Wait a bit before attempting to reconnect
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Attempt to establish connection again
    await establishConnection();
  }, [establishConnection]);

  // Initial connection and cleanup
  useEffect(() => {
    // Establish initial connection
    establishConnection();

    // Cleanup function
    // return () => {
    //   if (connectionRef.current) {
    //     connectionRef.current.stop()
    //       .then(() => console.log("SignalR connection stopped"))
    //       .catch(err => console.error("Error stopping connection", err));
    //   }
    // };
  }, [establishConnection]);

  // Periodic health check
  useEffect(() => {
    const healthCheckInterval = setInterval(async () => {
      if (
        !connectionRef.current ||
        connectionRef.current.state !== signalR.HubConnectionState.Connected
      ) {
        console.log("Performing health check and reconnecting...");
        await attemptReconnection();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(healthCheckInterval);
  }, [attemptReconnection]);

  return (
    <div>
      {notifications.map((notification) => (
        <TaskCompletionNotification
          key={notification.id}
          isOpen={true}
          onClose={() => handleCloseNotification(notification.id)}
          taskDetails={notification}
        />
      ))}

      {/* Optional: Connection status indicator */}
      {isConnecting && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 text-yellow-800 p-2 rounded">
          Connecting to notifications...
        </div>
      )}
    </div>
  );
}
