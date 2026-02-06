// Configuration for API endpoints and settings

export const API_CONFIG = {
  // Update this URL to match your API server
  //BASE_URL: 'http://192.168.1.37:10350/api',
  BASE_URL: 'https://localhost:44394/api',
  
  // For development with local API server
  // BASE_URL: 'http://10.0.2.2:7000/api', // Android emulator
  // BASE_URL: 'http://localhost:7000/api', // iOS simulator/web
  
  // Timeout settings
  TIMEOUT: 30000, // 30 seconds
  
  // Retry settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  ITEMS: {
    GET_ALL: '/items',
    GET_ACTIVE: '/items/active',
    GET_BY_CATEGORY: (category: string) => `/items/category/${category}`,
  },
  ORDERS: {
    GET_ALL: '/orders',
    GET_MY_ORDERS: '/orders/my-orders',
    GET_BY_ID: (id: number) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE: (id: number) => `/orders/${id}`,
    UPDATE_STATUS: (id: number) => `/orders/${id}/status`,
    ASSIGN_AGENT: (orderId: number, agentId: number) => `/orders/${orderId}/assign-agent/${agentId}`,
  },
  REQUESTS: {
    UPDATE_REQUESTS: {
      GET_ALL: '/requests/updates',
      GET_MY: '/requests/my-updates',
      CREATE: '/requests/updates',
      UPDATE: (id: number) => `/requests/updates/${id}`,
    },
    VACATION_REQUESTS: {
      GET_ALL: '/requests/vacations',
      GET_MY: '/requests/my-vacations',
      CREATE: '/requests/vacations',
      UPDATE: (id: number) => `/requests/vacations/${id}`,
    },
  },
  USERS: {
    GET_ALL: '/users',
    GET_BY_TYPE: (type: string) => `/users/type/${type}`,
  },
};