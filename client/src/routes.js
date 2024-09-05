// src/routes.js
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import Shop from './pages/Shop';
import DevicePage from './pages/DevicePage';
import CreateDevice from './pages/CreateDevice';

// Маршруты для авторизованных пользователей
export const authRoutes = [
  { path: '/admin', Component: Admin },
  { path: '/basket', Component: Basket },
  { path: '/create', Component: CreateDevice}
];

// Публичные маршруты
export const publicRoutes = [
  { path: '/', Component: Shop },
  { path: '/login', Component: Auth },
  { path: '/register', Component: Auth },
  { path: '/device/:id', Component: DevicePage }
];
