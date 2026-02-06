
export interface ResponseData {
  isAutheticated: boolean;
  messageType: 1 | 2 | 3;
  statusCode: number;
  message: string;
  result: any;
}

export const emptyResponse: ResponseData = {
  isAutheticated: true,
  messageType: 1,
  statusCode: 200,
  message: 'No data available',
  result: [],
};
export interface LoginRequest {
  mobile: string;
  password: string;
  userType: 1 | 2;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: number;
  mobile: string;
  userType: string;
  name?: string;
  address?: string;
  isActive: boolean;
  createdAt: string;
}



export interface Item {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  unit: string;
  brand: string;
  description?: string;
}

export interface Suggestion {
  id: string;
  text: string;
  color: string;
}

export interface User {
  mobile: string;
  type: 'customer' | 'agent';
  name?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}