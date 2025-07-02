// User types
export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: 'user' | 'admin';
  is_active: boolean;
  subscription: UserSubscription;
  settings: UserSettings;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface UserSubscription {
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  start_date?: string;
  end_date?: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
}

export interface UserSettings {
  timezone: string;
  language: string;
  notifications: boolean;
  voice_settings: Record<string, any>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  company?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

// Order types
export interface Order {
  id: string;
  user_id: string;
  order_id: string;
  customer: OrderCustomer;
  order_details: OrderDetails;
  confirmation_status: 'pending' | 'confirmed' | 'failed' | 'cancelled';
  call_attempts: number;
  max_call_attempts: number;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  notes?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  last_call_date?: string;
  confirmed_at?: string;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email?: string;
  address?: Record<string, any>;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  sku?: string;
  image_url?: string;
}

export interface OrderDetails {
  items: OrderItem[];
  total: number;
  currency: string;
  order_date: string;
  shipping_address?: Record<string, any>;
  billing_address?: Record<string, any>;
}

export interface OrderStats {
  total_orders: number;
  pending_orders: number;
  confirmed_orders: number;
  failed_orders: number;
  cancelled_orders: number;
  confirmation_rate: number;
  average_call_attempts: number;
}

export interface OrderFilters {
  status?: string;
  priority?: string;
  date_from?: string;
  date_to?: string;
  customer_name?: string;
  order_id?: string;
}

// Call types
export interface Call {
  id: string;
  call_id: string;
  order_id: string;
  user_id: string;
  status: 'initiated' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  call_type: 'confirmation' | 'follow_up' | 'callback';
  language: string;
  voice_id?: string;
  duration?: number;
  transcript?: string;
  audio_url?: string;
  outcome?: 'confirmed' | 'rejected' | 'no_answer' | 'callback_requested' | 'invalid_number';
  customer_response?: string;
  ai_confidence?: number;
  retry_count: number;
  scheduled_at?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  started_at?: string;
  ended_at?: string;
}

export interface CallStats {
  total_calls: number;
  successful_calls: number;
  failed_calls: number;
  average_duration: number;
  success_rate: number;
  total_duration: number;
  calls_by_outcome: Record<string, number>;
  calls_by_language: Record<string, number>;
}

export interface CallFilters {
  status?: string;
  outcome?: string;
  language?: string;
  date_from?: string;
  date_to?: string;
  order_id?: string;
}

export interface Voice {
  voice_id: string;
  name: string;
  category: string;
  description?: string;
  preview_url?: string;
}

export interface Language {
  code: string;
  name: string;
}

// Integration types
export interface Integration {
  id: string;
  user_id: string;
  platform: 'shopify' | 'woocommerce' | 'google_sheets' | 'custom';
  name: string;
  description?: string;
  is_active: boolean;
  settings: Record<string, any>;
  webhook_url?: string;
  sync_frequency: 'real_time' | 'hourly' | 'daily' | 'manual';
  last_sync_status: 'never' | 'success' | 'failed' | 'in_progress';
  error_message?: string;
  created_at: string;
  updated_at: string;
  last_sync?: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// Dashboard types
export interface DashboardStats {
  orders: OrderStats;
  calls: CallStats;
  recent_orders: Order[];
  recent_calls: Call[];
}

// Form types
export interface OrderFormData {
  order_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  total: number;
  currency: string;
  items: OrderItem[];
  priority: 'low' | 'normal' | 'high' | 'urgent';
  notes?: string;
}

export interface CallFormData {
  language: string;
  voice_id?: string;
  scheduled_at?: string;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  icon: any;
  current?: boolean;
  badge?: number;
}

