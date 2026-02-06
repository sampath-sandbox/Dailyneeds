import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../App';
import { useSession } from '../context/MockSessionContext';

type SettingsScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Settings'>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { userType, userMobile } = useSession();
  const [activeTab, setActiveTab] = useState<'item' | 'customer' | 'profile' | 'app'>('item');

  const [itemForm, setItemForm] = useState({
    name: '',
    brand: '',
    price: '',
    deliveryCharge: '',
  });

  const [customerForm, setCustomerForm] = useState({
    name: '',
    apartment: '',
    tower: '',
    flat: '',
    mobile: '',
    alternateMobile: '',
    itemCount: '',
  });

  const handleAddItem = () => {
    if (!itemForm.name || !itemForm.brand || !itemForm.price) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    Alert.alert('Success', 'Item added successfully!');
    setItemForm({ name: '', brand: '', price: '', deliveryCharge: '' });
  };

  const handleAddCustomer = () => {
    if (!customerForm.name || !customerForm.mobile || !customerForm.apartment) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    Alert.alert('Success', 'Customer added successfully!');
    setCustomerForm({
      name: '',
      apartment: '',
      tower: '',
      flat: '',
      mobile: '',
      alternateMobile: '',
      itemCount: '',
    });
  };

  const handleUpdateSettings = (setting: string) => {
    Alert.alert('Success', `${setting} updated successfully!`);
  };

  if (userType !== 'agent') {
    return (
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800' }}
        style={styles.background}
      >
        <LinearGradient
          colors={['rgba(102, 126, 234, 0.9)', 'rgba(118, 75, 162, 0.9)']}
          style={styles.overlay}
        >
          <View style={styles.container}>
            <BlurView intensity={20} style={styles.restrictedCard}>
              <Text style={styles.restrictedTitle}>Access Restricted</Text>
              <Text style={styles.restrictedText}>Settings are only available for agents.</Text>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.backButtonText}>← Back to Home</Text>
              </TouchableOpacity>
            </BlurView>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800' }}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(102, 126, 234, 0.9)', 'rgba(118, 75, 162, 0.9)']}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <BlurView intensity={20} style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Agent Dashboard</Text>
          </BlurView>

          <BlurView intensity={15} style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'item' && styles.activeTab]}
              onPress={() => setActiveTab('item')}
            >
              <Text style={[styles.tabText, activeTab === 'item' && styles.activeTabText]}>
                📦 Items
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tab, activeTab === 'customer' && styles.activeTab]}
              onPress={() => setActiveTab('customer')}
            >
              <Text style={[styles.tabText, activeTab === 'customer' && styles.activeTabText]}>
                👥 Customers
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
              onPress={() => setActiveTab('profile')}
            >
              <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
                👤 Profile
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tab, activeTab === 'app' && styles.activeTab]}
              onPress={() => setActiveTab('app')}
            >
              <Text style={[styles.tabText, activeTab === 'app' && styles.activeTabText]}>
                ⚙️ App
              </Text>
            </TouchableOpacity>
          </BlurView>

          <ScrollView style={styles.content}>
            {activeTab === 'item' && (
              <BlurView intensity={15} style={styles.formCard}>
                <Text style={styles.formTitle}>Add New Item</Text>
                
                <TextInput
                  style={styles.input}
                  placeholder="Item Name"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={itemForm.name}
                  onChangeText={(text) => setItemForm({...itemForm, name: text})}
                />
                
                <TextInput
                  style={styles.input}
                  placeholder="Brand"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={itemForm.brand}
                  onChangeText={(text) => setItemForm({...itemForm, brand: text})}
                />
                
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={itemForm.price}
                  onChangeText={(text) => setItemForm({...itemForm, price: text})}
                  keyboardType="numeric"
                />
                
                <TextInput
                  style={styles.input}
                  placeholder="Delivery Charge"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={itemForm.deliveryCharge}
                  onChangeText={(text) => setItemForm({...itemForm, deliveryCharge: text})}
                  keyboardType="numeric"
                />
                
                <TouchableOpacity style={styles.submitButton} onPress={handleAddItem}>
                  <LinearGradient colors={['#667eea', '#764ba2']} style={styles.submitGradient}>
                    <Text style={styles.submitText}>Add Item</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </BlurView>
            )}

            {activeTab === 'customer' && (
              <BlurView intensity={15} style={styles.formCard}>
                <Text style={styles.formTitle}>Add New Customer</Text>
                
                <TextInput
                  style={styles.input}
                  placeholder="Customer Name"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={customerForm.name}
                  onChangeText={(text) => setCustomerForm({...customerForm, name: text})}
                />
                
                <TextInput
                  style={styles.input}
                  placeholder="Apartment"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={customerForm.apartment}
                  onChangeText={(text) => setCustomerForm({...customerForm, apartment: text})}
                />
                
                <TextInput
                  style={styles.input}
                  placeholder="Tower"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={customerForm.tower}
                  onChangeText={(text) => setCustomerForm({...customerForm, tower: text})}
                />
                
                <TextInput
                  style={styles.input}
                  placeholder="Flat Number"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={customerForm.flat}
                  onChangeText={(text) => setCustomerForm({...customerForm, flat: text})}
                />
                
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={customerForm.mobile}
                  onChangeText={(text) => setCustomerForm({...customerForm, mobile: text})}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
                
                <TextInput
                  style={styles.input}
                  placeholder="Alternate Mobile (Optional)"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={customerForm.alternateMobile}
                  onChangeText={(text) => setCustomerForm({...customerForm, alternateMobile: text})}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
                
                <TextInput
                  style={styles.input}
                  placeholder="Item Count"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={customerForm.itemCount}
                  onChangeText={(text) => setCustomerForm({...customerForm, itemCount: text})}
                  keyboardType="numeric"
                />
                
                <TouchableOpacity style={styles.submitButton} onPress={handleAddCustomer}>
                  <LinearGradient colors={['#3498DB', '#2980B9']} style={styles.submitGradient}>
                    <Text style={styles.submitText}>Add Customer</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </BlurView>
            )}

            {activeTab === 'profile' && (
              <BlurView intensity={15} style={styles.formCard}>
                <Text style={styles.formTitle}>User Profile</Text>
                
                <View style={styles.profileInfo}>
                  <Text style={styles.profileLabel}>User Type:</Text>
                  <Text style={styles.profileValue}>Agent</Text>
                </View>
                
                <View style={styles.profileInfo}>
                  <Text style={styles.profileLabel}>Mobile:</Text>
                  <Text style={styles.profileValue}>{userMobile}</Text>
                </View>
                
                <View style={styles.profileInfo}>
                  <Text style={styles.profileLabel}>Status:</Text>
                  <Text style={styles.profileValue}>Active</Text>
                </View>
              </BlurView>
            )}

            {activeTab === 'app' && (
              <BlurView intensity={15} style={styles.formCard}>
                <Text style={styles.formTitle}>App Settings</Text>
                
                <TouchableOpacity 
                  style={styles.settingItem}
                  onPress={() => handleUpdateSettings('Notifications')}
                >
                  <Text style={styles.settingText}>🔔 Notifications</Text>
                  <Text style={styles.settingValue}>Enabled</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.settingItem}
                  onPress={() => handleUpdateSettings('Theme')}
                >
                  <Text style={styles.settingText}>🎨 Theme</Text>
                  <Text style={styles.settingValue}>Default</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.settingItem}
                  onPress={() => handleUpdateSettings('Language')}
                >
                  <Text style={styles.settingText}>🌐 Language</Text>
                  <Text style={styles.settingValue}>English</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.settingItem}>
                  <Text style={styles.settingText}>📱 Version</Text>
                  <Text style={styles.settingValue}>1.0.0</Text>
                </TouchableOpacity>
              </BlurView>
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1 },
  container: { flex: 1, padding: 16 },
  header: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  restrictedCard: {
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  restrictedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  restrictedText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  formCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 16,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileLabel: {
    fontSize: 16,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  profileValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  settingText: {
    fontSize: 16,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  settingValue: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default SettingsScreen;