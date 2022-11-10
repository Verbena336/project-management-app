import React from 'react';

import MainPaper from 'components/MainPaper';
import SignUpForm from './components/SignUpForm';

import styles from './SignUpPage.module.scss';

const SignUpPage = () => {
  return (
    <div className={styles.wrapper}>
      <MainPaper>
        <SignUpForm />
      </MainPaper>
    </div>
  );
};

export default SignUpPage;
