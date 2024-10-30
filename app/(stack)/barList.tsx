// BarListScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';



type Bar = {
  id: number;
  name: string;
  address: string;
  rating: number;
};

//will be replaced with backend, fetching bars via API
const bars: Bar[] = [
  { id: 1, name: 'The Tipsy Tavern', address: '123 Main St', rating: 4.5 },
  { id: 2, name: 'Happy Hour Lounge', address: '456 Broad Ave', rating: 4.0 },
  { id: 3, name: 'Night Owl Pub', address: '789 Maple Rd', rating: 3.8 },
  { id: 4, name: 'Nick\'s Place', address: '2735 Oak St', rating: 5.0 },
  // Add more bars here as needed
];

const BarListScreen: React.FC = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
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
        {
        bars.map((item, index) => (
          <TouchableOpacity key={index} style={styles.barItem}>
            <View style={styles.barInfoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.address}>Address: {item.address}</Text>
            <Text style={styles.rating}>Rating: {item.rating} / 5</Text>
            </View>          
          </TouchableOpacity>
        ))}
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
    paddingTop: 60, // Additional top padding
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1a', // Dark mode background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Light text color for dark mode
  },
  itemContainer: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
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
    backgroundColor: '#333333', // Dark card background
    marginBottom: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    elevation: 2,
  },
  barInfoContainer: {
    flexDirection: 'column', // Ensures items stack vertically
  },
});

export default BarListScreen;
