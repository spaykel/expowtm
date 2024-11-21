import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeaveReview: React.FC = () => {
  const [review, setReview] = useState('');

  const backendUrl = 'http://192.168.1.54:8080'; // Use your server's IP and port

  const handleSubmit = async () => {
    if (!review.trim()) {
      Alert.alert("Error", "Review text cannot be empty.");
      return;
    }

    const storedUsername = await AsyncStorage.getItem('username');
    const storedUserId = await AsyncStorage.getItem('userId');
    console.log("Stored Username:", storedUsername);
    console.log("Stored User Id:", storedUserId);
  
    console.log("start handleSubmit");
  
    try {
      const response = await fetch(`${backendUrl}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewText: review,
          barId: 27, // fix later
          userId: storedUserId
        }),
      });
  
      const textResponse = await response.text();  // Get the raw text response
      console.log('Server Response:', textResponse);
  
      if (response.ok) {
        Alert.alert('Review Submitted', `Your review: ${review}`);
        setReview(''); // Clear the review text
      } else {
        Alert.alert('Submission Failed', 'There was an issue submitting your review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Could not submit review.');
    }
  };
  

  const navigation = useNavigation();
  const handleBackPress = () => {navigation.goBack();};

  return (
    <View style={styles.container}>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <ThemedView style={styles.titleContainer}>
            {/* need to change this to actually be centered and not have the spaces */}
            <View style={styles.centered}>
                <ThemedText type="title">Leave A Review{'\n'}</ThemedText>
                </View>
        </ThemedView>  

        <TextInput
            style={styles.input}
            placeholder="Write your review here..."
            placeholderTextColor="#aaa"
            multiline
            maxLength={500}
            value={review}
            onChangeText={setReview}
      />
      <Text style={styles.charCount}>{500 - review.length} characters remaining</Text>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000000',
        paddingTop: 80, // Additional top padding
        paddingHorizontal: 16,
      },
      titleContainer: {
        alignItems: 'center',
        marginBottom: 24,
        backgroundColor: 'rgba(0,0,0,0)',
      },
      centered: {
        alignItems: 'center',
      },
  title: {
    alignItems: 'center',
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#333333',
    color: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    height: 150,
  },
  charCount: {
    color: '#BDBDBD',
    fontSize: 14,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 1,
  },
});

export default LeaveReview;
