export interface Item {
  title: string;
  description: string;
  imageUrl: string;
}

export interface DeliveryHistory {
  date: string;
  status: 'Delivered' | 'Pending' | 'Cancelled';
  quantity: number;
}

export interface Order {
  item: string;
  customer: string;
  flat: string;
  mobile: string;
  brand: string;
  qty: number;
  apartment: string;
  price: number;
  deliveryperson: string;
}

export interface Agent {
  name: string;
  role: string;
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  address: string;
  userType: 'customer' | 'agent';
}

export interface UpdateRequest {
  customerName: string;
  phoneNumber: string;
  address?: string;
  requestType: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface VacationRequest {
  customerName: string;
  phoneNumber: string;
  startDate: string;
  endDate: string;
  reason: string;
  alternateContact?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}