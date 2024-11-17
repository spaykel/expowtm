import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { useRouter } from 'expo-router';


/* TO DO:
  1. need to make the back end for searching for accounts
  2. when searching for accounts, we might want to make it like instagram where it shows the username and pfp so that you know who you
  are adding as a friend
*/

const AddFriendsScreen: React.FC = () => {

  const router = useRouter();
  const[search,setSearch] = useState('');
  const navigation = useNavigation();
  const handleBackPress = () => {navigation.goBack();};

  const handleAddFriendsSearch = () =>{
    console.log('Searching with address: ',search);
    // need to change the location of the path to the users profile (actually might not want to view the profile before you add as a friend, can do this in the friends tab)
    router.push({ pathname: '/customize' });
  }

  return (
    <ThemedView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>Add Friends</ThemedText>
      </View>

      {/* Search for Friend */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by username"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleAddFriendsSearch}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

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
  searchContainer: {
    width: '75%',
    flexDirection: 'row', // align items horizontally
    alignItems: 'center', // vertically center elements
    alignSelf: 'center', // Center the search container horizontally
    marginBottom: 20,
  },
  input: {
    flex: 1, // take up remaining space in the row
    padding: 15,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: '#333',
    height:60,
    color: '#fff',
    fontSize: 16,
  },searchButton: {
    height:60,
    padding: 15,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default AddFriendsScreen;
      