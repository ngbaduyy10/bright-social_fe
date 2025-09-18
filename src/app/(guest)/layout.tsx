import HomeHeader from "@/components/organisms/home/HomeHeader";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeHeader />
      {children}
    </>
  )
}