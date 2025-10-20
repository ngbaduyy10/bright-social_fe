'use client';

import { useInfiniteData } from '@/hooks/useInfiniteData';
import UserCard from '@/components/molecules/UserCard';
import Friend from '@/models/friend';
import { ConnectionType } from '@/types';
import { friendLimit } from '@/utils/constant';
import UserCardSkeleton from '@/components/atoms/skeleton/UserCardSkeleton';
import SearchInput from '../molecules/SearchInput';


interface ConnectionListProps {
  type: ConnectionType;
}

export default function ConnectionList({ type }: ConnectionListProps) {
  const { items: friends, isLoading, isLoadingMore, isReachingEnd, loadMoreRef } = useInfiniteData<Friend>({
    limit: friendLimit,
    endpoint: `/connection/${type}`,
  });

  if ((!friends || friends.length === 0) && !isLoading) {
    return (
      <div className="flex-center py-8">
        <p className="text-gray-500">No users available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SearchInput className="w-full rounded-lg shadow-sm" classNameInput="bg-white" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {friends.map((friend) => (
          <UserCard
            key={friend.id}
            friend={friend}
            type={type}
          />
        ))}
      </div>
      <div ref={loadMoreRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoadingMore && !isReachingEnd && Array.from({ length: 2 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

