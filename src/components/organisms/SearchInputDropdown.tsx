"use client";

import { useState } from "react";
import SearchInput from "../molecules/SearchInput";
import { History } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


export default function SearchInputDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="w-full md:w-[350px]">
          <SearchInput className="w-full" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[calc(100vw-2rem)] md:w-[350px] p-0 border-gray-200"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="px-3 py-2 text-muted-foreground border-b border-gray-200">Recent Searches</div>
        <div className="py-1">
          <div className="px-4 py-2 rounded hover:bg-accent cursor-pointer flex items-center gap-2">
            <History size={20} />
            Duy Nguyen
          </div>
          <div className="px-4 py-2 rounded hover:bg-accent cursor-pointer flex items-center gap-2">
            <History size={20} />
            Bright
          </div>
          <div className="px-4 py-2 rounded hover:bg-accent cursor-pointer flex items-center gap-2">
            <History size={20} />
            John Doe
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}