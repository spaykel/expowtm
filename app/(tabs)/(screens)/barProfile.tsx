import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const barProfile = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.barName}>
        On The Rox
      </Text>
      <Image
        style={styles.image}
        source={require('@/assets/images/ontherox.png')}
      />
      <Text style={styles.text}>
        Give a Rating
      </Text>

      <View style={styles.stars}>
        <MaterialIcons name ="star-border" size={30} style={styles.starUnselected}></MaterialIcons>
        <MaterialIcons name ="star-border" size={30} style={styles.starUnselected}></MaterialIcons>
        <MaterialIcons name ="star-border" size={30} style={styles.starUnselected}></MaterialIcons>
        <MaterialIcons name ="star-border" size={30} style={styles.starUnselected}></MaterialIcons>
        <MaterialIcons name ="star-border" size={30} style={styles.starUnselected}></MaterialIcons>
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
  button: {
    backgroundColor: '#6200EE',
    padding: 12,
    borderRadius: 8,
    width: '45%',
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
  },
  barName: {
    color: '#aaa',
    paddingTop: 10,
    fontSize: 40,
    alignItems: 'center',
  },
});

export default barProfile;
