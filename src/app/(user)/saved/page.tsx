import Post from "@/models/post";
import { ApiResponse } from "@/dto/apiResponse.dto";
import { fetchApiWithAuth } from "@/utils/api";
import { postLimit } from "@/utils/constant";
import PostList from "@/components/organisms/PostList";
import PageTitle from "@/components/atoms/PageTitle";

export default async function SavedPage() {
  const initialPostsResponse: ApiResponse<Post[]> = await fetchApiWithAuth(`/post/saved?page=1&limit=${postLimit}`, { cache: "no-store" });
  const initialPosts: Post[] = initialPostsResponse.data;
  
  return (
    <>
      <PageTitle title="Saved Posts" description="View your saved posts" className="max-w-2xl mx-auto" />
      <PostList initialPosts={initialPosts} endpoint={`/saved`} />
    </>
  )
}