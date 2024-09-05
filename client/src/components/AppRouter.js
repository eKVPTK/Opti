// src/components/AppRouter.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { useUserStore } from '../store/UserStore';

const AppRouter = () => {
  const { user } = useUserStore(); // Получаем данные пользователя из UserStore

  return (
    <Routes>
      {/* Рендерим защищенные маршруты для авторизованных пользователей */}
      {user.isAuth && authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      
      {/* Рендерим публичные маршруты */}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      {/* Перенаправляем на главную страницу, если маршрут не найден */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
