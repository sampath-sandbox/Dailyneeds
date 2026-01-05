import React, { useState } from 'react';
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

type HistoryScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'History'>;

interface Props {
  navigation: HistoryScreenNavigationProp;
}

interface DayHistory {
  date: number;
  status: 'delivered' | 'missed' | 'pending';
  price: number;
  chat?: string[];
  disabled: boolean;
}

const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedItem } = useSession();
  const currentDate = new Date().getDate();
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  const [monthHistory] = useState<DayHistory[]>(
    Array.from({ length: daysInMonth }, (_, i) => ({
      date: i + 1,
      status: i + 1 < currentDate ? (Math.random() > 0.2 ? 'delivered' : 'missed') : 'pending',
      price: selectedItem?.price || 25,
      chat: i + 1 === 10 ? ['Customer: Late delivery', 'Agent: Sorry, traffic issue'] : undefined,
      disabled: i + 1 < currentDate,
    }))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#667eea';
      case 'missed': return '#E74C3C';
      case 'pending': return '#F39C12';
      default: return '#95A5A6';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return '✅';
      case 'missed': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const showChat = (day: DayHistory) => {
    if (day.chat && day.chat.length > 0) {
      Alert.alert(
        `Chat History - Day ${day.date}`,
        day.chat.join('\n'),
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert('No Chat', 'No chat history available for this date');
    }
  };

  const renderDay = ({ item }: { item: DayHistory }) => (
    <BlurView intensity={15} style={[
      styles.dayCard,
      item.disabled && styles.disabledCard
    ]}>
      <View style={styles.dayHeader}>
        <Text style={[styles.dayNumber, item.disabled && styles.disabledText]}>
          {item.date}
        </Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.dayDetails}>
        <Text style={[styles.itemText, item.disabled && styles.disabledText]}>
          {selectedItem?.name}
        </Text>
        <Text style={[styles.priceText, item.disabled && styles.disabledText]}>
          ₹{item.price}
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => showChat(item)}
      >
        <Text style={styles.chatButtonText}>
          💬 Chat {item.chat ? `(${item.chat.length})` : '(0)'}
        </Text>
      </TouchableOpacity>
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
            {selectedItem && <Text style={styles.itemName}>{selectedItem.name}</Text>}
          </BlurView>

          <FlatList
            data={monthHistory}
            renderItem={renderDay}
            keyExtractor={(item) => item.date.toString()}
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
});

export default HistoryScreen;