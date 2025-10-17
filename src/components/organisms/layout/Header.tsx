import Logo from "@/components/atoms/Logo";
import { Bell } from "lucide-react";
import CommonButton from "@/components/atoms/CommonButton";
import SearchInput from "@/components/molecules/SearchInput";
import AvatarDropDown from "@/components/atoms/AvatarDropDown";

export default function Header() {
  return (
    <header className="py-3 px-4 text-black">
      <div className="flex-between max-md:mb-2">
        <div className="flex items-center gap-12">
          <Logo className="text-black gap-1" />
          <div className="max-md:hidden">
            <SearchInput />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <CommonButton className="p-0 bg-white text-black relative">
              <Bell size={24} />
              <span className="absolute top-0 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex-center">
                2
              </span>
            </CommonButton>
          </div>
          <AvatarDropDown />
        </div>
      </div>
      <div className="md:hidden">
        <SearchInput />
      </div>
    </header>
  )
}