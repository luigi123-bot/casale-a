export type Role = "CLIENT" | "CASHIER" | "ADMIN" | "SUPER_ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Session {
  user: User;
  token: string;
  expiresAt: Date;
}

export interface AuthState {
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresAt: string;
}

// Super Admin types
export interface UserManagementState {
  users: User[];
  isLoading: boolean;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
}

export interface BusinessSettings {
  businessName: string;
  address: string;
  phone: string;
  email: string;
  taxId: string;
  currency: string;
  timezone: string;
  language: string;
}

export interface FiscalData {
  taxRate: number;
  taxId: string;
  businessType: string;
  fiscalAddress: string;
  fiscalPhone: string;
}

export interface SystemSettings {
  maintenanceMode: boolean;
  allowRegistration: boolean;
  maxOrdersPerHour: number;
  sessionTimeout: number;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  logRetentionDays: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  timestamp: Date;
  ipAddress?: string;
}

export interface SuperAdminState {
  businessSettings: BusinessSettings;
  fiscalData: FiscalData;
  systemSettings: SystemSettings;
  auditLogs: AuditLog[];
  updateBusinessSettings: (settings: Partial<BusinessSettings>) => void;
  updateFiscalData: (data: Partial<FiscalData>) => void;
  updateSystemSettings: (settings: Partial<SystemSettings>) => void;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
}

// New types for restaurant POS client
export type Category = "Pizzas" | "Combos" | "Bebidas" | "Extras";

export interface Ingredient {
  id: string;
  name: string;
  price: number;
}

export interface PizzaCustomization {
  size: "Pequeña" | "Mediana" | "Grande";
  dough: "Delgada" | "Gruesa";
  sauce: "Tomate" | "BBQ" | "Pesto";
  extraIngredients: Ingredient[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  isCustomizable?: boolean;
  basePrice?: number; // for custom pizzas
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customization?: PizzaCustomization;
  notes?: string;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, customization?: PizzaCustomization, notes?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export type OrderStatus = "recibido" | "preparando" | "en camino" | "entregado";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  estimatedTime?: number; // in minutes
  notes?: string;
}

// New types for POS cashier
export interface POSOrderItem {
  id: string;
  product: Product;
  quantity: number;
  customization?: PizzaCustomization;
  unitPrice: number;
  totalPrice: number;
}

export interface POSOrder {
  id: string;
  items: POSOrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod?: 'cash' | 'card' | 'qr';
  customerName?: string;
  status: 'pending' | 'paid' | 'completed';
  createdAt: Date;
}

export interface POSState {
  currentOrder: POSOrder | null;
  startNewOrder: () => void;
  addItem: (product: Product, customization?: PizzaCustomization) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setCustomerName: (name: string) => void;
  completeOrder: (paymentMethod: 'cash' | 'card' | 'qr') => void;
  clearOrder: () => void;
}