// src/http/commentAPI.js

import { $authHost, $host } from './index';

// Добавление комментария
export const addComment = async (userId, deviceId, text) => {
    const { data } = await $authHost.post('/comment', { userId, deviceId, text }); // Изменяем на 'text'
    return data;
};

// Редактирование комментария
export const editComment = async (commentId, text) => { // Изменяем на 'text'
    const { data } = await $authHost.put(`/comment/${commentId}`, { text });
    return data;
};

// Удаление комментария
export const deleteComment = async (commentId) => {
    const { data } = await $authHost.delete(`/comment/${commentId}`);
    return data;
};

// Получение всех комментариев для конкретного устройства
export const getCommentsByDeviceId = async (deviceId) => {
    const { data } = await $host.get(`/comment/${deviceId}`); // Используем $host, так как этот запрос не требует авторизации
    return data;
};
