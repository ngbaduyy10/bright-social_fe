"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/utils/zod";
import { z } from "zod";
import { useState } from "react";
import CustomFormControl from "@/components/molecules/CustomFormControl";
import LoadingCircle from "@/components/atoms/LoadingCircle";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    setLoading(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (!response.error) {
      router.push("/dashboard");
      toast.success("Login successful!");
    } else {
      toast.error("Invalid email or password.");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { redirectTo: "/dashboard" });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
          <CustomFormControl
            control={form.control}
            name={"email"}
            label={"Email"}
            type={"text"}
            placeholder={"Email"}
          />
          <CustomFormControl
            control={form.control}
            name={"password"}
            label={"Password"}
            type={"password"}
            placeholder={"Password"}
          />
          <Button type="submit" disabled={loading} className="w-full cursor-pointer mt-2">
            <LoadingCircle loading={loading} text={"Sign In"} />
          </Button>
        </form>
      </Form>
      <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
    </>
  )
}