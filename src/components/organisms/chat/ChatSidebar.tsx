"use client";

import CommonButton from "@/components/atoms/CommonButton";
import SearchInput from "@/components/molecules/SearchInput";
import UserChatCard from "@/components/molecules/UserChatCard";
import { sampleChats } from "@/utils/constant";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from  "next/navigation";

export interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  isRead: boolean;
}

export default function ChatSidebar() {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;

  return (
    <div className="h-full flex flex-col py-2 md:py-4 px-2">
      <div className="h-full flex flex-col px-1 py-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-3 px-2 mb-3">
          <CommonButton className="rounded-full p-1 w-8 h-8" onClick={() => router.push("/home")}>
            <ArrowLeft size={18} />
          </CommonButton>
          <p className="text-[26px] font-semibold">Messages</p>
        </div>
        <div className="px-2">
          <SearchInput className="w-full rounded-lg shadow-sm" />
        </div>

        <div className="flex-1 mt-2 space-y-1 overflow-y-auto main-scrollbar">
          {sampleChats.map((chat) => {
            const isActive = chat.id === userId;
            return <UserChatCard key={chat.id} chat={chat} isActive={isActive} />
          })}
        </div>
      </div>
    </div>
  );
}