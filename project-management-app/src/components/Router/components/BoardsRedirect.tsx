import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const BoardsRedirect = () => {
  return localStorage.getItem('KanBanToken') ? <Navigate to="/boards" /> : <Outlet />;
};

export default BoardsRedirect;
