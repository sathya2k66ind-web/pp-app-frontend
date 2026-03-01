// src/api/api.js
import axios from "axios";

// This switches between Render (live) and Localhost (testing) automatically
const baseURL = "https://pp-app-backend-1.onrender.com"; 

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});