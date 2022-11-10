import React from 'react';
import { Navigate } from 'react-router-dom';

import { PATH } from '../types';

const BoardsPage = () => {
  if (!localStorage.getItem('KanBanToken')) return <Navigate to={PATH.WELCOME} />;

  return <p>Its BOARDS Page</p>;
};

export default BoardsPage;
