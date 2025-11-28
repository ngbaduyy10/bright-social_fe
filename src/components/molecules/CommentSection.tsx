import Link from "next/link";
import UserAvatar from "../atoms/UserAvatar";
import Comment from "@/models/comment";
import { getTimeAgo } from "@/utils/helpers";

interface CommentSectionProps {
  comments: Comment[];
}
export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className="flex-1">
      <div className="p-4">
        <p className="text-lg font-semibold mb-4">
          Comments ({comments?.length || 0})
        </p>
        <div className="space-y-6">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <UserAvatar
                  image={comment.user.image}
                  href={`/profile/${comment.user.username}`}
                  className="w-8 h-8 flex-shrink-0"
                />
                <div className="flex-1 flex flex-col">
                  <Link
                    href={`/profile/${comment.user.username}`}
                    className="font-semibold text-foreground mb-[2px] leading-none"
                  >
                    {`${comment.user.first_name || ""} ${comment.user.last_name || ""}`.trim() || comment.user.username}
                    <span className="text-sm font-normal text-muted-foreground"> • {getTimeAgo(comment.created_at)}</span>
                  </Link>
                  <p className="text-foreground">{comment.content}</p>
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
  );
}