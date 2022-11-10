import React from 'react';
import { Navigate } from 'react-router-dom';

const Redirect = () => {
  return localStorage.getItem('KanBanToken') ? (
    <Navigate to="/boards" />
  ) : (
    <Navigate to="/Welcome" />
  );
};

export default Redirect;
