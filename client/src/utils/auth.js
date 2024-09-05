import {jwtDecode} from 'jwt-decode';

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token'); // Получаем JWT токен из localStorage
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id; // Предположим, что userId хранится под ключом 'id'
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};
