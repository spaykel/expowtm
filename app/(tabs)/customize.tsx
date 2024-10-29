import {View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useState} from 'react';
import { useRouter } from 'expo-router';

// change these later when you do backend coding
let name = "John Doe";
let age = 20;
let numBarsVisited = 50;

export default function TabTwoScreen() {

  const router = useRouter();

  const [pastReviewsNReview, setPastReviews] = useState('');
  const [pastRatings, setPastRatings] = useState('');
  const [friends, setFriends] = useState('');

  const navigateToPastReviews = () => {
    router.push('../(stack)/pastReviews');
  };
  const navigateToPastRatings = () => {
    router.push('../(stack)/pastRatings');
  };

  const navigateToFriends = () => {
    router.push('../(stack)/friends');
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        {/* need to change this to actually be centered and not have the spaces */}
        <View style={styles.centered}>
          <ThemedText type="title">Customize Profile{'\n'}</ThemedText>
        </View>
      </ThemedView>
      <Image source={require('@/assets/images/braver-blank-pfp_new.jpg')} style={{ alignSelf: 'center' }} />
      <ThemedText>{'\n'} Name: {name} </ThemedText> 
      <ThemedText>Age: {age}{'\n'}</ThemedText>
      
      {/* Past Reviews button */}
      <TouchableOpacity style={styles.button} onPress={navigateToPastReviews}>
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
    backgroundColor: '#888',
  },

});
