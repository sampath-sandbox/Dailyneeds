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
import { useSession } from '../context/SessionContext';
import { Item, ResponseData } from '../models';
import SimpleApiService from '../services/SimpleApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HistoryScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'History'>;

interface Props {
  navigation: HistoryScreenNavigationProp;
}

interface DayHistory {
  // date: number;
  // status: 'delivered' | 'missed' | 'pending';
  // price: number;
  // chat?: string[];
  // disabled: boolean;

  historyId: number;
  userId: number;
  itemId: number;
  monthId: number;
  yearId: number;
  dates: HistoryDateDetail[]
  summary: HistorySummary;
  comments: HistoryComment[];
  disabled: boolean | false;
  isActive: boolean | true;
  isDeleted: boolean | false;
  createdBy: number;
  createdDate: string | null;
  updatedBy: number | null;
  updatedDate: string | null;

}


interface HistoryDateDetail {
  date: string
  status: string   // Delivered | Pending | Vacation
  quantity: number
  totalPrice: number
}
interface HistorySummary {
  totalDelivered: number;
  totalPending: number;
  totalVacation: number;
  monthlyTotalAmount: number;
}
interface HistoryComment {
  commentId: number;
  fromUserId: number;
  fromRole: string;  // Customer | Agent
  message: string;
  createdAt: string;
}


const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedItem } = useSession();
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const [customerHistory, setCustomerHistory] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!selectedItem) return;
      setLoading(true);
      try {
        const userJson = await AsyncStorage.getItem('user');
        const user = userJson ? JSON.parse(userJson) : null;
        if (user) {
          const data = await SimpleApiService.getCustomerHistory(Number(selectedItem.id), user.id);
          setCustomerHistory(data.result);
        }
      } catch (err) {
        setError('Failed to load history. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [selectedItem]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return '#667eea';
      case 'Missed': return '#E74C3C';
      case 'Vacation': return '#e35bc1';
      case 'Pending': return '#F39C12';
      default: return '#95A5A6';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return '✅';
      case 'Missed': return '❌';
      case 'Vacation': return '🏖️';
      case 'Pending': return '⏳';
      default: return '❓';
    }
  };

  const renderDay = ({ item }: { item: HistoryDateDetail }) => (
    <BlurView intensity={15} style={styles.dayCard}>
      <View style={styles.dayHeader}>
        <Text style={styles.historyDate}>
  {new Date(item.date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}
</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.dayDetails}>
        <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
        <Text style={styles.priceText}>₹{item.totalPrice}</Text>
      </View>
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
              onPress={() => navigation.navigate('CustomerDetails')}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>History</Text>
            <Text style={styles.subtitle}>{currentMonth}</Text>
            {customerHistory?.summary && (

              <BlurView intensity={15} style={styles.detailsCard}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Total Delivered:</Text>
                  <Text style={styles.detailValue}>{customerHistory.summary.totalDelivered || 'Loading...'}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Total Pending:</Text>
                  <Text style={styles.detailValue}>{customerHistory.summary.totalPending || 'Loading...'}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Total Vacation:</Text>
                  <Text style={styles.detailValue}>{customerHistory.summary.totalVacation || 'Loading...'}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Monthly Total:</Text>
                  <Text style={styles.detailValue}>₹{customerHistory.summary.monthlyTotalAmount || 'Loading...'}</Text>
                </View>

              </BlurView>



            )}
          </BlurView>

          <FlatList
            data={customerHistory?.dates}
            renderItem={renderDay}
            keyExtractor={(item) => item.date}
            numColumns={2}
            columnWrapperStyle={styles.row}
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
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  itemName: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  historyList: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dayCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  disabledCard: {
    opacity: 0.6,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  dayDetails: {
    marginBottom: 8,
  },
  itemText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  chatButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  chatButtonText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  summaryContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  summaryText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
  detailsCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  historyDate: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default HistoryScreen;
