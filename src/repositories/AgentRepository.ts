import AgentApiService, { 
  AgentCustomer, 
  PaymentRecord, 
  MonthlyReport, 
  DashboardStats 
} from '../services/AgentApiService';

class AgentRepository {
  async getCustomers(filters?: { apartment?: string; tower?: string; flat?: string }): Promise<AgentCustomer[]> {
    return await AgentApiService.getCustomers(filters);
  }

  async updateDeliveryCount(customerId: string, change: number): Promise<{ success: boolean; message: string }> {
    return await AgentApiService.updateDeliveryCount(customerId, change);
  }

  async getPendingPayments(): Promise<PaymentRecord[]> {
    return await AgentApiService.getPendingPayments();
  }

  async getPaymentHistory(): Promise<PaymentRecord[]> {
    return await AgentApiService.getPaymentHistory();
  }

  async sendPaymentReminder(paymentId: string): Promise<{ success: boolean; message: string }> {
    return await AgentApiService.sendPaymentReminder(paymentId);
  }

  async markPaymentAsPaid(paymentId: string): Promise<{ success: boolean; message: string }> {
    return await AgentApiService.markPaymentAsPaid(paymentId);
  }

  async getMonthlyReports(month: string, itemFilter?: string): Promise<MonthlyReport[]> {
    return await AgentApiService.getMonthlyReports(month, itemFilter);
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return await AgentApiService.getDashboardStats();
  }

  async addItem(item: any): Promise<{ success: boolean; message: string }> {
    return await AgentApiService.addItem(item);
  }

  async addCustomer(customer: any): Promise<{ success: boolean; message: string }> {
    return await AgentApiService.addCustomer(customer);
  }
}

export default new AgentRepository();