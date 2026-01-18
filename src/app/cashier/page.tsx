import Link from 'next/link';

export default function CashierPage() {
  return (
    <div className="px-4 py-6 sm:px-0 text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Panel de Cajero</h2>
      <p className="text-gray-600 mb-8">¿Qué deseas hacer?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Link
          href="/cashier/pos"
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-2xl font-semibold mb-2">Punto de Venta</h3>
          <p className="text-gray-600">Procesar pedidos y cobros</p>
        </Link>

        <Link
          href="/cashier/orders"
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-2xl font-semibold mb-2">Historial de Ventas</h3>
          <p className="text-gray-600">Ver pedidos completados y reimprimir tickets</p>
        </Link>
      </div>
    </div>
  );
}