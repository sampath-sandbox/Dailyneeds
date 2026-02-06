import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/SimpleApiService';
import { User,Item } from '../models';
// interface Item {
//   id: string;
//   name: string;
//   icon: string;
//   price: number;
//   unit: string;
//   brand: string;
//   description: string;
// }

interface SessionContextType {
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
  userMobile: string;
  setUserMobile: (mobile: string) => void;
  userType: 1 | 2;
  setUserType: (type: 1 | 2) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  getToken: () => string | null;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [userMobile, setUserMobile] = useState<string>('');
  const [userType, setUserType] = useState<1 | 2>(1);
  const [user, setUserState] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);

  const setUser = async (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
    } else {
      await AsyncStorage.removeItem('user');
    }
  };

  const setToken = async (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      await AsyncStorage.setItem('authToken', newToken);
      apiService.setToken(newToken); // Ensure token is passed to ApiService
    } else {
      await AsyncStorage.removeItem('authToken');
      apiService.clearToken();
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    setUserMobile('');
    setUserType(1);
    await AsyncStorage.multiRemove(['authToken', 'user']);
  };

  const isAuthenticated = !!token && !!user;

  const getToken = () => token;

  return (
    <SessionContext.Provider value={{
      selectedItem,
      setSelectedItem,
      userMobile,
      setUserMobile,
      userType,
      setUserType,
      user,
      setUser,
      token,
      setToken,
      isAuthenticated,
      logout,
      getToken,
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};