"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import CommonButton from "@/components/atoms/CommonButton";
import SearchInput from "@/components/molecules/SearchInput";
import UserChatCard from "@/components/molecules/UserChatCard";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Conversation from "@/models/conversation";
import { ApiResponse } from "@/dto/apiResponse.dto";
import UserChatCardSkeleton from "@/components/atoms/skeleton/UserChatCardSkeleton";
import { useChatSocketContext } from "@/contexts/ChatSocketContext";
import Message from "@/models/message";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }
  const data = await response.json();
  return data;
};

export default function ChatSidebar() {
  const router = useRouter();
  const params = useParams();
  const conversationId = params.userId as string;
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  const { data, isLoading, error, mutate } = useSWR<ApiResponse<Conversation[]>>(
    "/api/chat/conversation",
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  );

  const { socket, isConnected, markSeen, messages: socketMessages } = useChatSocketContext();
  
  // Local state to track real-time conversation updates
  const [conversationUpdates, setConversationUpdates] = useState<Map<string, Partial<Conversation>>>(new Map());
  
  // Track which conversation has been marked as seen to avoid duplicate marks
  const markedConversationRef = useRef<{ conversationId: string; lastMessageId?: string } | null>(null);
  
  // Merge SWR data with socket updates
  const conversations = useMemo(() => {
    const baseConversations = data?.data || [];
    
    if (conversationUpdates.size === 0) {
      return baseConversations;
    }

    return baseConversations.map((conv) => {
      const update = conversationUpdates.get(conv.id);
      if (update) {
        return { ...conv, ...update };
      }
      return conv;
    }).sort((a, b) => {
      // Sort by last message time (most recent first)
      const timeA = a.last_message?.created_at 
        ? new Date(a.last_message.created_at).getTime()
        : new Date(a.created_at || 0).getTime();
      const timeB = b.last_message?.created_at
        ? new Date(b.last_message.created_at).getTime()
        : new Date(b.created_at || 0).getTime();
      return timeB - timeA;
    });
  }, [data?.data, conversationUpdates]);

  // Listen to socket events for real-time updates
  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleConversationUpdated = (conversation: Conversation) => {
      console.log('Conversation updated in sidebar:', conversation);
      setConversationUpdates((prev) => {
        const newMap = new Map(prev);
        const existing = newMap.get(conversation.id) || {};
        // Always use the latest last_message from conversation update
        newMap.set(conversation.id, {
          ...existing,
          ...conversation,
          last_message: conversation.last_message || existing.last_message,
        });
        return newMap;
      });
      // Revalidate SWR to sync with server and get any new conversations
      mutate();
    };

    const handleMessageReceived = (message: Message) => {
      console.log('Message received in sidebar:', message);
      const senderId = message.sender?.id;
      if (!senderId || !currentUserId) return;

      setConversationUpdates((prev) => {
        const newMap = new Map(prev);
        const baseConversations = data?.data || [];
        
        // Priority 1: If viewing a conversation, check that one first
        let targetConversation: Conversation | undefined;
        
        if (conversationId) {
          targetConversation = baseConversations.find((conv) => {
            const otherUserId = conv.user1?.id === currentUserId 
              ? conv.user2?.id 
              : conv.user1?.id;
            return otherUserId === conversationId;
          });
        }
        
        // Priority 2: Find by sender and current user
        if (!targetConversation) {
          targetConversation = baseConversations.find((conv) => {
            const user1Id = conv.user1?.id;
            const user2Id = conv.user2?.id;
            return (
              (user1Id === senderId && user2Id === currentUserId) ||
              (user2Id === senderId && user1Id === currentUserId)
            );
          });
        }

        if (targetConversation) {
          const existing = newMap.get(targetConversation.id) || {};
          newMap.set(targetConversation.id, {
            ...existing,
            last_message: message,
          });
        }
        
        return newMap;
      });
    };

    const handleMessageSeen = (conversation: Conversation) => {
      console.log('Message seen in sidebar:', conversation);
      if (conversation.last_message) {
        setConversationUpdates((prev) => {
          const newMap = new Map(prev);
          const existing = newMap.get(conversation.id) || {};
          newMap.set(conversation.id, {
            ...existing,
            last_message: {
              ...(existing.last_message || conversation.last_message),
              ...conversation.last_message,
              is_seen: true,
            },
          });
          return newMap;
        });
      }
    };

    socket.on('conversation_updated', handleConversationUpdated);
    socket.on('message_received', handleMessageReceived);
    socket.on('message_seen', handleMessageSeen);

    return () => {
      socket.off('conversation_updated', handleConversationUpdated);
      socket.off('message_received', handleMessageReceived);
      socket.off('message_seen', handleMessageSeen);
    };
  }, [socket, isConnected, currentUserId, data?.data, mutate]);

  // Update conversations when socket messages are received (for optimistic updates)
  useEffect(() => {
    if (!socketMessages.length || !currentUserId || !data?.data?.length) return;

    // Get the latest message
    const latestMessage = socketMessages[socketMessages.length - 1];
    if (!latestMessage || !latestMessage.sender || !latestMessage.id) return;

    setConversationUpdates((prev) => {
      const newMap = new Map(prev);
      const baseConversations = data?.data || [];
      const senderId = latestMessage.sender.id;
      
      // Find conversation - priority: conversationId in params if exists, otherwise find by users
      let targetConversation: Conversation | undefined;
      
      if (conversationId) {
        targetConversation = baseConversations.find((conv) => {
          const otherUserId = conv.user1?.id === currentUserId 
            ? conv.user2?.id 
            : conv.user1?.id;
          return otherUserId === conversationId;
        });
      }
      
      if (!targetConversation) {
        targetConversation = baseConversations.find((conv) => {
          const user1Id = conv.user1?.id;
          const user2Id = conv.user2?.id;
          return (
            (user1Id === senderId && user2Id === currentUserId) ||
            (user2Id === senderId && user1Id === currentUserId)
          );
        });
      }

      if (targetConversation) {
        const existing = newMap.get(targetConversation.id) || {};
        const existingLastMessage = existing.last_message || targetConversation.last_message;
        
        // Update if no existing message or if new message is newer
        const shouldUpdate = !existingLastMessage || 
          !existingLastMessage.id ||
          !existingLastMessage.created_at ||
          new Date(latestMessage.created_at).getTime() > new Date(existingLastMessage.created_at).getTime();
        
        if (shouldUpdate) {
          newMap.set(targetConversation.id, {
            ...existing,
            last_message: latestMessage,
          });
        }
      }

      return newMap;
    });
  }, [socketMessages, currentUserId, conversationId, data?.data]);

  // Reset marked conversation ref when conversationId changes
  useEffect(() => {
    markedConversationRef.current = null;
  }, [conversationId]);

  // Auto mark as seen when viewing a conversation (when conversationId exists in params)
  useEffect(() => {
    if (!conversationId || !conversations.length || !isConnected || !currentUserId) {
      return;
    }

    // Find the active conversation
    const activeConversation = conversations.find((conv) => {
      const otherUserId = conv.user1?.id === currentUserId 
        ? conv.user2?.id 
        : conv.user1?.id;
      return otherUserId === conversationId;
    });

    if (!activeConversation || !activeConversation.last_message) {
      return;
    }

    // Check if we've already marked this conversation with this message
    const lastMessageId = activeConversation.last_message.id;
    if (
      markedConversationRef.current?.conversationId === activeConversation.id &&
      markedConversationRef.current?.lastMessageId === lastMessageId
    ) {
      return; // Already marked
    }

    // Check if there are unread messages
    const hasUnreadMessages = !activeConversation.last_message.is_seen && 
      activeConversation.last_message.sender?.id !== currentUserId;

    if (hasUnreadMessages) {
      // Optimistically update UI
      setConversationUpdates((prev) => {
        const newMap = new Map(prev);
        const existing = newMap.get(activeConversation.id) || {};
        newMap.set(activeConversation.id, {
          ...existing,
          last_message: {
            ...(existing.last_message || activeConversation.last_message),
            is_seen: true,
            seen_at: new Date(),
          },
        });
        return newMap;
      });

      // Mark as seen via socket
      if (activeConversation.id) {
        markSeen(activeConversation.id);
        // Track that we've marked this conversation
        markedConversationRef.current = {
          conversationId: activeConversation.id,
          lastMessageId: lastMessageId,
        };
      }
    } else {
      // Update ref even if no unread messages to track current state
      markedConversationRef.current = {
        conversationId: activeConversation.id,
        lastMessageId: lastMessageId,
      };
    }
  }, [conversationId, conversations, isConnected, currentUserId, markSeen]);

  // Handle clicking on a conversation - mark as seen immediately
  const handleConversationClick = useCallback((conversation: Conversation) => {
    // Optimistically update UI
    if (conversation.last_message && !conversation.last_message.is_seen && conversation.last_message.sender?.id !== currentUserId) {
      setConversationUpdates((prev) => {
        const newMap = new Map(prev);
        const existing = newMap.get(conversation.id) || {};
        newMap.set(conversation.id, {
          ...existing,
          last_message: {
            ...(existing.last_message || conversation.last_message),
            is_seen: true,
            seen_at: new Date(),
          },
        });
        return newMap;
      });
    }

    // Find conversation ID - we need to get it from the conversation object
    // Since we're using userId in the route, we need to find the conversation by userId
    const otherUserId = conversation.user1?.id === currentUserId 
      ? conversation.user2?.id 
      : conversation.user1?.id;
    
    router.push(`/messages/${otherUserId}`);
    
    // Mark as seen via socket if connected
    if (isConnected && conversation.id && conversation.last_message && 
        !conversation.last_message.is_seen && conversation.last_message.sender?.id !== currentUserId) {
      markSeen(conversation.id);
    }
  }, [currentUserId, router, isConnected, markSeen]);

  return (
    <div className="h-full flex flex-col py-2 md:py-4 px-2">
      <div className="h-full flex flex-col py-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-3 px-3 mb-3">
          <CommonButton className="rounded-full p-1 w-8 h-8" onClick={() => router.push("/home")}>
            <ArrowLeft size={18} />
          </CommonButton>
          <p className="text-[26px] font-semibold">Messages</p>
        </div>
        <div className="px-3">
          <SearchInput className="w-full rounded-lg shadow-sm" />
        </div>

        <div className="flex-1 mt-2 px-1 overflow-y-auto main-scrollbar">
          {isLoading ? (
            <div className="space-y-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <UserChatCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">Failed to load conversations</p>
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No conversations yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {conversations.map((conversation) => {
                const otherUserId = conversation.user1?.id === currentUserId 
                  ? conversation.user2?.id 
                  : conversation.user1?.id;
                const isActive = otherUserId === conversationId;
                return (
                  <UserChatCard
                    key={conversation.id}
                    conversation={conversation}
                    isActive={isActive}
                    currentUserId={currentUserId}
                    onClick={handleConversationClick}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}