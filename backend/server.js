//for api keys
require("dotenv").config();

// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

const GOOGLE_API_KEY = process.env.API_KEY;

app.get("/api/places", async (req, res) => {
  const {
    latitude,
    longitude,
    radius,
    type = "bar",
    keyword = "dancing",
  } = req.query;

  // Build Google Places API URL
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&keyword=${keyword}&rankby=distance&type=${type}&key=${GOOGLE_API_KEY}`;

  try {
    console.log("Sending API request to Google Maps");
    const response = await axios.get(url);
    console.log("Sending JSON response to frontend");
    res.json(response.data); // Send Google API response to frontend
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ message: "Error fetching places" });
  }
});

app.get("/api/geocode", async (req, res) => {
  const {
    address
  } = req.query;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`

  try{
    console.log("Sending API request to Google Maps");
    const response = await axios.post(url);
    console.log("Sending JSON response to frontend");
    res.json(response.data)
  } catch (error) {
    console.error("Error fetching location:", error);
    res.status(500).json({ message: "Error fetching location" });
  }
});

app.get("/api/photos", async (req, res) => {
  const { width, reference } = req.query;

  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photo_reference=${reference}&key=${GOOGLE_API_KEY}`;

  try {
    // Fetch the photo from the Google API
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    // Send the photo data back to the frontend
    res.set('Content-Type', 'image/jpeg'); // Set the correct content type for the image
    res.send(response.data); // Send the image data
  } catch (error) {
    console.error("Error fetching photo:", error);
    res.status(500).json({ message: "Error fetching photo" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
