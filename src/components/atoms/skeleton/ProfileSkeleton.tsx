import { Skeleton } from "@/components/ui/skeleton";
import PostSkeleton from "./PostSkeleton";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="relative h-80 w-full bg-gray-200">
          <Skeleton className="w-full h-full rounded-none" />

          <div className="absolute -bottom-16 left-6">
            <Skeleton className="w-32 h-32 rounded-full border-4 border-white" />
          </div>
        </div>

        <div className="pt-18 px-6 pb-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-9 w-48" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24 mt-2" />
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

