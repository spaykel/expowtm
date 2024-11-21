import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFriendsScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();


  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddFriend = async () => {
    if (search.trim()) {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        await axios.post(
          'http://192.168.1.63:8080/api/friends/add', 
          {
            username: storedUsername,  
            friendUsername: search,           
          },
          {
            headers: {
              'Content-Type': 'application/json', 
            },
          }
        );
  
        alert('Friend added successfully');
      } catch (error) {
        console.error("Error adding friend:", error);
        alert('There was an error adding the friend. Please try again.');
      }
    } else {
      alert('Please enter a username to add as a friend');
    }
  };
  
  

  return (
    <ThemedView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>Add Friends</ThemedText>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by username"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddFriend}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
    backgroundColor: '#000000',
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
  searchContainer: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 15,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: '#333',
    height: 60,
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddFriendsScreen;
