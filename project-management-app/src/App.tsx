import React from 'react';
import { ToastContainer } from 'react-toastify';

import Router from 'components/Router';

function App() {
  return (
    <>
      <Router />
      <ToastContainer style={{ fontSize: '15px' }} />
    </>
  );
}

export default App;
