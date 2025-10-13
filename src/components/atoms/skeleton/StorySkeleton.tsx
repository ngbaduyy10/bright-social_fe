import { Skeleton } from '@/components/ui/skeleton';

export default function StorySkeleton() {
  return (
    <div className="relative w-[130px] h-[180px] bg-white rounded-xl overflow-hidden flex-shrink-0">
      <Skeleton className="absolute top-2 left-2 w-8 h-8 rounded-full border-1 border-white" />
    </div>
  );
}