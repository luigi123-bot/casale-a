'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '~/store/auth';
import '~/styles/globals.css';

interface SuperAdminLayoutProps {
  children: ReactNode;
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { href: '/super-admin', label: 'Dashboard' },
    { href: '/super-admin/users', label: 'Usuarios' },
    { href: '/super-admin/settings', label: 'Configuración' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] flex">
      {/* Sidebar */}
      <aside className="sidebar w-72 flex flex-col justify-between py-6 px-4">
        <div>
          <div className="flex items-center mb-8">
            <img src="/logo-pos.png" alt="Logo" className="h-10 w-10 mr-2" />
            <span className="font-bold text-xl">Casa Leña</span>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${pathname === item.href ? 'active' : ''}`}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="text-xs text-gray-400 text-center mt-8">POS v1.0</div>
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="header flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <span className="material-icons text-[var(--color-primary)]">local_fire_department</span>
            <span className="font-semibold text-lg">Casa Leña</span>
            <span className="ml-2 badge">Abierto</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-gray-600 text-sm">{new Date().toLocaleTimeString()}</span>
            <span className="text-gray-600 text-sm">{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
              <span className="material-icons text-[var(--color-primary)]">person</span>
              <span className="font-semibold">Super Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 btn btn-primary px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}