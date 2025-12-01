"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useNotificationSocket } from "@/hooks/socket/useNotificationSocket";

interface NotificationSocketContextType {
  socket: ReturnType<typeof useNotificationSocket>;
}

const NotificationSocketContext = createContext<NotificationSocketContextType | undefined>(undefined);

export function NotificationSocketProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const token = session?.user?.access_token || "";

  const socket = useNotificationSocket(token);

  return (
    <NotificationSocketContext.Provider value={{ socket }}>
      {children}
    </NotificationSocketContext.Provider>
  );
}

export function useNotificationSocketContext() {
  const context = useContext(NotificationSocketContext);
  if (context === undefined) {
    throw new Error("useNotificationSocketContext must be used within NotificationSocketProvider");
  }
  return context.socket;
}

