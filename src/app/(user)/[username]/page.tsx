import { fetchApiWithAuth } from "@/utils/api";
import { ApiResponse } from "@/dto/apiResponse.dto";
import User from "@/models/user";
import { postLimit, storyLimit } from '@/utils/constant';
import ProfileHeader from "../../../components/organisms/profile/ProfileHeader";
import ProfileTabs from "../../../components/organisms/profile/ProfileTabs";
import { auth } from "@/auth";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const response: ApiResponse<User> = await fetchApiWithAuth(
    `/page/profile/${username}?post-limit=${postLimit}&story-limit=${storyLimit}`, 
    { cache: "no-store" }
  );
  const user = response.data;
  const session = await auth();
  const isUser = session?.user?.id === user.id;

  return (
    <div className="space-y-4">
      <ProfileHeader user={user} isUser={isUser} />
      <ProfileTabs posts={user.posts || []} />
    </div>
  );
}