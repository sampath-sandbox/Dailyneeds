import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../App';
import { useSession } from '../context/SessionContext';

type HistoryScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'History'>;

interface Props {
  navigation: HistoryScreenNavigationProp;
}

interface HistoryItem {
  id: string;
  date: string;
  status: 'delivered' | 'pending' | 'cancelled';
  amount: number;
}

const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedItem } = useSession();

  const mockHistory: HistoryItem[] = [
    { id: '1', date: '2024-01-15', status: 'delivered', amount: 30 },
    { id: '2', date: '2024-01-14', status: 'delivered', amount: 30 },
    { id: '3', date: '2024-01-13', status: 'delivered', amount: 30 },
    { id: '4', date: '2024-01-12', status: 'pending', amount: 30 },
    { id: '5', date: '2024-01-11', status: 'delivered', amount: 30 },
  ];

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <BlurView intensity={15} style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyDate}>{item.date}</Text>
        <Text style={[
          styles.historyStatus,
          item.status === 'delivered' && styles.statusDelivered,
          item.status === 'pending' && styles.statusPending,
          item.status === 'cancelled' && styles.statusCancelled,
        ]}>
          {item.status.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.historyItem}>{selectedItem?.name || 'Fresh Milk'}</Text>
      <Text style={styles.historyAmount}>₹{item.amount}</Text>
    </BlurView>
  );

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
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Delivery History</Text>
            {selectedItem && <Text style={styles.subtitle}>{selectedItem.name}</Text>}
          </BlurView>

          <FlatList
            data={mockHistory}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
            style={styles.historyList}
            showsVerticalScrollIndicator={false}
          />
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
  historyList: {
    flex: 1,
  },
  historyCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  historyStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDelivered: {
    backgroundColor: 'rgba(46, 204, 113, 0.3)',
    color: '#2ECC71',
  },
  statusPending: {
    backgroundColor: 'rgba(243, 156, 18, 0.3)',
    color: '#F39C12',
  },
  statusCancelled: {
    backgroundColor: 'rgba(231, 76, 60, 0.3)',
    color: '#E74C3C',
  },
  historyItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  historyAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default HistoryScreen;