import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import axios from 'axios';

const FriendScreen: React.FC = () => {
  const [friends, setFriends] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://192.168.1.219:8080/api/friends/list`, {
          params: { username: 'Migo00' },
        });
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

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
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>Friends</ThemedText>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : (
        <ScrollView contentContainerStyle={styles.friendsList} showsVerticalScrollIndicator={false}>
          {friends.map((friend, index) => (
            <TouchableOpacity key={index} style={styles.friendItem} onPress={() => handleFriendPress(friend.username)}>
              <Ionicons name="person-circle-outline" size={36} color="#bbb" style={styles.icon} />
              <ThemedText type="default" style={styles.friendText}>{friend.username}</ThemedText>
            </TouchableOpacity>
          ))}

          <ThemedText>{'\n'}</ThemedText>
          <TouchableOpacity style={[styles.button, styles.pastRatingsButton]} onPress={navigateToAddFriends}>
            <Text style={styles.buttonText}>Add Friend</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
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

export default FriendScreen;
