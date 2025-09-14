import CommonButton from "./CommonButton";
import {signIn} from "next-auth/react";
import GoogleIcon from "@/static/icons/google.png";
import Image from "next/image";

interface GoogleSignInButtonProps {
  text: string;
}

export default function GoogleSignInButton({ text }: GoogleSignInButtonProps) {
  const handleGoogleSignIn = async () => {
    await signIn("google", { redirectTo: "/news-feed" });
  }

  return (
    <CommonButton onClick={handleGoogleSignIn} className="border border-gray-300 bg-white text-black">
      <div className="flex items-center gap-1">
        <Image src={GoogleIcon} alt="Google" width={20} height={20} className="bg-white" />
        {text}
      </div>
    </CommonButton>
  )
}