import StorySkeleton from "@/components/atoms/skeleton/StorySkeleton";
import PostSkeleton from "@/components/atoms/skeleton/PostSkeleton";

export default function Loading() {
  return (
    <>
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {Array.from({ length: 7 }).map((_, idx) => (
          <StorySkeleton key={idx} />
        ))}
      </div>
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {Array.from({ length: 2 }).map((_, idx) => (
          <PostSkeleton key={idx} />
        ))}
      </div>
    </>
  );
}

