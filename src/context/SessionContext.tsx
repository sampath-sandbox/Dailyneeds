import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Item {
  id: string;
  name: string;
  icon: string;
  price: number;
  unit: string;
  brand: string;
  description: string;
}

interface SessionContextType {
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
  userMobile: string;
  setUserMobile: (mobile: string) => void;
  userType: 'customer' | 'agent';
  setUserType: (type: 'customer' | 'agent') => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [userMobile, setUserMobile] = useState<string>('');
  const [userType, setUserType] = useState<'customer' | 'agent'>('customer');

  return (
    <SessionContext.Provider value={{
      selectedItem,
      setSelectedItem,
      userMobile,
      setUserMobile,
      userType,
      setUserType,
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