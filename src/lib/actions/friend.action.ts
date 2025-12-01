"use server";

import { fetchApiWithAuth } from "@/utils/api";

export async function sendRequest(friendId: string) {
  const response = await fetchApiWithAuth(`/friend/request/${friendId}`, {
    method: "POST",
  });

  return response;
}

export async function cancelRequest(friendId: string) {
  const response = await fetchApiWithAuth(`/friend/request/${friendId}`, {
    method: "DELETE",
  });

  return response;
}

export async function acceptRequest(friendId: string) {
  const response = await fetchApiWithAuth(`/friend/accept/${friendId}`, {
    method: "POST",
  });

  return response;
}

export async function rejectRequest(friendId: string) {
  const response = await fetchApiWithAuth(`/friend/reject/${friendId}`, {
    method: "POST",
  });

  return response;
}

export async function removeFriend(friendId: string) {
  const response = await fetchApiWithAuth(`/friend/${friendId}`, {
    method: "DELETE",
  });

  return response;
}

