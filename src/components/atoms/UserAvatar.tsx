import Image from "next/image";
import DefaultAvatar from "@/static/icons/default_avatar.png";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  image?: string;
  username?: string;
  className?: string;
}

export default function UserAvatar({ image, username, className }: UserAvatarProps) {
  return (
    <div className={cn("w-10 h-10 p-0 rounded-full bg-white hover:bg-white overflow-hidden", className)}>
      <Image 
        src={image || DefaultAvatar} 
        alt={username || "User Avatar"} 
        className="object-cover w-full h-full" 
      />
    </div>
  )
}