"use client";

import UserAvatar from "../atoms/UserAvatar";
import { useRouter } from "next/navigation";
import Conversation from "@/models/conversation";
import { formatMessageTimestamp } from "@/utils/helpers";

interface UserChatCardProps {
  conversation: Conversation;
  isActive: boolean;
  currentUserId?: string;
  onClick?: (conversation: Conversation) => void;
}

export default function UserChatCard({ conversation, isActive, currentUserId, onClick }: UserChatCardProps) {
  const router = useRouter();

  const otherUser =
    conversation.user1?.id === currentUserId ? conversation.user2 : conversation.user1;

  const fullName =
    otherUser?.first_name && otherUser?.last_name
      ? `${otherUser.first_name} ${otherUser.last_name}`
      : otherUser?.username || "Unknown User";

  const lastMessage = conversation.last_message;
  const isUnread = lastMessage ? (!lastMessage.is_seen && lastMessage.sender?.id !== currentUserId) : false;

  const handleClick = () => {
    if (onClick) {
      onClick(conversation);
    } else {
      router.push(`/messages/${otherUser?.id}`);
    }
  };

  return (
    <div
      key={conversation.id}
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
        isActive ? "bg-secondary" : "hover:bg-gray-100"
      }`}
      onClick={handleClick}
    >
      <div className="flex-shrink-0 mr-[10px]">
        <UserAvatar image={otherUser?.image} className="w-10 h-10" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p
            className={`text-sm truncate ${
              isUnread ? "font-bold" : ""
            }`}
          >
            {fullName}
          </p>
          <span className="text-xs text-gray-500 flex-shrink-0">
            {formatMessageTimestamp(lastMessage?.created_at)}
          </span>
        </div>
        <div className="flex-between gap-1">
          <p
            className={`text-[13px] truncate ${
              isUnread ? "text-black font-semibold" : "text-gray-500"
            }`}
          >
            {lastMessage?.sender?.id === currentUserId ? "You: " : ""}{lastMessage?.content || ""}
          </p>
          {isUnread && (
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
          )}
        </div>
      </div>
    </div>
  );
}