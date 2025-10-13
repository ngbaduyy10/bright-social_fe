"use client";

import { UserStory } from '@/dto/userStory.dto';
import { storyLimit } from '@/utils/constant';
import { useInfiniteData } from '@/hooks/useInfiniteData';
import { useEffect, useRef } from 'react';
import StoryCard from '../molecules/StoryCard';
import StorySkeleton from '../atoms/skeleton/StorySkeleton';
import CreateStoryCard from '../molecules/CreateStoryCard';

interface StoryListProps {
  initialUserStories: UserStory[];
}

export default function StoryList({ initialUserStories }: StoryListProps) {
  const { items: userStories, isLoadingMore, isReachingEnd, loadMore } = useInfiniteData<UserStory>({
    initialData: initialUserStories,
    limit: storyLimit,
    endpoint: 'story'
  });
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isReachingEnd && !isLoadingMore) {
          loadMore();
        }
      }, 
      { threshold: 0 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [isReachingEnd, isLoadingMore, loadMore]);

  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
      <CreateStoryCard />
      {userStories.map((userStory: UserStory) => (
        <StoryCard key={userStory.user.id} userStory={userStory} />
      ))}

      <div ref={loadMoreRef}>
        {isLoadingMore && <StorySkeleton />}
      </div>
    </div>
  );
}