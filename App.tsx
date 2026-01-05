import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, Platform } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CustomerDetailsScreen from './src/screens/CustomerDetailsScreen';
import AgentDetailsScreen from './src/screens/AgentDetailsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import VacationRequestScreen from './src/screens/VacationRequestScreen';
import UpdateRequestScreen from './src/screens/UpdateRequestScreen';
import AgentHistoryScreen from './src/screens/AgentHistoryScreen';
import AgentDashboardScreen from './src/screens/AgentDashboardScreen';
import PendingPaymentsScreen from './src/screens/PendingPaymentsScreen';
import { CustomDrawerContent } from './src/components';
import { SessionProvider } from './src/context/SessionContext';

export type RootStackParamList = {
  Login: undefined;
  HomeScreen: undefined;
  CustomerDetails: { selectedItem: any };
  History: { selectedItem: any; agentDetails: any };
  Request: { selectedItem: any; agentDetails: any };
  VacationRequest: { selectedItem: any; agentDetails: any };
  AgentScreen: undefined;
  Customer: { selectedItem?: string };
  Settings: undefined;
};

export type DrawerParamList = {
  Login: undefined;
  Home: undefined;
  CustomerDetails: undefined;
  AgentDetails: undefined;
  Settings: undefined;
  History: undefined;
  VacationRequest: undefined;
  UpdateRequest: undefined;
  AgentHistory: undefined;
  AgentDashboard: undefined;
  PendingPayments: undefined;
};

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      const originalConsoleWarn = console.warn;
      console.warn = (...args) => {
        if (args[0]?.includes?.('aria-hidden')) return;
        originalConsoleWarn(...args);
      };
    }
  }, []);
  const Stack = createStackNavigator<RootStackParamList>();
  const Drawer = createDrawerNavigator<DrawerParamList>();

  function DrawerNavigator() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: 280,
            backgroundColor: 'rgba(46, 204, 113, 0.9)',
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Customer" component={CustomerScreen} />
        <Drawer.Screen name="Agent" component={AgentScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    );
  }

  function AppNavigator() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#667eea',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            drawerStyle: {
              width: 280,
              backgroundColor: 'transparent',
            },
          }}
        >
          <Drawer.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Drawer.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'DailyNeeds' }}
          />
          <Drawer.Screen 
            name="CustomerDetails" 
            component={CustomerDetailsScreen} 
            options={{ title: 'Customer Details' }}
          />
          <Drawer.Screen 
            name="AgentDetails" 
            component={AgentDetailsScreen} 
            options={{ title: 'Agent Details' }}
          />
          <Drawer.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ title: 'Settings' }}
          />
          <Drawer.Screen 
            name="History" 
            component={HistoryScreen} 
            options={{ title: 'History' }}
          />
          <Drawer.Screen 
            name="VacationRequest" 
            component={VacationRequestScreen} 
            options={{ title: 'Vacation Request' }}
          />
          <Drawer.Screen 
            name="UpdateRequest" 
            component={UpdateRequestScreen} 
            options={{ title: 'Update Request' }}
          />
          <Drawer.Screen 
            name="AgentHistory" 
            component={AgentHistoryScreen} 
            options={{ title: 'Agent History' }}
          />
          <Drawer.Screen 
            name="AgentDashboard" 
            component={AgentDashboardScreen} 
            options={{ title: 'Dashboard' }}
          />
          <Drawer.Screen 
            name="PendingPayments" 
            component={PendingPaymentsScreen} 
            options={{ title: 'Pending Payments' }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <SessionProvider>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="#667eea" />
        <AppNavigator />
      </SafeAreaProvider>
    </SessionProvider>
  );
}