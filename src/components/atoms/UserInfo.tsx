import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { getTimeAgo } from "@/utils/helpers";
import User from "@/models/user";

interface UserInfoProps {
  user: User;
  createdAt: Date;
}

export default function UserInfo({ user, createdAt }: UserInfoProps) {
  return (
    <div className="flex items-center space-x-2" >
      <UserAvatar 
        image={user.image}
        href={`/profile/${user.username}`}
      />
      <div>
        <Link href={`/profile/${user.username}`} className="font-semibold text-foreground">{`${user.first_name} ${user.last_name}`}</Link>
        <p className="text-sm text-muted-foreground">{`@${user.username}`} • {getTimeAgo(createdAt)}</p>
      </div>
    </div>
  );
}