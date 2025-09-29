import { Plus } from "lucide-react";
import CommonButton from "@/components/atoms/CommonButton";
import NavItems from "./NavItems";
import UserAvatar from "@/components/atoms/UserAvatar"

interface LeftSidebarProps {
  user?: {
    name: string
    avatar?: string
    username: string
  }
  friends?: number
  posts?: number
}
const boldText = "font-semibold text-foreground";
const subText = "text-sm text-muted-foreground";

export default async function LeftSidebar(
  {
    user = {
      name: "John Doe",
      username: "@johndoe",
    },
    friends = 200,
    posts = 100
  }: LeftSidebarProps) {

  return (
    <div className="h-full flex flex-col gap-3 bg-background py-4 md:py-6 px-2 overflow-y-auto scrollbar-hide">
      <div className="flex flex-col px-4 py-6 bg-white rounded-lg h-[250px] gap-4">
        {/* Profile */}
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <UserAvatar
              image={user.avatar}
              username={user.name}
              className="w-20 h-20"
              />
          </div>
          <h3 className={boldText}>{user.name}</h3>
          <p className={subText}>{user.username}</p>
        </div>
        <div className="w-full flex justify-evenly">
            {/* friends */}
          <div className="flex flex-col items-center">
            <h3 className={boldText}>{friends}</h3>
            <p className={subText}>Friends</p>
          </div>
            {/* posts */}
          <div className="flex flex-col items-center">
            <h3 className={boldText}>{posts}</h3>
            <p className={subText}>Posts</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-6 bg-white rounded-lg">
        <NavItems />

        <CommonButton className="w-full px-4 py-6 gap-2">
          <Plus size={20} className="stroke-[3]" />
          <span className="font-semibold text-[16px]">Create Post</span>
        </CommonButton>
      </div>
    </div>
  );
}