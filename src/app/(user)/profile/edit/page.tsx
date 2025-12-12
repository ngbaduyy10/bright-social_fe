"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import CustomFormControl from "@/components/molecules/CustomFormControl";
import CommonButton from "@/components/atoms/CommonButton";
import { editProfileFormSchema, EditProfileFormData } from "@/utils/zod";
import { Gender } from "@/types";
import { User as UserIcon, Mail, Phone, RotateCcw } from "lucide-react";
import PageTitle from "@/components/atoms/PageTitle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CoverImageUpload from "@/components/molecules/CoverImageUpload";
import AvatarUpload from "@/components/molecules/AvatarUpload";
import { updateUser } from "@/lib/actions/user.action";
import { toast } from "sonner";
import User from "@/models/user";
import useSWR, { useSWRConfig } from "swr";
import { ApiResponse } from "@/dto/apiResponse.dto";
import { useSession } from "next-auth/react";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await response.json();
  return data;
};

export default function EditProfilePage() {
  const { data: session } = useSession();
  const { mutate: mutateSWR } = useSWRConfig();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const {
    data: userResponse,
  } = useSWR<ApiResponse<User>>(
    session ? "/api/user/me" : null,
    fetcher
  );

  const userData = userResponse?.data;

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      gender: undefined,
      phone: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        email: userData.email || "",
        username: userData.username || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        gender: userData.gender,
        phone: userData.phone || "",
        bio: userData.bio || "",
      });

      if (userData.image) {
        setProfileImage(userData.image);
      }
      if (userData.cover_image) {
        setCoverImage(userData.cover_image);
      }
    }
  }, [userData, form]);

  const onSubmit = async (data: EditProfileFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "email") return;
        
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      if (profileFile) {
        formData.append("image", profileFile);
      }

      if (coverFile) {
        formData.append("cover_image", coverFile);
      }

      const response = await updateUser(formData);
      if (response.success) {
        toast.success("Profile updated successfully");
        mutateSWR("/api/user/me");
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle title="Edit Profile" description="Edit your profile information" />

      <Form {...form}>
        <div onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl shadow-sm p-4">
          <AvatarUpload image={profileImage} setImage={setProfileImage} setFile={setProfileFile} />

          <CoverImageUpload image={coverImage} setImage={setCoverImage} setFile={setCoverFile} />

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <CustomFormControl
              control={form.control}
              name="first_name"
              label="First Name"
              type="text"
              icon={UserIcon}
              classNameInput="h-11"
            />
            <CustomFormControl
              control={form.control}
              name="last_name"
              label="Last Name"
              type="text"
              icon={UserIcon}
              classNameInput="h-11"
            />
          </div>

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <CustomFormControl
              control={form.control}
              name="username"
              label="Username"
              type="text"
              icon={UserIcon}
              classNameInput="h-11"
            />

            <CustomFormControl
              control={form.control}
              name="email"
              label="Email"
              type="email"
              icon={Mail}
              classNameInput="h-11"
              disabled={true}
            />
          </div>

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <CustomFormControl
              control={form.control}
              name="phone"
              label="Phone"
              type="tel"
              icon={Phone}
              classNameInput="h-11"
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field, fieldState }) => (
                <FormItem className="gap-1">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value || ""}
                      onValueChange={(value) => field.onChange(value || undefined)}
                      className="flex gap-6 h-11 py-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={Gender.MALE} id="male" />
                        <Label htmlFor="male" className="cursor-pointer">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={Gender.FEMALE} id="female" />
                        <Label htmlFor="female" className="cursor-pointer">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={Gender.OTHER} id="other" />
                        <Label htmlFor="other" className="cursor-pointer">Other</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field, fieldState }) => (
              <FormItem className="gap-1 [&_textarea]:outline-none [&_textarea]:shadow-none [&_textarea]:focus-visible:ring-0">
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Tell us about yourself..."
                    className={`
                      min-h-[8rem] transition-all duration-200 ease-in-out border-none
                      focus:ring-2 focus:ring-primary focus:border-primary bg-background
                      ${fieldState.error && 'border-red-500 focus:ring-red-500 focus:border-red-500'}
                    `}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3">
            <CommonButton
              onClick={() => {
                form.reset();
                setProfileImage(null);
                setProfileFile(null);
                setCoverImage(null);
                setCoverFile(null);
              }}
              disabled={loading}
              className="gap-1 bg-secondary text-primary"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </CommonButton>
            <CommonButton
              onClick={form.handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </CommonButton>
          </div>
        </div>
      </Form>
    </>
  );
}