import {
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import axios from "axios";

const router = useRouter();

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [bars, setBars] = useState([]);
  const [error, setError] = useState<string | null>(null);

  //function to request and return current position
  const handleLocationSearch = async () => {
    try {
      console.log("(Placeholder message) request search by location");

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

      //testing purposes
      console.log("Fetched Bars:", fetchedBars); // Log the fetched data

      //update state with results
      setBars(fetchedBars);
      setError(null);

      //pass fetchedBars to barList
      router.push({ pathname: '../(stack)/barList', 
        params: {bars: fetchedBars}
      });

    } catch (error) {
      setError("Error fetching bars by location");
      console.log(error);
      console.error(error);
    }

  };

  const handleAddressSearch = () => {
    console.log("Searching with address: ", search);
    router.push({
      pathname: "../(stack)/barList",
    });
  };

  const fetchBars = async (latitude: number, longitude: number) => {
  try {
    // Define the request URL with parameters
    const requestUrl = `http://localhost:5000/api/places`;
    const params = {
      latitude,
      longitude,
      radius: 8000, // Optional, adjust as needed
      type: 'bar',  // Places of type 'bar'
    };

    // Log the request URL and parameters
    console.log('Requesting bars from API:', requestUrl);
    console.log('Request parameters:', params);

    // Send a request to the backend server
    const response = await axios.get(requestUrl, { params });

    // Return the fetched data from your backend to the frontend
    return response.data.results;
  } catch (error) {
    console.error('Error fetching bars:', error);
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
});
