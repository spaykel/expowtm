// BarListScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

//in the format of the json that the google maps api returns
type Bar = {
  business_status: string,
    geometry: {
        location: {
            lat: number,
            lng: number
        },
        viewport: {
            northeast: {
                lat: number,
                lng: number
            },
            southwest: {
                lat: number,
                lng: number
            }
        }
    },
    icon: string,
    icon_background_color: string,
    icon_mask_base_uri: string,
    name: string,
    photos: [
        {
            height: number,
            html_attributions: string[],
            photo_reference: string,
            width: number
        }
    ],
    place_id: string,
    plus_code: {
        compound_code: string,
        global_code: string
    },
    rating: number,
    reference: string,
    scope: string,
    types: string[],
    user_ratings_total: number,
    vicinity: string
};

const BarListScreen: React.FC = () => {
  const { bars: barsParam } = useLocalSearchParams<{ bars: string }>();

  // Parse the `bars` JSON string to an array of `Bar` objects
  let bars: Bar[] = barsParam ? JSON.parse(decodeURIComponent(barsParam)) : [];
  
  // If bars is an object containing a page token extract it (used to get next 20 results)
  if ((bars as any).next_page_token) {
    let pageToken = (bars as any).next_page_token;
  }
  
  // If bars is an object containing a `response` property, extract it
  if ((bars as any).response) {
    bars = (bars as any).response;
  }

  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };
  
  const handleBarPress = (barData: Bar) => {
    router.push({ 
      pathname: '../(stack)/barProfile', 
      params: {bar: encodeURIComponent(JSON.stringify(barData))}
    });

  }

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>


      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Moves Nearby</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.barList} showsVerticalScrollIndicator={false}>
        {
        bars.map((item) => (
          <TouchableOpacity key={item.place_id} style={styles.barItem} onPress={() => handleBarPress(item)}>
            <View style={styles.barInfoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.address}>Address: {item.vicinity}</Text>
            <Text style={styles.rating}>Rating: {item.rating} / 5</Text>
            </View>          
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  container: {
    flex: 1,
    paddingTop: 60, // Additional top padding
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1a', // Dark mode background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Light text color for dark mode
  },
  itemContainer: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  address: {
    fontSize: 14,
    color: '#ffffff',

  },
  rating: {
    fontSize: 14,
    color: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 1,
  },
  barList: {
    alignItems: 'center',
    paddingTop: 20,
  },
  barItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  barInfoContainer: {
    flexDirection: 'column', // Ensures items stack vertically
  },
});

export default BarListScreen;