import { useState } from 'react';
import AuthRepository from '../repositories/AuthRepository';
import { LoginRequest } from '../services/AuthApiService';

export const useLoginViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await AuthRepository.login(credentials);
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AuthRepository.logout();
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false };
    }
  };

  return {
    login,
    logout,
    loading,
    error,
  };
};