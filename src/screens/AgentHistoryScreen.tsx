import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../App';
import { useSession } from '../context/SessionContext';

type AgentHistoryScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'AgentHistory'>;

interface Props {
  navigation: AgentHistoryScreenNavigationProp;
}

interface MonthlyReport {
  id: string;
  customerName: string;
  mobile: string;
  item: string;
  price: number;
  deliveryCharge: number;
  deliveredCount: number;
  totalAmount: number;
  month: string;
}

const AgentHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedItem } = useSession();
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [selectedItemFilter, setSelectedItemFilter] = useState(selectedItem?.name || 'All');
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const months = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'];
  const items = ['All', 'Fresh Milk', 'Pure Water', 'Fresh Curd', 'Groceries'];

  const [monthlyReports] = useState<MonthlyReport[]>([
    {
      id: '1',
      customerName: 'Ravi Kumar',
      mobile: '9876543210',
      item: 'Fresh Milk',
      price: 25,
      deliveryCharge: 5,
      deliveredCount: 28,
      totalAmount: 840,
      month: '2024-01'
    },
    {
      id: '2',
      customerName: 'Sita Patel',
      mobile: '9123456789',
      item: 'Fresh Milk',
      price: 25,
      deliveryCharge: 5,
      deliveredCount: 25,
      totalAmount: 750,
      month: '2024-01'
    },
    {
      id: '3',
      customerName: 'Amit Gupta',
      mobile: '9988776655',
      item: 'Pure Water',
      price: 20,
      deliveryCharge: 5,
      deliveredCount: 30,
      totalAmount: 750,
      month: '2024-01'
    }
  ]);

  const filteredReports = monthlyReports.filter(report => {
    const monthMatch = report.month === selectedMonth;
    const itemMatch = selectedItemFilter === 'All' || report.item === selectedItemFilter;
    return monthMatch && itemMatch;
  });

  const totalMonthlyAmount = filteredReports.reduce((sum, report) => sum + report.totalAmount, 0);

  const sendPaymentRequest = (report: MonthlyReport) => {
    const message = `Payment Request - ${selectedMonth}\n\nDear ${report.customerName},\n\nYour monthly bill details:\nItem: ${report.item}\nDelivered: ${report.deliveredCount} units\nPrice per unit: ₹${report.price}\nDelivery charge: ₹${report.deliveryCharge}\nTotal Amount: ₹${report.totalAmount}\n\nPlease make the payment at your convenience.\n\nThank you!`;
    
    Alert.alert(
      'Payment Request Sent',
      `Payment request sent to ${report.customerName} (${report.mobile})\n\nAmount: ₹${report.totalAmount}\nVia: WhatsApp & Email`,
      [{ text: 'OK' }]
    );
  };

  const shareReport = (report: MonthlyReport) => {
    Alert.alert(
      'Report Shared',
      `Monthly report shared with ${report.customerName}\n\nShared via:\n• WhatsApp (PDF attachment)\n• Email (PDF attachment)\n\nReport includes:\n• Daily delivery details\n• Payment summary\n• Contact information`,
      [{ text: 'OK' }]
    );
  };

  const sendAllPaymentRequests = () => {
    Alert.alert(
      'All Payment Requests Sent',
      `Payment requests sent to ${filteredReports.length} customers\n\nTotal Amount: ₹${totalMonthlyAmount}\nVia: WhatsApp & Email`,
      [{ text: 'OK' }]
    );
  };

  const renderReport = ({ item }: { item: MonthlyReport }) => (
    <BlurView intensity={15} style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={styles.customerMobile}>{item.mobile}</Text>
      </View>
      
      <View style={styles.reportDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Item:</Text>
          <Text style={styles.detailValue}>{item.item}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price per unit:</Text>
          <Text style={styles.detailValue}>₹{item.price}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Delivery charge:</Text>
          <Text style={styles.detailValue}>₹{item.deliveryCharge}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Delivered:</Text>
          <Text style={styles.detailValue}>{item.deliveredCount} units</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>₹{item.totalAmount}</Text>
        </View>
      </View>
      
      <View style={styles.reportActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => sendPaymentRequest(item)}
        >
          <LinearGradient colors={['#F39C12', '#E67E22']} style={styles.actionGradient}>
            <Text style={styles.actionText}>💳 Payment Request</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => shareReport(item)}
        >
          <LinearGradient colors={['#3498DB', '#2980B9']} style={styles.actionGradient}>
            <Text style={styles.actionText}>📊 Share Report</Text>
          </LinearGradient>
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
              onPress={() => navigation.navigate('AgentDetails')}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Agent History</Text>
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
                  <Text style={styles.filterLabel}>Month:</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                    {months.map((month) => (
                      <TouchableOpacity
                        key={month}
                        style={[styles.filterButton, selectedMonth === month && styles.filterButtonActive]}
                        onPress={() => setSelectedMonth(month)}
                      >
                        <Text style={[styles.filterButtonText, selectedMonth === month && styles.filterButtonTextActive]}>
                          {new Date(month + '-01').toLocaleDateString('en', { month: 'short', year: 'numeric' })}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.filterRow}>
                  <Text style={styles.filterLabel}>Item:</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                    {items.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={[styles.filterButton, selectedItemFilter === item && styles.filterButtonActive]}
                        onPress={() => setSelectedItemFilter(item)}
                      >
                        <Text style={[styles.filterButtonText, selectedItemFilter === item && styles.filterButtonTextActive]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}
          </BlurView>

          <BlurView intensity={15} style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Monthly Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Customers:</Text>
              <Text style={styles.summaryValue}>{filteredReports.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Amount:</Text>
              <Text style={styles.summaryAmount}>₹{totalMonthlyAmount}</Text>
            </View>
          </BlurView>

          <FlatList
            data={filteredReports}
            renderItem={renderReport}
            keyExtractor={(item) => item.id}
            style={styles.reportsList}
            showsVerticalScrollIndicator={false}
          />

          <BlurView intensity={15} style={styles.bulkActionsCard}>
            <TouchableOpacity style={styles.bulkActionButton} onPress={sendAllPaymentRequests}>
              <LinearGradient colors={['#E74C3C', '#C0392B']} style={styles.bulkActionGradient}>
                <Text style={styles.bulkActionText}>📧 Send All Payment Requests</Text>
              </LinearGradient>
            </TouchableOpacity>
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
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
    width: 60,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
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
  summaryCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  reportsList: {
    flex: 1,
    marginBottom: 16,
  },
  reportCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  reportHeader: {
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
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  reportDetails: {
    marginBottom: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
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
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  reportActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
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

export default AgentHistoryScreen;