const API_BASE_URL = process.env.BE_URL;

type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

interface FetchAPIOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  authToken?: string;
  body?: Record<string, unknown> | string;
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
}

export async function fetchApi(url: string, options?: FetchAPIOptions) {
  const { method, authToken, body, next, cache } = options || {};

  const headers: RequestInit & { next?: NextFetchRequestConfig } = {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(next && { next }),
    ...(cache && { cache }),
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, headers);
    const contentType = response.headers.get("content-type");
    const data = await response.json();
    if (
      contentType &&
      contentType.includes("application/json") &&
      response.ok
    ) {
      return { success: true, ...data };
    } else {
      return { success: false, ...data };
    }
  } catch (error) {
    console.error(`Error ${method} data:`, error);
    throw error;
  }
}
