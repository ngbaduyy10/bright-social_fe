"use client";

import { useEffect, useRef } from "react";
import ChatHeader from "@/components/molecules/ChatHeader";
import ChatMessage from "@/components/molecules/ChatMessage";
import MessageInput from "@/components/molecules/MessageInput";
import { sampleMessages } from "@/utils/constant";
  
export default function ChatInterface({ userName }: { userName: string }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (smooth: boolean = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
  };

  useEffect(() => {
    scrollToBottom(false);
  }, []);

  const handleSendMessage = (text: string) => {
    console.log(text);
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden">
      <ChatHeader userName={userName} />
      
      <div className="flex-1 overflow-y-auto px-4 space-y-1 main-scrollbar">
        {sampleMessages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}