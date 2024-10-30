import { Image, View, StyleSheet, Platform, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import ImageViewer from "@/components/imageView";
import { SearchBar } from 'react-native-screens';

const PlaceholderImage1 = require('@/assets/images/ontherox.png');
const PlaceholderImage2 = require('@/assets/images/Mate-bare.jpg');  //images
const PlaceholderImage3 = require('@/assets/images/ice-bar.jpg');

export default function HomeScreen() {
  const[search,setSearch] = useState('');

  const handleLocationSearch = () =>{
    console.log('(Placeholder message) request search by location')
  }

  const handleAddressSearch = () =>{
    console.log('Searching with address: ',search);
  }


  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('@/assets/images/WTM-Logo.png')}
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by address"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleAddressSearch}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.or}>or</Text>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={handleLocationSearch}
        >
          <Text style={styles.buttonText}>Use your location</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 400,
    marginBottom: 40,
    resizeMode: 'contain'
  },
  
  searchContainer: {
    width: '75%',
    flexDirection: 'row', // align items horizontally
    alignItems: 'center', // vertically center elements
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
  },
  searchButton: {
    height:60,
    padding: 15,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  or: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  locationButton: {
    height:60,
    width: '75%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200EE',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
