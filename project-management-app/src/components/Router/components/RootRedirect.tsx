import React from 'react';
import { Navigate } from 'react-router-dom';

const RootRedirect = () => {
  return localStorage.getItem('KanBanToken') ? (
    <Navigate to="/boards" />
  ) : (
    <Navigate to="/Welcome" />
  );
};

export default RootRedirect;
