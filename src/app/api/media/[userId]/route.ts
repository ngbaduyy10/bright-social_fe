import { NextRequest, NextResponse } from 'next/server';
import { fetchApiWithAuth } from '@/utils/api';
import { mediaLimit } from '@/utils/constant';
import { ApiResponse } from '@/dto/apiResponse.dto';
import Media from '@/models/media';

interface RouteParams {
  params: Promise<{ userId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await params;
    const { searchParams } = new URL(request.url);
    const pageNum = Number.parseInt(searchParams.get('page') ?? '1', 10);
    const limitNum = Number.parseInt(searchParams.get('limit') ?? mediaLimit.toString(), 10);

    const response: ApiResponse<Media[]> = await fetchApiWithAuth(`/media/user/${userId}?page=${pageNum}&limit=${limitNum}`, {
      method: 'GET',
      cache: 'no-store',
    });

    return NextResponse.json(response.data);

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user media' }, { status: 500 });
  }
}
