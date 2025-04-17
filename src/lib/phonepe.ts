import { StandardCheckoutClient, Env } from 'pg-sdk-node';

const clientId = process.env.NEXT_PUBLIC_PHONEPE_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_PHONEPE_CLIENT_SECRET!;
const clientVersion = parseInt(process.env.NEXT_PUBLIC_PHONEPE_CLIENT_VERSION || '1', 10);
const env = process.env.NEXT_PUBLIC_PHONEPE_ENV === 'PRODUCTION' ? Env.PRODUCTION : Env.SANDBOX;

if (!clientId || !clientSecret) {
  throw new Error('PhonePe client credentials are not configured');
}

// Initialize and export the singleton client
export const phonepeClient = StandardCheckoutClient.getInstance(
  clientId,
  clientSecret,
  clientVersion,
  env
);