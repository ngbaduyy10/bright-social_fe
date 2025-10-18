import Image from "next/image";
import { Camera, UserPlus, MessageCircle, UserCheck, UserPen } from "lucide-react";
import User from "@/models/user";
import DefaultAvatar from "@/static/icons/default_avatar.png";
import CommonButton from "@/components/atoms/CommonButton";

interface ProfileHeaderProps {
  user: User;
  isUser: boolean;
}

export default function ProfileHeader({ user, isUser }: ProfileHeaderProps) {
  const fullName = user.first_name && user.last_name 
    ? `${user.first_name} ${user.last_name}` 
    : user.username;

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className={`relative h-80 w-full ${!user.cover_image && 'bg-gray-200'}`}>
        {user.cover_image && (
          <Image
            src={user.cover_image}
            alt="Cover photo"
            fill
            className="object-cover"
          />
        )}
        <CommonButton className="absolute bottom-4 right-4 bg-background rounded-lg p-2">
          <Camera className="w-5 h-5 text-black" />
        </CommonButton>

        <div className="absolute -bottom-16 left-6">
          <div className="relative w-32 h-32 rounded-full bg-white border-4 border-white overflow-hidden">
            <Image
              src={user.image || DefaultAvatar}
              alt="Profile picture"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="pt-18 px-6 pb-6">
        <div className="flex-between gap-2 items-start">
          <div>
            <h1 className="text-3xl font-bold">{fullName}</h1>
            <p className="text-gray-500">@{user.username}</p>
            <p className="text-gray-500 mt-2">20 friends</p>
          </div>
          
          <div className="flex items-center gap-2">
            {isUser ? (
              <CommonButton className="gap-2">
                <UserPen className="w-4 h-4" />
                Edit profile
              </CommonButton>
            ) : (
              <>
              <CommonButton className="gap-2">
                <UserPlus className="w-4 h-4" />
                Add friend
              </CommonButton>

              <CommonButton className="gap-2 bg-background text-black hover:bg-gray-200">
                <UserCheck className="w-4 h-4" />
                Follow
              </CommonButton>
              
              <CommonButton className="gap-2 bg-background text-black hover:bg-gray-200">
                <MessageCircle className="w-4 h-4" />
                Message
              </CommonButton>
              </>
            )}
          </div>
        </div>

        {user.bio && (
          <p className="text-gray-500 mt-4">{user.bio}</p>
        )}
      </div>
    </div>
  );
}
