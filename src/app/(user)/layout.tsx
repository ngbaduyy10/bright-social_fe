import { ReactNode } from "react";
import LeftSidebar from "@/components/organisms/layout/LeftSidebar";
import RightSidebar from "@/components/organisms/layout/RightSidebar";
import Header from "@/components/organisms/layout/Header";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <div className="fixed top-0 left-0 right-0 h-[116px] md:h-[68px] border-b border-gray-200 shadow-sm z-10 bg-white">
        <Header />
      </div>
      <div className="flex flex-1 pt-[116px] md:pt-[68px]">
        <div className="w-80 fixed top-[68px] left-0 h-[calc(100vh-68px)] max-lg:hidden">
          <LeftSidebar />
        </div>
        <div className="mx-0 md:mr-80 lg:mx-80 h-[calc(100vh-116px)] md:h-[calc(100vh-68px)] w-full">
          <main className="flex-1 flex flex-col max-w-full overflow-y-auto py-6 md:py-8 px-4 bg-background">
            {children}
          </main>
        </div>
        <div className="w-80 fixed top-[68px] right-0 h-[calc(100vh-68px)] max-md:hidden">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
