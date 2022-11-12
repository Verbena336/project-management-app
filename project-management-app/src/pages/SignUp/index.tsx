import React from 'react';
import { Navigate } from 'react-router-dom';

import MainPaper from 'components/MainPaper';
import SignUpForm from './components/SignUpForm';
import AppLayout from 'components/AppLayout';

import { PATH } from 'components/AppRoutes/types';

import styles from './index.module.scss';

const SignUp = () => {
  if (localStorage.getItem('KanBanToken')) return <Navigate to={PATH.BOARDS} />;

  return (
<<<<<<< HEAD:project-management-app/src/pages/SignUpPage/index.tsx
    <div className={styles.wrapper}>
      <MainPaper>
        <div className={styles.content}>
          <SignUpForm />
        </div>
      </MainPaper>
    </div>
=======
    <AppLayout>
      <div className={styles.wrapper}>
        <MainPaper>
          <SignUpForm />
        </MainPaper>
      </div>
    </AppLayout>
>>>>>>> 224a97b (refactor: refactor basic page styles):project-management-app/src/pages/SignUp/index.tsx
  );
};

export default SignUp;
