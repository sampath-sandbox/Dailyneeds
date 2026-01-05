import CustomerApiService, { CustomerDetails, DeliveryHistory, VacationRequest, UpdateRequest } from '../services/CustomerApiService';

class CustomerRepository {
  async getCustomerDetails(mobile: string): Promise<CustomerDetails> {
    return await CustomerApiService.getCustomerDetails(mobile);
  }

  async getDeliveryHistory(mobile: string, month: string): Promise<DeliveryHistory[]> {
    return await CustomerApiService.getDeliveryHistory(mobile, month);
  }

  async submitVacationRequest(request: VacationRequest): Promise<{ success: boolean; message: string }> {
    return await CustomerApiService.submitVacationRequest(request);
  }

  async submitUpdateRequest(request: UpdateRequest): Promise<{ success: boolean; message: string }> {
    return await CustomerApiService.submitUpdateRequest(request);
  }
}

export default new CustomerRepository();