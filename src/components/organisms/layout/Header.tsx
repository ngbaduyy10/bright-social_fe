import Logo from "@/components/atoms/Logo";
import { auth } from "@/auth";
import Image from "next/image";
import DefaultAvatar from "@/static/icons/default_avatar.png";
import { Bell, MessageCircle } from "lucide-react";
import CommonButton from "@/components/atoms/CommonButton";
import SearchInput from "@/components/molecules/SearchInput";

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="py-3 px-4 text-black">
      <div className="flex-between max-md:mb-2">
        <Logo className="text-black gap-1" />

        <div className="flex items-center gap-12">
          <div className="max-md:hidden">
            <SearchInput />
          </div>

          <div className="flex items-center gap-4">
            <CommonButton className="p-0 bg-white text-black relative">
              <MessageCircle size={22} />
              <span className="absolute top-0 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex-center">
                1
              </span>
            </CommonButton>
            <CommonButton className="p-0 bg-white text-black relative">
              <Bell size={24} />
              <span className="absolute top-0 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex-center">
                2
              </span>
            </CommonButton>
            <CommonButton className="w-11 h-11 p-0 rounded-full bg-white overflow-hidden">
              <Image 
                src={user?.image || DefaultAvatar} 
                alt={user?.name || "User Avatar"} 
                className="object-cover w-full h-full" 
              />
            </CommonButton>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <SearchInput />
      </div>
    </header>
  )
}