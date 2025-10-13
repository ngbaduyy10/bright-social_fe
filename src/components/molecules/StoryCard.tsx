import UserAvatar from '../atoms/UserAvatar';
import { UserStory } from '@/dto/userStory.dto';

interface StoryCardProps {
  userStory: UserStory;
}

export default function StoryCard({ userStory }: StoryCardProps) {
  const { user, stories } = userStory;
  return (
    <div className="relative w-[130px] h-[180px] bg-primary rounded-xl overflow-hidden cursor-pointer flex-shrink-0">
      <UserAvatar 
        image={user.image}
        className="absolute top-2 left-2 w-8 h-8 border-1 border-white"
      />
    </div>
  )
}