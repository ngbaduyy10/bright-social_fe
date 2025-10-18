import { fetchApiWithAuth } from "@/utils/api";
import { ApiResponse } from "@/dto/apiResponse.dto";
import User from "@/models/user";
import { postLimit, storyLimit } from '@/utils/constant';

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  console.log(username);
  const response: ApiResponse<User> = await fetchApiWithAuth(
    `/page/profile/${username}?post-limit=${postLimit}&story-limit=${storyLimit}`, 
    { cache: "no-store" }
  );
  console.log(response.data);

  return <div>UserProfilePage</div>;
}