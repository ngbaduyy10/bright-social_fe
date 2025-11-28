"use client";

import { MoreHorizontal } from "lucide-react";
import Post from "@/models/post";
import PostContent from "@/components/atoms/PostContent";
import PostMedia from "./PostMedia";
import { useState } from "react";
import PostModal from "../organisms/PostModal";
import Media from "@/models/media";
import UserInfo from "../atoms/UserInfo";
import PostInteractionBar from "../atoms/PostInteractionBar";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedMediaOrder, setSelectedMediaOrder] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const sortedMedia = post.media?.sort((a, b) => a.order - b.order);

  const handleSelectMedia = (media: Media) => {
    setSelectedPost(post);
    setSelectedMediaOrder(media.order);
    setOpen(true);
  }

  return (
    <>
      <div className="bg-white flex flex-col gap-4 shadow-sm rounded-lg p-6">
        <div className="flex items-start justify-between">
          <UserInfo user={post.user} createdAt={post.created_at} />

          <div className="flex-center bg-white hover:bg-background rounded-md p-1 cursor-pointer">
            <MoreHorizontal size={20} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <PostContent content={post.content} />
          {sortedMedia && sortedMedia.length > 0 && (
            <PostMedia 
              media={sortedMedia} 
              handleSelectMedia={handleSelectMedia} 
            />
          )}
        </div>

        <PostInteractionBar post={post} className="pt-3 border-t border-border" />
      </div>

      {selectedPost && (
        <PostModal 
          post={selectedPost} 
          mediaOrder={selectedMediaOrder} 
          open={open} 
          onOpenChange={setOpen} 
        />
      )}
    </>
  )
}