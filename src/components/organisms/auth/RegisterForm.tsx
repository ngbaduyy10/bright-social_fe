"use client";

import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import LoadingCircle from "@/components/atoms/LoadingCircle";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerFormSchema} from "@/utils/zod";
import {z} from "zod";
import CustomFormControl from "@/components/molecules/CustomFormControl";
import CommonButton from "@/components/atoms/CommonButton";
import GoogleSignInButton from "@/components/atoms/GoogleSignInButton";
import Link from "next/link";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    setLoading(true);
    console.log("Form submitted with data:", data);
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
            name={"phone"}
            label={"Phone"}
            type={"tel"}
            placeholder={"Phone"}
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
            <LoadingCircle loading={loading} text={"Sign Up"} />
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