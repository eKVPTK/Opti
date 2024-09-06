import {jwtDecode} from 'jwt-decode';

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token'); 
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id; 
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};
