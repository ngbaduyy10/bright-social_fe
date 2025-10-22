import { NextRequest, NextResponse } from "next/server";
import { userLimit } from "@/utils/constant";
import { fetchApiWithAuth } from "@/utils/api";
import { ApiResponse } from "@/dto/apiResponse.dto";
import User from "@/models/user";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params = new URLSearchParams();
    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || userLimit.toString();
    
    if (keyword) params.append('keyword', keyword);
    params.append('page', page);
    params.append('limit', limit);

    const response: ApiResponse<User[]> = await fetchApiWithAuth(
      `/user?${params.toString()}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}