export interface Item {
  id: string;
  name: string;
  icon: string;
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