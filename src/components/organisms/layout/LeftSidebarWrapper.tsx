"use client";

import { usePathname } from "next/navigation";
import LeftSidebar from "./LeftSidebar";
import ChatSidebar from "../chat/ChatSidebar";

export default function LeftSidebarWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/messages")) {
    return <ChatSidebar />;
  }
  
  return <LeftSidebar />;
}
