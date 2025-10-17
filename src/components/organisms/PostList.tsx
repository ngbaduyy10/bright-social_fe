"use client";

import { useEffect, useRef } from "react";
import PostCard from "../molecules/PostCard";
import Post from "@/models/post";
import { useInfiniteData } from "@/hooks/useInfiniteData";
import PostSkeleton from "../atoms/skeleton/PostSkeleton";
import { postLimit } from "@/utils/constant";

interface PostListProps {
  initialPosts: Post[];
  isSaved?: boolean;
}

export default function PostList({ initialPosts, isSaved }: PostListProps) {
  const { items: posts, isLoadingMore, isReachingEnd, loadMore } = useInfiniteData<Post>({
    initialData: initialPosts,
    limit: postLimit,
    endpoint: isSaved ? '/post/saved' : '/post'
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
            <p className="text-gray-500">No more posts to load</p>
          </div>
        )}
      </div>
    </div>
  );
}