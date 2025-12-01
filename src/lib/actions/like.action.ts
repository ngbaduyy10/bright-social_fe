"use server";

import { fetchApiWithAuth } from "@/utils/api";

export async function likePost(postId: string) {
  const response = await fetchApiWithAuth(`/like/${postId}`, {
    method: "POST",
  });

  return response;
}

export async function unlikePost(postId: string) {
  const response = await fetchApiWithAuth(`/like/${postId}`, {
    method: "DELETE",
  });

  return response;
}