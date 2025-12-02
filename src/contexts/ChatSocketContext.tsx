"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useChatSocket } from "@/hooks/socket/useChatSocket";

interface ChatSocketContextType {
  socket: ReturnType<typeof useChatSocket>;
}

const ChatSocketContext = createContext<ChatSocketContextType | undefined>(undefined);

export function ChatSocketProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const accessToken = (session?.user as any)?.access_token || "";

  const socket = useChatSocket(accessToken);

  return (
    <ChatSocketContext.Provider value={{ socket }}>
      {children}
    </ChatSocketContext.Provider>
  );
}

export function useChatSocketContext() {
  const context = useContext(ChatSocketContext);
  if (context === undefined) {
    throw new Error("useChatSocketContext must be used within ChatSocketProvider");
  }
  return context.socket;
}
