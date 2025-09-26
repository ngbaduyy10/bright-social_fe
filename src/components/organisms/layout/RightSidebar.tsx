export default function RightSidebar() {
  return (
    <div className="h-full flex flex-col gap-3 bg-background py-4 md:py-6 px-2 overflow-y-auto scrollbar-hide">
      <div className="px-4 py-6 bg-white rounded-lg min-h-[300px]">
        {/* Sponsors */}
      </div>
      <div className="px-4 py-6 bg-white rounded-lg min-h-[200px]">
        {/* Trending */}
      </div>
      <div className="px-4 py-6 bg-white rounded-lg min-h-[300px]">
        {/* Online Users */}
      </div>
    </div>
  )
}