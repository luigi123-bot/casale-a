'use client';

import { motion } from 'framer-motion';
import { useOrdersStore } from '~/store/orders';
import { OrderStatus } from '~/types';
import '~/styles/pos-theme.css';

const statusColors: Record<OrderStatus, string> = {
  recibido: 'bg-yellow-100 text-yellow-800',
  preparando: 'bg-blue-100 text-blue-800',
  'en camino': 'bg-orange-100 text-orange-800',
  entregado: 'bg-green-100 text-green-800',
};

const statusLabels: Record<OrderStatus, string> = {
  recibido: 'Recibido',
  preparando: 'Preparando',
  'en camino': 'En Camino',
  entregado: 'Entregado',
};

export default function OrdersPage() {
  const { orders } = useOrdersStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mis Pedidos</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tienes pedidos aún</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="card p-4 flex flex-col">
                <div className="font-bold text-lg mb-2">Pedido #{order.id}</div>
                <div className="text-gray-500 text-sm mb-2">{order.createdAt.toLocaleString()}</div>
                <div className="font-bold text-[var(--color-primary)] mb-2">${order.total}</div>
                <div className="flex gap-2 mt-auto">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'recibido' ? 'bg-yellow-100 text-yellow-800' : order.status === 'entregado' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{order.status}</span>
                  <button className="btn-primary px-4 py-1">Ver</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}