import { API_CONFIG } from '../config/api';
import { Item, Suggestion, LoginRequest, ResponseData, emptyResponse } from '../models';
import { mockData } from '../data/mockData';
import { useSession } from '../context/SessionContext';
class SimpleApiService {

  private token: string | null = null;
  constructor() {
    debugger;
    
  }
  setToken(token: string) {
    debugger;
    this.token = token;
  }

  clearToken() {
    debugger;
    this.token = null;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    debugger;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth
  async login(loginRequest: LoginRequest): Promise<ResponseData> {
    return this.request<ResponseData>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginRequest),
    });
  }

  // Items
  async getItems(): Promise<ResponseData> {
    try {
      const response = await this.request<ResponseData>('/items');
      return response || [];
    } catch (error) {
      console.warn('Using mock items data');
      return emptyResponse
    }
  }

  async getSuggestions(): Promise<ResponseData> {
    try {
      const response = await this.request<ResponseData>('/Suggesstions');
      return response || [];
    } catch (error) {
      console.log('Using mock suggestions data');
      return emptyResponse
    }
  }


  // Customer Details
  async getCustomerDetails(itemId: string): Promise<ResponseData> {
    try {
      const response = await this.request<ResponseData>(`/CustomerDetails/details/${itemId}`);
      return response || [];
    } catch (error) {
      console.log('Using mock suggestions data');
      return emptyResponse
    }
  }

  async getCustomerHistory(itemId: number, userId: number): Promise<ResponseData> {
    try {
      const response = await this.request<ResponseData>(`/CustomerHistory/history-details?itemId=${itemId}&userId=${userId}`);
      return response || [];
    } catch (error) {
      console.log('Using mock suggestions data');
      return emptyResponse
    }
  }

  async submitUpdateRequest(data: any) {
    try {
      return await this.request('/requests/update', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log('Update request submitted (mock)');
      return { success: true };
    }
  }

  async submitVacationRequest(data: any) {
    try {
      return await this.request('/requests/vacation', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log('Vacation request submitted (mock)');
      return { success: true };
    }
  }

  // Agent
  async getAgentCustomers(itemId: string) {
    try {
      return await this.request(`/agents/customers/${itemId}`);
    } catch (error) {
      return [
        {
          id: '1',
          name: 'Ravi Kumar',
          mobile: '9876543210',
          apartment: 'Merlion Apartments',
          tower: 'A',
          flat: '101',
          delivered: 28,
          pending: 2,
          total: 750
        }
      ];
    }
  }

  async updateDeliveryCount(customerId: string, itemId: string, count: number) {
    try {
      return await this.request('/deliveries/update', {
        method: 'POST',
        body: JSON.stringify({ customerId, itemId, count }),
      });
    } catch (error) {
      console.log('Delivery count updated (mock)');
      return { success: true };
    }
  }

  // Settings
  async addItem(data: any) {
    try {
      return await this.request('/items', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log('Item added (mock)');
      return { success: true };
    }
  }

  async addCustomer(data: any) {
    try {
      return await this.request('/customers', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log('Customer added (mock)');
      return { success: true };
    }
  }
}

export default new SimpleApiService();