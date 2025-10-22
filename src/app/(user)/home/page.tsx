import { fetchApiWithAuth } from '@/utils/api';
import PostList from '@/components/organisms/PostList';
import { postLimit, storyLimit } from '@/utils/constant';
import { ApiResponse } from '@/dto/apiResponse.dto';
import StoryList from '@/components/organisms/StoryList';
import { HomePageResponse } from '@/dto/homePageResponse.dto';

export default async function HomePage() {
  const initialHomePageResponse: ApiResponse<HomePageResponse> = await fetchApiWithAuth(
    `/page/news-feed?post-limit=${postLimit}&story-limit=${storyLimit}`, 
    { cache: "no-store" }
  );
  const initialPosts = initialHomePageResponse.data.posts;
  const initialUserStories = initialHomePageResponse.data.stories;

  return (
    <>
      <StoryList initialUserStories={initialUserStories} />
      <PostList initialPosts={initialPosts} endpoint="/friend" />
    </>
  );
}