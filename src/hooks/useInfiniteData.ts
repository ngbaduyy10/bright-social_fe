import { useEffect, useRef } from 'react';
import useSWRInfinite from 'swr/infinite';

const fetcher = async <T>(url: string): Promise<T[]> => {
  const response = await fetch(url);
  return response.json();
};

interface UseInfiniteDataOptions<T> {
  initialData?: T[];
  limit: number;
  endpoint: string;
}

export function useInfiniteData<T>({ initialData, limit, endpoint }: UseInfiniteDataOptions<T>) {
  const getKey = (pageIndex: number, previousPageData: T[]) => {
    if (previousPageData && previousPageData.length === 0) return null;
    return `/api${endpoint}?page=${pageIndex + 1}&limit=${limit}`;
  };

  const {
    data,
    isLoading,
    size,
    setSize,
  } = useSWRInfinite<T[]>(getKey, fetcher, {
    ...(initialData && initialData.length > 0 && { fallbackData: [initialData] }),
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshInterval: 0,
  });

  const items = data ? data.flat() : [];
  const isReachingEnd = data && data[data.length - 1]?.length < limit;
  const isLoadingMore = isLoading || (size > 0 && !!data && typeof data[size - 1] === 'undefined');
  const loadMore = () => setSize(size + 1);

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
  }, [isReachingEnd, isLoadingMore]);

  return {
    items,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    loadMoreRef,
  };
}
