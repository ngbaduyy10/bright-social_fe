import UserAvatar from "@/components/atoms/UserAvatar";
import { onlineUsers } from "@/utils/constant";

export default function OnlineUsersCard() {

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-2">Online</h3>
      <div className="space-y-3">
        {onlineUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-2">
            <div className="relative">
              <UserAvatar image={user.avatar.src} />
              <div className="absolute bottom-[-1px] right-[-1px] w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">@{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}