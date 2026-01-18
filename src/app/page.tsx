'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '~/store/auth';

export default function HomePage() {
  const { session } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    } else {
      // Redirect based on role
      switch (session.user.role) {
        case 'CLIENT':
          router.push('/client');
          break;
        case 'CASHIER':
          router.push('/cashier');
          break;
        case 'ADMIN':
          router.push('/admin');
          break;
        case 'SUPER_ADMIN':
          router.push('/super-admin');
          break;
        default:
          router.push('/login');
      }
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Redirigiendo...</h1>
      </div>
    </div>
  );
}
