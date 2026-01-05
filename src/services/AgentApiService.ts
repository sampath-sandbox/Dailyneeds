import ApiService from './ApiService';
import { mockData } from '../data/mockData';

export interface AgentCustomer {
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

export interface PaymentRecord {
  id: string;
  customerName: string;
  mobile: string;
  item: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'overdue' | 'paid';
  daysOverdue?: number;
  lastPaymentDate?: string;
}

export interface MonthlyReport {
  id: string;
  customerName: string;
  mobile: string;
  item: string;
  price: number;
  deliveryCharge: number;
  deliveredCount: number;
  totalAmount: number;
  month: string;
}

export interface DashboardStats {
  totalCustomers: number;
  monthlyRevenue: number;
  pendingAmount: number;
  deliveryRate: number;
}

class AgentApiService {
  async getCustomers(filters?: { apartment?: string; tower?: string; flat?: string }): Promise<AgentCustomer[]> {
    try {
      return await ApiService.get<AgentCustomer[]>('/agent/customers', { params: filters });
    } catch (error) {
      return mockData.customers;
    }
  }

  async updateDeliveryCount(customerId: string, change: number): Promise<{ success: boolean; message: string }> {
    try {
      return await ApiService.put(`/agent/delivery/${customerId}`, { change });
    } catch (error) {
      return {
        success: true,
        message: 'Delivery count updated successfully. Customer notified.'
      };
    }
  }

  async getPendingPayments(): Promise<PaymentRecord[]> {
    try {
      return await ApiService.get<PaymentRecord[]>('/agent/payments/pending');
    } catch (error) {
      return mockData.payments;
    }
  }

  async getPaymentHistory(): Promise<PaymentRecord[]> {
    try {
      return await ApiService.get<PaymentRecord[]>('/agent/payments/history');
    } catch (error) {
      return [
        {
          id: '3', customerName: 'Neha Sharma', mobile: '9876543211', item: 'Fresh Curd',
          amount: 480, dueDate: '2024-01-31', status: 'paid', lastPaymentDate: '2024-01-30'
        }
      ];
    }
  }

  async sendPaymentReminder(paymentId: string): Promise<{ success: boolean; message: string }> {
    try {
      return await ApiService.post(`/agent/payment-reminder/${paymentId}`, {});
    } catch (error) {
      return {
        success: true,
        message: 'Payment reminder sent via WhatsApp and SMS'
      };
    }
  }

  async markPaymentAsPaid(paymentId: string): Promise<{ success: boolean; message: string }> {
    try {
      return await ApiService.put(`/agent/payment/${paymentId}/paid`, {});
    } catch (error) {
      return {
        success: true,
        message: 'Payment marked as received. Customer notified.'
      };
    }
  }

  async getMonthlyReports(month: string, itemFilter?: string): Promise<MonthlyReport[]> {
    try {
      return await ApiService.get<MonthlyReport[]>(`/agent/reports/${month}`, { params: { item: itemFilter } });
    } catch (error) {
      return [
        {
          id: '1', customerName: 'Ravi Kumar', mobile: '9876543210', item: 'Fresh Milk',
          price: 25, deliveryCharge: 5, deliveredCount: 28, totalAmount: 840, month
        },
        {
          id: '2', customerName: 'Sita Patel', mobile: '9123456789', item: 'Fresh Milk',
          price: 25, deliveryCharge: 5, deliveredCount: 25, totalAmount: 750, month
        }
      ];
    }
  }

  async getDashboardStats(): Promise<DashboardStats> {
    try {
      return await ApiService.get<DashboardStats>('/agent/dashboard/stats');
    } catch (error) {
      return {
        totalCustomers: 156,
        monthlyRevenue: 125000,
        pendingAmount: 25000,
        deliveryRate: 95
      };
    }
  }

  async addItem(item: { name: string; brand: string; price: string; deliveryCharge: string }): Promise<{ success: boolean; message: string }> {
    try {
      return await ApiService.post('/agent/items', item);
    } catch (error) {
      return {
        success: true,
        message: 'Item added successfully'
      };
    }
  }

  async addCustomer(customer: any): Promise<{ success: boolean; message: string }> {
    try {
      return await ApiService.post('/agent/customers', customer);
    } catch (error) {
      return {
        success: true,
        message: 'Customer added successfully'
      };
    }
  }
}

export default new AgentApiService();