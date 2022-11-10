import React from 'react';
import { Navigate } from 'react-router-dom';

import { PATH } from '../types';

const RootRedirect = () => {
  return localStorage.getItem('KanBanToken') ? (
    <Navigate to={PATH.BOARDS} />
  ) : (
    <Navigate to={PATH.WELCOME} />
  );
};

export default RootRedirect;
