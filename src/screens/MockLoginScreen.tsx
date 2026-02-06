import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../App';
import { useSession } from '../context/MockSessionContext';
import { mockData } from '../data/mockData';

type LoginScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState<'customer' | 'agent'>('customer');
  const [errors, setErrors] = useState<{mobile?: string; password?: string}>({});
  const { setUserMobile, setUserType, setUser } = useSession();

  const handleLogin = () => {
    const newErrors: {mobile?: string; password?: string} = {};

    if (!mobile) newErrors.mobile = 'Mobile number is required';
    if (!password) newErrors.password = 'Password is required';
    if (mobile && mobile.length !== 10) newErrors.mobile = 'Enter valid 10-digit mobile number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Mock authentication
    const mockUser = mockData.users.find(user => 
      user.mobile === mobile && user.type === loginType
    );

    if (mockUser && password === 'password') {
      setUser(mockUser);
      setUserMobile(mobile);
      setUserType(loginType);
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Invalid credentials. Use demo credentials.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800' }}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(102, 126, 234, 0.8)', 'rgba(118, 75, 162, 0.8)']}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <BlurView intensity={20} style={styles.loginCard}>
            <Text style={styles.title}>DailyNeeds</Text>
            <Text style={styles.tagline}>Track. Deliver. Trust.</Text>
            <Text style={styles.subtitle}>Transparent Delivery Tracking</Text>

            <View style={styles.userTypeContainer}>
              <TouchableOpacity
                style={[styles.userTypeButton, loginType === 'customer' && styles.userTypeActive]}
                onPress={() => setLoginType('customer')}
              >
                <Text style={[styles.userTypeText, loginType === 'customer' && styles.userTypeTextActive]}>
                  👤 Customer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.userTypeButton, loginType === 'agent' && styles.userTypeActive]}
                onPress={() => setLoginType('agent')}
              >
                <Text style={[styles.userTypeText, loginType === 'agent' && styles.userTypeTextActive]}>
                  🚚 Agent
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={[styles.input, errors.mobile && styles.inputError]}
              placeholder="Mobile Number"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={mobile}
              onChangeText={(text) => {
                setMobile(text);
                if (errors.mobile) setErrors(prev => ({...prev, mobile: undefined}));
              }}
              keyboardType="phone-pad"
              maxLength={10}
            />
            {errors.mobile && <Text style={styles.fieldError}>{errors.mobile}</Text>}

            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors(prev => ({...prev, password: undefined}));
              }}
              secureTextEntry
            />
            {errors.password && <Text style={styles.fieldError}>{errors.password}</Text>}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.loginButtonGradient}>
                <Text style={styles.loginButtonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.demoCredentials}>
              <Text style={styles.demoTitle}>Demo Credentials:</Text>
              <Text style={styles.demoText}>Customer: 9876543210</Text>
              <Text style={styles.demoText}>Agent: 9123456789</Text>
              <Text style={styles.demoText}>Password: password</Text>
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
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  loginCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 4,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  userTypeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  userTypeText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '600',
  },
  userTypeTextActive: {
    color: 'white',
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 16,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 16,
  },
  inputError: {
    borderColor: '#E74C3C',
    borderWidth: 2,
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
  },
  fieldError: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 12,
    marginLeft: 4,
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  loginButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoCredentials: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  demoTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  demoText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 2,
  },
});

export default LoginScreen;