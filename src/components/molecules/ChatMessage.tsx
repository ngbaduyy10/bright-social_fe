"use client";

import UserAvatar from "../atoms/UserAvatar";
import Message from "@/models/message";
import dayjs from "dayjs";

interface ChatMessageProps {
  message: Message;
  currentUserId?: string;
}

export default function ChatMessage({ 
  message,
  currentUserId,
}: ChatMessageProps) {
  const isFromUser = message.sender?.id === currentUserId;
  
  const formatTime = () => {
    if (!message.created_at) return "";
    const date = message.created_at instanceof Date
      ? message.created_at
      : new Date(message.created_at);
    return dayjs(date).format("HH:mm");
  };

  return (
    <div className={`flex items-end gap-2 my-2 ${isFromUser ? 'justify-end' : 'justify-start'}`}>
      {!isFromUser && (
        <div className="flex-shrink-0">
          <UserAvatar image={message.sender?.image} className="w-8 h-8" />
        </div>
      )}
      
      <div className={`flex flex-col max-w-[70%] ${isFromUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2 rounded-2xl relative ${
            isFromUser
              ? 'bg-primary text-white rounded-br-none'
              : 'bg-background text-black rounded-bl-none'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1">{formatTime()}</span>
      </div>
      
      {isFromUser && (
        <div className="flex-shrink-0">
          <UserAvatar className="w-8 h-8" />
        </div>
      )}
    </div>
  );
}
