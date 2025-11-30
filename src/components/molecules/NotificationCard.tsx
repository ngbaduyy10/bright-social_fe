"use client";

import Image from "next/image";
import { notificationIcons, notificationColors } from "@/utils/constant";
import { NotificationType } from "@/types";
import { useRouter } from "next/navigation";
import Notification from "@/models/notification";
import DefaultAvatar from "@/static/icons/default_avatar.png";
import { getTimeAgo } from "@/utils/helpers";

const getNotificationMessage = (type: NotificationType): string => {
  switch (type) {
    case NotificationType.ADD_FRIEND:
      return "has added you as a friend";
    case NotificationType.ACCEPT_FRIEND:
      return "has accepted your friend request";
    case NotificationType.LIKE:
      return "has liked your post";
    case NotificationType.SHARE:
      return "has shared your post";
    case NotificationType.COMMENT:
      return "has commented on your post";
    default:
      return "";
  }
};

interface NotificationCardProps {
  notification: Notification;
  isPage?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function NotificationCard({ 
  notification,
  isPage = false,
  setOpen,
}: NotificationCardProps) {
  const router = useRouter();
  const IconComponent = notificationIcons[notification.type];
  const bgColor = notificationColors[notification.type];

  const handleClick = () => {
    setOpen?.(false);
    if (
      notification.type === NotificationType.ADD_FRIEND ||
      notification.type === NotificationType.ACCEPT_FRIEND
    ) {
      router.push(`/profile/${notification.actor.username}`);
    } else if (
      notification.type === NotificationType.LIKE ||
      notification.type === NotificationType.SHARE ||
      notification.type === NotificationType.COMMENT
    ) {
      router.push(`/post/${notification.post?.id}`);
    }
  };

  return (
    <div className={`rounded-lg flex-between gap-2 transition-colors cursor-pointer my-1 ${isPage ? "px-4 py-3" : "p-3"} ${notification.is_seen ? "bg-white hover:bg-gray-100" : "bg-secondary"}`} onClick={handleClick}>
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <div className={`rounded-full bg-white flex-center overflow-hidden relative ${isPage ? "w-12 h-12" : "w-10 h-10"}`}>
            <Image
              src={notification.actor.image || DefaultAvatar.src}
              alt={notification.actor.username}
              fill
              className="object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-[22px] h-[22px] rounded-full ${bgColor} flex-center`}>
            <IconComponent className="w-2 h-2 text-black" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className={`font-bold ${isPage ? "text-md leading-5 line-clamp-2" : "text-sm leading-4 line-clamp-3"}`}>
            {notification.actor.first_name} {notification.actor.last_name} 
            <span className="font-normal ml-1">{getNotificationMessage(notification.type)}</span> 
            {notification.content && <span className="font-normal"> : "{notification.content}"</span>}
          </p>
          <p className={`text-muted-foreground mt-1 ${isPage ? "text-sm" : "text-xs"}`}>
            {getTimeAgo(notification.created_at)}
          </p>
        </div>
      </div>
      {!notification.is_seen && (
        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
      )}
    </div>
  );
}