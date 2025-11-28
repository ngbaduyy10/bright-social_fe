import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { getTimeAgo } from "@/utils/helpers";
import User from "@/models/user";
import { cn } from "@/lib/utils";

interface UserInfoProps {
  user: User;
  createdAt: Date;
  className?: string;
}

export default function UserInfo({ user, createdAt, className }: UserInfoProps) {
  return (
    <div className="flex items-center space-x-2" >
      <UserAvatar 
        image={user.image}
        href={`/profile/${user.username}`}
      />
      <div>
        <Link href={`/profile/${user.username}`} className={cn("font-semibold text-foreground", className)}>{`${user.first_name} ${user.last_name}`}</Link>
        <p className="text-sm text-muted-foreground">{`@${user.username}`} • {getTimeAgo(createdAt)}</p>
      </div>
    </div>
  );
}