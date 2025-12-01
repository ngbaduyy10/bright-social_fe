"use server";

import { fetchApiWithAuth } from "@/utils/api";

export async function createComment(postId: string, content: string) {
  const response = await fetchApiWithAuth(`/comment/${postId}`, {
    method: "POST",
    body: { content },
  });

  return response;
}