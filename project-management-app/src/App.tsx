import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import ErrorBoundary from 'components/ErrorBoundary';
import Loading from 'components/Loading';

const AppRoutes = React.lazy(() => import('components/AppRoutes'));

const App = () => (
  <Suspense fallback={<Loading />}>
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
    <ToastContainer style={{ fontSize: '15px' }} />
  </Suspense>
);

export default App;
