import { Skeleton } from "@/components/ui/skeleton";

interface NotificationCardSkeletonProps {
  isPage?: boolean;
}

export default function NotificationCardSkeleton({ isPage = false }: NotificationCardSkeletonProps) {
  return (
    <div className={`rounded-lg flex items-center gap-3 my-1 ${isPage ? "px-4 py-3" : "p-3"} bg-white`}>
      <div className="relative flex-shrink-0">
        <Skeleton className={`${isPage ? "w-12 h-12" : "w-10 h-10"} rounded-full`} />
        <Skeleton className="absolute -bottom-1 -right-1 w-[22px] h-[22px] rounded-full" />
      </div>

      <div className="flex-1 pt-1">
        <Skeleton className={`${isPage ? "h-5" : "h-4"} w-3/4 mb-1`} />
        <Skeleton className={`${isPage ? "h-4" : "h-3"} w-1/2`} />
      </div>
    </div>
  );
}

