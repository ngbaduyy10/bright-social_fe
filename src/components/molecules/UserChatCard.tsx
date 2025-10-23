"use client";

import UserAvatar from "../atoms/UserAvatar";
import { ChatItem } from "../organisms/chat/ChatSidebar";
import { useRouter } from "next/navigation";

interface UserChatCardProps {
  chat: ChatItem;
  isActive: boolean;
}

export default function UserChatCard({ chat, isActive }: UserChatCardProps) {
  const router = useRouter();

  return (
    <div
      key={chat.id}
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${isActive ? "bg-secondary" : "hover:bg-gray-100"}`}
      onClick={() => router.push(`/messages/${chat.id}`)}
    >
      <div className="flex-shrink-0 mr-[10px]">
        <UserAvatar className="w-10 h-10" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={`text-sm truncate ${chat.isRead && "font-bold"}`}>
            {chat.name}
          </p>
          <span className="text-xs text-gray-500 flex-shrink-0">{chat.timestamp}</span>
        </div>
        <div className="flex-between gap-1">
          <p className={`text-[13px] truncate ${chat.isRead ? "text-black font-semibold" : "text-gray-500"}`}>
            {chat.lastMessage}
          </p>
          {chat.isRead && (
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
          )}
        </div>
      </div>
    </div>
  );
}