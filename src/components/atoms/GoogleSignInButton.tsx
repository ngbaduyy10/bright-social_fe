import CommonButton from "./CommonButton";
import {signIn} from "next-auth/react";
import GoogleIcon from "@/static/icons/google.png";
import Image from "next/image";

interface GoogleSignInButtonProps {
  text: string;
}

export default function GoogleSignInButton({ text }: GoogleSignInButtonProps) {
  const handleGoogleSignIn = async () => {
    await signIn("google", { redirectTo: "/dashboard" });
  }

  return (
    <CommonButton onClick={handleGoogleSignIn}>
      <div className="flex items-center gap-1 border border-gray-300 rounded-md py-2 px-4">
        <Image src={GoogleIcon} alt="Google" width={20} height={20} className="bg-white" />
        {text}
      </div>
    </CommonButton>
  )
}