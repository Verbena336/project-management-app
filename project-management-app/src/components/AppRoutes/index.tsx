import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PAGES_FOR_ROUTES } from './constants';

const AppRoutes = () => {
  return (
    <Routes>
      {PAGES_FOR_ROUTES.map(({ path, page }, index) => (
        <Route key={index} path={path} element={page} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
