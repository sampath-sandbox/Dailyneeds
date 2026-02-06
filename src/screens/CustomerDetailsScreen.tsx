import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../App';
import { useSession } from '../context/SessionContext';
import { mockData } from '../data/mockData';
import { Item, Suggestion, ResponseData, emptyResponse } from '../models';
import SimpleApiService from '../services/SimpleApiService';

type CustomerDetailsNavigationProp = DrawerNavigationProp<DrawerParamList, 'CustomerDetails'>;

interface Props {
  navigation: CustomerDetailsNavigationProp;
}

const CustomerDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedItem, userMobile } = useSession();
  //const [customerData, setCustomerData] = useState<any>(null);
    const [customerData, setCustomerData] = useState<ResponseData>({} as ResponseData);
  
//const [customerData, setCustomerData] = useState<CustomerDetails | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

     useEffect(() => {
       if (selectedItem) {
         loadCustomerdetails();
       }
     }, [selectedItem]);
   
     const loadCustomerdetails = async () => {
       if (!selectedItem) return;
       debugger;
       setLoading(true);
       try {
         const data = await SimpleApiService.getCustomerDetails(selectedItem.id);
         //setCustomers(data);
 setCustomerData({
      agentName: data?.result?.agentName || 'Rajesh Kumar',
      agentMobile: data?.result?.agentMobile || '9123456789',
      delivered: data?.result?.delivered || 28,
      pending: data?.result?.pending || 2,
      totalAmount: (selectedItem?.price + 5) * (data?.result?.delivered || 28)
    });

       } catch (error) {
         console.error('Error loading customers:', error);
        //  // Fallback to mock data
       
       } finally {
         setLoading(false);
       }
     };

debugger;
    // Load mock customer data
    // setCustomerData({
    //   agentName: 'Rajesh Kumar',
    //   agentMobile: '9123456789',
    //   delivered: 28,
    //   pending: 2,
    //   totalAmount: (selectedItem?.price? + 5) * 28
    // });
  
  
  const handleHistoryClick = () => {
    navigation.navigate('History');
  };
  
  const handleVacationRequest = () => {
    navigation.navigate('VacationRequest');
  };
  
  const handleUpdateRequest = () => {
    navigation.navigate('UpdateRequest');
  };
  
  if (!selectedItem) {
    return null;
  }
debugger;
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const deliveryCharge = 5;
  const delivered = customerData?.result?.delivered || 28;
  const pending = customerData?.result?.pending || 2;
  const totalPrice = customerData?.result?.totalAmount || (selectedItem.price + deliveryCharge) * delivered;

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800' }}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(102, 126, 234, 0.9)', 'rgba(118, 75, 162, 0.9)']}
        style={styles.overlay}
      >
        <ScrollView style={styles.container}>
          <BlurView intensity={20} style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Customer Details</Text>
          </BlurView>

          <BlurView intensity={15} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemIcon}>{selectedItem.imageUrl}</Text>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{selectedItem.name}</Text>
                <Text style={styles.itemBrand}>{selectedItem.brand}</Text>
              </View>
            </View>
          </BlurView>

          <BlurView intensity={15} style={styles.detailsCard}>
            <Text style={styles.cardTitle}>Details - {currentMonth}</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Agent Name:</Text>
              <Text style={styles.detailValue}>{customerData?.agentName || 'Loading...'}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Agent Mobile:</Text>
              <Text style={styles.detailValue}>{customerData?.agentMobile || 'Loading...'}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Item Price:</Text>
              <Text style={styles.detailValue}>₹{selectedItem.price}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Delivery Charge:</Text>
              <Text style={styles.detailValue}>₹{deliveryCharge}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Delivered:</Text>
              <Text style={styles.deliveredValue}>{delivered}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Pending:</Text>
              <Text style={styles.pendingValue}>{pending}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Amount:</Text>
              <Text style={styles.totalAmount}>₹{totalPrice}</Text>
            </View>
          </BlurView>

          <BlurView intensity={15} style={styles.actionsCard}>
            <Text style={styles.cardTitle}>Actions</Text>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleHistoryClick}
            >
              <LinearGradient colors={['#3498DB', '#2980B9']} style={styles.actionGradient}>
                <Text style={styles.actionText}>📊 History</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleVacationRequest}
            >
              <LinearGradient colors={['#E74C3C', '#C0392B']} style={styles.actionGradient}>
                <Text style={styles.actionText}>🏖️ Vacation Request</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleUpdateRequest}
            >
              <LinearGradient colors={['#F39C12', '#E67E22']} style={styles.actionGradient}>
                <Text style={styles.actionText}>📝 Update Request</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#667eea',
  },
  background: { flex: 1 },
  overlay: { flex: 1 },
  container: { flex: 1, padding: 16 },
  header: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  itemCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  itemBrand: {
    fontSize: 16,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  detailsCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  deliveredValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pendingValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F39C12',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  actionsCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  actionButton: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CustomerDetailsScreen;