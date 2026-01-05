import { useState } from 'react';
import CustomerRepository from '../repositories/CustomerRepository';
import { CustomerDetails, DeliveryHistory, VacationRequest, UpdateRequest } from '../services/CustomerApiService';

export const useCustomerViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails | null>(null);
  const [deliveryHistory, setDeliveryHistory] = useState<DeliveryHistory[]>([]);

  const loadCustomerDetails = async (mobile: string) => {
    setLoading(true);
    setError(null);
    try {
      const details = await CustomerRepository.getCustomerDetails(mobile);
      setCustomerDetails(details);
    } catch (err: any) {
      setError(err.message || 'Failed to load customer details');
    } finally {
      setLoading(false);
    }
  };

  const loadDeliveryHistory = async (mobile: string, month: string) => {
    setLoading(true);
    setError(null);
    try {
      const history = await CustomerRepository.getDeliveryHistory(mobile, month);
      setDeliveryHistory(history);
    } catch (err: any) {
      setError(err.message || 'Failed to load delivery history');
    } finally {
      setLoading(false);
    }
  };

  const submitVacationRequest = async (request: VacationRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await CustomerRepository.submitVacationRequest(request);
      setLoading(false);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to submit vacation request');
      setLoading(false);
      throw err;
    }
  };

  const submitUpdateRequest = async (request: UpdateRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await CustomerRepository.submitUpdateRequest(request);
      setLoading(false);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to submit update request');
      setLoading(false);
      throw err;
    }
  };

  return {
    customerDetails,
    deliveryHistory,
    loading,
    error,
    loadCustomerDetails,
    loadDeliveryHistory,
    submitVacationRequest,
    submitUpdateRequest,
  };
};