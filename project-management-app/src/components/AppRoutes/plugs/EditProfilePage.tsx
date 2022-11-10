import React from 'react';
import { Navigate } from 'react-router-dom';

import { PATH } from '../types';

const EditProfilePage = () => {
  if (!localStorage.getItem('KanBanToken')) return <Navigate to={PATH.WELCOME} />;

  return <p>Its EDIT PROFILE Page</p>;
};

export default EditProfilePage;
