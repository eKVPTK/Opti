// // src/http/basketAPI.js

// import { $authHost } from './index';

// export const addToBasket = async (deviceId) => {
//     const { data } = await $authHost.post('/basket/add', { deviceId });
//     return data;
// };

// export const fetchBasket = async () => {
//     const { data } = await $authHost.get('/basket');
//     return data;
// };

// export const checkDeviceInBasket = async (deviceId) => {
//     const { data } = await $authHost.get(`/basket/check/${deviceId}`);
//     return data;
// };

// export const removeFromBasket = async (deviceId) => {
//     const { data } = await $authHost.delete(`/basket/remove/${deviceId}`);
//     return data;
// };
// src/http/basketAPI.js
// import axios from 'axios';
// import { $authHost } from './index';

// export const addToBasket = async (deviceId) => {
//     const userId = localStorage.getItem('userId'); // Предполагается, что userId хранится в localStorage
//     const { data } = await $authHost.post('/basket/add', { deviceId, userId });
//     return data;
// };

// export const fetchBasket = async (userId) => {
//     const { data } = await $authHost.get(`/basket/${userId}`);
//     return data;
// };

// export const checkDeviceInBasket = async (deviceId, userId) => {
//     const { data } = await $authHost.get(`/basket/check/${deviceId}`, { params: { userId } });
//     return data;
// };

// export const removeFromBasket = async (deviceId, userId) => {
//     const { data } = await $authHost.delete(`/basket/remove/${deviceId}`, { params: { userId } });
//     return data;
// };

import { $authHost } from './index';

export const addToBasket = async (userId, deviceId) => {
  const { data } = await $authHost.post('/basket/add', { userId, deviceId });
  return data;
};

export const fetchBasket = async (userId) => {
  const { data } = await $authHost.get(`/basket/${userId}`);
  return data;
};

export const checkDeviceInBasket = async (userId, deviceId) => {
    const { data } = await $authHost.get(`/basket/check/${userId}/${deviceId}`);
    return data;
  };
  

  export const removeFromBasket = async (userId, deviceId) => {
    const { data } = await $authHost.delete(`/basket/remove/${deviceId}`, {
      params: { userId } // Передаем userId в query параметрах
    });
    return data;
  };

  export const updateBasketQuantity = async (userId, deviceId, quantity) => {
    const { data } = await $authHost.post('/basket/update-quantity', { userId, deviceId, quantity });
    return data;
  };