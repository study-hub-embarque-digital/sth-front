import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, profile }) => {

  const currentProfile = localStorage.getItem('profile');  // lógica de autenticação
  
  return currentProfile === profile ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
