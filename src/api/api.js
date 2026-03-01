// src/api/api.js
import axios from "axios";

// This line tells the app to use the Vercel variable if it exists; 
// otherwise, fall back to localhost for your own testing.
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000"; 

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});