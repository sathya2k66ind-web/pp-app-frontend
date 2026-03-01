// src/api/auth.js
import { api } from "./api";

/**
 * Logs in the user and persists the session
 */
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    
    // 🔥 PERSISTENCE: Save data so ProtectedRoute and Dashboard can use it
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      // We store user as a string because localStorage only accepts strings
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    // Standard error logging from your current version
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Clears the session and logs the user out
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // Redirect to login page
  window.location.href = "/login";
};