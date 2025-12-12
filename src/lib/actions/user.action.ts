"use server";

import { Filter } from "@/types";
import { fetchApiWithAuth } from "@/utils/api";

export async function getAllUsers({ keyword, page, limit }: Filter) {
  const params = new URLSearchParams();
  if (keyword) params.append("keyword", keyword);
  params.append("page", String(page));
  params.append("limit", String(limit));

  const url = `/user?${params.toString()}`;
  const response = await fetchApiWithAuth(url, { method: "GET" });
  return response;
}

export async function updateUser(formData: FormData) {
  const response = await fetchApiWithAuth(`/user`, {
    method: "PATCH",
    body: formData,
  });
  return response;
}