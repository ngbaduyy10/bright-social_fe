import { ReactNode } from "react";
import Sidebar from "@/components/organisms/layout/Sidebar";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="w-64 h-screen sticky top-0 max-md:hidden">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col max-w-screen p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
