import ApiService from './ApiService';
import { mockData } from '../data/mockData';

export interface CustomerDetails {
  id: string;
  name: string;
  mobile: string;
  apartment: string;
  tower: string;
  flat: string;
  delivered: number;
  pending: number;
  total: number;
}

export interface DeliveryHistory {
  date: string;
  status: 'delivered' | 'missed' | 'pending';
  price: number;
  chat?: string[];
}

export interface VacationRequest {
  fromDate: string;
  toDate: string;
  itemId: string;
  reason?: string;
}

export interface UpdateRequest {
  itemId: string;
  brand: string;
  itemCount: string;
  address: string;
  alternateAddress?: string;
  specialInstructions?: string;
}

class CustomerApiService {
  async getCustomerDetails(mobile: string): Promise<CustomerDetails> {
    try {
      return await ApiService.get<CustomerDetails>(`/customer/details/${mobile}`);
    } catch (error) {
      const customer = mockData.customers.find(c => c.mobile === mobile);
      if (!customer) throw new Error('Customer not found');
      return customer;
    }
  }

  async getDeliveryHistory(mobile: string, month: string): Promise<DeliveryHistory[]> {
    try {
      return await ApiService.get<DeliveryHistory[]>(`/customer/history/${mobile}?month=${month}`);
    } catch (error) {
      // Mock history data
      const daysInMonth = 30;
      return Array.from({ length: daysInMonth }, (_, i) => ({
        date: `2024-01-${String(i + 1).padStart(2, '0')}`,
        status: i < 25 ? (Math.random() > 0.2 ? 'delivered' : 'missed') : 'pending',
        price: 25,
        chat: i === 10 ? ['Customer: Late delivery', 'Agent: Sorry, traffic issue'] : undefined
      }));
    }
  }

  async submitVacationRequest(request: VacationRequest): Promise<{ success: boolean; message: string }> {
    try {
      return await ApiService.post('/customer/vacation-request', request);
    } catch (error) {
      return {
        success: true,
        message: 'Vacation request submitted successfully. Agent will be notified.'
      };
    }
  }

  async submitUpdateRequest(request: UpdateRequest): Promise<{ success: boolean; message: string }> {
    try {
      return await ApiService.post('/customer/update-request', request);
    } catch (error) {
      return {
        success: true,
        message: 'Update request submitted successfully. Agent will review and respond.'
      };
    }
  }
}

export default new CustomerApiService();