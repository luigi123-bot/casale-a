'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '~/store/cart';
import { useOrdersStore } from '~/store/orders';
import { useRouter } from 'next/navigation';
import '~/styles/pos-theme.css';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const placeOrder = useOrdersStore((state) => state.placeOrder);
  const [orderNotes, setOrderNotes] = useState('');
  const router = useRouter();

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    placeOrder(items, orderNotes);
    clearCart();
    setOrderNotes('');
    router.push('/client/orders');
  };

  const total = getTotal();

  return (
    <div className="card p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-[var(--color-primary)]">shopping_bag</span>
        <span className="font-bold text-xl">Carrito</span>
      </div>
      <div className="flex gap-2 mb-4">
        <button className="tab tab-active px-4 py-2">Local</button>
        <button className="tab px-4 py-2">Domicilio</button>
        <button className="tab px-4 py-2">Llamada</button>
      </div>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <span className="material-icons text-5xl text-gray-300 mb-2">shopping_bag</span>
          <div className="font-semibold text-gray-500">Carrito vacío</div>
          <div className="text-gray-400">Agrega productos para comenzar</div>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-lg p-4 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-gray-600 text-sm">{item.product.description}</p>
                      {item.customization && (
                        <div className="text-sm text-gray-500 mt-2">
                          <p>Tamaño: {item.customization.size}</p>
                          <p>Masa: {item.customization.dough}</p>
                          <p>Salsa: {item.customization.sauce}</p>
                          {item.customization.extraIngredients.length > 0 && (
                            <p>Extras: {item.customization.extraIngredients.map(i => i.name).join(', ')}</p>
                          )}
                        </div>
                      )}
                      {item.notes && (
                        <p className="text-sm text-gray-500 mt-1">Notas: {item.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-semibold">${item.totalPrice.toFixed(2)}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Notas del pedido</label>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Ej: Sin cebolla, extra queso..."
                className="w-full p-2 border rounded resize-none"
                rows={3}
              />
            </div>

            <div className="flex justify-between items-center text-xl font-bold mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              Realizar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
}