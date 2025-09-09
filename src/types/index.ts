// User & Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Product & E-commerce Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

// Monitoring Data Types
export interface MonitoringData {
  id: string;
  type: 'sensor' | 'operational' | 'fuel' | 'maintenance' | 'system';
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  location?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface MonitoringAlert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// Maintenance Request Types
export interface MaintenanceRequest {
  id: string;
  userId: string;
  user: User;
  title: string;
  description: string;
  category: 'repair' | 'inspection' | 'replacement' | 'upgrade';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  assignedTo?: string;
  estimatedCost?: number;
  actualCost?: number;
  scheduledDate?: string;
  completedDate?: string;
  images?: string[];
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// Message System Types
export interface Message {
  id: string;
  senderId: string;
  sender: User;
  receiverId?: string;
  receiver?: User;
  subject: string;
  content: string;
  isRead: boolean;
  parentId?: string;
  attachments?: string[];
  createdAt: string;
}

// Dashboard Stats Types
export interface AdminDashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingMaintenanceRequests: number;
  unreadMessages: number;
  activeMonitoringAlerts: number;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  topProducts: Array<{
    product: Product;
    sales: number;
    revenue: number;
  }>;
  recentActivities: Array<{
    id: string;
    type: 'order' | 'maintenance' | 'message' | 'user';
    description: string;
    timestamp: string;
  }>;
}

export interface UserDashboardStats {
  totalOrders: number;
  pendingOrders: number;
  maintenanceRequests: number;
  unreadMessages: number;
  recentOrders: Order[];
  monitoringAlerts: MonitoringAlert[];
  availableProducts: number;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  name: string;
  type: 'bank_transfer' | 'e_wallet' | 'qris' | 'credit_card';
  isActive: boolean;
  config: Record<string, any>;
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  paymentGatewayId?: string;
  paymentUrl?: string;
  paidAt?: string;
  createdAt: string;
}

// System Configuration Types
export interface SystemConfig {
  siteName: string;
  siteDescription: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  currency: string;
  timezone: string;
  maintenanceMode: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  roles: ('admin' | 'user')[];
  children?: NavigationItem[];
}

// Filter & Search Types
export interface FilterOptions {
  category?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  search?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
}

export interface ProductForm {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  isActive: boolean;
}

export interface MaintenanceRequestForm {
  title: string;
  description: string;
  category: MaintenanceRequest['category'];
  priority: MaintenanceRequest['priority'];
  images?: File[];
}

export interface MessageForm {
  receiverId?: string;
  subject: string;
  content: string;
  attachments?: File[];
}