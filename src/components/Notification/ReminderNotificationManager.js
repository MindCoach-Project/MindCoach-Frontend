"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { PushNotifications } from "@capacitor/push-notifications";
import { isPlatform } from "@ionic/react";
import { TaskCompletionNotification } from "../Task/TaskCompletionNotification";
import { ReminderForm } from "./ReminderForm";
const signalUrl = process.env.REACT_APP_SIGNALR_URL;
export function ReminderNotificationManager() {
  const [notifications, setNotifications] = useState([]);
  const connectionRef = useRef(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Đăng ký Push Notifications khi ứng dụng chạy trên mobile
  // useEffect(() => {
  //   if (isPlatform("capacitor")) {
  //     registerPushNotifications();
  //   }
  // }, []);

  // const registerPushNotifications = async () => {
  //   try {
  //     if (!PushNotifications) return;

  //     let permStatus = await PushNotifications.requestPermissions();
  //     if (permStatus.receive === "granted") {
  //       await PushNotifications.register();

  //       PushNotifications.addListener("registration", async (token) => {
  //         console.log("✅ Đăng ký thành công, token:", token.value);
  //         localStorage.setItem("fcmToken", token.value);
  //       });

  //       PushNotifications.addListener("pushNotificationReceived", (notification) => {
  //         console.log("📩 Nhận thông báo:", notification);
  //         setNotifications((prev) => [...prev, { id: notification.id, body: notification.body }]);
  //       });

  //       PushNotifications.addListener("pushNotificationActionPerformed", (notification) => {
  //         console.log("🛠 Hành động với thông báo:", notification);
  //       });
  //     } else {
  //       console.warn("⚠️ Quyền thông báo bị từ chối");
  //     }
  //   } catch (error) {
  //     console.error("❌ Lỗi khi đăng ký thông báo", error);
  //   }
  // };

  // Thiết lập kết nối SignalR
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

        // Gửi thông báo đến Firebase khi app bị đóng
        // await sendPushNotificationToFCM(notification.title, notification.startTime);
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
    }, 30000);

    return () => clearInterval(healthCheckInterval);
  }, [attemptReconnection]);

  // Gửi thông báo đến Firebase khi ứng dụng bị đóng
  // const sendPushNotificationToFCM = async (title, startTime) => {
  //   const fcmToken = localStorage.getItem("fcmToken");
  //   if (!fcmToken) {
  //     console.warn("⚠️ Không tìm thấy FCM token");
  //     return;
  //   }

  //   const message = {
  //     to: fcmToken,
  //     notification: {
  //       title: title,
  //       body: `Bắt đầu lúc: ${startTime}`,
  //     },
  //   };

  //   try {
  //     await fetch("https://fcm.googleapis.com/fcm/send", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "key=YOUR_SERVER_KEY", // Thay YOUR_SERVER_KEY bằng Server Key từ Firebase
  //       },
  //       body: JSON.stringify(message),
  //     });
  //     console.log("✅ Đã gửi thông báo đến Firebase");
  //   } catch (error) {
  //     console.error("❌ Lỗi gửi thông báo đến Firebase", error);
  //   }
  // };

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
