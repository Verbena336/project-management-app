import React from 'react';

import MainPaper from 'components/MainPaper';
import SignUpForm from './components/SignUpForm';
import AppLayout from 'components/AppLayout';

import styles from './index.module.scss';

const { wrapper, content } = styles;

const SignUp = () => {
  return (
    <AppLayout>
      <div className={wrapper}>
        <MainPaper>
          <div className={content}>
            <SignUpForm />
          </div>
        </MainPaper>
      </div>
    </AppLayout>
  );
};

export default SignUp;
