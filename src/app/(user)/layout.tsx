import { ReactNode } from "react";
import Sidebar from "@/components/organisms/layout/Sidebar";
import Header from "@/components/organisms/layout/Header";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col lg:pl-64 max-w-screen">
        <Header />
        <main className="flex-1 flex-col flex p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
