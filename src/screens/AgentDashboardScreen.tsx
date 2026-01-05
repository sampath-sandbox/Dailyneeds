import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../App';

type AgentDashboardScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'AgentDashboard'>;

interface Props {
  navigation: AgentDashboardScreenNavigationProp;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

const AgentDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedChart, setSelectedChart] = useState<'apartment' | 'item' | 'customer' | 'month' | 'payments'>('apartment');

  const apartmentData: ChartData[] = [
    { label: 'Merlion Apartments', value: 45, color: '#3498DB', percentage: 45 },
    { label: 'Sri Krishna Complex', value: 30, color: '#2ECC71', percentage: 30 },
    { label: 'Praneeth Heights', value: 25, color: '#F39C12', percentage: 25 },
  ];

  const itemData: ChartData[] = [
    { label: 'Fresh Milk', value: 50, color: '#E74C3C', percentage: 50 },
    { label: 'Pure Water', value: 25, color: '#9B59B6', percentage: 25 },
    { label: 'Fresh Curd', value: 15, color: '#1ABC9C', percentage: 15 },
    { label: 'Groceries', value: 10, color: '#F39C12', percentage: 10 },
  ];

  const customerData: ChartData[] = [
    { label: 'Active Customers', value: 85, color: '#2ECC71', percentage: 85 },
    { label: 'Inactive Customers', value: 15, color: '#E74C3C', percentage: 15 },
  ];

  const monthData: ChartData[] = [
    { label: 'Jan 2024', value: 25000, color: '#3498DB', percentage: 30 },
    { label: 'Feb 2024', value: 22000, color: '#2ECC71', percentage: 26 },
    { label: 'Mar 2024', value: 28000, color: '#F39C12', percentage: 34 },
    { label: 'Apr 2024', value: 8000, color: '#E74C3C', percentage: 10 },
  ];

  const paymentData: ChartData[] = [
    { label: 'Cleared Payments', value: 75000, color: '#2ECC71', percentage: 75 },
    { label: 'Pending Payments', value: 25000, color: '#F39C12', percentage: 25 },
  ];

  const getChartData = () => {
    switch (selectedChart) {
      case 'apartment': return apartmentData;
      case 'item': return itemData;
      case 'customer': return customerData;
      case 'month': return monthData;
      case 'payments': return paymentData;
      default: return apartmentData;
    }
  };

  const getChartTitle = () => {
    switch (selectedChart) {
      case 'apartment': return 'Apartment-wise Distribution';
      case 'item': return 'Item-wise Sales';
      case 'customer': return 'Customer Status';
      case 'month': return 'Monthly Revenue (₹)';
      case 'payments': return 'Payment Status (₹)';
      default: return 'Chart';
    }
  };

  const renderChart = () => {
    const data = getChartData();
    const screenWidth = Dimensions.get('window').width - 64;
    
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{getChartTitle()}</Text>
        
        {/* Simple Bar Chart */}
        <View style={styles.barsContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.barItem}>
              <View style={styles.barContainer}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: (item.percentage / 100) * 120,
                      backgroundColor: item.color 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.barLabel} numberOfLines={2}>
                {item.label}
              </Text>
              <Text style={styles.barValue}>
                {selectedChart === 'month' || selectedChart === 'payments' 
                  ? `₹${item.value.toLocaleString()}` 
                  : `${item.value}${selectedChart === 'customer' ? '%' : ''}`
                }
              </Text>
            </View>
          ))}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800' }}
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
              onPress={() => navigation.navigate('AgentDetails')}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.subtitle}>Analytics & Reports</Text>
          </BlurView>

          <BlurView intensity={15} style={styles.statsCard}>
            <Text style={styles.statsTitle}>Quick Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>156</Text>
                <Text style={styles.statLabel}>Total Customers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>₹1,25,000</Text>
                <Text style={styles.statLabel}>Monthly Revenue</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>₹25,000</Text>
                <Text style={styles.statLabel}>Pending Amount</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>95%</Text>
                <Text style={styles.statLabel}>Delivery Rate</Text>
              </View>
            </View>
          </BlurView>

          <BlurView intensity={15} style={styles.chartTypeCard}>
            <Text style={styles.chartTypeTitle}>Select Chart Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.chartTypeButtons}>
                {[
                  { key: 'apartment', label: '🏢 Apartment', icon: '🏢' },
                  { key: 'item', label: '📦 Items', icon: '📦' },
                  { key: 'customer', label: '👥 Customers', icon: '👥' },
                  { key: 'month', label: '📅 Monthly', icon: '📅' },
                  { key: 'payments', label: '💳 Payments', icon: '💳' },
                ].map((type) => (
                  <TouchableOpacity
                    key={type.key}
                    style={[
                      styles.chartTypeButton,
                      selectedChart === type.key && styles.chartTypeButtonActive
                    ]}
                    onPress={() => setSelectedChart(type.key as any)}
                  >
                    <Text style={styles.chartTypeIcon}>{type.icon}</Text>
                    <Text style={[
                      styles.chartTypeText,
                      selectedChart === type.key && styles.chartTypeTextActive
                    ]}>
                      {type.label.split(' ')[1]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </BlurView>

          <BlurView intensity={15} style={styles.chartCard}>
            {renderChart()}
          </BlurView>

          <BlurView intensity={15} style={styles.actionsCard}>
            <Text style={styles.actionsTitle}>Quick Actions</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('AgentHistory')}
              >
                <LinearGradient colors={['#3498DB', '#2980B9']} style={styles.actionGradient}>
                  <Text style={styles.actionText}>📊 View History</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('PendingPayments')}
              >
                <LinearGradient colors={['#F39C12', '#E67E22']} style={styles.actionGradient}>
                  <Text style={styles.actionText}>💳 Pending Payments</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </BlurView>
        </ScrollView>
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
  statsCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  chartTypeCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  chartTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  chartTypeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  chartTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    minWidth: 80,
  },
  chartTypeButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  chartTypeIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  chartTypeText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  chartTypeTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  chartCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '100%',
    height: 160,
    marginBottom: 20,
  },
  barItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  barContainer: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: 30,
    borderRadius: 4,
    minHeight: 10,
  },
  barLabel: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  barValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: 'white',
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
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AgentDashboardScreen;