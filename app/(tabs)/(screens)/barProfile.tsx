
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const barProfile = () => {
  const [starRating, setStarRating] = useState(0);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.barName}>
        On The Rox
      </Text>
      {/*image of bar clicked*/}
      <Image
        style={styles.image}
        source={require('@/assets/images/ontherox.png')}
      />
        <View style={styles.filledStars}>
      <Text style={styles.text}>
      {starRating ? `${starRating}` : 'Give A Rating'}
      </Text>
      {starRating ? (
        <MaterialIcons name="star" size={20} color="#FFD700" style={{paddingTop:14}} />
      ) : null}
          </View>

      {/*updating star rating'*/}
      <View style={styles.stars}>
        <TouchableOpacity onPress={() => setStarRating(1)}>
        <MaterialIcons name ="star-border" size={30} style={styles.starUnselected}></MaterialIcons>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStarRating(2)}>
        <MaterialIcons name ="star-border" size={30} style={styles.starUnselected}></MaterialIcons>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStarRating(3)}>
        <MaterialIcons name ="star-border" size={30} style={styles.starUnselected}></MaterialIcons>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStarRating(4)}>
        <MaterialIcons name ="star-border" size={30} style={styles.starUnselected}></MaterialIcons>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStarRating(5)}>
        <MaterialIcons name ="star-border" size={30} style={styles.starUnselected}></MaterialIcons>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Leave a Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#000000',
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 20,
  },
  image: {
    width: '90%',
    height: 250,
    marginVertical: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 70,
  },
  stars: {
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 30,
  },
  filledStars: {
    flex: 0.1,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 30,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 12,
    borderRadius: 8,
    width: '75%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
  starUnselected: {
    color: '#aaa',
  },
  text: {
    color: '#aaa',
    paddingTop: 10,
    fontSize: 20,
  },
  barName: {
    color: '#aaa',
    paddingTop: 10,
    fontSize: 40,
    alignItems: 'center',
  },
});

export default barProfile;
