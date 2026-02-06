import { API_CONFIG } from '../config/api';
import { LoginRequest, ResponseData } from '../models';

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;

    const isLoginEndpoint = endpoint === '/auth/login';

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(!isLoginEndpoint && this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async login(loginRequest: LoginRequest): Promise<Response> {
    return this.request<Response>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginRequest),
    });
  }

  async getItems(): Promise<any[]> {
    return this.get<any[]>('/items/active');
  }

  async getMyOrders(): Promise<any[]> {
    return this.get<any[]>('/orders/my-orders');
  }

  async getSuggestions(): Promise<any[]> {
    return this.get<any[]>('/suggestions');
  }

  async getCustomerDetails(itemId: string): Promise<any> {
    return this.get<any>(`/customers/details/${itemId}`);
  }

  async getAgentCustomers(itemId: string): Promise<any[]> {
    return this.get<any[]>(`/agents/customers/${itemId}`);
  }

  async updateDeliveryCount(customerId: string, itemId: string, count: number): Promise<any> {
    return this.post<any>('/deliveries/update', { customerId, itemId, count });
  }

  async getHistory(itemId?: string): Promise<any[]> {
    const endpoint = itemId ? `/history?itemId=${itemId}` : '/history';
    return this.get<any[]>(endpoint);
  }

  async submitUpdateRequest(data: any): Promise<any> {
    return this.post<any>('/requests/update', data);
  }

  async submitVacationRequest(data: any): Promise<any> {
    return this.post<any>('/requests/vacation', data);
  }

  async getAgentHistory(): Promise<any[]> {
    return this.get<any[]>('/agents/history');
  }

  async getAgentDashboard(): Promise<any> {
    return this.get<any>('/agents/dashboard');
  }

  async getPendingPayments(): Promise<any[]> {
    return this.get<any[]>('/payments/pending');
  }

  async updateSettings(settings: any): Promise<any> {
    return this.put<any>('/settings', settings);
  }
}

export default new ApiService();