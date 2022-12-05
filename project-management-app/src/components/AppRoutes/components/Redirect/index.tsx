import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { PATH } from 'components/AppRoutes/types';
import { props } from './types';

const Redirect = ({ children }: props) => {
  const { pathname } = useLocation();
  const auth = localStorage.getItem('KanBanToken');

  if (
    !auth &&
    (pathname === PATH.BOARDS || pathname === PATH.EDIT_PROFILE || pathname === PATH.ROOT)
  )
    return <Navigate to={PATH.WELCOME} />;

  if (auth && (pathname === PATH.SIGN_IN || pathname === PATH.SIGN_UP || pathname === PATH.ROOT))
    return <Navigate to={PATH.BOARDS} />;

  return children;
};

export default Redirect;
