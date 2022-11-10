import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const WelcomeRedirect = () => {
  return localStorage.getItem('KanBanToken') ? <Outlet /> : <Navigate to="/Welcome" />;
};

export default WelcomeRedirect;
