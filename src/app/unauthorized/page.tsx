'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UnauthorizedPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-red-600">403 - Unauthorized Access</h1>
      <p className="text-lg text-gray-600">
        You don't have permission to access this page
      </p>
      <button
        onClick={() => router.push('/')}
      >
        Return to Home
      </button>
    </div>
  );
};

export default UnauthorizedPage;