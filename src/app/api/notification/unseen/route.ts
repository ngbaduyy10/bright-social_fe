import { ApiResponse } from "@/dto/apiResponse.dto";
import { fetchApiWithAuth } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response: ApiResponse<{ unseen_count: number }> = await fetchApiWithAuth(
      `/notification/unseen-count`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch unseen count:', error);
    return NextResponse.json({ error: 'Failed to fetch unseen count' }, { status: 500 });
  }
}

