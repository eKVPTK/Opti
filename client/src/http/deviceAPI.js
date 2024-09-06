import { $host, $authHost } from './index';
import axios from 'axios';

export const fetchDevices = async (typeId, brandId, page = 1, limit = 9) => {
    const { data } = await $host.get('/device', {
        params: { brandId, typeId, page, limit }
    });
    return data;
};

export const fetchBrands = async () => {
    const { data } = await $host.get('/brand');
    return data;
};

export const fetchTypes = async () => {
    const { data } = await $host.get('/type');
    return data;
};

export const createDevice = async (device) => {
    const { data } = await $authHost.post('/device', device);
    return data;
};

export const updateDevice = async (deviceId, deviceData) => {
    const response = await $authHost.put(`/device/${deviceId}`, deviceData);
    return response.data;
};

export const deleteDevice = async (deviceId) => {
    const { data } = await $authHost.delete(`/device/${deviceId}`);
    return data;
};

export const fetchDeviceById = async (deviceId) => {
    const { data } = await $host.get(`/device/${deviceId}`);
    return data;
};

export const createType = async (type) => {
    const { data } = await $authHost.post('/type', type);
    return data;
  };

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('/brand', brand);
  return data;
};

// {
//     baseURL: 'http://localhost:5000/api',
//     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
// }