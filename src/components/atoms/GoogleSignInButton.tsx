"use client";

import CommonButton from "./CommonButton";
import {signIn} from "next-auth/react";
import GoogleIcon from "@/static/icons/google.png";
import Image from "next/image";
import LoadingCircle from "./LoadingCircle";
import { useState } from "react";

interface GoogleSignInButtonProps {
  text: string;
}

export default function GoogleSignInButton({ text }: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn("google", { redirectTo: "/home" });
    setLoading(false);
  }

  return (
    <CommonButton 
      onClick={handleGoogleSignIn} 
      className="border border-gray-300 bg-white text-black w-full"
      disabled={loading}
    >
      <LoadingCircle loading={loading}>
        <div className="flex items-center gap-1">
          <Image src={GoogleIcon} alt="Google" width={20} height={20} className="bg-white" />
          {text}
        </div>
      </LoadingCircle>
    </CommonButton>
  )
}