"use client";

import { useNotificationSocketContext } from "@/contexts/NotificationSocketContext";
import NotificationSection from "@/components/organisms/NotificationSection";
import Notification from "@/models/notification";
import { mutate } from "swr";
import { ApiResponse } from "@/dto/apiResponse.dto";

interface NotificationSectionClientProps {
  initialNotifications: Notification[];
}

export default function NotificationSectionClient({
  initialNotifications,
}: NotificationSectionClientProps) {
  const { markNotificationSeen: socketMarkNotificationSeen } = useNotificationSocketContext();

  const handleMarkNotificationSeen = (notificationId: string) => {
    socketMarkNotificationSeen(notificationId);

    mutate(
      "/api/notification/unseen",
      async (currentData: ApiResponse<{ unseen_count: number }> | undefined) => {
        if (currentData?.data && currentData.data.unseen_count > 0) {
          return {
            ...currentData,
            data: {
              unseen_count: currentData.data.unseen_count - 1,
            },
          };
        }
        return currentData;
      },
      false
    );

    mutate(
      (key) => typeof key === "string" && key.startsWith("/api/notification"),
      async (currentData: any) => {
        if (!currentData) return currentData;
        
        if (Array.isArray(currentData)) {
          return currentData.map((page: any) => {
            if (page?.data && Array.isArray(page.data)) {
              return {
                ...page,
                data: page.data.map((notification: Notification) =>
                  notification.id === notificationId
                    ? { ...notification, is_seen: true, seen_at: new Date() }
                    : notification
                ),
              };
            }
            return page;
          });
        }
        
        if (currentData?.data && Array.isArray(currentData.data)) {
          return {
            ...currentData,
            data: currentData.data.map((notification: Notification) =>
              notification.id === notificationId
                ? { ...notification, is_seen: true, seen_at: new Date() }
                : notification
            ),
          };
        }
        
        return currentData;
      },
      false
    );
  };

  return (
    <NotificationSection
      initialNotifications={initialNotifications}
      isPage={true}
      markNotificationSeen={handleMarkNotificationSeen}
    />
  );
}

