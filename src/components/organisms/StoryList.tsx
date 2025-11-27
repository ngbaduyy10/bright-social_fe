"use client";

import { UserStory } from '@/dto/userStory.dto';
import { storyLimit } from '@/utils/constant';
import { useInfiniteData } from '@/hooks/useInfiniteData';
import StoryCard from '../molecules/StoryCard';
import StorySkeleton from '../atoms/skeleton/StorySkeleton';
import CreateStoryCard from '../molecules/CreateStoryCard';

interface StoryListProps {
  initialUserStories: UserStory[];
}

export default function StoryList({ initialUserStories }: StoryListProps) {
  const { items: userStories, isLoadingMore, isReachingEnd, loadMoreRef } = useInfiniteData<UserStory>({
    initialData: initialUserStories,
    limit: storyLimit,
    endpoint: '/story'
  });

  return (
    <div className="flex items-center gap-2 mb-6 py-1 overflow-x-auto scrollbar-hide">
      <CreateStoryCard />
      {userStories.map((userStory: UserStory) => (
        <StoryCard key={userStory.user.id} userStory={userStory} />
      ))}

      <div ref={loadMoreRef}>
        {isLoadingMore && !isReachingEnd && <StorySkeleton />}
      </div>
    </div>
  );
}