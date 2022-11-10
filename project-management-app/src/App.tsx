import React from 'react';
import { ToastContainer } from 'react-toastify';

import AppRoutes from 'components/AppRoutes';

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer style={{ fontSize: '15px' }} />
    </>
  );
}

export default App;
