// src/store/UserStore.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserStoreProvider = ({ children }) => {
  // Инициализация состояния пользователя из localStorage или по умолчанию
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { isAuth: false, role: 'USER' };
  });

  // Сохранение состояния пользователя в localStorage при его изменении
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = (role) => {
    setUser({ isAuth: true, role });
  };

  const logout = () => {
    setUser({ isAuth: false, role: 'USER' });
    localStorage.removeItem('user'); // Очистка localStorage при выходе
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserStore = () => useContext(UserContext);
