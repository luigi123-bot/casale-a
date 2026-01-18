'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '~/store/auth';
import '~/styles/pos-theme.css';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex">
      {/* Sidebar */}
      <aside className="sidebar w-72 flex flex-col justify-between py-6 px-4">
        <div>
          <div className="flex items-center mb-8">
            <img src="/logo-pos.png" alt="Logo" className="h-10 w-10 mr-2" />
            <span className="font-bold text-xl">La Bella</span>
          </div>
          <nav className="space-y-2">
            <Link
              href="/client/menu"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                pathname === '/client/menu'
                  ? 'active'
                  : 'hover:bg-[var(--color-bg)] text-gray-700'
              }`}
            >
              <span className="material-icons">restaurant_menu</span>
              Menú
            </Link>
            <Link
              href="/client/cart"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                pathname === '/client/cart'
                  ? 'active'
                  : 'hover:bg-[var(--color-bg)] text-gray-700'
              }`}
            >
              <span className="material-icons">shopping_cart</span>
              Carrito
            </Link>
            <Link
              href="/client/orders"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                pathname === '/client/orders'
                  ? 'active'
                  : 'hover:bg-[var(--color-bg)] text-gray-700'
              }`}
            >
              <span className="material-icons">receipt_long</span>
              Pedidos
            </Link>
          </nav>
        </div>
        <div className="text-xs text-gray-400 text-center mt-8">POS v1.0</div>
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="header flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <span className="material-icons text-[var(--color-primary)]">
              local_fire_department
            </span>
            <span className="font-semibold text-lg">Casa Leña</span>
            <span className="ml-2 px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs">
              Abierto
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-gray-600 text-sm">
              {new Date().toLocaleTimeString()}
            </span>
            <span className="text-gray-600 text-sm">
              {new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
              <span className="material-icons text-[var(--color-primary)]">
                person
              </span>
              <span className="font-semibold">Luis</span>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 btn-primary px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 px-8 py-6">{children}</main>
      </div>
    </div>
  );
}