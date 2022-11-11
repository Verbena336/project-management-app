import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Navigate, NavLink } from 'react-router-dom';

import MuiButton from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Spiner from '@mui/material/CircularProgress';

import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss';
import { muiInputStyle } from 'data/styles';

import { useSigninMutation, useSignupMutation } from 'store/services/authApi';

import { ErrorSignUp, Inputs, ResponseSignUp } from './types';
import { ResponseSignIn } from '../../../SignInPage/components/SignInForm/types';
import { PATH } from 'components/AppRoutes/types';

function SignUpForm() {
  const [signIn, { isSuccess }] = useSigninMutation();
  const [signUp] = useSignupMutation();
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      {isSuccess && <Navigate to={PATH.BOARDS} />}
      {isLoading ? (
        <Spiner color="inherit" />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            sx={muiInputStyle}
            size="small"
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
            size="small"
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
            size="small"
            type="password"
            id="password"
            label={errors.password ? '⚠Password is required' : 'Password'}
            variant="outlined"
            error={errors.password ? true : false}
            {...register('password', {
              required: true,
            })}
          />
          <MuiButton type="submit" variant="contained">
            Sign Up
          </MuiButton>
          <div className={styles.linkWrapper}>
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
      )}
    </>
  );
}

export default SignUpForm;
