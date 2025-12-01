import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="h-full flex-center flex-col gap-6 bg-white rounded-lg shadow-sm pb-30">
      <div className="flex-center w-[150px] h-[150px] rounded-full bg-secondary">
        <MessageSquare size={80} className="mx-auto text-primary" />
      </div>
      <p className="text-3xl text-center font-semibold text-primary">
        Select a conversation to start messaging
      </p>
    </div>
  );
}