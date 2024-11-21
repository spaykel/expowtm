import {
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import axios from "axios";

const router = useRouter();

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const getBaseUrl = () => (Platform.OS === "android" ? "http://10.0.2.2:5000" : "http://localhost:5000");


  //function to request and return current position
  const handleLocationSearch = async () => {
    try {
      //request location services
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        //user denies access
        console.log("Permission to access location denied");
        return;
      }

      //get and return location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      //fetch bars using location
      const fetchedBars = await fetchBars(latitude, longitude);

      //stringify to pass as query param
      const jsonBars = JSON.stringify(fetchedBars);

      //pass fetchedBars to barList
      router.push({
        pathname: "../(stack)/barList",
        params: { bars: encodeURIComponent(jsonBars) },
      });
    } catch (error) {
      setError("Error fetching bars by location");
      console.log(error);
      console.error(error);
    }
  };

  const handleAddressSearch = async () => {
    console.log(search);
    try {
      if (!search || search.trim() === "") {
        setError("Search address is empty.");
        return;
      }
  
      const baseUrl = getBaseUrl();
      const requestUrl = `${baseUrl}/api/geocode`;
      console.log(requestUrl);
  
      const response = await axios.get(requestUrl, { params: { address: search.trim() } });
  
      if (!response.data.results || response.data.results.length === 0) {
        throw new Error("No location found for the given address.");
      }
  
      const { lat, lng } = response.data.results[0].geometry.location;
  
      const fetchedBars = await fetchBars(lat, lng);
  
      const jsonBars = JSON.stringify(fetchedBars);
  
      router.push({
        pathname: "../(stack)/barList",
        params: { bars: encodeURIComponent(jsonBars) },
      });
    } catch (error) {
      setError("Error fetching geocoded location. Please try again.");
      console.error(error);
    }
  };
  

  const fetchBars = async (latitude: number, longitude: number) => {
    try {
      //automatically create baseUrl depending if testing with web or android emulator
      const baseUrl = getBaseUrl();
      const requestUrl = `${baseUrl}/api/places`;

      const params = {
        latitude,
        longitude,
        radius: 8000, // Optional, adjust as needed
        type: "bar", // Places of type 'bar'
      };

      // Log the request URL and parameters
      console.log("Requesting bars from API:", requestUrl);
      console.log("Request parameters:", params);

      // Send a request to the backend server
      const response = await axios.get(requestUrl, { params });

      // Return the fetched data from your backend to the frontend
      return response.data.results;
    } catch (error) {
      console.error("Error fetching bars:", error);
      return [];
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("@/assets/images/WTM-Logo.png")}
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
        {/* Display Error Message */}
    {error && <Text style={styles.errorText}>{error}</Text>}

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
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 400,
    marginBottom: 40,
    resizeMode: "contain",
  },

  searchContainer: {
    width: "75%",
    flexDirection: "row", // align items horizontally
    alignItems: "center", // vertically center elements
    marginBottom: 20,
  },
  input: {
    flex: 1, // take up remaining space in the row
    padding: 15,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: "#333",
    height: 60,
    color: "#fff",
    fontSize: 16,
  },
  searchButton: {
    height: 60,
    padding: 15,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
  },
  or: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  locationButton: {
    height: 60,
    width: "75%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200EE",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginVertical: 0,
    textAlign: "center",
  },
});
