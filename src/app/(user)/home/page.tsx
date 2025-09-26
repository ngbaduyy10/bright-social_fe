import CreateStoryCard from '@/components/molecules/CreateStoryCard'
import StoryCard from '@/components/molecules/StoryCard'
import PostCard from '@/components/molecules/PostCard'

export default async function HomePage() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
        <CreateStoryCard />
        {Array.from({ length: 10 }).map((_, index) => (
          <StoryCard key={index} />
        ))}
      </div>
      
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard key={index} />
        ))}
      </div>
    </div>
  );
}