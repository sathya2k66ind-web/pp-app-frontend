import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initial "Pilot" State
  const [userData, setUserData] = useState({
    name: "Aravind Swamy",
    email: "aravind.ux@slotify.com",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aravind",
    userId: "SLOT-8829",
    rank: "Executive Pilot",
    joinedDate: "OCT 2023"
  });

  // Global function to update identity across all screens
  const updateUserData = (newData) => {
    setUserData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  // Optional: Sync with LocalStorage to persist login through refreshes
  useEffect(() => {
    const savedUser = localStorage.getItem("slotify_user");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("slotify_user", JSON.stringify(userData));
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for cleaner imports in your pages
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};