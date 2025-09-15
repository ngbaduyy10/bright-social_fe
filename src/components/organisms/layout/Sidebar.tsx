import { Plus } from "lucide-react";
import LightningIcon from "@/components/atoms/LightningIcon";
import CommonButton from "@/components/atoms/CommonButton";
import { auth } from "@/auth";
import Image from "next/image";
import NavItems from "./NavItems";
import DefaultAvatar from "@/static/icons/default_avatar.png";
import SignOutButton from "@/components/atoms/SignOutButton";

export default async function Sidebar() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-primary">
          <LightningIcon size={"xl"} />
          <span className="text-3xl font-extrabold">Bright</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <NavItems />

        <CommonButton className="w-full px-4 py-6 gap-2">
          <Plus size={20} />
          <span className="font-semibold text-[16px]">Create Post</span>
        </CommonButton>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex-center overflow-hidden">
            <Image 
              src={user?.image || DefaultAvatar} 
              alt={user?.name || "User Avatar"} 
              className="object-cover w-full h-full" 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-black truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}