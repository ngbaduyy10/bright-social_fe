import ChatInterface from "@/components/organisms/chat/ChatInterface";
import { sampleChats } from "@/utils/constant";
import { UserRoundX } from "lucide-react";

interface MessagesPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function MessagesPage({ params }: MessagesPageProps) {
  const { userId } = await params;

  const userName = sampleChats.find((chat) => chat.id === userId)?.name;
  
  if (!userName) {
    return (
      <div className="h-full flex-center flex-col gap-6 bg-white rounded-lg shadow-sm pb-30">
        <div className="flex-center w-[150px] h-[150px] rounded-full bg-secondary">
          <UserRoundX size={80} className="mx-auto text-primary" />
        </div>
        <p className="text-3xl text-center font-semibold text-primary">
          User not found
        </p>
    </div>
    )
  }

  return (
    <ChatInterface userName={userName} />
  );
}