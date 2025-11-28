import Post from "@/models/post";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostInteractionBarProps {
  post: Post;
  className?: string;
}

export default function PostInteractionBar({ post, className }: PostInteractionBarProps) {
  return (
    <div className={cn("flex-between gap-1 flex-shrink-0", className)}>
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
  );
}