"use client";

import Media from "@/models/media";
import { mediaLimit } from "@/utils/constant";
import { useInfiniteData } from "@/hooks/useInfiniteData";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface MediaListProps {
  initialMedia: Media[];
  userId: string;
}

export default function MediaList({ initialMedia, userId }: MediaListProps) {
  const { items: media, isLoadingMore, isReachingEnd, loadMore } = useInfiniteData<Media>({
    initialData: initialMedia,
    limit: mediaLimit,
    endpoint: `/media/${userId}`
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

  if (!media || media.length === 0) {
    return (
      <div className="flex-center py-8">
        <p className="text-gray-500">No media to display.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {media.map((media: Media) => (
          <div key={media.id} className="relative w-full aspect-square rounded-lg overflow-hidden">
            <Image src={media.url} alt={media.id} fill className="object-cover" />
          </div>
        ))}
      </div>

      <div ref={loadMoreRef} className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {isLoadingMore && 
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-full aspect-square rounded-lg mt-2" />
          ))
        }
      </div>
    </div>
  );
}