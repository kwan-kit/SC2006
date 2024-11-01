import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap around parts of the app that need access to AuthContext
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
