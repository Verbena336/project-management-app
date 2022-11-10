import React from 'react';
import { Navigate } from 'react-router-dom';

import MainPaper from 'components/MainPaper';
import SignUpForm from './components/SignUpForm';

import { PATH } from 'components/AppRoutes/types';

import styles from './SignUpPage.module.scss';

const SignUpPage = () => {
  if (localStorage.getItem('KanBanToken')) return <Navigate to={PATH.BOARDS} />;

  return (
    <div className={styles.wrapper}>
      <MainPaper>
        <SignUpForm />
      </MainPaper>
    </div>
  );
};

export default SignUpPage;
