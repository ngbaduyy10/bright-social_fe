import CreateStoryCard from '@/components/molecules/CreateStoryCard'
import StoryCard from '@/components/molecules/StoryCard'
import PostCard from '@/components/molecules/PostCard'
import { fetchApiWithAuth } from '@/utils/api';
import Post from '@/models/post';
import Story from '@/models/story';

export default async function HomePage() {
  const initialPostsResponse: ApiResponse<Post[]> = await fetchApiWithAuth("/post?page=1&limit=10", { cache: "no-store" });
  const initialPosts: Post[] = initialPostsResponse.data;

  const initialStoriesResponse: ApiResponse<Story[]> = await fetchApiWithAuth("/story?page=1&limit=10", { cache: "no-store" });
  const initialStories: Story[] = initialStoriesResponse.data;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
        <CreateStoryCard />
        {initialStories.map((story: Story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
      
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {initialPosts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}