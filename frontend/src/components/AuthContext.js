import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileName] = useState("John Smith"); // Keep profileName as read-only

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, profileName }}>
      {children}
    </AuthContext.Provider>
  );
};
