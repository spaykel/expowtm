import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';


const PastReviewsScreen: React.FC = () => {
  const navigation = useNavigation();
  const router = useRouter();


  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleFriendPress = (friend: string) => {
    // Navigate to the friend’s profile or another screen, passing the friend's name as a parameter
    // navigation.navigate('FriendProfile', { friendName: friend });
  };

  const navigateToAddFriends = () => router.push('../(stack)/addFriends');

  return (
    <ThemedView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>Friends</ThemedText>
      </View>
      
      {/* Scrollable list of friends */}
      <ScrollView contentContainerStyle={styles.friendsList} showsVerticalScrollIndicator={false}>
        {['Miguel', 'Sammy', 'Nick'].map((friend, index) => (
          <TouchableOpacity key={index} style={styles.friendItem} onPress={() => handleFriendPress(friend)}>
            <Ionicons name="person-circle-outline" size={36} color="#bbb" style={styles.icon} />
            <ThemedText type="default" style={styles.friendText}>{friend}</ThemedText>
          </TouchableOpacity>
        ))}
      
      
      {/* Add Friends Button */}    
      <ThemedText>{'\n'}</ThemedText>
        <TouchableOpacity style={[styles.button, styles.pastRatingsButton]} onPress={navigateToAddFriends}>
        <Text style={styles.buttonText}>Add Friend</Text>
      </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80, // Additional top padding
    paddingHorizontal: 16,
    backgroundColor: '#000000', // Dark mode background
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
  friendsList: {
    alignItems: 'center',
    paddingTop: 20,
  },
  friendItem: {
    flexDirection: 'row',
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
  icon: {
    marginRight: 12,
  },
  friendText: {
    fontSize: 18,
    color: '#ffffff', // Light text color for dark mode
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    width: '75%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#888',
    marginBottom: 10,
  },
  pastRatingsButton: {
    backgroundColor: '#6200EE',
  },  
});

export default PastReviewsScreen;
