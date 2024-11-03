// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileName, setProfileName] = useState("John Smith"); // Initialize with default name

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, profileName, setProfileName }}>
      {children}
    </AuthContext.Provider>
  );
};
