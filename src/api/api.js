// src/api/api.js
import axios from "axios";

const baseURL = "https://pp-app-backend-1.onrender.com"; 

export const api = axios.create({
  baseURL,
  timeout: 15000, // Wait 15s for Render to "wake up"
  headers: {
    "Content-Type": "application/json",
  },
});

// Add this Interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error("Render is taking too long to wake up.");
    }
    return Promise.reject(error);
  }
);