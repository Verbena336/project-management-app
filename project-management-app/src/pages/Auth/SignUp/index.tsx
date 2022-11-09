import React from 'react';
import { useSigninMutation, useSignupMutation } from '../../../store/services/authApi';

function Auth() {
  const [signup] = useSignupMutation();
  const [signin] = useSigninMutation();
  const signUp = async () => {
    try {
      await signup({
        name: 'Nata1',
        login: 'nata1',
        password: '1234561',
      }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };
  const signIn = async () => {
    try {
      await signin({
        login: 'nata1',
        password: '1234561',
      }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
    </>
  );
}

export default Auth;
