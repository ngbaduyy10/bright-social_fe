import { Skeleton } from "@/components/ui/skeleton";

export default function ChatHeaderSkeleton() {
  return (
    <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b border-border">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="h-6 w-32" />
      </div>
    </div>
  );
}
