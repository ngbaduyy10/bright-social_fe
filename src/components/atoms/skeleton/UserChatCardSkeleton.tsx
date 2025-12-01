export default function UserChatCardSkeleton() {
  return (
    <div className="flex items-center p-3 rounded-lg">
      <div className="flex-shrink-0 mr-[10px]">
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 bg-gray-200 rounded animate-pulse flex-1"></div>
        </div>
      </div>
    </div>
  );
}
