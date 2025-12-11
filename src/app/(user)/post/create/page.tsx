"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/actions/post.action";
import { Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";
import UserAvatar from "@/components/atoms/UserAvatar";
import CommonButton from "@/components/atoms/CommonButton";
import { cn } from "@/lib/utils";
import PageTitle from "@/components/atoms/PageTitle";
import Image from "next/image";
import { useUploadMultipleImages, ImageData } from "@/hooks/useUploadMultipleImages";

export default function CreatePostPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;
  const [content, setContent] = useState("");
  const [images, setImages] = useState<ImageData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    isDragging,
    fileInputRef,
    handleFileInputChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveImage
  } = useUploadMultipleImages({ images, setImages });

  const handleSubmit = async () => {
    if (!content.trim() && images.length === 0) return;

    setIsSubmitting(true);
    try {
      const response = await createPost(content, images);
      if (response.success) {
        toast.success("Post created successfully!");
        router.push("/home");
      } else {
        toast.error(response.message || "Failed to create post");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageTitle title="Create Post" description="Share your thoughts with the world" />

      <div
        className={cn(
          "bg-white rounded-xl shadow-sm p-4 transition-all",
          isDragging && "ring-2 ring-primary ring-offset-2 bg-secondary"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex items-center gap-3 mb-6">
          <UserAvatar
            image={user?.image || undefined}
            className="w-12 h-12"
          />
          <div>
            <p className="font-semibold text-foreground">{user?.first_name} {user?.last_name}</p>
            <p className="text-sm text-muted-foreground">@{user?.name}</p>
          </div>
        </div>

        <div className="mb-6">
          <textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border-none text-lg p-0 focus:outline-none focus:ring-0 resize-none placeholder:text-muted-foreground/50"
            rows={4}
          />
        </div>

        {images.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            {images.map((image, index) => (
              <div key={index} className="group relative w-32 h-32 rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt={`Preview ${index + 1}`}
                  className="object-cover"
                  fill
                />
                <div
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 h-6 w-6 flex-center bg-black/50 text-white rounded-full hover:bg-black/70 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 stroke-[3]" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex-between pt-2 border-t border-border">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex-center w-10 h-10 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
          >
            <ImageIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
          />

          <CommonButton
            className="px-8"
            disabled={(!content.trim() && images.length === 0) || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </CommonButton>
        </div>
      </div>
    </>
  );
}