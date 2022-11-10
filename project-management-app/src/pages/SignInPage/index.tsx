import React from 'react';

import MainPaper from 'components/MainPaper';
import SignInForm from './components/SignInForm';

import styles from './SignInPage.module.scss';

const SignInPage = () => {
  return (
    <div className={styles.wrapper}>
      <MainPaper>
        <SignInForm />
      </MainPaper>
    </div>
  );
};

export default SignInPage;
