import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  FlatList,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../App';
import { useSession } from '../context/MockSessionContext';
import { mockData } from '../data/mockData';

type AgentDetailsNavigationProp = DrawerNavigationProp<DrawerParamList, 'AgentDetails'>;

interface Props {
  navigation: AgentDetailsNavigationProp;
}

interface Customer {
  id: string;
  name: string;
  mobile: string;
  apartment: string;
  tower: string;
  flat: string;
  delivered: number;
  pending: number;
  total: number;
}

const AgentDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedItem } = useSession();
  const [selectedApartment, setSelectedApartment] = useState('All');
  const [selectedTower, setSelectedTower] = useState('All');
  const [selectedFlat, setSelectedFlat] = useState('All');
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // Load mock customers data
    setCustomers([
      {
        id: '1',
        name: 'Ravi Kumar',
        mobile: '9876543210',
        apartment: 'Merlion Apartments',
        tower: 'A',
        flat: '101',
        delivered: 28,
        pending: 2,
        total: 750
      },
      {
        id: '2',
        name: 'Sita Patel',
        mobile: '9123456789',
        apartment: 'Sri Krishna Complex',
        tower: 'B',
        flat: '202',
        delivered: 25,
        pending: 5,
        total: 625
      }
    ]);
  }, []);

  const apartments = ['All', 'Merlion Apartments', 'Sri Krishna Complex', 'Praneeth Heights'];
  const towers = ['All', 'A', 'B', 'C', 'D'];
  const flats = ['All', '101', '102', '201', '202', '301', '302', '303'];

  const filteredCustomers = customers.filter(customer => {
    return (selectedApartment === 'All' || customer.apartment === selectedApartment) &&
           (selectedTower === 'All' || customer.tower === selectedTower) &&
           (selectedFlat === 'All' || customer.flat === selectedFlat);
  });

  const updateDeliveredCount = (customerId: string, change: number) => {
    setCustomers(prev => 
      prev.map(customer => {
        if (customer.id === customerId) {
          const newDelivered = Math.max(0, customer.delivered + change);
          const newPending = Math.max(0, customer.pending - change);
          Alert.alert('Success', `Delivery updated! Notification sent to ${customer.name}`);
          return { ...customer, delivered: newDelivered, pending: newPending };
        }
        return customer;
      })
    );
  };

  const handleAgentHistory = () => {
    navigation.navigate('AgentHistory');
  };

  const handleAgentDashboard = () => {
    navigation.navigate('AgentDashboard');
  };

  const handlePendingPayments = () => {
    navigation.navigate('PendingPayments');
  };

  const renderCustomer = ({ item }: { item: Customer }) => (
    <BlurView intensity={15} style={styles.customerCard}>
      <View style={styles.customerHeader}>
        <Text style={styles.customerName}>{item.name}</Text>
        <Text style={styles.customerMobile}>{item.mobile}</Text>
        <Text style={styles.customerAddress}>{item.flat}, {item.apartment}, Tower {item.tower}</Text>
      </View>
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{selectedItem?.name}</Text>
        <Text style={styles.priceText}>Price: ₹{selectedItem?.price}</Text>
        <Text style={styles.deliveryText}>Delivery Charge: ₹5</Text>
        <Text style={styles.totalText}>Total: ₹{item.total}</Text>
      </View>
      
      <View style={styles.statusRow}>
        <Text style={styles.deliveredText}>Delivered: {item.delivered}</Text>
        <Text style={styles.pendingText}>Pending: {item.pending}</Text>
      </View>
      
      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => updateDeliveredCount(item.id, -1)}
        >
          <Text style={styles.controlButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.countText}>{item.delivered}</Text>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => updateDeliveredCount(item.id, 1)}
        >
          <Text style={styles.controlButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800' }}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(102, 126, 234, 0.9)', 'rgba(118, 75, 162, 0.9)']}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <BlurView intensity={20} style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Agent Dashboard</Text>
            {selectedItem && <Text style={styles.subtitle}>{selectedItem.name}</Text>}
          </BlurView>

          <BlurView intensity={15} style={styles.filtersCard}>
            <TouchableOpacity 
              style={styles.filterHeader}
              onPress={() => setFiltersExpanded(!filtersExpanded)}
            >
              <Text style={styles.filterTitle}>🔍 Filters</Text>
              <Text style={styles.filterToggle}>{filtersExpanded ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            
            {filtersExpanded && (
              <View style={styles.filterContent}>
                <View style={styles.filterRow}>
                  <Text style={styles.filterLabel}>Apt:</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                    {apartments.map((apartment) => (
                      <TouchableOpacity
                        key={apartment}
                        style={[styles.filterButton, selectedApartment === apartment && styles.filterButtonActive]}
                        onPress={() => setSelectedApartment(apartment)}
                      >
                        <Text style={[styles.filterButtonText, selectedApartment === apartment && styles.filterButtonTextActive]}>
                          {apartment === 'All' ? 'All' : apartment.split(' ')[0]}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.filterRow}>
                  <Text style={styles.filterLabel}>Tower:</Text>
                  <View style={styles.filterButtons}>
                    {towers.map((tower) => (
                      <TouchableOpacity
                        key={tower}
                        style={[styles.filterButton, selectedTower === tower && styles.filterButtonActive]}
                        onPress={() => setSelectedTower(tower)}
                      >
                        <Text style={[styles.filterButtonText, selectedTower === tower && styles.filterButtonTextActive]}>
                          {tower}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.filterRow}>
                  <Text style={styles.filterLabel}>Flat:</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                    {flats.map((flat) => (
                      <TouchableOpacity
                        key={flat}
                        style={[styles.filterButton, selectedFlat === flat && styles.filterButtonActive]}
                        onPress={() => setSelectedFlat(flat)}
                      >
                        <Text style={[styles.filterButtonText, selectedFlat === flat && styles.filterButtonTextActive]}>
                          {flat}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}
          </BlurView>

          <FlatList
            data={filteredCustomers}
            renderItem={renderCustomer}
            keyExtractor={(item) => item.id}
            style={styles.customersList}
            showsVerticalScrollIndicator={false}
          />

          <BlurView intensity={15} style={styles.actionsCard}>
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleAgentHistory}
              >
                <LinearGradient colors={['#3498DB', '#2980B9']} style={styles.actionGradient}>
                  <Text style={styles.actionText}>📊 History</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleAgentDashboard}
              >
                <LinearGradient colors={['#9B59B6', '#8E44AD']} style={styles.actionGradient}>
                  <Text style={styles.actionText}>📈 Dashboard</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handlePendingPayments}
              >
                <LinearGradient colors={['#E74C3C', '#C0392B']} style={styles.actionGradient}>
                  <Text style={styles.actionText}>💳 Payments</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </BlurView>
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
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  filtersCard: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  filterToggle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  filterScroll: {
    flex: 1,
  },
  filterLabel: {
    fontSize: 12,
    color: 'white',
    width: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 6,
    flex: 1,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 6,
  },
  filterButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  filterButtonText: {
    fontSize: 10,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  filterButtonTextActive: {
    fontWeight: 'bold',
  },
  customersList: {
    flex: 1,
    marginBottom: 16,
  },
  customerCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  customerHeader: {
    marginBottom: 12,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  customerMobile: {
    fontSize: 14,
    color: 'white',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  customerAddress: {
    fontSize: 12,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  itemDetails: {
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  priceText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  deliveryText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  deliveredText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: 'bold',
  },
  pendingText: {
    fontSize: 14,
    color: '#F39C12',
    fontWeight: 'bold',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  controlButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    minWidth: 40,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  actionsCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  actionGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AgentDetailsScreen;