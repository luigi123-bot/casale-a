import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SuperAdminState, BusinessSettings, FiscalData, SystemSettings, AuditLog } from '~/types';

const defaultBusinessSettings: BusinessSettings = {
  businessName: 'Pizzería POS',
  address: 'Calle Principal 123, Ciudad',
  phone: '+1 234 567 8900',
  email: 'contacto@pizzeria.com',
  taxId: '123456789',
  currency: 'USD',
  timezone: 'America/New_York',
  language: 'es',
};

const defaultFiscalData: FiscalData = {
  taxRate: 0.08,
  taxId: '123456789',
  businessType: 'Restaurant',
  fiscalAddress: 'Calle Principal 123, Ciudad',
  fiscalPhone: '+1 234 567 8900',
};

const defaultSystemSettings: SystemSettings = {
  maintenanceMode: false,
  allowRegistration: true,
  maxOrdersPerHour: 100,
  sessionTimeout: 3600,
  backupFrequency: 'daily',
  logRetentionDays: 90,
};

export const useSuperAdminStore = create<SuperAdminState>()(
  persist(
    (set, _) => ({
      businessSettings: defaultBusinessSettings,
      fiscalData: defaultFiscalData,
      systemSettings: defaultSystemSettings,
      auditLogs: [],

      updateBusinessSettings: (settings) => {
        set((state) => ({
          businessSettings: { ...state.businessSettings, ...settings },
        }));
      },

      updateFiscalData: (data) => {
        set((state) => ({
          fiscalData: { ...state.fiscalData, ...data },
        }));
      },

      updateSystemSettings: (settings) => {
        set((state) => ({
          systemSettings: { ...state.systemSettings, ...settings },
        }));
      },

      addAuditLog: (logData) => {
        const newLog: AuditLog = {
          ...logData,
          id: Date.now().toString(),
          timestamp: new Date(),
        };
        set((state) => ({
          auditLogs: [newLog, ...state.auditLogs.slice(0, 999)], // Keep last 1000 logs
        }));
      },
    }),
    {
      name: 'super-admin-storage',
      partialize: (state) => ({
        businessSettings: state.businessSettings,
        fiscalData: state.fiscalData,
        systemSettings: state.systemSettings,
        auditLogs: state.auditLogs,
      }),
    }
  )
);