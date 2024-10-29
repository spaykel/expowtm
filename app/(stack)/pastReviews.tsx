import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';

const reviewsData = [
  { bar: 'On the Rox', text: 'On the Rox was so fun last night! I met some great people and the vibe was amazing.' },
  { bar: 'Mate Bar', text: 'I had so much fun last night at Mate Bar! The drinks were top-notch, and the DJ was fantastic.' },
  { bar: 'The Ice Club', text: 'The Ice Club could have been a bit better. The music was okay, but it was a bit too crowded for my taste.' },
];

const PastReviewsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [expandedReviews, setExpandedReviews] = useState<{ [key: number]: boolean }>({});

  const handleBackPress = () => {
    navigation.goBack();
  };

  const toggleReview = (index: number) => {
    setExpandedReviews(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <ThemedView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>Past Reviews</ThemedText>
      </View>

      {/* Scrollable list of reviews */}
      <ScrollView contentContainerStyle={styles.reviewsList} showsVerticalScrollIndicator={false}>
        {reviewsData.map((review, index) => (
          <View key={index} style={styles.reviewItem}>
            <ThemedText type="defaultSemiBold" style={styles.barName}>{review.bar}</ThemedText>
            <ThemedText type="default" style={styles.reviewText}>
              {expandedReviews[index] ? review.text : `${review.text.slice(0, 50)}...`}
            </ThemedText>
            <TouchableOpacity onPress={() => toggleReview(index)}>
              <ThemedText type="link" style={styles.readMore}>
                {expandedReviews[index] ? 'Show Less' : 'Read More'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
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
    color: '#ffffff',
  },
  reviewsList: {
    alignItems: 'center',
    paddingTop: 20,
  },
  reviewItem: {
    paddingVertical: 16,
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
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 8,
  },
  readMore: {
    fontSize: 14,
    color: '#1e90ff',
    alignSelf: 'flex-end',
  },
});

export default PastReviewsScreen;
