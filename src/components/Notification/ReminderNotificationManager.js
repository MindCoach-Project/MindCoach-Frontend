"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { PushNotifications } from "@capacitor/push-notifications";
import { isPlatform } from "@ionic/react";
import { TaskCompletionNotification } from "../Task/TaskCompletionNotification";
export function ReminderNotificationManager() {
  const [notifications, setNotifications] = useState([]);
  const connectionRef = useRef(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Đăng ký Push Notification trên Mobile
  useEffect(() => {
    if (isPlatform("capacitor")) {
      registerPushNotifications();
    }
  }, []);

  const registerPushNotifications = async () => {
    try {
      let permStatus = await PushNotifications.requestPermissions();
      if (permStatus.receive === "granted") {
        await PushNotifications.register();

        PushNotifications.addListener("registration", (token) => {
          console.log("Push registration success, token: ", token.value);
        });

        PushNotifications.addListener("registrationError", (error) => {
          console.error("Push registration error: ", error);
        });

        PushNotifications.addListener(
          "pushNotificationReceived",
          (notification) => {
            console.log("Push received: ", notification);
            setNotifications((prev) => [
              ...prev,
              { id: notification.id, body: notification.body },
            ]);
          }
        );

        PushNotifications.addListener(
          "pushNotificationActionPerformed",
          (notification) => {
            console.log("Notification action performed", notification);
          }
        );
      } else {
        console.warn("Push notification permission denied");
      }
    } catch (error) {
      console.error("Error registering push notifications", error);
    }
  };

  // Hàm thiết lập kết nối SignalR tren web
  // Robust connection establishment function
  const establishConnection = useCallback(async () => {
    if (isConnecting || connectionRef.current) return;
    setIsConnecting(true);

    try {
      // Create SignalR connection (check alw)
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5001/reminderHub", {
          accessTokenFactory: () => {
            return localStorage.getItem("token") || "";
          },
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
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
    await new Promise((resolve) => setTimeout(resolve, 5000));
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
    }, 30000);

    return () => clearInterval(healthCheckInterval);
  }, [attemptReconnection]);

  const handleCloseNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  console.log("notifications", notifications);
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
    </div>
  );
}
