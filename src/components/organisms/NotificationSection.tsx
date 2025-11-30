"use client";

import Notification from "@/models/notification";
import NotificationCard from "../molecules/NotificationCard";
import { Bell } from "lucide-react";
import { useInfiniteData } from "@/hooks/useInfiniteData";
import { notificationLimit } from "@/utils/constant";
import NotificationCardSkeleton from "../atoms/skeleton/NotificationCardSkeleton";

interface NotificationSectionProps {
  initialNotifications: Notification[];
  isPage?: boolean;
  setOpen?: (open: boolean) => void;
  isLoading?: boolean;
}

export default function NotificationSection({ initialNotifications, isPage = false, setOpen, isLoading = false }: NotificationSectionProps) {
  const infiniteData = useInfiniteData<Notification>({
    initialData: initialNotifications,
    limit: notificationLimit,
    endpoint: "/notification",
  });

  const notifications = isPage ? infiniteData.items : initialNotifications;
  const isLoadingMore = isPage ? infiniteData.isLoadingMore : false;
  const isReachingEnd = isPage ? infiniteData.isReachingEnd : false;
  const loadMoreRef = isPage ? infiniteData.loadMoreRef : null;

  if (isLoading) {
    return (
      <>
        <NotificationCardSkeleton isPage={isPage} />
        <NotificationCardSkeleton isPage={isPage} />
        <NotificationCardSkeleton isPage={isPage} />
        <NotificationCardSkeleton isPage={isPage} />
        <NotificationCardSkeleton isPage={isPage} />
      </>
    );
  }

  if (notifications.length === 0 && !isLoadingMore) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No notifications yet</p>
      </div>
    );
  }

  return (
    <>
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} isPage={isPage} setOpen={setOpen} />
      ))}
      {isPage && (
        <div ref={loadMoreRef}>
          {isLoadingMore && (
            <NotificationCardSkeleton isPage={isPage} />
          )}
          {isReachingEnd && notifications.length > 0 && (
            <div className="text-center py-4 text-muted-foreground">
              <p className="text-sm">No more notifications</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}