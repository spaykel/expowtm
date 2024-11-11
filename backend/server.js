//for api keys
require('dotenv').config();

// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

const GOOGLE_API_KEY = process.env.API_KEY;

app.get("/api/places", async (req, res) => {
  const { latitude, longitude, radius, type = "bar" } = req.query;

  // Build Google Places API URL
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data); // Send Google API response to frontend
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ message: "Error fetching places" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
