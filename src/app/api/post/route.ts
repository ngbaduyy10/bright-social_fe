import { NextRequest, NextResponse } from 'next/server';
import { fetchApiWithAuth } from '@/utils/api';
import Post from '@/models/post';
import { postLimit } from '@/utils/constant';
import { ApiResponse } from '@/dto/apiResponse.dto';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageNum = Number.parseInt(searchParams.get('page') ?? '1', 10);
    const limitNum = Number.parseInt(searchParams.get('limit') ?? postLimit.toString(), 10);

    const response: ApiResponse<Post[]> = await fetchApiWithAuth(`/post?page=${pageNum}&limit=${limitNum}`, {
      method: 'GET',
      cache: 'no-store',
    });

    return NextResponse.json(response);

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
