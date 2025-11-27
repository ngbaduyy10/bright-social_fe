"use client";

import UserAvatar from "@/components/atoms/UserAvatar";
import { Bookmark, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import Post from "@/models/post";
import { getTimeAgo } from "@/utils/helpers";
import PostContent from "@/components/atoms/PostContent";
import Link from "next/link";
import PostMedia from "./PostMedia";
import { useState } from "react";
import PostModal from "../organisms/PostModal";
import Media from "@/models/media";

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
          <div className="flex items-center space-x-2" >
            <UserAvatar 
              image={post.user.image}
              href={`/profile/${post.user.username}`}
            />
            <div>
              <Link href={`/profile/${post.user.username}`} className="font-semibold text-foreground">{`${post.user.first_name} ${post.user.last_name}`}</Link>
              <p className="text-sm text-muted-foreground">{`@${post.user.username}`} • {getTimeAgo(post.created_at)}</p>
            </div>
          </div>

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

        <div className="flex-between gap-1 pt-3 border-t border-border">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Heart size={24} className="cursor-pointer" />
              <span>{post.likes?.length || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MessageCircle size={24} className="cursor-pointer" />
              <span>{post.comments?.length || 0}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Bookmark size={24} className="cursor-pointer" />
          </div>
        </div>
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