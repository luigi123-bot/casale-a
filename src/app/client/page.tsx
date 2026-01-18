import Link from 'next/link';

export default function ClientPage() {
  return (
    <div className="px-4 py-6 sm:px-0 text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Bienvenido a Pizzería POS</h2>
      <p className="text-gray-600 mb-8">¿Qué te gustaría hacer hoy?</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <Link
          href="/client/menu"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-4xl mb-4">🍕</div>
          <h3 className="text-xl font-semibold mb-2">Ver Menú</h3>
          <p className="text-gray-600">Explora nuestras deliciosas pizzas y combos</p>
        </Link>

        <Link
          href="/client/cart"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-4xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold mb-2">Mi Carrito</h3>
          <p className="text-gray-600">Revisa y modifica tu pedido</p>
        </Link>

        <Link
          href="/client/orders"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-xl font-semibold mb-2">Mis Pedidos</h3>
          <p className="text-gray-600">Sigue el estado de tus pedidos</p>
        </Link>
      </div>
    </div>
  );
}