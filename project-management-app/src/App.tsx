import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

// import AppRoutes from 'components/AppRoutes';
import Loading from 'components/Loading';
const AppRoutes = React.lazy(() => import('components/AppRoutes'));

const App = () => (
  <Suspense fallback={<Loading />}>
    <AppRoutes />
    <ToastContainer style={{ fontSize: '15px' }} />
  </Suspense>
);

export default App;
