import React from 'react';

import MainPaper from 'components/MainPaper';
import SignInForm from './components/SignInForm';
import AppLayout from 'components/AppLayout';

import styles from './index.module.scss';

const { wrapper, content } = styles;

const SignIn = () => {
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
