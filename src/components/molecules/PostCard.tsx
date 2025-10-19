import UserAvatar from "@/components/atoms/UserAvatar";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import Post from "@/models/post";
import { getTimeAgo } from "@/utils/helpers";
import Image from "next/image";
import PostContent from "@/components/atoms/PostContent";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white flex flex-col gap-4 shadow-sm rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2" >
          <UserAvatar 
            image={post.user.image}
            href={`/profile/${post.user.username}`}
          />
          <div>
            <Link href={`/${post.user.username}`} className="font-semibold text-foreground">{`${post.user.first_name} ${post.user.last_name}`}</Link>
            <p className="text-sm text-muted-foreground">{`@${post.user.username}`} • {getTimeAgo(post.created_at)}</p>
          </div>
        </div>

        <MoreHorizontal size={20} />
      </div>

      <div className="flex flex-col gap-3">
        <PostContent content={post.content} />
        {post.media && post.media.length > 0 && (
          <div className="w-full max-h-100 md:max-h-150 rounded-lg overflow-hidden">
            <Image
              src={post.media[0].url}
              alt="Post Image"
              width={post.media[0].width}
              height={post.media[0].height}
              sizes="100vw"
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 pt-3 border-t border-border">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Heart size={20} />
          <span>10</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MessageCircle size={20} />
          <span>10</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Share2 size={20} />
          <span>Share</span>
        </div>
      </div>
    </div>
  )
}