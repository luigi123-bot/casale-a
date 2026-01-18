'use client';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Link from 'next/link';
import { useUserManagementStore } from '~/store/userManagement';
import { useSuperAdminStore } from '~/store/superAdmin';
import { Users, Settings, Shield, Activity } from 'lucide-react';

export default function SuperAdminPage() {
  const { users } = useUserManagementStore();
  const { systemSettings, auditLogs } = useSuperAdminStore();

  const activeUsers = users.filter(user => user.isActive).length;
  const totalUsers = users.length;
  const recentLogs = auditLogs.slice(0, 5);

  const stats: Array<{
    title: string;
    value: number | string;
    icon: any;
    color: string;
    bgColor: string;
  }> = [
    {
      title: 'Usuarios Activos',
      value: activeUsers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Usuarios',
      value: totalUsers,
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Modo Mantenimiento',
      value: systemSettings.maintenanceMode ? 'Activado' : 'Desactivado',
      icon: Settings,
      color: systemSettings.maintenanceMode ? 'text-red-600' : 'text-gray-600',
      bgColor: systemSettings.maintenanceMode ? 'bg-red-100' : 'bg-gray-100',
    },
    {
      title: 'Registros de Auditoría',
      value: auditLogs.length,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Super Administrador</h1>
        <p className="text-gray-600">Control total del sistema POS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/super-admin/users"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Gestionar Usuarios</h3>
              <p className="text-sm text-gray-600">Crear, editar y administrar usuarios del sistema</p>
            </div>
          </Link>

          <Link
            href="/super-admin/settings"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Settings className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Configuración del Sistema</h3>
              <p className="text-sm text-gray-600">Configurar negocio, fiscal y parámetros globales</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
        {recentLogs.length > 0 ? (
          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{log.action}</p>
                  <p className="text-xs text-gray-600">
                    {log.userName} - {log.resource}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {log.timestamp.toLocaleDateString()} {log.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No hay actividad reciente</p>
        )}
      </div>

      {/* System Status */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Estado del Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="text-sm font-medium">Modo Mantenimiento</span>
            <span className={`px-2 py-1 text-xs rounded ${
              systemSettings.maintenanceMode
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {systemSettings.maintenanceMode ? 'Activado' : 'Desactivado'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="text-sm font-medium">Registro de Usuarios</span>
            <span className={`px-2 py-1 text-xs rounded ${
              systemSettings.allowRegistration
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {systemSettings.allowRegistration ? 'Permitido' : 'Bloqueado'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}