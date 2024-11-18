import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Review {
  id: number;
  reviewText: string;
  barId: number;
  userId: number;
}

const PastReviewsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params as { userId: number }; // Get userId from navigation params
  const [reviews, setReviews] = useState<Review[]>([]);
  const [expandedReviews, setExpandedReviews] = useState<{ [key: number]: boolean }>({});

  const handleBackPress = () => {
    navigation.goBack();
  };

  const toggleReview = (index: number) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://192.168.2.241:8080/api/reviews/user/${userId}`); // Fetch reviews by user
      setReviews(response.data); // Set fetched reviews
      console.log("response.data:", response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch reviews');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [userId]); // Fetch reviews whenever userId changes

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
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <View key={review.id} style={styles.reviewItem}>
              <ThemedText type="defaultSemiBold" style={styles.barName}>
                {`Review for Bar ${review.barId}`} {/* Replace with dynamic bar name if needed */}
              </ThemedText>
              <ThemedText type="default" style={styles.reviewText}>
                {expandedReviews[index] ? review.reviewText : `${review.reviewText.slice(0, 50)}...`}
              </ThemedText>
              <TouchableOpacity onPress={() => toggleReview(index)}>
                <ThemedText type="link" style={styles.readMore}>
                  {expandedReviews[index] ? 'Show Less' : 'Read More'}
                </ThemedText>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <ThemedText type="default" style={styles.noReviews}>
            No reviews available for this user.
          </ThemedText>
        )}
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
  noReviews: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PastReviewsScreen;
