"use client";

import Image from "next/image";
import DefaultAvatar from "@/static/icons/default_avatar.png";
import { signOut, useSession } from "next-auth/react";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import useSWR from "swr";
import { ApiResponse } from "@/dto/apiResponse.dto";
import UserModel from "@/models/user";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await response.json();
  return data;
};

export default function AvatarDropDown() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    data: userResponse,
  } = useSWR<ApiResponse<UserModel>>(
    session ? "/api/user/me" : null,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 0,
    }
  );

  const userData = userResponse?.data;

  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    router.push("/login");
    setLoading(false);
  }

  const displayName = userData?.first_name && userData?.last_name
    ? `${userData.first_name} ${userData.last_name}`
    : userData?.username || "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild> 
        <Button className="w-10 h-10 p-0 rounded-full bg-white hover:bg-white overflow-hidden focus-visible:ring-0">
          <Image 
            src={userData?.image || DefaultAvatar} 
            alt={userData?.username || "User Avatar"} 
            className="object-cover w-full h-full" 
            width={40}
            height={40}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-gray-200">
        <div className="flex items-center justify-start gap-2 px-2 py-1">
          <div className="flex flex-col">
            <p className="font-sm truncate">{displayName}</p>
            <p className="truncate text-sm text-muted-foreground">@{userData?.username || ""}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => router.push(`/profile/${userData?.username || ""}`)}
        >
          <User className="mr-1" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={handleLogout}
          disabled={loading}
        >
          <LogOut className="mr-1" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}