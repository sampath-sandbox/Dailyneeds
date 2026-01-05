import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'customer' | 'agent';

interface User {
  role: UserRole;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    setUser({
      role,
      name: role === 'customer' ? 'Customer User' : 'Agent User',
      email: `${role}@dailyneeds.com`,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = user !== null;

  return (
    <UserContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};