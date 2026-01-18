'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PizzaCustomization, Ingredient } from '~/types';
import { ingredients } from '~/data/products';

interface PizzaCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (customization: PizzaCustomization) => void;
}

export default function PizzaCustomizer({ isOpen, onClose, onConfirm }: PizzaCustomizerProps) {
  const [customization, setCustomization] = useState<PizzaCustomization>({
    size: 'Mediana',
    dough: 'Delgada',
    sauce: 'Tomate',
    extraIngredients: [],
  });

  const handleConfirm = () => {
    onConfirm(customization);
    onClose();
  };

  const toggleIngredient = (ingredient: Ingredient) => {
    setCustomization(prev => ({
      ...prev,
      extraIngredients: prev.extraIngredients.find(i => i.id === ingredient.id)
        ? prev.extraIngredients.filter(i => i.id !== ingredient.id)
        : [...prev.extraIngredients, ingredient],
    }));
  };

  const sizePrices = {
    'Pequeña': 0,
    'Mediana': 2,
    'Grande': 4,
  };

  const calculatePrice = () => {
    const sizePrice = sizePrices[customization.size];
    const extrasPrice = customization.extraIngredients.reduce((sum, ing) => sum + ing.price, 0);
    return sizePrice + extrasPrice;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Arma tu Pizza</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tamaño</label>
                <select
                  value={customization.size}
                  onChange={(e) => setCustomization(prev => ({ ...prev, size: e.target.value as any }))}
                  className="w-full p-2 border rounded"
                >
                  <option value="Pequeña">Pequeña (+$0)</option>
                  <option value="Mediana">Mediana (+$2)</option>
                  <option value="Grande">Grande (+$4)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Masa</label>
                <select
                  value={customization.dough}
                  onChange={(e) => setCustomization(prev => ({ ...prev, dough: e.target.value as any }))}
                  className="w-full p-2 border rounded"
                >
                  <option value="Delgada">Delgada</option>
                  <option value="Gruesa">Gruesa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Salsa</label>
                <select
                  value={customization.sauce}
                  onChange={(e) => setCustomization(prev => ({ ...prev, sauce: e.target.value as any }))}
                  className="w-full p-2 border rounded"
                >
                  <option value="Tomate">Tomate</option>
                  <option value="BBQ">BBQ</option>
                  <option value="Pesto">Pesto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ingredientes Extra</label>
                <div className="space-y-2">
                  {ingredients.map((ingredient) => (
                    <label key={ingredient.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={customization.extraIngredients.some(i => i.id === ingredient.id)}
                        onChange={() => toggleIngredient(ingredient)}
                        className="mr-2"
                      />
                      {ingredient.name} (+${ingredient.price.toFixed(2)})
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-lg font-semibold">
                Precio extra: ${calculatePrice().toFixed(2)}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Agregar al Carrito
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}