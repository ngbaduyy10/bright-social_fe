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
      <PostList initialPosts={initialPosts} isSaved={true} />
    </>
  )
}