"use server";

import { fetchApiWithAuth } from "@/utils/api";
import { revalidatePath } from "next/cache";

export async function savePost(postId: string) {
  const response = await fetchApiWithAuth(`/save/${postId}`, {
    method: "POST",
  });
  
  if (response.success) {
    revalidatePath("/profile", "layout");
  }
  
  return response;
}

export async function unsavePost(postId: string) {
  const response = await fetchApiWithAuth(`/save/${postId}`, {
    method: "DELETE",
  });
  
  if (response.success) {
    revalidatePath("/profile", "layout");
  }
  
  return response;
}