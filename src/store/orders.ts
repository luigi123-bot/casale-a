import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrdersState, CartItem, OrderStatus } from '~/types';

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      placeOrder: (items: CartItem[], notes?: string) => {
        const newOrder: Order = {
          id: `order-${Date.now()}`,
          items,
          total: items.reduce((sum, item) => sum + item.totalPrice, 0),
          status: 'recibido',
          createdAt: new Date(),
          estimatedTime: 30, // 30 minutes
          notes,
        };
        set({ orders: [newOrder, ...get().orders] });

        // Simulate status updates
        setTimeout(() => {
          set({
            orders: get().orders.map((order) =>
              order.id === newOrder.id ? { ...order, status: 'preparando' } : order
            ),
          });
        }, 5000); // 5 seconds to preparing

        setTimeout(() => {
          set({
            orders: get().orders.map((order) =>
              order.id === newOrder.id ? { ...order, status: 'en camino' } : order
            ),
          });
        }, 10000); // 10 seconds to en camino

        setTimeout(() => {
          set({
            orders: get().orders.map((order) =>
              order.id === newOrder.id ? { ...order, status: 'entregado' } : order
            ),
          });
        }, 15000); // 15 seconds to entregado
      },
      updateOrderStatus: (orderId: string, status: OrderStatus) => {
        set({
          orders: get().orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        });
      },
    }),
    {
      name: 'orders-storage',
    }
  )
);