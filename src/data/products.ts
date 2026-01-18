import { Product, Ingredient } from '~/types';

export const ingredients: Ingredient[] = [
  { id: '1', name: 'Queso extra', price: 2.00 },
  { id: '2', name: 'Pepperoni', price: 3.00 },
  { id: '3', name: 'Champiñones', price: 1.50 },
  { id: '4', name: 'Aceitunas', price: 1.00 },
  { id: '5', name: 'Pimientos', price: 1.50 },
  { id: '6', name: 'Cebolla', price: 1.00 },
];

export const products: Product[] = [
  // Pizzas
  {
    id: '1',
    name: 'Pizza Margarita',
    description: 'Salsa de tomate, mozzarella, albahaca fresca',
    price: 12.99,
    image: '/images/pizza-margarita.jpg',
    category: 'Pizzas',
  },
  {
    id: '2',
    name: 'Pizza Pepperoni',
    description: 'Salsa de tomate, mozzarella, pepperoni',
    price: 14.99,
    image: '/images/pizza-pepperoni.jpg',
    category: 'Pizzas',
  },
  {
    id: '3',
    name: 'Arma tu Pizza',
    description: 'Personaliza tu pizza a tu gusto',
    price: 10.99, // base price
    image: '/images/custom-pizza.jpg',
    category: 'Pizzas',
    isCustomizable: true,
    basePrice: 10.99,
  },
  // Combos
  {
    id: '4',
    name: 'Combo Familiar',
    description: '2 Pizzas grandes, 1 bebida 2L',
    price: 29.99,
    image: '/images/combo-familiar.jpg',
    category: 'Combos',
  },
  {
    id: '5',
    name: 'Combo Pareja',
    description: '1 Pizza mediana, 2 bebidas',
    price: 18.99,
    image: '/images/combo-pareja.jpg',
    category: 'Combos',
  },
  // Bebidas
  {
    id: '6',
    name: 'Coca Cola 500ml',
    description: 'Refresco de cola',
    price: 2.50,
    image: '/images/coca-cola.jpg',
    category: 'Bebidas',
  },
  {
    id: '7',
    name: 'Agua Mineral 500ml',
    description: 'Agua sin gas',
    price: 1.50,
    image: '/images/agua.jpg',
    category: 'Bebidas',
  },
  {
    id: '8',
    name: 'Cerveza 330ml',
    description: 'Cerveza pilsner',
    price: 3.00,
    image: '/images/cerveza.jpg',
    category: 'Bebidas',
  },
  // Extras
  {
    id: '9',
    name: 'Papas Fritas',
    description: 'Porción de papas fritas',
    price: 4.99,
    image: '/images/papas.jpg',
    category: 'Extras',
  },
  {
    id: '10',
    name: 'Ensalada César',
    description: 'Lechuga, pollo, aderezo césar',
    price: 6.99,
    image: '/images/ensalada.jpg',
    category: 'Extras',
  },
];