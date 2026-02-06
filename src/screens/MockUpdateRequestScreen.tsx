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

type UpdateRequestScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'UpdateRequest'>;

interface Props {
  navigation: UpdateRequestScreenNavigationProp;
}

const UpdateRequestScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedItem, userMobile } = useSession();
  const [updateForm, setUpdateForm] = useState({
    brand: selectedItem?.brand || '',
    itemCount: '30',
    address: 'Flat 101, Merlion Apartments, Tower A',
    alternateAddress: '',
    specialInstructions: '',
  });

  const handleSubmitRequest = () => {
    if (!updateForm.brand || !updateForm.itemCount) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    Alert.alert(
      'Update Request Sent',
      `Your update request has been sent to the agent.\n\nItem: ${selectedItem?.name}\nBrand: ${updateForm.brand}\nCount: ${updateForm.itemCount}\n\nNotification sent via WhatsApp and Email.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('CustomerDetails')
        }
      ]
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
            <Text style={styles.title}>Update Request</Text>
            {selectedItem && <Text style={styles.itemName}>{selectedItem.name}</Text>}
          </BlurView>

          <BlurView intensity={15} style={styles.formCard}>
            <Text style={styles.formTitle}>📝 Update Item Details</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Brand *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter brand name"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={updateForm.brand}
                onChangeText={(text) => setUpdateForm({...updateForm, brand: text})}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Item Count (Monthly) *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter monthly count"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={updateForm.itemCount}
                onChangeText={(text) => setUpdateForm({...updateForm, itemCount: text})}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Delivery Address *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter delivery address"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={updateForm.address}
                onChangeText={(text) => setUpdateForm({...updateForm, address: text})}
                multiline
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Alternate Address (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter alternate address if any"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={updateForm.alternateAddress}
                onChangeText={(text) => setUpdateForm({...updateForm, alternateAddress: text})}
                multiline
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Special Instructions (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Any special delivery instructions"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={updateForm.specialInstructions}
                onChangeText={(text) => setUpdateForm({...updateForm, specialInstructions: text})}
                multiline
                numberOfLines={4}
              />
            </View>
          </BlurView>

          <BlurView intensity={15} style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>📋 Request Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Item:</Text>
              <Text style={styles.summaryValue}>{selectedItem?.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Current Brand:</Text>
              <Text style={styles.summaryValue}>{selectedItem?.brand}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>New Brand:</Text>
              <Text style={styles.summaryValue}>{updateForm.brand || 'Not specified'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Monthly Count:</Text>
              <Text style={styles.summaryValue}>{updateForm.itemCount}</Text>
            </View>
          </BlurView>

          <BlurView intensity={15} style={styles.submitCard}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitRequest}>
              <LinearGradient colors={['#F39C12', '#E67E22']} style={styles.submitGradient}>
                <Text style={styles.submitText}>📝 Submit Update Request</Text>
              </LinearGradient>
            </TouchableOpacity>
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
  itemName: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  formCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
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
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
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
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
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
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
    fontWeight: '600',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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

export default UpdateRequestScreen;