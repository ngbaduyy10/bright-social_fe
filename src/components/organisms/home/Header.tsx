import CommonButton from "@/components/atoms/CommonButton";
import Logo from "@/components/atoms/Logo";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white py-4 shadow-md">
      <div className="page-container flex-between text-black">
        <Logo className="text-black gap-1" />

        <div className="hidden md:flex items-center space-x-8 text-xl">
          <Link href="#">Home</Link>
          <Link href="#">Feature</Link>
          <Link href="#">Contact</Link>
        </div>

        <CommonButton href="/login" className="px-8">Sign In</CommonButton>
      </div>
    </header>
  )
}