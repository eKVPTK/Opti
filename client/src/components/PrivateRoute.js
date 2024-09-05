import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/UserStore';

const PrivateRoute = ({ children }) => {
  const { user } = useUserStore();

  return user.isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
