import React from 'react';
import { Navigate } from 'react-router-dom';

import MainPaper from 'components/MainPaper';
import SignInForm from './components/SignInForm';

import AppLayout from 'components/AppLayout';

import { PATH } from 'components/AppRoutes/types';

import styles from './index.module.scss';

const { wrapper, content } = styles;

const SignIn = () => {
  if (localStorage.getItem('KanBanToken')) return <Navigate to={PATH.BOARDS} />;

  return (
    <AppLayout>
      <div className={wrapper}>
        <MainPaper>
          <div className={content}>
            <SignInForm />
          </div>
        </MainPaper>
      </div>
    </AppLayout>
  );
};

export default SignIn;
