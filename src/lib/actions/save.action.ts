"use server";

import { fetchApiWithAuth } from "@/utils/api";

export async function savePost(postId: string) {
  const response = await fetchApiWithAuth(`/save/${postId}`, {
    method: "POST",
  });
  return response;
}

export async function unsavePost(postId: string) {
  const response = await fetchApiWithAuth(`/save/${postId}`, {
    method: "DELETE",
  });
  return response;
}