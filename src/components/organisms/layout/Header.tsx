import Logo from "@/components/atoms/Logo";
import AvatarDropDown from "@/components/atoms/AvatarDropDown";
import NotificationDropdown from "@/components/organisms/NotificationDropdown";
import SearchInputDropdown from "@/components/organisms/SearchInputDropdown";

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