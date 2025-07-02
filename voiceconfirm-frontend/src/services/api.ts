import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthTokens,
  Order,
  OrderStats,
  OrderFilters,
  Call,
  CallStats,
  CallFilters,
  Voice,
  Language,
  Integration,
  DashboardStats
} from '../types';

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              const response = await this.refreshToken(refreshToken);
              const { access_token } = response.data;
              
              localStorage.setItem('access_token', access_token);
              originalRequest.headers.Authorization = `Bearer ${access_token}`;
              
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            this.logout();
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Auth methods
  async login(credentials: LoginCredentials): Promise<AxiosResponse<AuthTokens>> {
    const response = await this.api.post('/api/auth/login', credentials);
    const tokens = response.data;
    
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
    
    return response;
  }

  async register(userData: RegisterData): Promise<AxiosResponse<User>> {
    return this.api.post('/api/auth/register', userData);
  }

  async refreshToken(refreshToken: string): Promise<AxiosResponse<AuthTokens>> {
    return this.api.post('/api/auth/refresh', { refresh_token: refreshToken });
  }

  async getCurrentUser(): Promise<AxiosResponse<User>> {
    return this.api.get('/api/auth/me');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  // Order methods
  async getOrders(filters?: OrderFilters, skip = 0, limit = 50): Promise<AxiosResponse<Order[]>> {
    const params = new URLSearchParams();
    params.append('skip', skip.toString());
    params.append('limit', limit.toString());
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    return this.api.get(`/api/orders?${params.toString()}`);
  }

  async getOrder(orderId: string): Promise<AxiosResponse<Order>> {
    return this.api.get(`/api/orders/${orderId}`);
  }

  async createOrder(orderData: any): Promise<AxiosResponse<Order>> {
    return this.api.post('/api/orders', orderData);
  }

  async updateOrder(orderId: string, orderData: any): Promise<AxiosResponse<Order>> {
    return this.api.put(`/api/orders/${orderId}`, orderData);
  }

  async deleteOrder(orderId: string): Promise<AxiosResponse<void>> {
    return this.api.delete(`/api/orders/${orderId}`);
  }

  async getOrderStats(): Promise<AxiosResponse<OrderStats>> {
    return this.api.get('/api/orders/stats');
  }

  async bulkImportOrders(ordersData: any[]): Promise<AxiosResponse<any>> {
    return this.api.post('/api/orders/bulk-import', ordersData);
  }

  // Call methods
  async getCalls(filters?: CallFilters, skip = 0, limit = 50): Promise<AxiosResponse<Call[]>> {
    const params = new URLSearchParams();
    params.append('skip', skip.toString());
    params.append('limit', limit.toString());
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    return this.api.get(`/api/calls?${params.toString()}`);
  }

  async getCall(callId: string): Promise<AxiosResponse<Call>> {
    return this.api.get(`/api/calls/${callId}`);
  }

  async initiateCall(
    orderId: string, 
    language = 'en', 
    voiceId?: string
  ): Promise<AxiosResponse<Call>> {
    const params = new URLSearchParams();
    params.append('language', language);
    if (voiceId) params.append('voice_id', voiceId);

    return this.api.post(`/api/calls/${orderId}/initiate?${params.toString()}`);
  }

  async getCallStats(): Promise<AxiosResponse<CallStats>> {
    return this.api.get('/api/calls/stats');
  }

  async getAvailableVoices(): Promise<AxiosResponse<{ voices: Voice[] }>> {
    return this.api.get('/api/calls/voices/available');
  }

  async getSupportedLanguages(): Promise<AxiosResponse<{ languages: Language[] }>> {
    return this.api.get('/api/calls/languages/supported');
  }

  // Integration methods (placeholder for future implementation)
  async getIntegrations(): Promise<AxiosResponse<Integration[]>> {
    // This would be implemented when integration endpoints are added
    return Promise.resolve({ data: [] } as any);
  }

  // Dashboard methods
  async getDashboardStats(): Promise<AxiosResponse<DashboardStats>> {
    const [ordersResponse, callsResponse, recentOrdersResponse, recentCallsResponse] = await Promise.all([
      this.getOrderStats(),
      this.getCallStats(),
      this.getOrders(undefined, 0, 5),
      this.getCalls(undefined, 0, 5)
    ]);

    const dashboardStats: DashboardStats = {
      orders: ordersResponse.data,
      calls: callsResponse.data,
      recent_orders: recentOrdersResponse.data,
      recent_calls: recentCallsResponse.data
    };

    return { data: dashboardStats } as AxiosResponse<DashboardStats>;
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Generic HTTP methods for external use
  async get(url: string, config?: any): Promise<AxiosResponse<any>> {
    return this.api.get(url, config);
  }

  async post(url: string, data?: any, config?: any): Promise<AxiosResponse<any>> {
    return this.api.post(url, data, config);
  }

  async put(url: string, data?: any, config?: any): Promise<AxiosResponse<any>> {
    return this.api.put(url, data, config);
  }

  async delete(url: string, config?: any): Promise<AxiosResponse<any>> {
    return this.api.delete(url, config);
  }

  async patch(url: string, data?: any, config?: any): Promise<AxiosResponse<any>> {
    return this.api.patch(url, data, config);
  }
}

export const apiService = new ApiService();
export default apiService;

