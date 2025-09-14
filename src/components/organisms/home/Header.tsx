import CommonButton from "@/components/atoms/CommonButton";
import LightningIcon from "@/components/atoms/LightningIcon";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white py-4 shadow-md">
      <div className="page-container flex-between text-black">
        <div className="flex items-center gap-1">
          <LightningIcon size={"xl"} />
          <span className="text-3xl font-extrabold">Bright</span>
        </div>

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