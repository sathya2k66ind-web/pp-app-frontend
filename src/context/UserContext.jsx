import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/api"; // 👈 Ensure your axios instance is imported

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // 1. SYNC WITH BACKEND (Render + MongoDB)
  const fetchUser = async (id = "SLOT-8829") => {
    try {
      setLoading(true);
      // Change this endpoint to match your backend route
      const response = await api.get(`/api/users/${id}`); 
      setUserData(response.data);
      localStorage.setItem("slotify_user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Signal Lost: Could not sync with Cloud Identity", error);
      // Fallback to local storage if server is down
      const savedUser = localStorage.getItem("slotify_user");
      if (savedUser) setUserData(JSON.parse(savedUser));
    } finally {
      setLoading(false);
    }
  };

  // 2. GLOBAL UPDATE (Updates State + Cloud)
  const updateUserData = async (newData) => {
    try {
      // Optimistic update (UI changes immediately)
      setUserData((prev) => ({ ...prev, ...newData }));

      // Update Database
      await api.put(`/api/users/update/${userData.userId}`, newData);
    } catch (error) {
      console.error("Cloud Sync Failed", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, updateUserData, loading, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};