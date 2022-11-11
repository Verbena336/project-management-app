import React from 'react';
import { ToastContainer } from 'react-toastify';

import AppRoutes from 'components/AppRoutes';

const App = () => (
  <>
    <AppRoutes />
    <ToastContainer style={{ fontSize: '15px' }} />
  </>
);

export default App;
