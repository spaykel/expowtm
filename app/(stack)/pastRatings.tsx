import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';

const PastReviewsScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ThemedView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>Past Ratings</ThemedText>
      </View>
      
      {/* Scrollable list of ratings */}
      <ScrollView contentContainerStyle={styles.ratingsList} showsVerticalScrollIndicator={false}>
        {[
          { name: 'The Caravan Lounge', rating: '5/5' },
          { name: 'Mate Bar', rating: '4/5' },
          { name: 'The Ice Club', rating: '1/5' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.ratingItem}>
            <ThemedText type="defaultSemiBold" style={styles.barName}>{item.name}</ThemedText>
            <ThemedText type="subtitle" style={styles.ratingText}>{item.rating}</ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Additional top padding
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1a', // Dark mode background
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Light text color for dark mode
  },
  ratingsList: {
    alignItems: 'center',
    paddingTop: 20,
  },
  ratingItem: {
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
  barName: {
    fontSize: 18,
    color: '#ffffff',
  },
  ratingText: {
    fontSize: 16,
    color: '#bbbbbb',
  },
});

export default PastReviewsScreen;
