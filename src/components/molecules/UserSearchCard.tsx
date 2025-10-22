import User from "@/models/user";
import UserAvatar from "../atoms/UserAvatar";
import { useRouter } from "next/navigation";


interface UserSearchCardProps {
  user: User;
}

export default function UserSearchCard({ user }: UserSearchCardProps) {
  const router = useRouter();
  return (
    <div 
      onClick={() => router.push(`/profile/${user.username}`)}
      className="bg-white rounded-lg shadow-sm p-3 w-full cursor-pointer hover:bg-accent"
    >
      <div className="flex items-start gap-4">
        <UserAvatar 
          image={user.image}
          className="w-15 h-15 flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex-between gap-2">
            <p className="font-bold text-md truncate">
              {user.first_name} {user.last_name}
            </p>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            @{user.username}
          </p>
          <p className="text-sm text-muted-foreground">
            10 mutual friends
          </p>
        </div>
      </div>
    </div>
  );
}