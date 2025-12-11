"use server";

import { fetchApiWithAuth } from "@/utils/api";
import { revalidatePath } from "next/cache";
import { MediaType } from "@/types";
import { ImageData } from "@/hooks/useUploadMultipleImages";

interface CreatePostMedia {
  url: string;
  type: MediaType;
  width: number;
  height: number;
}

interface CreatePostPayload {
  content?: string;
  media?: CreatePostMedia[];
}

export async function createPost(content: string, images: ImageData[]) {
  const payload: CreatePostPayload = {};

  if (content.trim()) {
    payload.content = content.trim();
  }

  if (images.length > 0) {
    payload.media = images.map((img) => ({
      url: img.url,
      type: MediaType.IMAGE,
      width: img.width,
      height: img.height,
    }));
  }

  const response = await fetchApiWithAuth("/post", {
    method: "POST",
    body: payload as Record<string, unknown>,
  });

  if (response.success) {
    revalidatePath("/home", "page");
    revalidatePath("/profile", "layout");
  }

  return response;
}
