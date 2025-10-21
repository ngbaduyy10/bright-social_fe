import { NextRequest, NextResponse } from "next/server";
import { storyLimit } from "@/utils/constant";
import { ApiResponse } from "@/dto/apiResponse.dto";
import { UserStory } from "@/dto/userStory.dto";
import { fetchApiWithAuth } from "@/utils/api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageNum = Number.parseInt(searchParams.get('page') ?? '1', 10);
    const limitNum = Number.parseInt(searchParams.get('limit') ?? storyLimit.toString(), 10);

    const response: ApiResponse<UserStory[]> = await fetchApiWithAuth(`/story?page=${pageNum}&limit=${limitNum}`, {
      method: 'GET',
      cache: 'no-store',
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
  }
}