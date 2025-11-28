'use client';

import { useInfiniteData } from '@/hooks/useInfiniteData';
import UserCard from '@/components/molecules/UserCard';
import Friend from '@/models/friend';
import User from '@/models/user';
import { ConnectionType } from '@/types';
import { friendLimit } from '@/utils/constant';
import UserCardSkeleton from '@/components/atoms/skeleton/UserCardSkeleton';
import SearchInput from '../molecules/SearchInput';

const ConnectionTypeText: Record<ConnectionType, string> = {
  [ConnectionType.FRIEND]: 'friends',
  [ConnectionType.REQUEST]: 'friend requests',
  [ConnectionType.SENT]: 'sent requests',
  [ConnectionType.SUGGESTED]: 'suggested friends',
}

interface ConnectionListProps {
  type: ConnectionType;
}

export default function ConnectionList({ type }: ConnectionListProps) {
  const isSuggested = type === ConnectionType.SUGGESTED;
  
  const { items: friends, totalItems, isLoading, isLoadingMore, isReachingEnd, loadMoreRef } = useInfiniteData<Friend | User>({
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
      <SearchInput className="w-full rounded-lg shadow-sm mb-4" classNameInput="bg-white" />
      {!isLoading && (
        <p className="text-md text-gray-500 mb-2">{totalItems} {ConnectionTypeText[type as ConnectionType]}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {friends.map((item) => (
          <UserCard
            key={item.id}
            friend={isSuggested ? undefined : (item as Friend)}
            user={isSuggested ? (item as User) : undefined}
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

