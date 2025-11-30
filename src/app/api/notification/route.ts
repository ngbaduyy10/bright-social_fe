import { ApiResponse } from "@/dto/apiResponse.dto";
import { fetchApiWithAuth } from "@/utils/api";
import { notificationLimit } from "@/utils/constant";
import { NextRequest, NextResponse } from "next/server";
import Notification from "@/models/notification";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || notificationLimit.toString();

    const response: ApiResponse<Notification[]> = await fetchApiWithAuth(
      `/notification?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}