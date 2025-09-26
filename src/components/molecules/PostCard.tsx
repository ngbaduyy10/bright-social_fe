import UserAvatar from "@/components/atoms/UserAvatar"
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react"

interface PostCardProps {
  author?: {
    name: string
    avatar?: string
    username: string
  }
  content?: string
  image?: string
  likes?: number
  comments?: number
  timestamp?: string
}

export default function PostCard({
  author = {
    name: "John Doe",
    username: "@johndoe",
  },
  content = "This is a sample post content. It can contain multiple lines of text and will wrap naturally within the card layout.",
  image,
  likes = 24,
  comments = 8,
  timestamp = "2h ago"
}: PostCardProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <UserAvatar 
            image={author.avatar}
            username={author.name}
          />
          <div>
            <h3 className="font-semibold text-foreground">{author.name}</h3>
            <p className="text-sm text-muted-foreground">{author.username} • {timestamp}</p>
          </div>
        </div>

        <MoreHorizontal size={20} />
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <p className="text-foreground leading-relaxed">{content}</p>
      
        <div className="w-full h-90 bg-background rounded-lg flex-center">
          <div className="text-muted-foreground text-sm">Image placeholder</div>
        </div>
      </div>

      <div className="flex items-center gap-6 pt-3 border-t border-border">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Heart size={20} />
          <span>{likes}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MessageCircle size={20} />
          <span>{comments}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Share size={20} />
          <span>Share</span>
        </div>
      </div>
    </div>
  )
}