import React from 'react';

import AuthWrap from './components/AuthWrap';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUp';

const Auth = () => {
  return (
    <>
      <AuthWrap>
        <SignInForm />
      </AuthWrap>
      <AuthWrap>
        <SignUpForm />
      </AuthWrap>
    </>
  );
};

export default Auth;
