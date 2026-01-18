import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartState, Product, PizzaCustomization } from '~/types';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product, customization?: PizzaCustomization, notes?: string) => {
        const { items } = get();
        const existingItem = items.find(
          (item) =>
            item.product.id === product.id &&
            JSON.stringify(item.customization) === JSON.stringify(customization)
        );

        let totalPrice = product.price;
        if (customization) {
          const sizePrices = { 'Pequeña': 0, 'Mediana': 2, 'Grande': 4 };
          totalPrice += sizePrices[customization.size];
          totalPrice += customization.extraIngredients.reduce((sum, ing) => sum + ing.price, 0);
        }
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + totalPrice }
                : item
            ),
          });
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            product,
            quantity: 1,
            customization,
            notes,
            totalPrice,
          };
          set({ items: [...items, newItem] });
        }
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity, totalPrice: (item.totalPrice / item.quantity) * quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((total, item) => total + item.totalPrice, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);