"use client";

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

  const { data, isLoading, error } = useSWR<ApiResponse<Conversation[]>>(
    "/api/chat/conversation",
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  );

  const conversations = data?.data || [];

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
                const isActive = conversation.id === conversationId;
                return (
                  <UserChatCard
                    key={conversation.id}
                    conversation={conversation}
                    isActive={isActive}
                    currentUserId={currentUserId}
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