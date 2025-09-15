"use client";

import CommonButton from "./CommonButton";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingCircle from "./LoadingCircle";
import { useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    router.push("/login");
    setLoading(false);
  }

  return (
    <CommonButton
      className="p-1 h-fit bg-white text-gray-400 hover:bg-secondary hover:text-primary"
      onClick={handleLogout}
      disabled={loading}
    >
      <LoadingCircle loading={loading}>
        <LogOut className="w-5 h-5" />
      </LoadingCircle>
    </CommonButton>
  )
}
