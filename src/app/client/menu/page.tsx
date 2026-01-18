'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Product, Category, PizzaCustomization } from '~/types';
import { products } from '~/data/products';
import { useCartStore } from '~/store/cart';
import PizzaCustomizer from '~/components/PizzaCustomizer';
import '~/styles/pos-theme.css';

const categories: Category[] = ['Pizzas', 'Combos', 'Bebidas', 'Extras'];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Pizzas');
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = products.filter(product => product.category === selectedCategory);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Menú de productos */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card p-4 flex flex-col items-center">
              <img src={product.image} alt={product.name} className="h-24 w-24 object-cover rounded-xl mb-2" />
              <div className="font-bold text-lg text-center">{product.name}</div>
              <div className="text-gray-500 text-sm text-center mb-2">{product.description}</div>
              <div className="price text-xl mb-1">${product.price}</div>
              <div className="text-xs text-gray-400">desde</div>
              <button
                onClick={() => handleAddToCart(product)}
                className="btn-primary w-full mt-3 py-2"
              >Agregar</button>
            </div>
          ))}
        </div>
      </div>
      {/* Carrito */}
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
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1">
            <span className="material-icons text-5xl text-gray-300 mb-2">shopping_bag</span>
            <div className="font-semibold text-gray-500">Carrito vacío</div>
            <div className="text-gray-400">Agrega productos para comenzar</div>
          </div>
        ) : (
          <div>
            {/* Aquí iría la lista de productos en el carrito */}
          </div>
        )}
      </div>

      <PizzaCustomizer
        isOpen={!!customizingProduct}
        onClose={() => setCustomizingProduct(null)}
        onConfirm={handleCustomizationConfirm}
      />
    </div>
  );
}