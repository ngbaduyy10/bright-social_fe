import { NextRequest, NextResponse } from "next/server";
import { fetchApiWithAuth } from "@/utils/api";
import { ApiResponse } from "@/dto/apiResponse.dto";
import User from "@/models/user";

export async function GET(request: NextRequest) {
  try {
    const response: ApiResponse<User> = await fetchApiWithAuth(
      `/user/me`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching current user:', error);
    return NextResponse.json({ error: 'Failed to fetch current user' }, { status: 500 });
  }
}

