import React from 'react';

import AuthWrap from './components/AuthWrap';
import SigninForm from './components/SignInForm';
import SignupForm from './components/SignUpForm';

function Auth() {
  return (
    <>
      <AuthWrap>
        <SigninForm />
      </AuthWrap>
      <AuthWrap>
        <SignupForm />
      </AuthWrap>
    </>
  );
}

export default Auth;
