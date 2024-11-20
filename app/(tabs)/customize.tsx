import {View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as ImagePicker from 'expo-image-picker';
import {useEffect, useState} from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* TO DO:
  need to make the users account information appear after they sign in (username, name, age)
  going to need a counter for how many bars we have visited
  going to need a counter for how many bars we have visited
*/
export default function TabTwoScreen() {
  const [username, setUsername] = useState('');

  let numBarsVisited = 50;
  const router = useRouter();
  // const [imageSrc, setImageSrc] = useState(null); // Default profile picture
  const [imageSrc, setImageSrc] = useState<string | null>(null); // Specify type as string | null

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        console.log("Stored Username:", storedUsername);
        setUsername(storedUsername ?? '');

      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  const handleImageChange = async () => {
    // Request permission to access images
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      setImageSrc(pickerResult.assets[0].uri); // Get the URI of the selected image
    }
  };

  // naviagation for the buttons
  const navigateToPastReviews = () => router.push('../(stack)/pastReviews');
  const navigateToPastRatings = () => router.push('../(stack)/pastRatings');
  const navigateToFriends = () => router.push('../(stack)/friends');

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        {/* need to change this to actually be centered and not have the spaces */}
        <View style={styles.centered}>
          <ThemedText type="title" style={{ color: 'white' }}>{username}{'\n'}</ThemedText>
        </View>
      </ThemedView>
      {/* <Image source={require('@/assets/images/braver-blank-pfp_new.jpg')} style={{ alignSelf: 'center' }} /> */}
      {/* going to change image on click here */}
          {/* Profile Picture */}
      <TouchableOpacity onPress={handleImageChange}>
        <Image
          source={imageSrc ? { uri: imageSrc } : require('@/assets/images/braver-blank-pfp_new.jpg')}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Past Reviews button */}
      <TouchableOpacity style={[styles.button, styles.pastRatingsButton]} onPress={navigateToPastReviews}>
        <Text style={styles.buttonText}>Past Reviews</Text>
      </TouchableOpacity>
      
      {/* Past Ratings button */}
      <TouchableOpacity style={[styles.button, styles.pastRatingsButton]} onPress={navigateToPastRatings}>
        <Text style={styles.buttonText}>Past Ratings</Text>
      </TouchableOpacity>

      {/* Friends button */}
      <TouchableOpacity style={[styles.button, styles.pastRatingsButton]} onPress={navigateToFriends}>
        <Text style={styles.buttonText}>Friends</Text>
      </TouchableOpacity>
      
      {/* Going to also need to change this when we get the back end running */}
      <ThemedText>{'\n'}You have visited {numBarsVisited} Bars!!{'\n'}</ThemedText>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 999,
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 16,
  },
  centered: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 50,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pastRatingsButton: {
    backgroundColor: '#6200EE',
  },  
});
