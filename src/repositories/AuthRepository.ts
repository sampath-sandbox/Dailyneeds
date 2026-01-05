import AuthApiService, { LoginRequest, LoginResponse } from '../services/AuthApiService';

class AuthRepository {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
     debugger;
    return await AuthApiService.login(credentials);
  }

  async logout(): Promise<{ success: boolean }> {
     debugger;
    return await AuthApiService.logout();
  }
}

export default new AuthRepository();