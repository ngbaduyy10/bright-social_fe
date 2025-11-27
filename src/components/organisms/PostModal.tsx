"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Post from "@/models/post";
import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import UserAvatar from "@/components/atoms/UserAvatar";
import PostContent from "@/components/atoms/PostContent";
import { getTimeAgo } from "@/utils/helpers";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import Link from "next/link";

interface PostModalProps {
  post: Post;
  mediaOrder: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PostModal({ post, mediaOrder, open, onOpenChange }: PostModalProps) {
  const [commentText, setCommentText] = useState("");
  const [api, setApi] = useState<CarouselApi>();
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (!api || !open) {
      return;
    }

    hasScrolledRef.current = false;

    const scrollToIndex = () => {
      if (hasScrolledRef.current) return;
      
      const targetIndex = Math.max(0, Math.min(mediaOrder, (post.media?.length || 1) - 1));
      
      const slideNodes = api.slideNodes();
      if (slideNodes.length > 0) {
        const currentIndex = api.selectedScrollSnap();
        if (currentIndex !== targetIndex) {
          api.scrollTo(targetIndex, false);
        }
        hasScrolledRef.current = true;
      }
    };

    scrollToIndex();

    const onReady = () => {
      scrollToIndex();
    };

    api.on("reInit", onReady);

    return () => {
      api.off("reInit", onReady);
    };
  }, [api, open, mediaOrder, post.media?.length]);

  useEffect(() => {
    if (!open) {
      setApi(undefined);
      hasScrolledRef.current = false;
    }
  }, [open]);

  const handleSendComment = () => {
    if (commentText.trim()) {
      // TODO: Implement comment submission
      console.log("Comment:", commentText);
      setCommentText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[80vw] sm:max-w-[80vw] h-[90vh] border-none p-0 gap-0 overflow-hidden"
      >
        <DialogTitle className="sr-only">Post Modal</DialogTitle>
        <div className="flex h-full">
          <div className="w-1/2 h-full bg-black relative overflow-hidden">
            {post.media && post.media.length > 0 ? (
              <Carousel 
                className="absolute inset-0 w-full h-full [&_[data-slot=carousel-content]]:!h-full [&_[data-slot=carousel-content]>div]:!h-full"
                setApi={setApi}
                opts={{
                  startIndex: Math.max(0, Math.min(mediaOrder, (post.media?.length || 1) - 1)),
                }}
              >
                <CarouselContent className="h-full -ml-0">
                  {post.media.map((media, index) => (
                    <CarouselItem key={media.id || index} className="h-full pl-0 basis-full">
                      <div className="relative w-full h-full">
                        <Image
                          src={media.url}
                          alt="Post Media"
                          fill
                          sizes="50vw"
                          className="object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {post.media.length > 1 && (
                  <>
                    <CarouselPrevious className="left-4 bg-white/80 hover:bg-white text-black border-black/20" />
                    <CarouselNext className="right-4 bg-white/80 hover:bg-white text-black border-black/20" />
                  </>
                )}
              </Carousel>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white text-center">
                <p>No media available</p>
              </div>
            )}
          </div>

          <div className="w-1/2 h-full flex flex-col bg-white">
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <UserAvatar
                  image={post.user.image}
                  href={`/profile/${post.user.username}`}
                />
                <div className="flex-1">
                  <Link
                    href={`/profile/${post.user.username}`}
                    className="font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {`${post.user.first_name || ""} ${post.user.last_name || ""}`.trim() || post.user.username}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    @{post.user.username} • {getTimeAgo(post.created_at)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {post.content && (
                <div className="mb-4">
                  <PostContent content={post.content} maxLength={Infinity} />
                </div>
              )}

              <div className="mt-6">
                <p className="text-lg font-semibold mb-4">
                  Comments ({post.comments?.length || 0})
                </p>
                <div className="space-y-4">
                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <UserAvatar
                          image={comment.user.image}
                          href={`/profile/${comment.user.username}`}
                          className="w-8 h-8 flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <Link
                              href={`/profile/${comment.user.username}`}
                              className="font-semibold text-sm text-foreground hover:text-primary transition-colors"
                            >
                              {`${comment.user.first_name || ""} ${comment.user.last_name || ""}`.trim() || comment.user.username}
                            </Link>
                            <p className="text-foreground mt-1">{comment.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 ml-1">
                            {getTimeAgo(comment.created_at)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <button
                  onClick={handleSendComment}
                  disabled={!commentText.trim()}
                  className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}