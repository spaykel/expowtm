import { Image, View, StyleSheet, Platform, Text, TextInput } from 'react-native';
import { useState } from 'react';
import ImageViewer from "@/components/imageView";

const PlaceholderImage1 = require('@/assets/images/ontherox.png');
const PlaceholderImage2 = require('@/assets/images/Mate-bare.jpg');  //images
const PlaceholderImage3 = require('@/assets/images/ice-bar.jpg');

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by address"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Logo */}
      <Image
        source={require('@/assets/images/WTM-Logo.png')}
        style={styles.WTMLogo}
      />

      {/* Title */}
      <Text style={styles.text}>Top Rated:</Text>

      {/* Images and Text */}
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage1} />
        <Text style={styles.textBox}>On The Rox</Text>
      </View>

      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage2} />
        <Text style={styles.textBox1}>Mate Bar</Text>
      </View>

      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage3} />
        <Text style={styles.textBox2}>Ice Club</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    width: 320,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 20,
    color: 'black',
    position: 'absolute',  // Keeps it at the top
    top: 60,
  },
  WTMLogo: {
    height: 78,
    width: 190,
    bottom: 720,
    left: -50,
    position: 'absolute',
  },
  text: {
    paddingTop: 30,
    left: 0,
    bottom: -60,
    fontSize: 24,
    color: '#fff',
  },
  imageContainer: {
    flex: 0.25,
    bottom: 100,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  textBox: {
    position: 'absolute',
    fontSize: 20,
    color: 'white',
    top: 270,
    left: 90,
    backgroundColor: 'black',
    borderRadius: 23,
    width: 180,
    height: 25,
    textAlign: 'center',
  },
  textBox1: {
    position: 'absolute',
    fontSize: 20,
    color: 'white',
    top: 270,
    left: 90,
    backgroundColor: 'black',
    borderRadius: 23,
    width: 180,
    height: 25,
    textAlign: 'center',
  },
  textBox2: {
    position: 'absolute',
    fontSize: 20,
    color: 'white',
    top: 270,
    left: 90,
    backgroundColor: 'black',
    borderRadius: 23,
    width: 180,
    height: 25,
    textAlign: 'center',
  },
});
