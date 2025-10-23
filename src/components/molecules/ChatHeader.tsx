import UserAvatar from "../atoms/UserAvatar";

interface ChatHeaderProps {
  userName: string;
}

export default function ChatHeader({ userName }: ChatHeaderProps) {
  return (
    <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b border-border">
      <div className="flex items-center gap-3">
        <UserAvatar />
        <p className="text-xl font-semibold">{userName}</p>
      </div>
    </div>
  );
}
