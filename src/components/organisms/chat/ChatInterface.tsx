"use client";

import { useEffect, useRef, useMemo } from "react";
import ChatHeader from "@/components/molecules/ChatHeader";
import ChatMessage from "@/components/molecules/ChatMessage";
import MessageInput from "@/components/molecules/MessageInput";
import DateSeparator from "@/components/atoms/DateSeparator";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Conversation from "@/models/conversation";
import { ApiResponse } from "@/dto/apiResponse.dto";
import { LoaderCircle, MessageSquare } from "lucide-react";
import ChatHeaderSkeleton from "@/components/atoms/skeleton/ChatHeaderSkeleton";
import { isSameDay } from "@/utils/helpers";
import Message from "@/models/message";
import { useChatSocketContext } from "@/contexts/ChatSocketContext";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await response.json();
  return data;
};

interface ChatInterfaceProps {
  otherUserId: string;
}

export default function ChatInterface({ otherUserId }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  const {
    data,
    isLoading,
    error,
    mutate,
  } = useSWR<ApiResponse<Conversation>>(
    `/api/chat/conversation/${otherUserId}`,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  );
  const conversation = data?.data;
  const fetchedMessages = conversation?.messages || [];

  const {
    messages: socketMessages,
    sendMessage,
    markSeen,
    isConnected,
  } = useChatSocketContext();

  const messages = useMemo(() => {
    const allMessages = [...fetchedMessages];
    
    socketMessages.forEach((socketMsg) => {
      const exists = allMessages.some((msg) => msg.id === socketMsg.id);
      if (!exists) {
        allMessages.push(socketMsg);
      } else {
        const index = allMessages.findIndex((msg) => msg.id === socketMsg.id);
        if (index !== -1) {
          allMessages[index] = socketMsg;
        }
      }
    });

    return allMessages.sort((a, b) => {
      const dateA = a.created_at instanceof Date 
        ? a.created_at 
        : new Date(a.created_at);
      const dateB = b.created_at instanceof Date 
        ? b.created_at 
        : new Date(b.created_at);
      return dateA.getTime() - dateB.getTime();
    });
  }, [fetchedMessages, socketMessages]);

  const userName = useMemo(() => {
    if (!conversation || !currentUserId) return "User";
    
    const otherUser = conversation.user1?.id === currentUserId 
      ? conversation.user2 
      : conversation.user1;
    
    if (!otherUser) return "User";
    
    return otherUser.first_name && otherUser.last_name
      ? `${otherUser.first_name} ${otherUser.last_name}`
      : otherUser.username || "User";
  }, [conversation, currentUserId]);

  const groupedMessages = useMemo(() => {
    if (!messages || messages.length === 0) return [];
    
    const groups: { date: Date; messages: Message[] }[] = [];
    let currentGroup: { date: Date; messages: Message[] } | null = null;
    
    messages.forEach((message) => {
      const messageDate = message.created_at instanceof Date 
        ? message.created_at 
        : new Date(message.created_at);
      
      if (!currentGroup || !isSameDay(currentGroup.date, messageDate)) {
        currentGroup = {
          date: messageDate,
          messages: [message],
        };
        groups.push(currentGroup);
      } else {
        currentGroup.messages.push(message);
      }
    });
    
    return groups;
  }, [messages]);

  const scrollToBottom = (smooth: boolean = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
    });
  };

  useEffect(() => {
    if (messages?.length && messages?.length > 0) {
      scrollToBottom(false);
    }
  }, [messages?.length]);

  useEffect(() => {
    if (messages?.length && messages?.length > 0) {
      scrollToBottom(true);
    }
  }, [messages?.[messages?.length - 1]?.id]);

  // Mark messages as seen when viewing (only when new unread messages arrive)
  const lastMessageIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (conversation?.id && isConnected && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const lastMessageId = lastMessage?.id;
      
      if (lastMessageId && lastMessageId !== lastMessageIdRef.current) {
        const hasUnreadMessages = messages.some(
          (msg) => !msg.is_seen && msg.sender.id !== currentUserId
        );
        if (hasUnreadMessages && lastMessage.sender.id !== currentUserId) {
          markSeen(conversation.id);
          lastMessageIdRef.current = lastMessageId;
        }
      }
    }
  }, [conversation?.id, isConnected, messages, currentUserId, markSeen]);

  // Revalidate conversation when new socket messages are received
  const lastSocketMessageIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (socketMessages.length > 0) {
      const lastSocketMessage = socketMessages[socketMessages.length - 1];
      const lastSocketMessageId = lastSocketMessage?.id;
      
      if (lastSocketMessageId && lastSocketMessageId !== lastSocketMessageIdRef.current) {
        const isNewMessage = !fetchedMessages.some((msg) => msg.id === lastSocketMessageId);
        if (isNewMessage) {
          mutate();
          lastSocketMessageIdRef.current = lastSocketMessageId;
        }
      }
    }
  }, [socketMessages, fetchedMessages, mutate]);

  const handleSendMessage = (text: string) => {
    if (!conversation?.id || !text.trim() || !isConnected) {
      return;
    }

    sendMessage(conversation.id, text.trim());
    
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden">
        <ChatHeaderSkeleton />
        <div className="flex-1 flex-center animate-spin">
          <LoaderCircle/>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden">
        <ChatHeader userName={userName} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Failed to load messages</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden">
      <ChatHeader userName={userName} />

      {groupedMessages.length === 0 ? (
        <div className="h-full flex-center flex-col gap-6 bg-white rounded-lg shadow-sm pb-30">
          <div className="flex-center w-[150px] h-[150px] rounded-full bg-secondary">
            <MessageSquare size={80} className="mx-auto text-primary" />
          </div>
          <p className="text-3xl text-center font-semibold text-primary">
            Start a new conversation
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 space-y-1 main-scrollbar">
          {messages?.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No messages yet</p>
            </div>
          ) : (
            groupedMessages.map((group, groupIndex) => (
              <div key={`group-${groupIndex}`}>
                <DateSeparator date={group.date} />
                {group.messages.map((message) => (
                  <ChatMessage key={message.id} message={message} currentUserId={currentUserId} />
                ))}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}