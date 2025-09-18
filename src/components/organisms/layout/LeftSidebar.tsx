import { Plus } from "lucide-react";
import CommonButton from "@/components/atoms/CommonButton";
import NavItems from "./NavItems";

export default async function LeftSidebar() {

  return (
    <div className="h-full flex flex-col gap-3 bg-background py-6 md:py-8 px-4 overflow-y-auto scrollbar-hide">
      <div className="px-4 py-6 bg-white rounded-lg h-[250px]">
        {/* Profile */}
      </div>
      <div className="px-4 py-6 bg-white rounded-lg">
        <NavItems />

        <CommonButton className="w-full px-4 py-6 gap-2">
          <Plus size={20} />
          <span className="font-semibold text-[16px]">Create Post</span>
        </CommonButton>
      </div>
    </div>
  );
}