import Image from "next/image";
import DefaultAvatar from "@/static/icons/default_avatar.png";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  image?: string;
  className?: string;
}

export default function UserAvatar({ image, className }: UserAvatarProps) {
  return (
    <div className={cn("w-10 h-10 p-0 rounded-full bg-white hover:bg-white overflow-hidden", className)}>
      <Image 
        src={image || DefaultAvatar} 
        alt={"User Avatar"} 
        width={0}
        height={0}
        sizes="100vw"
        loading="lazy"
        className="object-cover w-full h-full" 
      />
    </div>
  )
}