"use client";

import { useState, useTransition, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Post from "@/models/post";
import PostContent from "@/components/atoms/PostContent";
import { X } from "lucide-react";
import CommentInput from "../molecules/CommentInput";
import PostMediaCarousel from "../molecules/PostMediaCarousel";
import CommentSection from "../molecules/CommentSection";
import UserInfo from "../atoms/UserInfo";
import PostInteractionBar from "../atoms/PostInteractionBar";
import { createComment } from "@/lib/actions/comment.action";
import { toast } from "sonner";
import Comment from "@/models/comment";

interface PostModalProps {
  post: Post;
  mediaOrder: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PostModal({ post, mediaOrder, open, onOpenChange }: PostModalProps) {
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [isCommentPending, startCommentTransition] = useTransition();

  useEffect(() => {
    if (open) {
      setComments(post.comments || []);
    }
  }, [post.comments, open]);

  const handleSendComment = (content: string) => {
    if (!content.trim()) {
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const optimisticComment: Comment = {
      id: tempId,
      content: content.trim(),
      user: post.user,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    setComments((prev) => [...prev, optimisticComment]);

    startCommentTransition(async () => {
      try {
        const response = await createComment(post.id, content.trim());
        
        if (response.success && response.data) {
          const newComment = response.data as Comment;
          setComments((prev) => 
            prev.map((comment) => 
              comment.id === tempId ? newComment : comment
            )
          );
          toast.success("Comment posted successfully");
        } else {
          setComments((prev) => prev.filter((comment) => comment.id !== tempId));
          toast.error(response.message || "Failed to post comment");
        }
      } catch (error) {
        setComments((prev) => prev.filter((comment) => comment.id !== tempId));
        toast.error("An error occurred while posting comment");
        console.error("Error posting comment:", error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[80vw] sm:max-w-[80vw] h-[90vh] border-none p-0 gap-0 overflow-hidden"
      >
        <DialogTitle className="sr-only">Post Modal</DialogTitle>
        <div className="flex h-full min-h-0">
          <div className="w-2/3 h-full bg-black relative overflow-hidden">
            {post.media && post.media.length > 0 && (
              <PostMediaCarousel
                media={post.media}
                mediaOrder={mediaOrder}
              />
            )}
          </div>

          <div className="w-1/3 h-full max-h-full flex flex-col bg-white overflow-hidden">
            <div className="p-4 flex-between border-b border-border flex-shrink-0">
              <UserInfo user={post.user} createdAt={post.created_at} />

              <div
                onClick={() => onOpenChange(false)}
                className="w-8 h-8 rounded-full bg-secondary/80 hover:bg-secondary flex-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-primary" />
              </div>
            </div>

            <div className="flex-1 flex flex-col overflow-y-auto main-scrollbar">
              {post.content && (
                <div className="p-4 flex-shrink-0">
                  <PostContent content={post.content} />
                </div>
              )}

              <PostInteractionBar 
                post={{ ...post, comments }} 
                className="px-4 py-3 border-y border-border" 
              />

              <CommentSection comments={comments} />
            </div>

            <div className="p-4 border-t border-border flex-shrink-0">
              <CommentInput 
                onSendComment={handleSendComment} 
                disabled={isCommentPending}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}