import Post from "@/models/post";
import { ApiResponse } from "@/dto/apiResponse.dto";
import { fetchApiWithAuth } from "@/utils/api";
import { postLimit } from "@/utils/constant";
import PostList from "@/components/organisms/PostList";

export default async function SavedPage() {
  const initialPostsResponse: ApiResponse<Post[]> = await fetchApiWithAuth(`/post/saved?page=1&limit=${postLimit}`, { cache: "no-store" });
  const initialPosts: Post[] = initialPostsResponse.data;
  
  return (
    <>
      <h1 className="mb-4 max-w-2xl mx-auto text-[34px] font-bold">Saved Posts</h1>
      <PostList initialPosts={initialPosts} endpoint={`/saved`} />
    </>
  )
}