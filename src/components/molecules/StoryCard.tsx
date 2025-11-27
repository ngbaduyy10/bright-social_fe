import UserAvatar from '../atoms/UserAvatar';
import { UserStory } from '@/dto/userStory.dto';
import { StoryType } from '@/types';
import Image from 'next/image';

interface StoryCardProps {
  userStory: UserStory;
  onOpenStoryModal: (userStory: UserStory) => void;
}

export default function StoryCard({ userStory, onOpenStoryModal }: StoryCardProps) {
  const { user, stories } = userStory;
  const mainStory = stories[0];
  
  return (
    <div 
      className="relative w-[130px] h-[180px] shadow-sm rounded-xl overflow-hidden cursor-pointer flex-shrink-0"
      style={mainStory.type === StoryType.TEXT && mainStory.background_color ? { backgroundColor: mainStory.background_color } : undefined}
      onClick={() => onOpenStoryModal(userStory)}
    >
      {mainStory.type === StoryType.IMAGE && (
        <Image
          src={mainStory.url!}
          alt={`${user.username}'s story`}
          fill
          className="object-cover"
        />
      )}
      
      {mainStory.type === StoryType.TEXT && (
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <p className="text-white text-xs text-center line-clamp-6 break-words">
            {mainStory.content}
          </p>
        </div>
      )}
      
      <UserAvatar 
        image={user.image}
        className="absolute top-2 left-2 w-8 h-8 border-2 border-primary z-10"
      />
    </div>
  )
}