import ChatInterface from "@/components/organisms/chat/ChatInterface";

interface MessagesPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function MessagesPage({ params }: MessagesPageProps) {
  const { userId } = await params;
  
  return (
    <ChatInterface otherUserId={userId} />
  );
}