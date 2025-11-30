"use client";

import { Bell, MoveRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import NotificationSection from "./NotificationSection";
import Notification from "@/models/notification";
import { ApiResponse } from "@/dto/apiResponse.dto";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function NotificationDropdown() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [initialNotifications, setInitialNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: unseenCountData } = useSWR<ApiResponse<{ unseen_count: number }>>(
    "/api/notification/unseen",
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  );

  const unseenCount = unseenCountData?.data?.unseen_count ?? 0;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/notification?page=1&limit=5");
        const data: ApiResponse<Notification[]> = await response.json();
        if (data.data) {
          setInitialNotifications(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (open) {
      fetchNotifications();
    }
  }, [open]);

  const handleViewAll = () => {
    setOpen(false);
    router.push("/notifications");
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-white hover:bg-white p-0! relative focus-visible:ring-0">
          <Bell className="w-[26px]! h-[26px]! text-black" />
          {unseenCount > 0 && (
            <span className="absolute top-0 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex-center">
              {unseenCount > 9 ? "9+" : unseenCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-90 border-gray-200">
        <div className="p-2 border-b border-gray-200">
          <p className="font-semibold text-md">Notifications</p>
        </div>
        <div className="py-1">
          <NotificationSection initialNotifications={initialNotifications} setOpen={setOpen} isLoading={isLoading} />
          <div className="flex items-center justify-between border-t border-gray-200 pt-2 px-2">
            <p className="text-sm text-muted-foreground cursor-pointer hover:text-primary">
              Mark all as read
            </p>
            <p
              className="text-sm text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-primary"
              onClick={handleViewAll}
            >
              View All
              <MoveRight size={18} />
            </p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}