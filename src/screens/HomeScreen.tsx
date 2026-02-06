import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../App';
import { useSession } from '../context/SessionContext';
import { useHomeViewModel } from '../viewmodels/HomeViewModel';
import { Item, Suggestion } from '../models';

type HomeScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { setSelectedItem, userType } = useSession();
  const { items, suggestions, loading, error, refreshData } = useHomeViewModel();

  const handleItemSelect = (item: Item) => {
 debugger;
    setSelectedItem({ ...item, description: item.description || '', imageUrl: item.imageUrl });
    
    if (userType === 1) {
      navigation.navigate('CustomerDetails', { selectedItem: item });
    } else {
      navigation.navigate('AgentDetails', { selectedItem: item });
    }
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.itemTile} onPress={() => handleItemSelect(item)}>
      <BlurView intensity={15} style={styles.tileContent}>
        <Text style={styles.itemIcon}>{item.imageUrl}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        <Text style={styles.itemUnit}>{item.unit}</Text>
        <Text style={styles.itemBrand}>{item.brand}</Text>
      </BlurView>
    </TouchableOpacity>
  );

  const renderSuggestion = ({ item }: { item: Suggestion }) => (
    <TouchableOpacity onPress={() => {
      console.log('Suggestion clicked:', item.text);
      // Add suggestion click logic here
    }}>
      <BlurView intensity={15} style={[styles.suggestionCard, { borderLeftColor: item.color }]}>
        <Text style={styles.suggestionText}>{item.text}</Text>
      </BlurView>
    </TouchableOpacity>
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
        <ScrollView style={styles.container}>
          <BlurView intensity={20} style={styles.header}>
            <Text style={styles.title}>DailyNeeds</Text>
            <Text style={styles.subtitle}>Select Your Items</Text>
          </BlurView>

          {loading && (
            <BlurView intensity={15} style={styles.loadingCard}>
              <ActivityIndicator size="large" color="#667eea" />
              <Text style={styles.loadingText}>Loading...</Text>
            </BlurView>
          )}

          {error && (
            <BlurView intensity={15} style={styles.errorCard}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={refreshData}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </BlurView>
          )}

          {!loading && !error && (
            <>
              {suggestions && suggestions?.result?.length > 0 && (
                <BlurView intensity={15} style={styles.suggestionsSection}>
                  <Text style={styles.sectionTitle}>🎯 Suggestions</Text>
                  <FlatList
                    data={suggestions?.result || []}
                    renderItem={renderSuggestion}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </BlurView>
              )}

              {items && items?.result?.length > 0 && (
                <View style={styles.itemsSection}>
                  <Text style={styles.sectionTitle}>📦 Available Items</Text>
                  <FlatList
                    data={items?.result || []}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    scrollEnabled={false}
                  />
                </View>
              )}
            </>
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
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  suggestionsSection: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  suggestionCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    borderLeftWidth: 4,
    minWidth: 200,
  },
  suggestionText: {
    color: 'white',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  itemsSection: {
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemTile: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  tileContent: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  itemIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  itemUnit: {
    fontSize: 12,
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  itemBrand: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  loadingCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  errorCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(231, 76, 60, 0.3)',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;