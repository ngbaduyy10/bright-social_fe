import { fetchApiWithAuth } from "@/utils/api";
import PostCard from "@/components/molecules/PostCard";
import { ApiResponse } from "@/dto/apiResponse.dto";
import Post from "@/models/post";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const response: ApiResponse<Post> = await fetchApiWithAuth(`/post/${id}`, { cache: "no-store" });
  const post = response.data;

  return (
    <div className="max-w-2xl mx-auto">
      <PostCard post={post} />
    </div>
  );
}