import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserStoreProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { isAuth: false, role: 'USER' };
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = (role) => {
    setUser({ isAuth: true, role });
  };

  const logout = () => {
    setUser({ isAuth: false, role: 'USER' });
    localStorage.removeItem('user'); 
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserStore = () => useContext(UserContext);
