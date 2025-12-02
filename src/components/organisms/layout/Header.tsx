import Logo from "@/components/atoms/Logo";
import AvatarDropDown from "@/components/atoms/AvatarDropDown";
import NotificationDropdown from "@/components/organisms/NotificationDropdown";
import SearchInputDropdown from "@/components/organisms/SearchInputDropdown";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-3 px-4 text-black">
      <div className="flex-between max-md:mb-2">  
        <Logo className="text-black gap-1" />

        <div className="flex items-center gap-14">
          <div className="max-md:hidden">
            <SearchInputDropdown />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Link href="/messages" className="relative">
                <MessageCircle className="w-[25px] h-[25px] text-black" />
                {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex-center">
                  4
                </span> */}
              </Link>
              <NotificationDropdown />
            </div>
            <AvatarDropDown />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <SearchInputDropdown />
      </div>
    </header>
  )
}