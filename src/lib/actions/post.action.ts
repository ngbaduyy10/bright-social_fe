"use server";

import { fetchApiWithAuth } from "@/utils/api";

export async function createPost(formData: FormData) {
  return await fetchApiWithAuth('/post', {
    method: 'POST',
    body: formData,
  });
}

export async function deletePost(postId: string) {
  return await fetchApiWithAuth(`/post/${postId}`, {
    method: 'DELETE',
  });
}

