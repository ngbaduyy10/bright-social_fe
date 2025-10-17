import { Plus } from "lucide-react";
import CommonButton from "@/components/atoms/CommonButton";
import NavItems from "./NavItems";

export default async function LeftSidebar() {

  return (
    <div className="h-full flex flex-col gap-3 bg-background py-4 md:py-6 px-2 overflow-y-auto scrollbar-hide">
      <div className="px-4 py-6 bg-white rounded-lg">
        <NavItems />

        <CommonButton className="w-full px-4 py-6 gap-2">
          <Plus size={20} className="stroke-[3]" />
          <span className="font-semibold text-[16px]">Create Post</span>
        </CommonButton>
      </div>
    </div>
  );
}