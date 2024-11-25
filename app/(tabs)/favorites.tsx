import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Bar = {
  business_status: string;
  geometry: { location: { lat: number; lng: number } };
  icon: string;
  name: string;
  place_id: string;
  rating: number;
  vicinity: string;
};

const Favorites: React.FC = () => {
  const router = useRouter();
  const [favoriteBars, setFavoriteBars] = useState<Bar[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchFavoriteBars = async () => {
    try {
      setIsRefreshing(true);

      const storedUserId = await AsyncStorage.getItem('userId');
      const userId = storedUserId;
      const response = await fetch(`http://192.168.1.108:8080/api/favorites/list?userId=${userId}`);
      const favoriteBarIds = await response.json();

      if (Array.isArray(favoriteBarIds)) {
        const barDetailsPromises = favoriteBarIds.map(async (barId: number) => {
          const barResponse = await fetch(`http://192.168.1.108:8080/bars/${barId}`);
          return await barResponse.json();
        });

        const bars = await Promise.all(barDetailsPromises);
        setFavoriteBars(bars);
      } else {
        console.error('Expected an array of favorite bar IDs, but got:', favoriteBarIds);
      }
    } catch (error) {
      console.error('Error fetching favorite bars:', error);
    } finally {
      setIsRefreshing(false); 
    }
  };

  useEffect(() => {
    fetchFavoriteBars();
  }, []); 

  const handleBarPress = (barData: Bar) => {
    router.push({
      pathname: '../(stack)/barProfile',
      params: { bar: encodeURIComponent(JSON.stringify(barData)) },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Image style={styles.logo} source={require('@/assets/images/WTM-Logo.png')} />
      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Your Favorite Bars</ThemedText>
      </View>

      <ScrollView
        contentContainerStyle={styles.barList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={fetchFavoriteBars} />
        }
      >
        {favoriteBars.length === 0 ? (
          <Text style={styles.noFavoritesText}>You have no favorite bars yet.</Text>
        ) : (
          favoriteBars.map((bar, index) => (
            <TouchableOpacity key={bar.place_id || index} style={styles.barItem} onPress={() => handleBarPress(bar)}>
              <View style={styles.barInfoContainer}>
                <Text style={styles.name}>{bar.name}</Text>
                <Text style={styles.rating}>Rating: {bar.business_status} / 5</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#000000',
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 1,
  },
  logo: {
    height: 200,
    width: 400,
    right: 10,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 1,
  },
  barList: {
    alignItems: 'center',
    paddingTop: 20,
  },
  barItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#333333',
    marginBottom: 12,
    width: '100%',
    elevation: 2,
  },
  barInfoContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  address: {
    fontSize: 14,
    color: '#ffffff',
  },
  rating: {
    fontSize: 14,
    color: '#ffffff',
  },
  noFavoritesText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Favorites;
