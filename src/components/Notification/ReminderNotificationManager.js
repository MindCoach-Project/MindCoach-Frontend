"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { ReminderForm } from "./ReminderForm";
const signalUrl = process.env.REACT_APP_SIGNALR_URL;

export function ReminderNotificationManager() {
  const [notifications, setNotifications] = useState([]);
  const connectionRef = useRef(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const establishConnection = useCallback(async () => {
    if (isConnecting || connectionRef.current) return;
    setIsConnecting(true);

    try {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(signalUrl, {
          accessTokenFactory: () => localStorage.getItem("token") || "",
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            const baseDelay = 1000;
            const maxDelay = 30000;
            const jitter = Math.random() * 1000;
            return Math.min(
              baseDelay * Math.pow(2, retryContext.previousRetryCount) + jitter,
              maxDelay
            );
          },
        })
        .build();

      // Xử lý sự kiện mất kết nối
      connection.onclose(async (error) => {
        console.error("❌ Kết nối bị đóng:", error);
        connectionRef.current = null;
        setIsConnecting(false);
        await attemptReconnection();
      });

      // Nhận thông báo từ SignalR
      connection.on("ReceiveReminder", async (notification) => {
        setNotifications((prev) => [
          ...prev,
          { ...notification, id: notification.id || `reminder-${Date.now()}` },
        ]);

      });

      // Kết nối với SignalR
      await connection.start();
      connectionRef.current = connection;
      setIsConnecting(false);
    } catch (err) {
      connectionRef.current = null;
      setIsConnecting(false);
      await attemptReconnection();
    }
  }, [isConnecting]);

  // Hàm tự động kết nối lại khi mất kết nối
  const attemptReconnection = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    if (!connectionRef.current) {
      await establishConnection();
    }
  }, [establishConnection]);

  // Kết nối SignalR khi component được mount
  useEffect(() => {
    establishConnection();
    // return () => {
    //   if (connectionRef.current) {
    //     connectionRef.current.stop().catch((err) => console.error("❌ Lỗi dừng kết nối SignalR", err));
    //   }
    // };
  }, [establishConnection]);

  // Kiểm tra trạng thái kết nối và tự động reconnect nếu cần
  useEffect(() => {
    const healthCheckInterval = setInterval(async () => {
      if (
        !connectionRef.current ||
        connectionRef.current.state !== signalR.HubConnectionState.Connected
      ) {
        await attemptReconnection();
      }
    }, 2000);

    return () => clearInterval(healthCheckInterval);
  }, [attemptReconnection]);

  const handleCloseNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  return (
    <div>
      {notifications.map((notification) => (
        <ReminderForm
          key={notification.id}
          isOpen={true}
          onClose={() => handleCloseNotification(notification.id)}
          taskDetails={notification}
        />
      ))}
    </div>
  );
}
