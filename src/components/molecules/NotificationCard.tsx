"use client";

import Image from "next/image";
import { notificationIcons, notificationColors } from "@/utils/constant";
import { NotificationType } from "@/types";
import { useRouter } from "next/navigation";

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
  notification: {
    id: number;
    type: NotificationType;
    actor: {
      name: string;
      avatar: string;
    };
    content?: string;
  };
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
    router.push(`/post/9f372a16-00ea-4418-896a-f9c5a07f31c3`);
    setOpen?.(false);
  };

  return (
    <div className={`bg-white rounded-lg flex items-center gap-3 hover:bg-gray-100 transition-colors cursor-pointer ${isPage ? "p-4" : "px-2 py-3"}`} onClick={handleClick}>
      <div className="relative flex-shrink-0">
        <div className={`rounded-full bg-white flex-center overflow-hidden relative ${isPage ? "w-12 h-12" : "w-10 h-10"}`}>
          <Image
            src={notification.actor.avatar}
            alt={notification.actor.name}
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
          {notification.actor.name} 
          <span className="font-normal ml-1">{getNotificationMessage(notification.type)}</span> 
          {notification.content && <span className="font-normal"> : "{notification.content}"</span>}
        </p>
        <p className={`text-muted-foreground mt-1 ${isPage ? "text-sm" : "text-xs"}`}>
          3 days ago
        </p>
      </div>
    </div>
  );
}