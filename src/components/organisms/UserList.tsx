"use client";

import User from "@/models/user";
import { useInfiniteData } from "@/hooks/useInfiniteData";
import { userLimit } from "@/utils/constant";
import UserCardSkeleton from "../atoms/skeleton/UserCardSkeleton";
import UserSearchCard from "../molecules/UserSearchCard";

interface UserListProps {
  initialUsers: User[];
  params?: Record<string, string>;
}

export default function UserList({ initialUsers, params }: UserListProps) {
  const { items: users, isLoadingMore, isReachingEnd, loadMoreRef } = useInfiniteData<User>({
    initialData: initialUsers,
    limit: userLimit,
    endpoint: '/user',
    params: params
  });

  if (!users || users.length === 0) {
    return (
      <div className="flex-center py-8">
        <p className="text-gray-500">No users to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user: User) => (
          <UserSearchCard key={user.id} user={user} />
        ))}
      </div>
      <div ref={loadMoreRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoadingMore && !isReachingEnd && Array.from({ length: 2 }).map((_, index) => (
          <UserCardSkeleton key={index} isSearch={true} />
        ))}
      </div>
    </div>
  );
}