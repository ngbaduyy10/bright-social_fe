"use client";

import PostCard from "../molecules/PostCard";
import Post from "@/models/post";
import { useInfiniteData } from "@/hooks/useInfiniteData";
import PostSkeleton from "../atoms/skeleton/PostSkeleton";
import { postLimit } from "@/utils/constant";

interface PostListProps {
  initialPosts: Post[];
  endpoint?: string;
}

export default function PostList({ initialPosts, endpoint }: PostListProps) {
  const { items: posts, isLoadingMore, isReachingEnd, loadMoreRef } = useInfiniteData<Post>({
    initialData: initialPosts,
    limit: postLimit,
    endpoint: endpoint ? `/post${endpoint}` : '/post'
  });

  if (!posts || posts.length === 0) {
    return (
      <div className="flex-center py-8">
        <p className="text-gray-500">No posts available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
      
      <div ref={loadMoreRef}>
        {isLoadingMore && <PostSkeleton />}
        {isReachingEnd && posts.length > 0 && (
          <div className="flex-center py-4">
            <p className="text-gray-500">No more posts</p>
          </div>
        )}
      </div>
    </div>
  );
}