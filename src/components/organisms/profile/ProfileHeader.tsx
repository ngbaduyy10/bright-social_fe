import Image from "next/image";
import { UserPlus, MessageCircle, UserPen, UserCheck, X, Check } from "lucide-react";
import User from "@/models/user";
import DefaultAvatar from "@/static/icons/default_avatar.png";
import CommonButton from "@/components/atoms/CommonButton";
import { ConnectionType } from "@/types";

interface ProfileHeaderProps {
  user: User;
  isUser: boolean;
}

export default function ProfileHeader({ user, isUser }: ProfileHeaderProps) {
  const fullName = user.first_name && user.last_name 
    ? `${user.first_name} ${user.last_name}` 
    : user.username;

  const connectionButton = () => {
    switch (user.connection_type) {
      case ConnectionType.FRIEND:
        return (
          <CommonButton className="gap-2 px-6">
            <UserCheck className="w-4 h-4" />
            Friend
          </CommonButton>
        )
      case ConnectionType.REQUEST:
        return (
          <>
            <CommonButton className="gap-2">
              <Check className="w-4 h-4" />
              Accept
            </CommonButton>
            <CommonButton className="gap-2 bg-secondary text-black">
              <X className="w-4 h-4" />
              Cancel
            </CommonButton>
          </>
        )
      case ConnectionType.SENT:
        return (
          <CommonButton className="gap-2">
            <X className="w-4 h-4" />
            Cancel request
          </CommonButton>
        )
      default:
        return (
          <CommonButton className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add friend
          </CommonButton>
        )
    }
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className={`relative h-60 md:h-80 w-full ${!user.cover_image && 'bg-gray-200'}`}>
        {user.cover_image && (
          <Image
            src={user.cover_image}
            alt="Cover photo"
            fill
            className="object-cover"
          />
        )}

        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0">
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
        <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-2 md:items-start items-center text-center md:text-left">
          <div>
            <h1 className="text-3xl font-bold">{fullName}</h1>
            <p className="text-gray-500">@{user.username}</p>
            {isUser ? (
              <p className="text-gray-500 mt-2">{user.total_friends} friends</p>
            ) : (
              <p className="text-gray-500 mt-2">{user.mutual} mutual friends</p>
            )}
          </div>
          
          <div className="flex-center flex-wrap gap-2">
            {isUser ? (
              <CommonButton href="/profile/edit" className="gap-2">
                <UserPen className="w-4 h-4" />
                Edit profile
              </CommonButton>
            ) : (
              <>
                {connectionButton()}
                
                <CommonButton className="gap-2 bg-background text-black hover:bg-gray-200">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </CommonButton>
              </>
            )}
          </div>
        </div>

        {user.bio && (
          <p className="text-gray-500 mt-4 text-center md:text-left">{user.bio}</p>
        )}
      </div>
    </div>
  );
}
