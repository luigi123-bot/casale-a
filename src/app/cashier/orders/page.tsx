'use client';

import { useState } from 'react';
import { POSOrder } from '~/types';
import '~/styles/pos-theme.css';

export default function CashierOrdersPage() {
  // In a real app, this would come from a database
  const [orders] = useState<POSOrder[]>([
    {
      id: 'pos-1234567890',
      items: [
        {
          id: '1',
          product: {
            id: '1',
            name: 'Pizza Margarita',
            description: 'Salsa de tomate, mozzarella, albahaca fresca',
            price: 12.99,
            image: '',
            category: 'Pizzas',
          },
          quantity: 2,
          unitPrice: 12.99,
          totalPrice: 25.98,
        },
        {
          id: '2',
          product: {
            id: '6',
            name: 'Coca Cola 500ml',
            description: 'Refresco de cola',
            price: 2.50,
            image: '',
            category: 'Bebidas',
          },
          quantity: 1,
          unitPrice: 2.50,
          totalPrice: 2.50,
        },
      ],
      subtotal: 28.48,
      tax: 2.85,
      total: 31.33,
      paymentMethod: 'cash',
      customerName: 'Juan Pérez',
      status: 'completed',
      createdAt: new Date('2024-01-18T10:30:00'),
    },
    {
      id: 'pos-1234567891',
      items: [
        {
          id: '3',
          product: {
            id: '4',
            name: 'Combo Familiar',
            description: '2 Pizzas grandes, 1 bebida 2L',
            price: 29.99,
            image: '',
            category: 'Combos',
          },
          quantity: 1,
          unitPrice: 29.99,
          totalPrice: 29.99,
        },
      ],
      subtotal: 29.99,
      tax: 3.00,
      total: 32.99,
      paymentMethod: 'card',
      status: 'completed',
      createdAt: new Date('2024-01-18T11:15:00'),
    },
  ]);

  const printReceipt = (order: POSOrder) => {
    // In a real app, this would send to thermal printer
    const receipt = `
Pizzería POS
Fecha: ${order.createdAt.toLocaleString()}
${order.customerName ? `Cliente: ${order.customerName}` : 'Venta rápida'}

${order.items.map(item =>
  `${item.quantity}x ${item.product.name} - $${item.totalPrice.toFixed(2)}`
).join('\n')}

Subtotal: $${order.subtotal.toFixed(2)}
Impuestos: $${order.tax.toFixed(2)}
Total: $${order.total.toFixed(2)}
Pago: ${order.paymentMethod === 'cash' ? 'Efectivo' : order.paymentMethod === 'card' ? 'Tarjeta' : 'QR'}

¡Gracias por su compra!
    `.trim();

    console.log('Printing receipt:', receipt);
    alert('Ticket impreso:\n\n' + receipt);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lista de pedidos */}
      <div className="lg:col-span-2">
        <h1 className="font-bold text-2xl mb-6">Pedidos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="card p-4 flex flex-col">
              <div className="font-bold text-lg mb-2">Pedido #{order.id}</div>
              <div className="text-gray-500 text-sm mb-2">{order.customerName || 'Sin nombre'}</div>
              <div className="text-xs text-gray-400 mb-2">{order.createdAt.toLocaleString()}</div>
              <div className="font-bold text-[var(--color-primary)] mb-2">${order.total}</div>
              <div className="flex gap-2 mt-auto">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{order.status}</span>
                <button className="btn-primary px-4 py-1">Ver</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Resumen de pedidos activos */}
      <div className="card p-6 flex flex-col h-full">
        <div className="font-bold text-xl mb-4">Pedidos activos</div>
        {/* Aquí iría el resumen de pedidos activos */}
      </div>
    </div>
  );
}