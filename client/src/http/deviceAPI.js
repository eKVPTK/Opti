import { $host, $authHost } from './index';
import axios from 'axios';

// Функция для получения списка устройств с фильтрацией и пагинацией
export const fetchDevices = async (typeId, brandId, page = 1, limit = 9) => {
    const { data } = await $host.get('/device', {
        params: { brandId, typeId, page, limit }
    });
    return data;
};

// Функция для получения списка брендов
export const fetchBrands = async () => {
    const { data } = await $host.get('/brand');
    return data;
};

// Функция для получения списка типов
export const fetchTypes = async () => {
    const { data } = await $host.get('/type');
    return data;
};

// Функция для создания нового устройства
export const createDevice = async (device) => {
    const { data } = await $authHost.post('/device', device);
    return data;
};

// Функция для обновления устройства
export const updateDevice = async (deviceId, deviceData) => {
    const response = await $authHost.put(`/device/${deviceId}`, deviceData);
    return response.data;
};

// Функция для удаления устройства
export const deleteDevice = async (deviceId) => {
    const { data } = await $authHost.delete(`/device/${deviceId}`);
    return data;
};

// Функция для получения одного устройства по ID
export const fetchDeviceById = async (deviceId) => {
    const { data } = await $host.get(`/device/${deviceId}`);
    return data;
};

