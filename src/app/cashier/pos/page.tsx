'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product, Category, PizzaCustomization } from '~/types';
import { products } from '~/data/products';
import { usePOSStore } from '~/store/pos';
import PizzaCustomizer from '~/components/PizzaCustomizer';
import '~/styles/globals.css';
import '~/styles/pos-theme.css';
import { ShoppingCart, Receipt, User, Trash, SignOut, House, Phone, Truck } from 'phosphor-react';

const categories: Category[] = ['Pizzas', 'Combos', 'Bebidas', 'Extras'];

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Pizzas');
  const [searchTerm, setSearchTerm] = useState('');
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const {
    currentOrder,
    startNewOrder,
    addItem,
    removeItem,
    updateQuantity,
    setCustomerName: setOrderCustomerName,
    completeOrder,
    clearOrder,
  } = usePOSStore();

  useEffect(() => {
    if (!currentOrder) {
      startNewOrder();
    }
  }, [currentOrder, startNewOrder]);

  const filteredProducts = products
    .filter(product => product.category === selectedCategory)
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleAddToCart = (product: Product) => {
    if (product.isCustomizable) {
      setCustomizingProduct(product);
    } else {
      addItem(product);
    }
  };

  const handleCustomizationConfirm = (customization: PizzaCustomization) => {
    if (customizingProduct) {
      addItem(customizingProduct, customization);
      setCustomizingProduct(null);
    }
  };

  const handlePayment = (method: 'cash' | 'card' | 'qr') => {
    if (currentOrder && currentOrder.items.length > 0) {
      completeOrder(method);
      setShowPayment(false);
      setCustomerName('');
    }
  };

  const handleCustomerNameChange = (name: string) => {
    setCustomerName(name);
    setOrderCustomerName(name);
  };

  if (!currentOrder) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar y navegación ya está en el layout */}
      {/* Área central: Productos */}
      <section className="col-span-1 lg:col-span-2 flex flex-col">
        {/* Tabs de categorías */}
        <div className="flex gap-3 mb-6">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`tab font-semibold text-base px-6 py-2 shadow-sm ${selectedCategory === cat ? 'tab-active scale-105' : ''}`}
              style={{ marginRight: 8, minWidth: 120 }}
              onClick={() => setSelectedCategory(cat)}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Buscador */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-light)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        {/* Cards de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              className="card flex flex-col items-center justify-between p-5 cursor-pointer group hover:shadow-md transition-all duration-200"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="w-full flex flex-col items-center mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-xl mb-2 object-cover"
                  style={{ width: 96, height: 96, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                />
                <div className="flex items-center gap-2 mb-1">
                  <span className="title-md font-semibold text-[var(--color-text-main)]">{product.name}</span>
                  {product.isCustomizable && (
                    <span className="badge bg-[var(--color-badge-bg)] text-[var(--color-badge)] px-2 py-0.5 rounded-full text-xs font-bold ml-1">Arma tu Pizza</span>
                  )}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] text-center mb-2" style={{ minHeight: 32 }}>{product.description}</p>
              </div>
              <div className="w-full flex items-center justify-between mt-auto">
                <span className="price text-lg font-bold">${product.price.toFixed(2)}</span>
                <button
                  className="btn btn-primary px-5 py-2 rounded-xl font-semibold text-base shadow-sm group-hover:scale-105"
                  onClick={() => handleAddToCart(product)}
                  style={{ minWidth: 100 }}
                >
                  {product.isCustomizable ? 'Personalizar' : 'Agregar'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <div className="lg:col-span-2">
        <div className="mb-6">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`tab px-6 py-2 font-semibold transition-colors ${selectedCategory === category ? 'tab-active' : ''}`}
              >
                {category}
              </button>
            ))}
            <button className="tab px-6 py-2 font-semibold">+ Extras</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow">
              <img src={product.image} alt={product.name} className="h-28 w-28 object-cover rounded-xl mb-2 border border-[var(--color-border)]" />
              <div className="font-bold text-lg text-center mb-1">{product.name}</div>
              <div className="text-gray-500 text-sm text-center mb-2">{product.description}</div>
              <div className="price text-2xl mb-1">${product.price}</div>
              <span className="badge mb-2">desde</span>
              <button
                onClick={() => handleAddToCart(product)}
                className="btn btn-primary w-full mt-3 py-3 text-lg rounded-xl shadow-sm hover:scale-105 active:scale-95"
              >Agregar</button>
            </div>
          ))}
        </div>
      </div>
      {/* Carrito */}
          {/* Panel derecho: Carrito */}
          <aside className="cart-panel flex flex-col h-full min-h-[480px] max-w-md mx-auto shadow-sm">
            <div className="cart-title mb-2 flex items-center gap-2">
              <ShoppingCart size={28} color="var(--color-primary)" weight="duotone" />
              <span>Carrito</span>
            </div>
            {/* Selector tipo de pedido */}
            <div className="flex gap-2 mb-4">
              {[
                { type: 'Local', icon: <House size={18} /> },
                { type: 'Domicilio', icon: <Truck size={18} /> },
                { type: 'Llamada', icon: <Phone size={18} /> },
              ].map(({ type, icon }) => (
                <button
                  key={type}
                  className={`cart-type-btn tab px-4 py-1 font-semibold text-sm flex items-center gap-1 ${currentOrder.type === type ? 'tab-active' : ''}`}
                  onClick={() => usePOSStore.getState().setOrderType(type)}
                >
                  {icon} {type}
                </button>
              ))}
            </div>
            {/* Estado vacío */}
            {currentOrder.items.length === 0 ? (
              <div className="cart-empty">
                <ShoppingCart size={40} color="var(--color-border)" className="cart-empty-icon" />
                <span>El carrito está vacío</span>
                <span className="text-xs mt-2 text-gray-400">Agrega productos para comenzar el pedido</span>
              </div>
            ) : (
              <>
                {/* Lista de productos en carrito */}
                <div className="flex-1 overflow-y-auto mb-4">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-[var(--color-border)]">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[var(--color-text-main)]">{item.product.name}</span>
                        {item.customization && (
                          <span className="text-xs text-[var(--color-text-secondary)]">Personalizada</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">x{item.quantity}</span>
                        <span className="price text-base font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                        <button
                          className="btn btn-secondary px-2 py-1 rounded-lg text-xs"
                          onClick={() => removeItem(item.product)}
                          title="Eliminar"
                        >
                          <Trash size={18} color="var(--color-primary)" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Total y cobrar */}
                <div className="mt-auto pt-2 border-t border-[var(--color-border)]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="price text-2xl font-bold">${currentOrder.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}</span>
                  </div>
                  <button
                    className="btn btn-primary w-full py-3 rounded-xl text-lg font-bold shadow-md"
                    onClick={() => setShowPayment(true)}
                    disabled={currentOrder.items.length === 0}
                  >
                    Cobrar
                  </button>
                </div>
              </>
            )}
          </aside>
      {/* Modal de pago y feedback visual pueden agregarse aquí */}
  );
}