import { NextRequest, NextResponse } from 'next/server';
import { fetchApiWithAuth } from '@/utils/api';
import Friend from '@/models/friend';
import { ApiResponse } from '@/dto/apiResponse.dto';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageNum = Number.parseInt(searchParams.get('page') ?? '1', 10);
    const limitNum = Number.parseInt(searchParams.get('limit') ?? '20', 10);

    const response: ApiResponse<Friend[]> = await fetchApiWithAuth(
      `/friend?page=${pageNum}&limit=${limitNum}`, 
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    return NextResponse.json(response.data);

  } catch (error) {
    console.error('Failed to fetch friends:', error);
    return NextResponse.json({ error: 'Failed to fetch friends' }, { status: 500 });
  }
}

