import type { User } from '~/types';

export const users: User[] = [
  {
    id: '1',
    email: 'client@example.com',
    name: 'Cliente Demo',
    role: 'CLIENT',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-15'),
  },
  {
    id: '2',
    email: 'cashier@example.com',
    name: 'Cajero Demo',
    role: 'CASHIER',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-16'),
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Administrador Demo',
    role: 'ADMIN',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-17'),
  },
  {
    id: '4',
    email: 'super@example.com',
    name: 'Super Administrador',
    role: 'SUPER_ADMIN',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-18'),
  },
  {
    id: '5',
    email: 'inactive@example.com',
    name: 'Usuario Inactivo',
    role: 'CLIENT',
    isActive: false,
    createdAt: new Date('2024-01-10'),
    lastLogin: new Date('2024-01-12'),
  },
];