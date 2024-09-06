import { $authHost, $host } from './index';

export const addComment = async (userId, deviceId, text) => {
    const { data } = await $authHost.post('/comment', { userId, deviceId, text }); 
    return data;
};

export const editComment = async (commentId, text) => { 
    const { data } = await $authHost.put(`/comment/${commentId}`, { text });
    return data;
};

export const deleteComment = async (commentId) => {
    const { data } = await $authHost.delete(`/comment/${commentId}`);
    return data;
};

export const getCommentsByDeviceId = async (deviceId) => {
    const { data } = await $host.get(`/comment/${deviceId}`); 
    return data;
};
