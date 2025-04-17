import { notFound } from 'next/navigation';

interface StatusPageProps {
  params: Promise<{ id: string }>; // Type params as a Promise
}

async function fetchStatus(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/status/${id}`,
    { cache: 'no-store' }
  );

  console.log("Response ::::::::::", response);

  if (!response.ok) {
    return null;
  }
  return response.json();
}

export default async function StatusPage({ params }: StatusPageProps) {
  // Await params to resolve the Promise
  const { id } = await params;

  // Fetch status
  const statusData = await fetchStatus(id);
  
  if (!statusData) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Transaction Status</h1>
      <p className="mt-4">Transaction ID: {id}</p>
      <p>Status: {statusData.state}</p>
      {statusData.details && (
        <p>Details: {JSON.stringify(statusData.details)}</p>
      )}
    </div>
  );
}

export const dynamic = 'force-dynamic';