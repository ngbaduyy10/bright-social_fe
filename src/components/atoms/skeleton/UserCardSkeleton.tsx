import { Skeleton } from "@/components/ui/skeleton";

export default function UserCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-3 w-full">
      <div className="flex items-start gap-4">
        <Skeleton className="w-15 h-15 rounded-full flex-shrink-0" />
        
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

