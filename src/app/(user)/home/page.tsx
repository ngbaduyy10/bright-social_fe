import CreateStoryCard from '@/components/molecules/CreateStoryCard'
import StoryCard from '@/components/molecules/StoryCard'
import { fetchApiWithAuth } from '@/utils/api';
import Post from '@/models/post';
import Story from '@/models/story';
import PostList from '@/components/organisms/PostList';
import { postLimit } from '@/utils/constant';
import { storyLimit } from '@/utils/constant';

export default async function HomePage() {
  const initialPostsResponse: ApiResponse<Post[]> = await fetchApiWithAuth(`/post?page=1&limit=${postLimit}`, { cache: "no-store" });
  const initialPosts: Post[] = initialPostsResponse.data;

  const initialStoriesResponse: ApiResponse<Story[]> = await fetchApiWithAuth(`/story?page=1&limit=${storyLimit}`, { cache: "no-store" });
  const initialStories: Story[] = initialStoriesResponse.data;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
        <CreateStoryCard />
        {initialStories.map((story: Story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
      
      <PostList initialPosts={initialPosts} />
    </div>
  );
}