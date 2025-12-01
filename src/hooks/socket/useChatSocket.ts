'use client';

import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';
import Message from '@/models/message';
import Conversation from '@/models/conversation';

export const useChatSocket = (token: string) => {
  const { socket, isConnected, error } = useSocket({
    namespace: '/chat',
    token,
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('message_received', (message: Message) => {
      console.log('Message received:', message);
      setMessages((prev) => [...prev, message]);
    });

    socket.on('message_seen', (conversation: Conversation) => {
      if (conversation.messages && conversation.messages.length > 0) {
        const conversationMessageIds = conversation.messages.map((msg) => msg.id);
        setMessages((prev) =>
          prev.map((msg) =>
            conversationMessageIds.includes(msg.id)
              ? { ...msg, is_seen: true, seen_at: new Date() }
              : msg
          )
        );
      }
    });

    socket.on('conversation_updated', (conversation: Conversation) => {
      console.log('Conversation updated:', conversation);
      setConversations((prev) =>
        prev.map((item) =>
          item.id === conversation.id ? { ...item, ...conversation } : item
        )
      );
    });

    return () => {
      socket.off('message_received');
      socket.off('message_seen');
      socket.off('conversation_updated');
    };
  }, [socket]);

  const joinConversation = (conversationId: string) => {
    if (socket && isConnected) {
      socket.emit('join_conversation', { conversationId });
    }
  };

  const sendMessage = (conversationId: string, content: string) => {
    if (socket && isConnected) {
      socket.emit('send_message', { conversationId, content });
    }
  };

  const markSeen = (conversationId: string) => {
    if (socket && isConnected) {
      socket.emit('mark_seen', { conversationId });
    }
  };

  return {
    socket,
    isConnected,
    error,
    messages,
    conversations,
    sendMessage,
    joinConversation,
    markSeen,
  };
};