"use client";

import { Bell, MoveRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationCard from "@/components/molecules/NotificationCard";
import { notifications } from "@/utils/constant";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NotificationDropdown() {
  const sortNotifications = notifications.slice(0, 5);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleViewAll = () => {
    setOpen(false);
    router.push("/notifications");
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-white hover:bg-white p-0! relative focus-visible:ring-0">
          <Bell className="w-[26px]! h-[26px]! text-black" />
          <span className="absolute top-0 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex-center">
            2
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 border-gray-200">
        <div className="p-2 border-b border-gray-200">
          <p className="font-semibold text-md">Notifications</p>
        </div>
        <div className="py-1">
          {sortNotifications.length > 0 ? (
            sortNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                setOpen={setOpen}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          )}
          <p 
            className="text-sm text-muted-foreground border-t border-gray-200 pt-2 px-2 flex items-center justify-end gap-1 cursor-pointer hover:text-primary"
            onClick={handleViewAll}
          >
            View All
            <MoveRight size={18} />
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}