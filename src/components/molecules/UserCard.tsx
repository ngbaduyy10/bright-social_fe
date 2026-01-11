'use client';

import { useState, useEffect } from "react";
import UserAvatar from "@/components/atoms/UserAvatar";
import { MessageCircle, Check, X, UserPlus } from "lucide-react";
import CommonButton from "../atoms/CommonButton";
import { ConnectionType } from "@/types";
import Friend from "@/models/friend";
import User from "@/models/user";
import { getTimeAgo } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useFriendActions } from "@/hooks/useFriendActions";

interface UserCardProps {
  friend?: Friend;
  user?: User;
  type?: ConnectionType;
}

export default function UserCard({ friend, user: userProp, type }: UserCardProps) {
  const router = useRouter();

  const [connectionType, setConnectionType] = useState<ConnectionType | undefined>(type);

  useEffect(() => {
    setConnectionType(type);
  }, [type]);

  let user: User;
  if (userProp) {
    user = userProp;
  } else if (friend) {
    user = type === ConnectionType.REQUEST ? friend.user : friend.friend;
  } else {
    throw new Error('Either friend or user must be provided');
  }
  
  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username;

  const {
    handleSendRequest,
    handleCancelRequest,
    handleAcceptRequest,
    handleRejectRequest,
    isPending,
  } = useFriendActions({
    friendId: user.id,
  });

  const handleSendRequestClick = () => {
    setConnectionType(ConnectionType.SENT);
    handleSendRequest();
  };

  const handleCancelRequestClick = () => {
    setConnectionType(ConnectionType.SUGGESTED);
    handleCancelRequest();
  };

  const handleAcceptRequestClick = () => {
    setConnectionType(ConnectionType.FRIEND);
    handleAcceptRequest();
  };

  const handleRejectRequestClick = () => {
    setConnectionType(ConnectionType.SUGGESTED);
    handleRejectRequest();
  };

  const renderActions = () => {
    switch (connectionType) {
      case ConnectionType.FRIEND:
        return (
          <>
            <CommonButton href={`/profile/${user.username}`} className="w-full">
              View Profile
            </CommonButton>
            <CommonButton className="w-full bg-secondary text-black" href={`/messages/${user.id}`}>
              <MessageCircle size={16} className="mr-2" />
              Message
            </CommonButton>
          </>
        );

      case ConnectionType.REQUEST:
        return (
          <>
            <CommonButton
              className="w-full"
              onClick={handleAcceptRequestClick}
              disabled={isPending}
            >
              <Check size={16} className="mr-2" />
              Accept
            </CommonButton>
            <CommonButton
              className="w-full bg-secondary text-black"
              onClick={handleRejectRequestClick}
              disabled={isPending}
            >
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
            <CommonButton
              className="w-full bg-secondary text-black"
              onClick={handleCancelRequestClick}
              disabled={isPending}
            >
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
            <CommonButton
              className="w-full bg-secondary text-black"
              onClick={handleSendRequestClick}
              disabled={isPending}
            >
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
            {(connectionType === ConnectionType.REQUEST || connectionType === ConnectionType.SENT) && friend && (
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
