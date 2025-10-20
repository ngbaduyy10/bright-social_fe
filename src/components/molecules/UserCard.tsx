'use client';

import UserAvatar from "@/components/atoms/UserAvatar";
import { MessageCircle, Check, X, UserPlus } from "lucide-react";
import CommonButton from "../atoms/CommonButton";
import { ConnectionType } from "@/types";
import Friend from "@/models/friend";
import { getTimeAgo } from "@/utils/helpers";

interface UserCardProps {
  friend: Friend;
  type?: ConnectionType;
}

export default function UserCard({ friend, type }: UserCardProps) {
  const user = type === ConnectionType.REQUEST ? friend.user : friend.friend;
  const fullName = `${user.first_name} ${user.last_name}`;

  const renderActions = () => {
    switch (type) {
      case ConnectionType.FRIEND:
        return (
          <>
            <CommonButton className="w-full">
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
            <CommonButton className="w-full">
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
            <CommonButton className="w-full">
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
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex-between gap-2">
            <p className="font-bold text-md truncate">
              {fullName}
            </p>
            {(type === ConnectionType.REQUEST || type === ConnectionType.SENT) && (
              <p className="text-sm text-muted-foreground">
                {getTimeAgo(friend.created_at)}
              </p>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            @{user.username}
          </p>
          <p className="text-sm text-muted-foreground">
            10 mutual friends
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        {renderActions()}
      </div>
    </div>
  );
}
