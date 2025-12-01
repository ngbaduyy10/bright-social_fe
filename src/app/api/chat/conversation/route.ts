import { NextResponse } from 'next/server';
import { fetchApiWithAuth } from '@/utils/api';
import Conversation from '@/models/conversation';
import { ApiResponse } from '@/dto/apiResponse.dto';

export async function GET() {
  try {
    const response: ApiResponse<Conversation[]> = await fetchApiWithAuth(
      '/chat/conversation',
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch conversations',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
