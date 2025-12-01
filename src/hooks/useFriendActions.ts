"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import {
  sendRequest,
  cancelRequest,
  acceptRequest,
  rejectRequest,
  removeFriend,
} from "@/lib/actions/friend.action";
import { ConnectionType } from "@/types";

interface UseFriendActionsOptions {
  friendId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useFriendActions({ friendId, onSuccess, onError }: UseFriendActionsOptions) {
  const [isPending, startTransition] = useTransition();

  // Helper function to revalidate all friend-related endpoints
  const revalidateFriendCache = () => {
    // Revalidate all connection type endpoints
    Object.values(ConnectionType).forEach((type) => {
      mutate(
        (key) => typeof key === "string" && key.startsWith(`/api/connection/${type}`),
        undefined,
        { revalidate: true }
      );
    });
    
    // Revalidate friend-related endpoints
    mutate((key) => typeof key === "string" && key.includes("/friend"), undefined, {
      revalidate: true,
    });
  };

  const handleSendRequest = () => {
    startTransition(async () => {
      try {
        const response = await sendRequest(friendId);
        if (response.success) {
          toast.success("Friend request sent successfully");
          revalidateFriendCache();
          onSuccess?.();
        } else {
          const errorMessage = response.message || "Failed to send friend request";
          toast.error(errorMessage);
          onError?.(errorMessage);
        }
      } catch (error) {
        const errorMessage = "An error occurred while sending friend request";
        toast.error(errorMessage);
        onError?.(errorMessage);
        console.error("Error sending friend request:", error);
      }
    });
  };

  const handleCancelRequest = () => {
    startTransition(async () => {
      try {
        const response = await cancelRequest(friendId);
        if (response.success) {
          toast.success("Friend request cancelled successfully");
          revalidateFriendCache();
          onSuccess?.();
        } else {
          const errorMessage = response.message || "Failed to cancel friend request";
          toast.error(errorMessage);
          onError?.(errorMessage);
        }
      } catch (error) {
        const errorMessage = "An error occurred while cancelling friend request";
        toast.error(errorMessage);
        onError?.(errorMessage);
        console.error("Error cancelling friend request:", error);
      }
    });
  };

  const handleAcceptRequest = () => {
    startTransition(async () => {
      try {
        const response = await acceptRequest(friendId);
        if (response.success) {
          toast.success("Friend request accepted successfully");
          revalidateFriendCache();
          onSuccess?.();
        } else {
          const errorMessage = response.message || "Failed to accept friend request";
          toast.error(errorMessage);
          onError?.(errorMessage);
        }
      } catch (error) {
        const errorMessage = "An error occurred while accepting friend request";
        toast.error(errorMessage);
        onError?.(errorMessage);
        console.error("Error accepting friend request:", error);
      }
    });
  };

  const handleRejectRequest = () => {
    startTransition(async () => {
      try {
        const response = await rejectRequest(friendId);
        if (response.success) {
          toast.success("Friend request rejected successfully");
          revalidateFriendCache();
          onSuccess?.();
        } else {
          const errorMessage = response.message || "Failed to reject friend request";
          toast.error(errorMessage);
          onError?.(errorMessage);
        }
      } catch (error) {
        const errorMessage = "An error occurred while rejecting friend request";
        toast.error(errorMessage);
        onError?.(errorMessage);
        console.error("Error rejecting friend request:", error);
      }
    });
  };

  const handleRemoveFriend = () => {
    startTransition(async () => {
      try {
        const response = await removeFriend(friendId);
        if (response.success) {
          toast.success("Friend removed successfully");
          revalidateFriendCache();
          onSuccess?.();
        } else {
          const errorMessage = response.message || "Failed to remove friend";
          toast.error(errorMessage);
          onError?.(errorMessage);
        }
      } catch (error) {
        const errorMessage = "An error occurred while removing friend";
        toast.error(errorMessage);
        onError?.(errorMessage);
        console.error("Error removing friend:", error);
      }
    });
  };

  return {
    handleSendRequest,
    handleCancelRequest,
    handleAcceptRequest,
    handleRejectRequest,
    handleRemoveFriend,
    isPending,
  };
}

