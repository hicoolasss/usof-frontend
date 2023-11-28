import React, { createContext, useState, useEffect } from 'react';
import { useLogout } from '@/app/page';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    console.log('UserContext: user data loaded from local storage');
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      console.log('UserContext: user data loaded from local storage');
    }
  }, []);

  const logout = useLogout();

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};