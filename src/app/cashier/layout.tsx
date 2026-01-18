'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '~/store/auth';
import '~/styles/pos-theme.css';

interface CashierLayoutProps {
  children: ReactNode;
}

export default function CashierLayout({ children }: CashierLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { href: '/cashier/pos', label: 'POS', icon: 'shopping_cart' },
    { href: '/cashier/orders', label: 'Pedidos', icon: 'receipt_long' },
  ];
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex">
      {/* Sidebar */}
      <aside className="sidebar w-64 flex flex-col justify-between py-8 px-3 shadow-sm">
        <div>
          <div className="flex items-center mb-10 pl-2">
            <img src="/logo-pos.png" alt="Logo Casa Leña" className="h-12 w-12 mr-3 rounded-xl shadow-sm" />
            <span className="font-bold text-2xl tracking-tight text-[var(--color-primary)]">Casa Leña</span>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item flex items-center gap-4 px-4 py-3 rounded-xl font-semibold text-base transition-all duration-200 ${
                    isActive
                      ? 'active bg-[var(--color-primary)] text-white shadow-sm'
                      : 'hover:bg-[var(--color-bg-light)] text-[var(--color-text-secondary)]'
                  }`}
                  style={isActive ? { boxShadow: '0 2px 12px rgba(255,106,26,0.10)' } : {}}
                >
                  <span className="material-icons" style={{ fontSize: 28 }}>{item.icon}</span>
                  <span className="ml-1">{item.label === 'POS' ? 'Caja' : item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <footer className="w-full pt-8 pb-2 flex flex-col items-center">
          <div className="text-xs text-gray-400">POS Casa Leña <span className="font-semibold text-[var(--color-primary)]">v1.0</span></div>
          <div className="text-[10px] text-gray-300 mt-1">© 2026 Casa Leña</div>
        </footer>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="header flex items-center justify-between px-8 py-4 shadow-sm">
          <div className="flex items-center gap-5">
            <img src="/logo-pos.png" alt="Logo Casa Leña" className="h-10 w-10 rounded-xl shadow-sm" />
            <span className="font-bold text-2xl tracking-tight text-[var(--color-primary)]">Casa Leña</span>
            <span className="ml-3 px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold shadow-sm">Abierto</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end mr-4">
              <span className="text-gray-400 text-xs leading-tight">{new Date().toLocaleTimeString()}</span>
              <span className="text-gray-400 text-xs leading-tight">{new Date().toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge bg-[var(--color-badge-bg)] text-[var(--color-badge)] font-bold px-3 py-1 rounded-full shadow-sm">Pedidos activos: 3</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
              <span className="material-icons text-[var(--color-primary)]">person</span>
              <span className="font-semibold text-sm">Luis</span>
              <button
                onClick={handleLogout}
                className="ml-2 btn btn-secondary px-2 py-1 rounded-lg text-xs font-semibold"
                title="Cerrar sesión"
              >
                <span className="material-icons" style={{ fontSize: 18 }}>logout</span>
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}