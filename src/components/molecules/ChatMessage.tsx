import UserAvatar from "../atoms/UserAvatar";
import { Message } from "@/types";
import dayjs from "dayjs";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ 
  message,
}: ChatMessageProps) {
  return (
    <div className={`flex items-end gap-2 my-2 ${message.isFromUser ? 'justify-end' : 'justify-start'}`}>
      {!message.isFromUser && (
        <div className="flex-shrink-0">
          <UserAvatar className="w-8 h-8" />
        </div>
      )}
      
      <div className={`flex flex-col max-w-[70%] ${message.isFromUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2 rounded-2xl relative ${
            message.isFromUser
              ? 'bg-primary text-white rounded-br-none'
              : 'bg-background text-black rounded-bl-none'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1">{dayjs(message.created_at).format("HH:mm")}</span>
      </div>
      
      {message.isFromUser && (
        <div className="flex-shrink-0">
          <UserAvatar className="w-8 h-8" />
        </div>
      )}
    </div>
  );
}
