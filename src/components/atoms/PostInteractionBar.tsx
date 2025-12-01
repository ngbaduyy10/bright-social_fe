"use client";

import { useState, useTransition } from "react";
import Post from "@/models/post";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { savePost, unsavePost } from "@/lib/actions/save.action";
import { likePost, unlikePost } from "@/lib/actions/like.action";
import { toast } from "sonner";

interface PostInteractionBarProps {
  post: Post;
  className?: string;
}

export default function PostInteractionBar({ post, className }: PostInteractionBarProps) {
  const [isSaved, setIsSaved] = useState(post.is_saved || false);
  const [isLiked, setIsLiked] = useState(post.is_liked || false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [isLikePending, startLikeTransition] = useTransition();
  const [isSavePending, startSaveTransition] = useTransition();

  const handleLikeToggle = async () => {
    const previousState = isLiked;
    const previousCount = likesCount;
    
    setIsLiked(!isLiked);
    setLikesCount(previousState ? previousCount - 1 : previousCount + 1);

    startLikeTransition(async () => {
      try {
        if (previousState) {
          const response = await unlikePost(post.id);
          if (!response.success) {
            setIsLiked(previousState);
            setLikesCount(previousCount);
            toast.error("Failed to unlike post");
          }
        } else {
          const response = await likePost(post.id);
          if (!response.success) {
            setIsLiked(previousState);
            setLikesCount(previousCount);
            toast.error("Failed to like post");
          }
        }
      } catch (error) {
        setIsLiked(previousState);
        setLikesCount(previousCount);
        console.error("Error toggling like:", error);
      }
    });
  };

  const handleSaveToggle = async () => {
    const previousState = isSaved;
    setIsSaved(!isSaved);

    startSaveTransition(async () => {
      try {
        if (previousState) {
          const response = await unsavePost(post.id);
          if (!response.success) {
            setIsSaved(previousState);
            toast.error("Failed to unsave post");
          }
        } else {
          const response = await savePost(post.id);
          if (!response.success) {
            setIsSaved(previousState);
            toast.error("Failed to save post");
          }
        }
      } catch (error) {
        setIsSaved(previousState);
        console.error("Error toggling save:", error);
      }
    });
  };

  return (
    <div className={cn("flex-between gap-1 flex-shrink-0", className)}>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Heart 
            size={24} 
            className={cn(
              "cursor-pointer transition-colors",
              isLiked && "text-red-500 fill-red-500",
              isLikePending && "opacity-50"
            )}
            onClick={handleLikeToggle}
          />
          <span>{likesCount}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MessageCircle size={24} className="cursor-pointer" />
          <span>{post.comments?.length || 0}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-muted-foreground">
        <Bookmark 
          size={24} 
          className={cn(
            "cursor-pointer transition-colors",
            isSaved && "text-primary fill-primary",
            isSavePending && "opacity-50"
          )}
          onClick={handleSaveToggle}
        />
      </div>
    </div>
  );
}