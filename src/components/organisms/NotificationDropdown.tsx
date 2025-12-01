"use client";

import { Bell, MoveRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import NotificationSection from "./NotificationSection";
import Notification from "@/models/notification";
import { ApiResponse } from "@/dto/apiResponse.dto";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";
import { useNotificationSocketContext } from "@/contexts/NotificationSocketContext";
import { toast } from "sonner";
import { NotificationType } from "@/types";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function NotificationDropdown() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [initialNotifications, setInitialNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: unseenCountData } = useSWR<ApiResponse<{ unseen_count: number }>>(
    "/api/notification/unseen",
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  );


  const [unseenCount, setUnseenCount] = useState<number>(unseenCountData?.data?.unseen_count ?? 0);

  useEffect(() => {
    if (unseenCountData?.data?.unseen_count !== undefined) {
      setUnseenCount(unseenCountData.data.unseen_count);
    }
  }, [unseenCountData?.data?.unseen_count]);

  const { notifications: socketNotifications, markNotificationSeen: socketMarkNotificationSeen, markAllSeen: socketMarkAllSeen } = useNotificationSocketContext();
  const processedNotificationIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (socketNotifications.length > 0) {
      const latestNotification = socketNotifications[0];
      
      if (latestNotification.id && !processedNotificationIds.current.has(latestNotification.id)) {
        processedNotificationIds.current.add(latestNotification.id);
        
        setUnseenCount((prev) => prev + 1);
        
        mutate(
          "/api/notification/unseen",
          async (currentData: ApiResponse<{ unseen_count: number }> | undefined) => {
            if (currentData?.data) {
              return {
                ...currentData,
                data: {
                  unseen_count: currentData.data.unseen_count + 1,
                },
              };
            }
            return currentData;
          },
          false
        );

        if (open) {
          setInitialNotifications((prev) => {
            const exists = prev.some((notification) => notification.id === latestNotification.id);
            if (!exists) {
              return [latestNotification, ...prev];
            }
            return prev;
          });
        }

        if (latestNotification.type === NotificationType.LIKE) {
          toast.info(`${latestNotification.actor?.first_name} ${latestNotification.actor?.last_name} liked your post`);
        } else if (latestNotification.type === NotificationType.COMMENT) {
          toast.info(`${latestNotification.actor?.first_name} ${latestNotification.actor?.last_name} commented on your post`);
        } else if (latestNotification.type === NotificationType.ADD_FRIEND) {
          const actorName = `${latestNotification.actor?.first_name || ''} ${latestNotification.actor?.last_name || ''}`.trim() || latestNotification.actor?.username || 'Someone';
          toast.info(`${actorName} sent you a friend request`);
        } else if (latestNotification.type === NotificationType.ACCEPT_FRIEND) {
          const actorName = `${latestNotification.actor?.first_name || ''} ${latestNotification.actor?.last_name || ''}`.trim() || latestNotification.actor?.username || 'Someone';
          toast.success(`${actorName} accepted your friend request`);
        }
      }
    }
  }, [socketNotifications, open]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/notification?page=1&limit=5");
        const data: ApiResponse<Notification[]> = await response.json();
        if (data.data) {
          setInitialNotifications(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (open) {
      fetchNotifications();
    }
  }, [open]);

  const handleViewAll = () => {
    setOpen(false);
    router.push("/notifications");
  };

  const handleMarkNotificationSeen = (notificationId: string) => {
    socketMarkNotificationSeen(notificationId);

    setInitialNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, is_seen: true, seen_at: new Date() }
          : notification
      )
    );

    setUnseenCount((prev) => Math.max(0, prev - 1));

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
  };

  const handleMarkAllAsRead = () => {
    socketMarkAllSeen();

    setInitialNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        is_seen: true,
        seen_at: new Date(),
      }))
    );

    setUnseenCount(0);

    mutate(
      "/api/notification/unseen",
      async (currentData: ApiResponse<{ unseen_count: number }> | undefined) => {
        if (currentData) {
          return {
            ...currentData,
            data: {
              unseen_count: 0,
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
                data: page.data.map((notification: Notification) => ({
                  ...notification,
                  is_seen: true,
                  seen_at: new Date(),
                })),
              };
            }
            return page;
          });
        }
        
        if (currentData?.data && Array.isArray(currentData.data)) {
          return {
            ...currentData,
            data: currentData.data.map((notification: Notification) => ({
              ...notification,
              is_seen: true,
              seen_at: new Date(),
            })),
          };
        }
        
        return currentData;
      },
      false
    );
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-white hover:bg-white p-0! relative focus-visible:ring-0">
          <Bell className="w-[26px]! h-[26px]! text-black" />
          {unseenCount > 0 && (
            <span className="absolute top-0 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex-center">
              {unseenCount > 9 ? "9+" : unseenCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-90 border-gray-200">
        <div className="p-2 border-b border-gray-200">
          <p className="font-semibold text-md">Notifications</p>
        </div>
        <div className="py-1">
          <NotificationSection 
            initialNotifications={initialNotifications} 
            setOpen={setOpen} 
            isLoading={isLoading}
            markNotificationSeen={handleMarkNotificationSeen}
          />
          <div className="flex items-center justify-between border-t border-gray-200 pt-2 px-2">
            <p 
              className="text-sm text-muted-foreground cursor-pointer hover:text-primary"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </p>
            <p
              className="text-sm text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-primary"
              onClick={handleViewAll}
            >
              View All
              <MoveRight size={18} />
            </p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}