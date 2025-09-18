import CommonButton from "@/components/atoms/CommonButton";
import Logo from "@/components/atoms/Logo";
import Link from "next/link";
import { homeNavItems } from "@/utils/constant";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-10 bg-white py-4 shadow-md">
      <div className="page-container flex-between text-black">
        <Logo className="text-black gap-1" />

        <div className="hidden md:flex items-center gap-8 text-xl">
          {homeNavItems.map((item) => (
            <CommonButton key={item.id} className="p-0 bg-transparent text-black font-normal text-xl">
              <Link key={item.id} href={item.href}>{item.label}</Link>
            </CommonButton>
          ))}
        </div>

        <CommonButton href="/login" className="px-8">Sign In</CommonButton>
      </div>
    </header>
  )
}