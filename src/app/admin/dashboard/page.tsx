'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '~/styles/globals.css';

const salesData = [
  { name: 'Lun', ventas: 1200 },
  { name: 'Mar', ventas: 1900 },
  { name: 'Mié', ventas: 800 },
  { name: 'Jue', ventas: 1600 },
  { name: 'Vie', ventas: 2100 },
  { name: 'Sáb', ventas: 2400 },
  { name: 'Dom', ventas: 1800 },
];

const topProducts = [
  { name: 'Pizza Margarita', ventas: 45 },
  { name: 'Pizza Pepperoni', ventas: 38 },
  { name: 'Combo Familiar', ventas: 32 },
  { name: 'Coca Cola', ventas: 28 },
  { name: 'Ensalada César', ventas: 15 },
];

const orderTypeData = [
  { name: 'Local', value: 65, color: '#10B981' },
  { name: 'Delivery', value: 35, color: '#3B82F6' },
];

export default function DashboardPage() {
  const todaySales = 2400;
  const monthlySales = 28500;
  const totalOrders = 156;
  const avgOrderValue = 183;

  return (
    <div className="space-y-6">
      <h1 className="title-lg">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="title-sm">Ventas Totales</h3>
          <p className="price">${todaySales.toLocaleString()}</p>
          <span className="badge">En el período seleccionado</span>
        </div>
        <div className="card">
          <h3 className="title-sm">Total Pedidos</h3>
          <p className="price">{totalOrders}</p>
          <span className="badge">Pedidos completados</span>
        </div>
        <div className="card">
          <h3 className="title-sm">Valor Promedio</h3>
          <p className="price">${avgOrderValue.toFixed(2)}</p>
          <span className="badge">Por pedido</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Ventas de la Semana</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Ventas']} />
              <Bar dataKey="ventas" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Types Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Tipo de Pedidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {orderTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {orderTypeData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Productos Más Vendidos</h3>
        <div className="space-y-3">
          {topProducts.map((product, index) => (
            <div key={product.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                  {index + 1}
                </span>
                <span className="font-medium">{product.name}</span>
              </div>
              <span className="text-gray-600">{product.ventas} vendidos</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}