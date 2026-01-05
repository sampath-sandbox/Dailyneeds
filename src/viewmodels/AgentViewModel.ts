import { useState } from 'react';
import AgentRepository from '../repositories/AgentRepository';
import { AgentCustomer, PaymentRecord, MonthlyReport, DashboardStats } from '../services/AgentApiService';

export const useAgentViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customers, setCustomers] = useState<AgentCustomer[]>([]);
  const [pendingPayments, setPendingPayments] = useState<PaymentRecord[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([]);
  const [monthlyReports, setMonthlyReports] = useState<MonthlyReport[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);

  const loadCustomers = async (filters?: { apartment?: string; tower?: string; flat?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AgentRepository.getCustomers(filters);
      setCustomers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const updateDeliveryCount = async (customerId: string, change: number) => {
    try {
      const result = await AgentRepository.updateDeliveryCount(customerId, change);
      if (result.success) {
        // Refresh customers list
        await loadCustomers();
      }
      return result;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update delivery count');
    }
  };

  const loadPendingPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await AgentRepository.getPendingPayments();
      setPendingPayments(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load pending payments');
    } finally {
      setLoading(false);
    }
  };

  const loadPaymentHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await AgentRepository.getPaymentHistory();
      setPaymentHistory(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load payment history');
    } finally {
      setLoading(false);
    }
  };

  const sendPaymentReminder = async (paymentId: string) => {
    try {
      return await AgentRepository.sendPaymentReminder(paymentId);
    } catch (err: any) {
      throw new Error(err.message || 'Failed to send payment reminder');
    }
  };

  const markPaymentAsPaid = async (paymentId: string) => {
    try {
      const result = await AgentRepository.markPaymentAsPaid(paymentId);
      if (result.success) {
        await loadPendingPayments();
        await loadPaymentHistory();
      }
      return result;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to mark payment as paid');
    }
  };

  const loadMonthlyReports = async (month: string, itemFilter?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AgentRepository.getMonthlyReports(month, itemFilter);
      setMonthlyReports(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load monthly reports');
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await AgentRepository.getDashboardStats();
      setDashboardStats(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: any) => {
    try {
      return await AgentRepository.addItem(item);
    } catch (err: any) {
      throw new Error(err.message || 'Failed to add item');
    }
  };

  const addCustomer = async (customer: any) => {
    try {
      return await AgentRepository.addCustomer(customer);
    } catch (err: any) {
      throw new Error(err.message || 'Failed to add customer');
    }
  };

  return {
    customers,
    pendingPayments,
    paymentHistory,
    monthlyReports,
    dashboardStats,
    loading,
    error,
    loadCustomers,
    updateDeliveryCount,
    loadPendingPayments,
    loadPaymentHistory,
    sendPaymentReminder,
    markPaymentAsPaid,
    loadMonthlyReports,
    loadDashboardStats,
    addItem,
    addCustomer,
  };
};