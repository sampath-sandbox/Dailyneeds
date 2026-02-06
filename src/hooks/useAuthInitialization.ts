import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSession } from '../context/SessionContext';
import apiService, { User } from '../services/ApiService';

export const useAuthInitialization = () => {
  const { setToken, setUser, setUserMobile, setUserType } = useSession();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const [storedToken, storedUser] = await AsyncStorage.multiGet([
          'authToken',
          'user'
        ]);

        const token = storedToken[1];
        const userString = storedUser[1];

        if (token && userString) {
          const user: User = JSON.parse(userString);
          
          // Set token in API client
          apiService.setToken(token);
          
          // Update session state
          setToken(token);
          setUser(user);
          setUserMobile(user.mobile);
          setUserType(user.userType as 'customer' | 'agent');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear any corrupted data
        await AsyncStorage.multiRemove(['authToken', 'user']);
      }
    };

    initializeAuth();
  }, [setToken, setUser, setUserMobile, setUserType]);
};