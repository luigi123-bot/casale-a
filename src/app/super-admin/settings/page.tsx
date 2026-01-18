'use client';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useState } from 'react';
import { useSuperAdminStore } from '~/store/superAdmin';
import { Save, Building, FileText, Settings as SettingsIcon, Activity } from 'lucide-react';

export default function SettingsPage() {
  const {
    businessSettings,
    fiscalData,
    systemSettings,
    auditLogs,
    updateBusinessSettings,
    updateFiscalData,
    updateSystemSettings,
    addAuditLog,
  } = useSuperAdminStore();

  const [activeTab, setActiveTab] = useState<'business' | 'fiscal' | 'system' | 'audit'>('business');

  const getFormValue = (formData: FormData, key: string): string => {
    return formData.get(key) as string || '';
  };

  const handleBusinessSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updates = {
      businessName: getFormValue(formData, 'businessName'),
      address: getFormValue(formData, 'address'),
      phone: getFormValue(formData, 'phone'),
      email: getFormValue(formData, 'email'),
      taxId: getFormValue(formData, 'taxId'),
      currency: getFormValue(formData, 'currency'),
      timezone: getFormValue(formData, 'timezone'),
      language: getFormValue(formData, 'language'),
    };
    updateBusinessSettings(updates);
    addAuditLog({
      userId: 'current-user',
      userName: 'Super Admin',
      action: 'Configuración de negocio actualizada',
      resource: 'Configuración',
      details: 'Datos del negocio modificados',
    });
  };

  const handleFiscalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const taxRateValue = parseFloat(getFormValue(formData, 'taxRate'));
    const updates = {
      taxRate: isNaN(taxRateValue) ? 0 : taxRateValue / 100,
      taxId: getFormValue(formData, 'fiscalTaxId'),
      businessType: getFormValue(formData, 'businessType'),
      fiscalAddress: getFormValue(formData, 'fiscalAddress'),
      fiscalPhone: getFormValue(formData, 'fiscalPhone'),
    };
    updateFiscalData(updates);
    addAuditLog({
      userId: 'current-user',
      userName: 'Super Admin',
      action: 'Datos fiscales actualizados',
      resource: 'Configuración',
      details: 'Información fiscal modificada',
    });
  };

  const handleSystemSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updates = {
      maintenanceMode: formData.get('maintenanceMode') === 'on',
      allowRegistration: formData.get('allowRegistration') === 'on',
      maxOrdersPerHour: parseInt(getFormValue(formData, 'maxOrdersPerHour')),
      sessionTimeout: parseInt(getFormValue(formData, 'sessionTimeout')),
      backupFrequency: getFormValue(formData, 'backupFrequency') as 'daily' | 'weekly' | 'monthly',
      logRetentionDays: parseInt(getFormValue(formData, 'logRetentionDays')),
    };
    updateSystemSettings(updates);
    addAuditLog({
      userId: 'current-user',
      userName: 'Super Admin',
      action: 'Configuración del sistema actualizada',
      resource: 'Configuración',
      details: 'Parámetros del sistema modificados',
    });
  };

  const tabs = [
    { id: 'business', label: 'Negocio', icon: Building },
    { id: 'fiscal', label: 'Fiscal', icon: FileText },
    { id: 'system', label: 'Sistema', icon: SettingsIcon },
    { id: 'audit', label: 'Auditoría', icon: Activity },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
        <p className="text-gray-600">Control total de parámetros y configuración</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'business' | 'fiscal' | 'system' | 'audit')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Business Settings */}
          {activeTab === 'business' && (
            <form onSubmit={handleBusinessSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold">Configuración del Negocio</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre del Negocio</label>
                  <input
                    name="businessName"
                    defaultValue={businessSettings.businessName}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Dirección</label>
                  <input
                    name="address"
                    defaultValue={businessSettings.address}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Teléfono</label>
                  <input
                    name="phone"
                    type="tel"
                    defaultValue={businessSettings.phone}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={businessSettings.email}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">ID Fiscal</label>
                  <input
                    name="taxId"
                    defaultValue={businessSettings.taxId}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Moneda</label>
                  <select
                    name="currency"
                    defaultValue={businessSettings.currency}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="USD">USD - Dólar estadounidense</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="MXN">MXN - Peso mexicano</option>
                    <option value="COP">COP - Peso colombiano</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Zona Horaria</label>
                  <select
                    name="timezone"
                    defaultValue={businessSettings.timezone}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="America/New_York">America/New_York</option>
                    <option value="America/Mexico_City">America/Mexico_City</option>
                    <option value="America/Bogota">America/Bogota</option>
                    <option value="Europe/Madrid">Europe/Madrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Idioma</label>
                  <select
                    name="language"
                    defaultValue={businessSettings.language}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 flex items-center"
              >
                <Save className="h-5 w-5 mr-2" />
                Guardar Configuración
              </button>
            </form>
          )}

          {/* Fiscal Settings */}
          {activeTab === 'fiscal' && (
            <form onSubmit={handleFiscalSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold">Datos Fiscales</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Tasa de Impuestos (%)</label>
                  <input
                    name="taxRate"
                    type="number"
                    step="0.01"
                    defaultValue={(fiscalData.taxRate * 100).toFixed(2)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">ID Fiscal</label>
                  <input
                    name="fiscalTaxId"
                    defaultValue={fiscalData.taxId}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de Negocio</label>
                  <select
                    name="businessType"
                    defaultValue={fiscalData.businessType}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="Restaurant">Restaurante</option>
                    <option value="Food Truck">Food Truck</option>
                    <option value="Cafeteria">Cafetería</option>
                    <option value="Bar">Bar</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Dirección Fiscal</label>
                  <input
                    name="fiscalAddress"
                    defaultValue={fiscalData.fiscalAddress}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Teléfono Fiscal</label>
                  <input
                    name="fiscalPhone"
                    type="tel"
                    defaultValue={fiscalData.fiscalPhone}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 flex items-center"
              >
                <Save className="h-5 w-5 mr-2" />
                Guardar Datos Fiscales
              </button>
            </form>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <form onSubmit={handleSystemSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold">Parámetros del Sistema</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <input
                    name="maintenanceMode"
                    type="checkbox"
                    defaultChecked={systemSettings.maintenanceMode}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm font-medium">Modo Mantenimiento</label>
                </div>

                <div className="flex items-center">
                  <input
                    name="allowRegistration"
                    type="checkbox"
                    defaultChecked={systemSettings.allowRegistration}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm font-medium">Permitir Registro de Usuarios</label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Máximo Pedidos por Hora</label>
                  <input
                    name="maxOrdersPerHour"
                    type="number"
                    defaultValue={systemSettings.maxOrdersPerHour}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tiempo de Sesión (segundos)</label>
                  <input
                    name="sessionTimeout"
                    type="number"
                    defaultValue={systemSettings.sessionTimeout}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Frecuencia de Backup</label>
                  <select
                    name="backupFrequency"
                    defaultValue={systemSettings.backupFrequency}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="daily">Diario</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Retención de Logs (días)</label>
                  <input
                    name="logRetentionDays"
                    type="number"
                    defaultValue={systemSettings.logRetentionDays}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 flex items-center"
              >
                <Save className="h-5 w-5 mr-2" />
                Guardar Configuración del Sistema
              </button>
            </form>
          )}

          {/* Audit Logs */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Registro de Auditoría</h2>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acción
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usuario
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recurso
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha/Hora
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {auditLogs.map((log) => (
                        <tr key={log.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {log.action}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {log.userName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {log.resource}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {log.timestamp.toLocaleDateString()} {log.timestamp.toLocaleTimeString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {auditLogs.length === 0 && (
                <p className="text-gray-500 text-center py-8">No hay registros de auditoría</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}