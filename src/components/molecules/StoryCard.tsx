import UserAvatar from '../atoms/UserAvatar';
import Story from '@/models/story';

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <div className="relative w-[130px] h-[180px] bg-primary rounded-xl overflow-hidden cursor-pointer flex-shrink-0">
      <UserAvatar 
        image={story.user.image}
        className="absolute top-2 left-2 w-8 h-8 border-1 border-white"
      />
    </div>
  )
}