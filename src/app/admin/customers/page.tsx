'use client';

import { useState } from 'react';
import '~/styles/globals.css';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+1234567890',
    totalOrders: 15,
    totalSpent: 450.50,
    lastOrder: '2024-01-18',
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@example.com',
    phone: '+1234567891',
    totalOrders: 8,
    totalSpent: 234.75,
    lastOrder: '2024-01-17',
  },
  {
    id: '3',
    name: 'Carlos López',
    email: 'carlos@example.com',
    phone: '+1234567892',
    totalOrders: 22,
    totalSpent: 678.90,
    lastOrder: '2024-01-18',
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="title-lg">Clientes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="card flex flex-col items-center">
            <div className="font-bold text-lg text-center">{customer.name}</div>
            <div className="text-gray-500 text-sm text-center mb-2">{customer.email}</div>
            <span className="badge">{customer.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}