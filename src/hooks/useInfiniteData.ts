import { useEffect, useRef } from 'react';
import useSWRInfinite from 'swr/infinite';
import { ApiResponse } from '@/dto/apiResponse.dto';
import { Meta } from '@/dto/meta.dto';

interface FetcherResponse<T> {
  data: T;
  meta?: Meta;
}

const fetcher = async <T>(url: string): Promise<FetcherResponse<T[]>> => {
  const response = await fetch(url);
  const apiResponse: ApiResponse<T[]> = await response.json();
  return {
    data: apiResponse.data,
    meta: apiResponse.meta,
  };
};

interface UseInfiniteDataOptions<T> {
  initialData?: T[];
  limit: number;
  endpoint: string;
  params?: Record<string, string>;
}

export function useInfiniteData<T>({ initialData, limit, endpoint, params }: UseInfiniteDataOptions<T>) {
  const getKey = (pageIndex: number, previousPageData: FetcherResponse<T[]>) => {
    if (previousPageData && previousPageData.data.length === 0) return null;
    return `/api${endpoint}?page=${pageIndex + 1}&limit=${limit}${params ? `&${new URLSearchParams(params).toString()}` : ''}`;
  };

  const {
    data,
    isLoading,
    size,
    setSize,
  } = useSWRInfinite<FetcherResponse<T[]>>(getKey, fetcher, {
    ...(initialData && initialData.length > 0 && { 
      fallbackData: [{ data: initialData }] 
    }),
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshInterval: 0,
  });

  const items = data ? data.flatMap(page => page.data) : [];
  const totalItems = data && data.length > 0 ? data[data.length - 1]?.meta?.total : 0;
  const isReachingEnd = data && data[data.length - 1]?.data.length < limit;
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
    totalItems,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    loadMoreRef,
  };
}
