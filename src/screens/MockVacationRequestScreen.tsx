import React, { useState } from 'react';
import {
  View,
  Text,
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

type VacationRequestScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'VacationRequest'>;

interface Props {
  navigation: VacationRequestScreenNavigationProp;
}

const VacationRequestScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedItem, userMobile } = useSession();
  const [fromDate, setFromDate] = useState<number | null>(null);
  const [toDate, setToDate] = useState<number | null>(null);
  const currentDate = new Date().getDate();
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateSelect = (day: number) => {
    if (day < currentDate) return;

    if (!fromDate) {
      setFromDate(day);
    } else if (!toDate && day > fromDate) {
      setToDate(day);
    } else {
      setFromDate(day);
      setToDate(null);
    }
  };

  const isDateInRange = (day: number) => {
    if (!fromDate) return false;
    if (!toDate) return day === fromDate;
    return day >= fromDate && day <= toDate;
  };

  const isDateDisabled = (day: number) => {
    return day < currentDate;
  };

  const handleSubmitRequest = () => {
    if (!fromDate || !toDate) {
      Alert.alert('Error', 'Please select both from and to dates');
      return;
    }

    Alert.alert(
      'Vacation Request Sent',
      `Your vacation request has been sent to the agent.\n\nDates: ${fromDate} to ${toDate} ${currentMonth}\nItem: ${selectedItem?.name}\n\nNotification sent via WhatsApp and Email.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('CustomerDetails')
        }
      ]
    );
  };

  const renderDay = (day: number) => {
    const disabled = isDateDisabled(day);
    const inRange = isDateInRange(day);
    const isFrom = day === fromDate;
    const isTo = day === toDate;

    return (
      <TouchableOpacity
        key={day}
        style={[
          styles.dayButton,
          disabled && styles.dayButtonDisabled,
          inRange && styles.dayButtonSelected,
          isFrom && styles.dayButtonFrom,
          isTo && styles.dayButtonTo,
        ]}
        onPress={() => handleDateSelect(day)}
        disabled={disabled}
      >
        <Text style={[
          styles.dayText,
          disabled && styles.dayTextDisabled,
          inRange && styles.dayTextSelected,
        ]}>
          {day}
        </Text>
      </TouchableOpacity>
    );
  };

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
              onPress={() => navigation.navigate('CustomerDetails')}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Vacation Request</Text>
            <Text style={styles.subtitle}>{currentMonth}</Text>
            {selectedItem && <Text style={styles.itemName}>{selectedItem.name}</Text>}
          </BlurView>

          <BlurView intensity={15} style={styles.instructionsCard}>
            <Text style={styles.instructionsTitle}>📅 Select Vacation Dates</Text>
            <Text style={styles.instructionsText}>
              Select the date range when you want to pause delivery.
              {'\n'}• Tap first date for "From"
              {'\n'}• Tap second date for "To"
              {'\n'}• Past dates are disabled
            </Text>
          </BlurView>

          {fromDate && toDate && (
            <BlurView intensity={15} style={styles.selectionCard}>
              <Text style={styles.selectionTitle}>Selected Range</Text>
              <Text style={styles.selectionText}>
                From: {fromDate} {currentMonth}
              </Text>
              <Text style={styles.selectionText}>
                To: {toDate} {currentMonth}
              </Text>
              <Text style={styles.selectionDays}>
                Total Days: {toDate - fromDate + 1}
              </Text>
            </BlurView>
          )}

          <BlurView intensity={15} style={styles.calendarCard}>
            <Text style={styles.calendarTitle}>Select Dates</Text>
            <View style={styles.calendar}>
              {days.map(day => renderDay(day))}
            </View>
          </BlurView>

          {fromDate && toDate && (
            <BlurView intensity={15} style={styles.submitCard}>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmitRequest}>
                <LinearGradient colors={['#E74C3C', '#C0392B']} style={styles.submitGradient}>
                  <Text style={styles.submitText}>🏖️ Submit Vacation Request</Text>
                </LinearGradient>
              </TouchableOpacity>
            </BlurView>
          )}
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
  instructionsCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  instructionsText: {
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  selectionCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(102, 126, 234, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.5)',
  },
  selectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  selectionText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  selectionDays: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  calendarCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayButton: {
    width: '13%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  dayButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dayButtonSelected: {
    backgroundColor: 'rgba(231, 76, 60, 0.3)',
    borderColor: 'rgba(231, 76, 60, 0.5)',
  },
  dayButtonFrom: {
    backgroundColor: 'rgba(102, 126, 234, 0.4)',
    borderColor: 'rgba(102, 126, 234, 0.6)',
  },
  dayButtonTo: {
    backgroundColor: 'rgba(231, 76, 60, 0.4)',
    borderColor: 'rgba(231, 76, 60, 0.6)',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  dayTextDisabled: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  dayTextSelected: {
    color: 'white',
  },
  submitCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default VacationRequestScreen;