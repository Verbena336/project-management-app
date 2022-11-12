import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Spiner from '@mui/material/CircularProgress';

import SignBtn from 'components/SignBtn';

import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss';
import { muiInputStyle } from 'data/styles';

import { useSigninMutation, useSignupMutation } from 'store/services/authApi';

import { SignUp } from '../../../../constants';

import { ErrorSignUp, Inputs, ResponseSignUp } from './types';
import { PATH } from 'components/AppRoutes/types';

import { ResponseSignIn } from '../../../SignIn/components/SignInForm/types';

function SignUpForm() {
  const [signIn] = useSigninMutation();
  const [signUp] = useSignupMutation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ mode: 'onSubmit' });

  const createUser = async (value: Inputs) => {
    const { login, password } = value;
    try {
      setIsLoading(true);
      const response: ResponseSignUp = await signUp(value).unwrap();
      if (response.id) {
        const response: ResponseSignIn = await signIn({ login, password }).unwrap();
        setIsLoading(false);
        if (response.token) {
          localStorage.setItem('KanBanToken', response.token);
          localStorage.setItem('KanBanLogin', value.login);
          toast.success(`Hello, ${value.login}`);
          navigate(`${PATH.BOARDS}`);
        } else {
          throw new Error();
        }
      }
    } catch (err) {
      const error = err as ErrorSignUp;
      setIsLoading(false);
      switch (error.status) {
        case 409:
          toast.error('User already exist');
          break;
        case 403:
          toast.error('User was not founded!');
          break;
        default:
          toast.error('Unknown error');
      }
    }
  };

  const onSubmit = (data: Inputs) => createUser(data);

  return isLoading ? (
    <Spiner color="inherit" />
  ) : (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <NavLink to={PATH.WELCOME} className={'icon-back-arrow'} />
      <TextField
        sx={muiInputStyle}
        size="medium"
        id="name"
        label={errors.name ? '⚠Name is required' : 'Name'}
        variant="outlined"
        error={errors.name ? true : false}
        {...register('name', {
          required: true,
        })}
      />
      <TextField
        sx={muiInputStyle}
        size="medium"
        id="login"
        label={errors.login ? '⚠Login is required' : 'Login'}
        variant="outlined"
        error={errors.login ? true : false}
        {...register('login', {
          required: true,
        })}
      />
      <TextField
        sx={muiInputStyle}
        size="medium"
        type="password"
        id="password"
        label={errors.password ? '⚠Password is required' : 'Password'}
        variant="outlined"
        error={errors.password ? true : false}
        {...register('password', {
          required: true,
        })}
      />
      <div className={styles.linkWrapper}>
        <SignBtn>{SignUp}</SignBtn>
        <div className={styles.line}>
          <hr />
          OR
          <hr />
        </div>
        <NavLink className={styles.link} to={PATH.SIGN_IN}>
          Sign In
        </NavLink>
      </div>
    </form>
  );
}

export default SignUpForm;
