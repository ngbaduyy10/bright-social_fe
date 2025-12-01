"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useChatSocket } from "@/hooks/socket/useChatSocket";

export default function ChatMessageNotification() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const accessToken = (session?.user as any)?.access_token || "";

  const { messages, isConnected } = useChatSocket(accessToken);
  const lastMessageIdRef = useRef<string>("");
  const processedMessageIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!isConnected || !currentUserId || messages.length === 0) return;

    const isOnMessagesPage = pathname?.startsWith("/messages");
    const currentConversationUserId = isOnMessagesPage && pathname?.split("/").length > 2
      ? pathname.split("/")[2]
      : null;

    messages.forEach((message) => {
      if (!message || !message.id) return;

      if (processedMessageIdsRef.current.has(message.id)) return;

      const isFromCurrentUser = message.sender?.id === currentUserId;
      
      if (!isFromCurrentUser) {
        const shouldShowToast = !isOnMessagesPage || 
          (currentConversationUserId !== message.sender.id);

        if (shouldShowToast) {
          const senderName = message.sender?.first_name && message.sender?.last_name
            ? `${message.sender.first_name} ${message.sender.last_name}`
            : message.sender?.username || "Someone";

          const messagePreview = message.content?.length > 50
            ? `${message.content.substring(0, 50)}...`
            : message.content || "";

          toast.info(`${senderName}: ${messagePreview}`, {
            duration: 5000,
            action: {
              label: "View",
              onClick: () => {
                router.push(`/messages/${message.sender.id}`);
              },
            },
          });
        }

        processedMessageIdsRef.current.add(message.id);
      }
    });

    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage?.id) {
        lastMessageIdRef.current = latestMessage.id;
      }
    }
  }, [messages, isConnected, currentUserId, pathname, router]);

  return null;
}

