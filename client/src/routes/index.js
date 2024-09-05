import Admin from '../pages/Admin';
import Auth from '../pages/Auth';
import Basket from '../pages/Basket';
import Shop from '../pages/Shop';
import CreateDevice from '../pages/CreateDevice';
import { Component } from 'react';
import { ADMIN_ROUTE, BASKET_ROUTE, CREATE_DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import DevicePage from '../pages/DevicePage';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  },
  {
    path: BASKET_ROUTE,
    Component: Basket
  },
  {
    path: CREATE_DEVICE_ROUTE,
    Component: CreateDevice
  }
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: '/product/:id',
    Component: DevicePage
  },
];
