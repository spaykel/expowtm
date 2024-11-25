import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Bar = {
  business_status: string,
  geometry: { location: { lat: number, lng: number } },
  icon: string,
  name: string,
  place_id: string,
  rating: number,
  vicinity: string,
};

const BarListScreen: React.FC = () => {
  const { bars: barsParam } = useLocalSearchParams<{ bars: string }>();
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);

  let bars: Bar[] = barsParam ? JSON.parse(decodeURIComponent(barsParam)) : [];

  const addToFavorites = async (placeId: string) => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found.');
        return;
      }

      const response = await fetch('http://192.168.1.108:8080/api/favorites/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          placeId: placeId,
        }),
      });

      if (response.ok) {
        console.log(`Bar with index ${placeId} added to favorites.`);
        setFavorites((prevFavorites) => [...prevFavorites, placeId]); // Update local state
      } else {
        const errorMsg = await response.text();
        console.error(`Failed to add bar to favorites. Server responded with: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error adding bar to favorites:', error);
    }
  };

  const addBar = async (bar: Bar) => {
    try {
      const response = await fetch('http://192.168.1.108:8080/bars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeId: bar.place_id, // Correct property access
          name: bar.name,        // Correct property access
        }),
      });

      if (response.ok) {
        console.log(`Added bar: ${bar.name}`);
      } else {
        const errorMsg = await response.text();
        console.error(`Failed to add bar: ${bar.name}. Server responded with: ${errorMsg}`);
      }
    } catch (error) {
      console.error(`Error adding bar: ${bar.name}`, error);
    }
  };

  // Add all bars once when the component mounts
  useEffect(() => {
    const addAllBars = async () => {
      for (const bar of bars) {
        await addBar(bar);
      }
    };

    addAllBars();
  }, []);

  const handleBackPress = () => router.back();

  const handleBarPress = (barData: Bar) => {
    router.push({
      pathname: '../(stack)/barProfile',
      params: { bar: encodeURIComponent(JSON.stringify(barData)) },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Moves Nearby</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.barList} showsVerticalScrollIndicator={false}>
        {bars.map((item, index) => (
          <View key={index} style={styles.barItem}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => handleBarPress(item)}>
              <View style={styles.barInfoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.address}>Address: {item.vicinity}</Text>
                <Text style={styles.rating}>Rating: {item.rating} / 5</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => addToFavorites(item.place_id)}>
              <Icon
                name={favorites.includes(item.place_id) ? "heart" : "heart-o"}
                size={20}
                color={favorites.includes(item.place_id) ? "red" : "gray"}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  titleContainer: { alignItems: 'center', marginBottom: 24 },
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16, backgroundColor: '#1a1a1a' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ffffff' },
  backButton: { position: 'absolute', top: 50, left: 16, zIndex: 1 },
  barList: { alignItems: 'center', paddingTop: 20 },
  barItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#333333', marginBottom: 12, width: '100%', elevation: 2 },
  barInfoContainer: { flexDirection: 'column' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  address: { fontSize: 14, color: '#ffffff' },
  rating: { fontSize: 14, color: '#ffffff' },
});

export default BarListScreen;
