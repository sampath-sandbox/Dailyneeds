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

type PendingPaymentsScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'PendingPayments'>;

interface Props {
  navigation: PendingPaymentsScreenNavigationProp;
}

interface PaymentRecord {
  id: string;
  customerName: string;
  mobile: string;
  item: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'overdue' | 'paid';
  daysOverdue?: number;
  lastPaymentDate?: string;
}

const PendingPaymentsScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'history'>('pending');

  const [pendingPayments] = useState<PaymentRecord[]>([
    {
      id: '1',
      customerName: 'Ravi Kumar',
      mobile: '9876543210',
      item: 'Fresh Milk',
      amount: 840,
      dueDate: '2024-01-31',
      status: 'overdue',
      daysOverdue: 5,
      lastPaymentDate: '2023-12-31'
    },
    {
      id: '2',
      customerName: 'Sita Patel',
      mobile: '9123456789',
      item: 'Fresh Milk',
      amount: 750,
      dueDate: '2024-01-31',
      status: 'pending',
      lastPaymentDate: '2024-01-01'
    },
    {
      id: '3',
      customerName: 'Amit Gupta',
      mobile: '9988776655',
      item: 'Pure Water',
      amount: 600,
      dueDate: '2024-01-31',
      status: 'overdue',
      daysOverdue: 3,
      lastPaymentDate: '2023-12-28'
    }
  ]);

  const [paymentHistory] = useState<PaymentRecord[]>([
    {
      id: '4',
      customerName: 'Neha Sharma',
      mobile: '9876543211',
      item: 'Fresh Curd',
      amount: 480,
      dueDate: '2024-01-31',
      status: 'paid',
      lastPaymentDate: '2024-01-30'
    },
    {
      id: '5',
      customerName: 'Rohit Singh',
      mobile: '9123456780',
      item: 'Groceries',
      amount: 1200,
      dueDate: '2024-01-31',
      status: 'paid',
      lastPaymentDate: '2024-01-29'
    }
  ]);

  const totalPending = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const overdueCount = pendingPayments.filter(p => p.status === 'overdue').length;
  const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F39C12';
      case 'overdue': return '#E74C3C';
      case 'paid': return '#2ECC71';
      default: return '#95A5A6';
    }
  };

  const sendPaymentReminder = (payment: PaymentRecord) => {
    const message = `Payment Reminder\n\nDear ${payment.customerName},\n\nYour payment is ${payment.status === 'overdue' ? `overdue by ${payment.daysOverdue} days` : 'due'}.\n\nAmount: ₹${payment.amount}\nItem: ${payment.item}\nDue Date: ${payment.dueDate}\n\nPlease make the payment at your earliest convenience.\n\nThank you!`;
    
    Alert.alert(
      'Reminder Sent',
      `Payment reminder sent to ${payment.customerName}\n\nAmount: ₹${payment.amount}\nStatus: ${payment.status}\nVia: WhatsApp & SMS`,
      [{ text: 'OK' }]
    );
  };

  const markAsPaid = (paymentId: string) => {
    Alert.alert(
      'Mark as Paid',
      'Are you sure you want to mark this payment as received?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Mark Paid', 
          onPress: () => {
            Alert.alert('Success', 'Payment marked as received and customer notified');
          }
        }
      ]
    );
  };

  const renderPendingPayment = ({ item }: { item: PaymentRecord }) => (
    <BlurView intensity={15} style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.customerMobile}>{item.mobile}</Text>
          <Text style={styles.itemText}>{item.item}</Text>
        </View>
        <View style={styles.amountSection}>
          <Text style={styles.amount}>₹{item.amount}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.paymentDetails}>
        <Text style={styles.detailText}>Due Date: {item.dueDate}</Text>
        {item.daysOverdue && (
          <Text style={styles.overdueText}>Overdue by {item.daysOverdue} days</Text>
        )}
        {item.lastPaymentDate && (
          <Text style={styles.detailText}>Last Payment: {item.lastPaymentDate}</Text>
        )}
      </View>
      
      <View style={styles.paymentActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => sendPaymentReminder(item)}
        >
          <LinearGradient colors={['#F39C12', '#E67E22']} style={styles.actionGradient}>
            <Text style={styles.actionText}>📧 Send Reminder</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => markAsPaid(item.id)}
        >
          <LinearGradient colors={['#2ECC71', '#27AE60']} style={styles.actionGradient}>
            <Text style={styles.actionText}>✅ Mark Paid</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </BlurView>
  );

  const renderPaymentHistory = ({ item }: { item: PaymentRecord }) => (
    <BlurView intensity={15} style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.customerMobile}>{item.mobile}</Text>
          <Text style={styles.itemText}>{item.item}</Text>
        </View>
        <View style={styles.amountSection}>
          <Text style={styles.paidAmount}>₹{item.amount}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>PAID</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.historyDetails}>
        <Text style={styles.detailText}>Payment Date: {item.lastPaymentDate}</Text>
        <Text style={styles.detailText}>Due Date: {item.dueDate}</Text>
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
              onPress={() => navigation.navigate('AgentDetails')}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Payments</Text>
          </BlurView>

          <BlurView intensity={15} style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Payment Summary</Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>₹{totalPending.toLocaleString()}</Text>
                <Text style={styles.summaryLabel}>Total Pending</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{overdueCount}</Text>
                <Text style={styles.summaryLabel}>Overdue</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>₹{totalPaid.toLocaleString()}</Text>
                <Text style={styles.summaryLabel}>Collected</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{paymentHistory.length}</Text>
                <Text style={styles.summaryLabel}>Paid</Text>
              </View>
            </View>
          </BlurView>

          <BlurView intensity={15} style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'pending' && styles.activeTab]}
              onPress={() => setSelectedTab('pending')}
            >
              <Text style={[styles.tabText, selectedTab === 'pending' && styles.activeTabText]}>
                💳 Pending ({pendingPayments.length})
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'history' && styles.activeTab]}
              onPress={() => setSelectedTab('history')}
            >
              <Text style={[styles.tabText, selectedTab === 'history' && styles.activeTabText]}>
                ✅ History ({paymentHistory.length})
              </Text>
            </TouchableOpacity>
          </BlurView>

          {selectedTab === 'pending' ? (
            <FlatList
              data={pendingPayments}
              renderItem={renderPendingPayment}
              keyExtractor={(item) => item.id}
              style={styles.paymentsList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <FlatList
              data={paymentHistory}
              renderItem={renderPaymentHistory}
              keyExtractor={(item) => item.id}
              style={styles.paymentsList}
              showsVerticalScrollIndicator={false}
            />
          )}

          {selectedTab === 'pending' && (
            <BlurView intensity={15} style={styles.bulkActionsCard}>
              <TouchableOpacity style={styles.bulkActionButton}>
                <LinearGradient colors={['#E74C3C', '#C0392B']} style={styles.bulkActionGradient}>
                  <Text style={styles.bulkActionText}>📧 Send All Reminders</Text>
                </LinearGradient>
              </TouchableOpacity>
            </BlurView>
          )}
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
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  summaryCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  summaryLabel: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
  },
  paymentsList: {
    flex: 1,
    marginBottom: 16,
  },
  paymentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  historyCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
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
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  itemText: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  amountSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F39C12',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  paidAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  paymentDetails: {
    marginBottom: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  historyDetails: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  detailText: {
    fontSize: 12,
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  overdueText: {
    fontSize: 12,
    color: '#E74C3C',
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  paymentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  actionGradient: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  bulkActionsCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bulkActionButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  bulkActionGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  bulkActionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PendingPaymentsScreen;