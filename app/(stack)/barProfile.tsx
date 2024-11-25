import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, Modal, TextInput, Alert, Linking, RefreshControl } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from "axios";

type Bar = {
  business_status: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  photos: [
    {
      height: number;
      html_attributions: string[];
      photo_reference: string;
      width: number;
    }
  ];
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
};

const BarProfile: React.FC = () => {
  const { bar: barParam } = useLocalSearchParams<{ bar: string }>();
  let bar: Bar = JSON.parse(decodeURIComponent(barParam));

  const [photo, setPhoto] = useState<string | null>(null);
  const [starRating, setStarRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [busynessRating, setBusynessRating] = useState('');
  const [currentBusyness, setCurrentBusyness] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false); // State to manage refresh status

  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const getBaseUrl = () => (Platform.OS === "android" ? "http://10.0.2.2:5000" : "http://localhost:5000");

  const getPhoto = async (width: number, reference: string) => {
    try {
      const baseUrl = getBaseUrl();
      const requestUrl = `${baseUrl}/api/photos`;
      const params = {
        width,
        reference
      };
      const response = await axios.get(requestUrl, { params });
      return response.data;
    } catch {
      console.error("Error fetching photos");
      return null;
    }
  };

  const fetchPhoto = async () => {
    const url = await getPhoto(400, bar.photos[0]?.photo_reference);
    setPhoto(url.imageUrl);
  };

  const fetchBusyness = async () => {
    try {
      const apiUrl = `http://192.168.1.54:8080/bars/${bar.place_id}/busyness`;
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        setCurrentBusyness(response.data);
      } else {
        console.error("Failed to fetch busyness");
      }
    } catch (error) {
      console.error("Error fetching busyness:", error);
      setCurrentBusyness(null);
    }
  };

  useEffect(() => {
    fetchPhoto();
    fetchBusyness();
  }, [bar.place_id]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchPhoto();
    await fetchBusyness();
    setIsRefreshing(false);
  };

  const navigateToLeaveReview = () => router.push('../(stack)/leaveReview');

  const handleGetDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(bar.name)}&destination_place_id=${bar.place_id}`;
    Linking.openURL(directionsUrl).catch((err) =>
      Alert.alert("Error", "Unable to open the directions link.")
    );
  };

  const handleReportBusyness = async () => {
    const rating = parseInt(busynessRating);
    if (rating >= 1 && rating <= 10) {
      try {
        const apiUrl = `http://192.168.1.54:8080/bars/${bar.place_id}/busyness`;
        const response = await axios.put(apiUrl, { busyness: rating });

        if (response.status === 200) {
          setCurrentBusyness(rating);
          Alert.alert("Busyness Reported", `You rated the busyness as: ${rating}/10`);
        } else {
          Alert.alert("Error", "Failed to update busyness. Please try again.");
        }
      } catch (error) {
        console.error("Error updating busyness:", error);
        Alert.alert("Error", "Unable to send busyness update.");
      } finally {
        setModalVisible(false);
        setBusynessRating('');
      }
    } else {
      Alert.alert("Invalid Rating", "Please enter a number between 1 and 10.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Bar Name */}
      <Text style={styles.barName}>{bar.name}</Text>

      {/* Bar Address */}
      <Text style={styles.barAddress}>{bar.vicinity}</Text>

      {/* Bar Image */}
      {photo ? (
        <Image style={styles.image} source={{ uri: photo }} />
      ) : (
        <Text style={styles.text}>Loading image...</Text>
      )}

      {/* Display Current Busyness */}
      <Text style={styles.busynessText}>
        Current Busyness: {currentBusyness !== null ? currentBusyness : "No Reports"}
      </Text>

      {/* Star Rating Display */}
      <View style={styles.filledStars}>
        <Text style={styles.text}>
          {starRating ? `${starRating}` : 'Give A Rating'}
        </Text>
        {starRating ? <MaterialIcons name="star" size={20} color="#FFD700" style={styles.starIcon} /> : null}
      </View>

      {/* Star Rating Selection */}
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <TouchableOpacity key={rating} onPress={() => setStarRating(rating)}>
            <MaterialIcons
              name={starRating >= rating ? 'star' : 'star-border'}
              size={30}
              style={starRating >= rating ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetDirections}>
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToLeaveReview}>
          <Text style={styles.buttonText}>Leave a Review</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.busynessButton]} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Report Busyness</Text>
        </TouchableOpacity>
      </View>

      {/* Busyness Rating Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Rate the Club's Busyness (1-10)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a number 1 to 10"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              maxLength={2}
              value={busynessRating}
              onChangeText={setBusynessRating}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleReportBusyness}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#121212',
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 15,
  },
  image: {
    width: '90%',
    height: 250,
    resizeMode: 'cover',
    marginVertical: 20,
    borderRadius: 10,
  },
  busynessText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  filledStars: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  stars: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '75%',
    alignItems: 'center',
    marginVertical: 8,
  },
  busynessButton: {
    backgroundColor: '#6200EE',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  starUnselected: {
    color: '#555',
  },
  starSelected: {
    color: '#FFD700',
  },
  starIcon: {
    paddingTop: 3,
    marginLeft: 6,
  },
  text: {
    color: '#BDBDBD',
    fontSize: 20,
  },
   loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  barName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    paddingTop: 10,
  },
  barAddress: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    paddingTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#333333',
    borderRadius: 5,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '75%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 10,
  },
});

export default BarProfile;