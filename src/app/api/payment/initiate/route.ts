import { NextResponse } from 'next/server';
import { StandardCheckoutPayRequest } from 'pg-sdk-node';
import { randomUUID } from 'crypto';
import { phonepeClient } from '@/lib/phonepe';

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    // Validate input
    if (!amount) {
      return NextResponse.json(
        { error: 'Amount is required' },
        { status: 400 }
      );
    }

    // Generate a unique merchant order ID
    const merchantOrderId = `MO-${randomUUID().toString().slice(-12)}`;
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/status/${merchantOrderId}`;
    // Build the payment request
    const payRequest = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(amount) // Amount in paise (e.g., 100 for ₹1)
      .redirectUrl(redirectUrl) // URL to redirect after payment
      .build();

    // Initiate payment
    const response = await phonepeClient.pay(payRequest);

    // Extract checkout URL
    const checkoutPageUrl = response.redirectUrl;

    return NextResponse.json({
      success: true,
      merchantOrderId,
      checkoutPageUrl,
    });
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment', details: error },
      { status: 500 }
    );
  }
}