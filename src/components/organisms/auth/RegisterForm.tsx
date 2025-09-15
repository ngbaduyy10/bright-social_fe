"use client";

import {Form} from "@/components/ui/form";
import LoadingCircle from "@/components/atoms/LoadingCircle";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerFormSchema, RegisterFormData} from "@/utils/zod";
import CustomFormControl from "@/components/molecules/CustomFormControl";
import CommonButton from "@/components/atoms/CommonButton";
import GoogleSignInButton from "@/components/atoms/GoogleSignInButton";
import Link from "next/link";
import {registerUser} from "@/lib/actions/auth.action";
import {toast} from "sonner";
import {signIn} from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const result = await registerUser(data);
      if (result.success) {
        const response = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (!response.error) {
          form.reset();
          router.push("/news-feed");
          toast.success("Registration successful!");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
          <CustomFormControl
            control={form.control}
            name={"username"}
            label={"Username"}
            type={"text"}
            placeholder={"Username"}
          />
          <CustomFormControl
            control={form.control}
            name={"email"}
            label={"Email"}
            type={"email"}
            placeholder={"Email"}
          />
          <CustomFormControl
            control={form.control}
            name={"password"}
            label={"Password"}
            type={"password"}
            placeholder={"Password"}
          />
          <CustomFormControl
            control={form.control}
            name={"confirmPassword"}
            label={"Confirm Password"}
            type={"password"}
            placeholder={"Confirm Password"}
          />
          <CommonButton
            type="submit" 
            disabled={loading} 
            className="w-full mt-2"
          >
            <LoadingCircle loading={loading}>Sign Up</LoadingCircle>
          </CommonButton>
        </form>
      </Form>
      <p className="text-sm text-muted-foreground mt-2">
        Already have an account?{" "}
        <Link href="/login" className="text-black hover:underline cursor-pointer">
          Sign In
        </Link>
      </p>
      <div className="flex items-center my-1 w-full">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-muted-foreground">Or</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      <GoogleSignInButton text="Sign up with Google" />
    </>
  );
}