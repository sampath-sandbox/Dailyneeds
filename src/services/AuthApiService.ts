import ApiService from './ApiService';
import { mockData } from '../data/mockData';

export interface LoginRequest {
  mobile: string;
  password: string;
  userType: 'customer' | 'agent';
}

export interface LoginResponse {
  success: boolean;
  user: {
    mobile: string;
    name: string;
    type: 'customer' | 'agent';
    token: string;
  };
  message: string;
}

class AuthApiService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    debugger;
    try {
      const response = await ApiService.post<LoginResponse>('/auth/login', credentials);
      return response;
    } catch (error) {
      // Mock implementation
      const user = mockData.users.find(u => 
        u.mobile === credentials.mobile && u.type === credentials.userType
      );
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      return {
        success: true,
        user: {
          mobile: user.mobile,
          name: user.name,
          type: user.type,
          token: 'mock_token_' + Date.now()
        },
        message: `Welcome ${user.name}!`
      };
    }
  }

  async logout(): Promise<{ success: boolean }> {
     debugger;
    try {
      return await ApiService.post('/auth/logout', {});
    } catch (error) {
      return { success: true };
    }
  }
}

export default new AuthApiService();