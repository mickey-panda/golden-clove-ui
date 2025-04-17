import { NextResponse } from 'next/server';
import { phonepeClient } from '@/lib/phonepe';

export async function POST(request: Request) {
  try {
    const { authorizationHeaderData, callbackResponseBody } =
      await request.json();

    // Validate input
    if (!authorizationHeaderData || !callbackResponseBody) {
      return NextResponse.json(
        { error: 'Authorization header and callback body are required' },
        { status: 400 }
      );
    }

    // Validate callback
    const callbackResponse = phonepeClient.validateCallback(
      process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_USERNAME!,
      process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_PASSWORD!,
      authorizationHeaderData,
      callbackResponseBody
    );

    const orderId = callbackResponse.payload.orderId;
    const state = callbackResponse.payload.state;

    // Process the callback (e.g., update order status in database)
    console.log(`Callback received for order ${orderId}: ${state}`);

    return NextResponse.json({
      success: true,
      orderId,
      state,
    });
  } catch (error) {
    console.error('Callback validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate callback', details: error },
      { status: 500 }
    );
  }
}