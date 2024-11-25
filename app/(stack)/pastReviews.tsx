import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface Review {
  id: number;
  reviewText: string;
  barId: number;
  userId: number;
}

const PastReviewsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState<number | null>(null); // Track userId
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

  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(JSON.parse(storedUserId));
      } else {
        Alert.alert('Error', 'User ID not found. Please log in again.');
        // navigation.navigate('Login'); // Navigate to login if no userId
      }
    } catch (error) {
      console.error('Error fetching userId:', error);
      Alert.alert('Error', 'Failed to retrieve user ID.');
    }
  };

  const fetchReviews = async () => {
    if (!userId) return; // Prevent fetching if userId is null
    try {
      const response = await axios.get(`http://192.168.1.54:8080/api/reviews/user/${userId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      Alert.alert('Error', 'Failed to fetch reviews');
    }
  };

  useEffect(() => {
    fetchUserId(); // Fetch userId when component mounts
  }, []);

  useEffect(() => {
    if (userId) {
      fetchReviews(); // Fetch reviews when userId is available
    }
  }, [userId]);

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
