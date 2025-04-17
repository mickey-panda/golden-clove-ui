import { NextResponse } from 'next/server';
import { phonepeClient } from '@/lib/phonepe';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ merchantOrderId: string }> } // Type params as a Promise
) {
  try {
    // Await params to resolve the Promise
    const { merchantOrderId } = await params;

    // Validate merchantOrderId
    if (!merchantOrderId) {
      return NextResponse.json(
        { error: 'merchantOrderId is required' },
        { status: 400 }
      );
    }

    // Check order status
    const response = await phonepeClient.getOrderStatus(merchantOrderId);
    console.log("orderstaus ::::::::::", response);
    // Extract state
    const state = response.state;

    return NextResponse.json({
      success: true,
      merchantOrderId,
      state,
      details: response,
    });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check status', details: error },
      { status: 500 }
    );
  }
}