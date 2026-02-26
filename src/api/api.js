// src/api/api.js
import axios from "axios";

// For now, use localhost
const baseURL = "http://localhost:5000"; // Change this later when backend is live

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});