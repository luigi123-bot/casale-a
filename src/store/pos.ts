import { create } from 'zustand';
import { POSOrder, POSOrderItem, POSState, Product, PizzaCustomization } from '~/types';

export const usePOSStore = create<POSState>((set, get) => ({
  currentOrder: null,

  startNewOrder: () => {
    const newOrder: POSOrder = {
      id: `pos-${Date.now()}`,
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      status: 'pending',
      createdAt: new Date(),
    };
    set({ currentOrder: newOrder });
  },

  addItem: (product: Product, customization?: PizzaCustomization) => {
    const { currentOrder } = get();
    if (!currentOrder) return;

    let unitPrice = product.price;
    if (customization) {
      const sizePrices = { 'Pequeña': 0, 'Mediana': 2, 'Grande': 4 };
      unitPrice += sizePrices[customization.size];
      unitPrice += customization.extraIngredients.reduce((sum, ing) => sum + ing.price, 0);
    }

    const existingItem = currentOrder.items.find(
      (item) =>
        item.product.id === product.id &&
        JSON.stringify(item.customization) === JSON.stringify(customization)
    );

    let newItems: POSOrderItem[];
    if (existingItem) {
      newItems = currentOrder.items.map((item) =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + unitPrice }
          : item
      );
    } else {
      const newItem: POSOrderItem = {
        id: `${product.id}-${Date.now()}`,
        product,
        quantity: 1,
        customization,
        unitPrice,
        totalPrice: unitPrice,
      };
      newItems = [...currentOrder.items, newItem];
    }

    const subtotal = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    set({
      currentOrder: {
        ...currentOrder,
        items: newItems,
        subtotal,
        tax,
        total,
      },
    });
  },

  removeItem: (id: string) => {
    const { currentOrder } = get();
    if (!currentOrder) return;

    const newItems = currentOrder.items.filter((item) => item.id !== id);
    const subtotal = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    set({
      currentOrder: {
        ...currentOrder,
        items: newItems,
        subtotal,
        tax,
        total,
      },
    });
  },

  updateQuantity: (id: string, quantity: number) => {
    const { currentOrder } = get();
    if (!currentOrder || quantity <= 0) return;

    const newItems = currentOrder.items.map((item) =>
      item.id === id
        ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
        : item
    );

    const subtotal = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    set({
      currentOrder: {
        ...currentOrder,
        items: newItems,
        subtotal,
        tax,
        total,
      },
    });
  },

  setCustomerName: (name: string) => {
    const { currentOrder } = get();
    if (!currentOrder) return;

    set({
      currentOrder: {
        ...currentOrder,
        customerName: name,
      },
    });
  },

  completeOrder: (paymentMethod: 'cash' | 'card' | 'qr') => {
    const { currentOrder } = get();
    if (!currentOrder) return;

    set({
      currentOrder: {
        ...currentOrder,
        paymentMethod,
        status: 'paid',
      },
    });

    // Here you would typically save to database and print receipt
    setTimeout(() => {
      get().clearOrder();
    }, 2000); // Clear after 2 seconds
  },

  clearOrder: () => {
    set({ currentOrder: null });
  },
}));