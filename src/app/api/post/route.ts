import { NextRequest, NextResponse } from 'next/server';
import { fetchApiWithAuth } from '@/utils/api';
import Post from '@/models/post';
import { postLimit } from '@/utils/constant';
import { ApiResponse } from '@/dto/apiResponse.dto';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params = new URLSearchParams();
    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || postLimit.toString();
    
    if (keyword) params.append('keyword', keyword);
    params.append('page', page);
    params.append('limit', limit);

    const response: ApiResponse<Post[]> = await fetchApiWithAuth(
      `/post?${params.toString()}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
