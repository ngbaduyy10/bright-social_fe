import PostSkeleton from "@/components/atoms/skeleton/PostSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {Array.from({ length: 2 }).map((_, idx) => (
          <PostSkeleton key={idx} />
        ))}
      </div>
  );
}

