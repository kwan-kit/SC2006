import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileName, setProfileName] = useState(''); // allow it to be set

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, profileName, setProfileName }}>
      {children}
    </AuthContext.Provider>
  );
};
