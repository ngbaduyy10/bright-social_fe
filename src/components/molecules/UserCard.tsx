'use client';

import UserAvatar from "@/components/atoms/UserAvatar";
import { MessageCircle, Check, X, UserPlus } from "lucide-react";
import CommonButton from "../atoms/CommonButton";
import { ConnectionType } from "@/types";
import Friend from "@/models/friend";
import User from "@/models/user";
import { getTimeAgo } from "@/utils/helpers";
import { useRouter } from "next/navigation";

interface UserCardProps {
  friend?: Friend;
  user?: User;
  type?: ConnectionType;
}

export default function UserCard({ friend, user: userProp, type }: UserCardProps) {
  const router = useRouter();

  let user: User;
  if (userProp) {
    user = userProp;
  } else if (friend) {
    user = type === ConnectionType.REQUEST ? friend.user : friend.friend;
  } else {
    throw new Error('Either friend or user must be provided');
  }
  
  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username;

  const renderActions = () => {
    switch (type) {
      case ConnectionType.FRIEND:
        return (
          <>
            <CommonButton href={`/profile/${user.username}`} className="w-full">
              View Profile
            </CommonButton>
            <CommonButton className="w-full bg-secondary text-black">
              <MessageCircle size={16} className="mr-2" />
              Message
            </CommonButton>
          </>
        );

      case ConnectionType.REQUEST:
        return (
          <>
            <CommonButton className="w-full">
              <Check size={16} className="mr-2" />
              Accept
            </CommonButton>
            <CommonButton className="w-full bg-secondary text-black">
              <X size={16} className="mr-2" />
              Reject
            </CommonButton>
          </>
        );

      case ConnectionType.SENT:
        return (
          <>
            <CommonButton href={`/profile/${user.username}`} className="w-full">
              View Profile
            </CommonButton>
            <CommonButton className="w-full bg-secondary text-black">
              <X size={16} className="mr-2" />
              Cancel Request
            </CommonButton>
          </>
        );

      case ConnectionType.SUGGESTED:
        return (
          <>
            <CommonButton href={`/profile/${user.username}`} className="w-full">
              View Profile
            </CommonButton>
            <CommonButton className="w-full bg-secondary text-black">
              <UserPlus size={16} className="mr-2" />
              Add Friend
            </CommonButton>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 w-full">
      <div className="flex items-start gap-4">
        <UserAvatar 
          image={user.image}
          className="w-15 h-15 flex-shrink-0"
          href={`/profile/${user.username}`}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex-between gap-2">
            <p className="font-bold text-md truncate cursor-pointer" onClick={() => router.push(`/profile/${user.username}`)}>
              {fullName}
            </p>
            {(type === ConnectionType.REQUEST || type === ConnectionType.SENT) && friend && (
              <p className="text-sm text-muted-foreground">
                {getTimeAgo(friend.created_at)}
              </p>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            @{user.username}
          </p>
          <p className="text-sm text-muted-foreground">
            {friend ? friend.mutual : user.mutual} mutual friends
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        {renderActions()}
      </div>
    </div>
  );
}
