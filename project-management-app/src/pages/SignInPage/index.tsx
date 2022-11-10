import React from 'react';
import { Navigate } from 'react-router-dom';

import MainPaper from 'components/MainPaper';
import SignInForm from './components/SignInForm';

import { PATH } from 'components/AppRoutes/types';

import styles from './SignInPage.module.scss';

const SignInPage = () => {
  if (localStorage.getItem('KanBanToken')) return <Navigate to={PATH.BOARDS} />;

  return (
    <div className={styles.wrapper}>
      <MainPaper>
        <SignInForm />
      </MainPaper>
    </div>
  );
};

export default SignInPage;
