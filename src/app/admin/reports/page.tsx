'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const salesReportData = [
  { date: '2024-01-12', sales: 1250, orders: 45 },
  { date: '2024-01-13', sales: 1180, orders: 42 },
  { date: '2024-01-14', sales: 1350, orders: 48 },
  { date: '2024-01-15', sales: 1420, orders: 52 },
  { date: '2024-01-16', sales: 1280, orders: 46 },
  { date: '2024-01-17', sales: 1580, orders: 58 },
  { date: '2024-01-18', sales: 1720, orders: 62 },
];

const productReportData = [
  { product: 'Pizza Margarita', quantity: 45, revenue: 584.55 },
  { product: 'Pizza Pepperoni', quantity: 38, revenue: 486.62 },
  { product: 'Combo Familiar', quantity: 32, revenue: 415.68 },
  { product: 'Coca Cola 500ml', quantity: 28, revenue: 70.00 },
  { product: 'Ensalada César', quantity: 15, revenue: 149.85 },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({
    start: '2024-01-12',
    end: '2024-01-18',
  });

  const totalSales = salesReportData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = salesReportData.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalSales / totalOrders;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reportes</h1>

      {/* Date Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Filtros de Fecha</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Fin</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Generar Reporte
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Ventas Totales</h3>
          <p className="text-3xl font-bold text-green-600">${totalSales.toLocaleString()}</p>
          <p className="text-sm text-gray-600">En el período seleccionado</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Pedidos</h3>
          <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
          <p className="text-sm text-gray-600">Pedidos completados</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Valor Promedio</h3>
          <p className="text-3xl font-bold text-purple-600">${avgOrderValue.toFixed(2)}</p>
          <p className="text-sm text-gray-600">Por pedido</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Tendencia de Ventas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesReportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Ventas']} />
              <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Tendencia de Pedidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesReportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Productos Más Vendidos</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ingresos
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productReportData.map((product) => (
                <tr key={product.product}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.revenue.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}