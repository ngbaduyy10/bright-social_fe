import { fetchApiWithAuth } from '@/utils/api';
import Post from '@/models/post';
import PostList from '@/components/organisms/PostList';
import { postLimit } from '@/utils/constant';
import { storyLimit } from '@/utils/constant';
import { ApiResponse } from '@/dto/apiResponse.dto';
import { UserStory } from '@/dto/userStory.dto';
import StoryList from '@/components/organisms/StoryList';

export default async function HomePage() {
  const initialPostsResponse: ApiResponse<Post[]> = await fetchApiWithAuth(`/post?page=1&limit=${postLimit}`, { cache: "no-store" });
  const initialPosts: Post[] = initialPostsResponse.data;

  const initialStoriesResponse: ApiResponse<UserStory[]> = await fetchApiWithAuth(`/story?page=1&limit=${storyLimit}`, { cache: "no-store" });
  const initialUserStories: UserStory[] = initialStoriesResponse.data;

  return (
    <>
      <StoryList initialUserStories={initialUserStories} />
      <PostList initialPosts={initialPosts} />
    </>
  );
}