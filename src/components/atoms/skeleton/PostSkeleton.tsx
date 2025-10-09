import { Skeleton } from "@/components/ui/skeleton";

export default function PostSkeleton() {
  return (
    <div className="bg-white flex flex-col gap-4 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>

            <div className="w-full flex justify-center">
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>

            <div className="flex items-center gap-6 pt-3">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
  );
}