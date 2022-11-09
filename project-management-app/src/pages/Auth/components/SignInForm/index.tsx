import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import MuiButton from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import 'react-toastify/dist/ReactToastify.css';
import styles from './SignInForm.module.scss';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setSigninValues, signinValues } from 'store/reducers/authSlice';
import { useSigninMutation } from 'store/services/authApi';

import { Inputs, ResponseSignIn, ErrorSignIn } from './types';

function SignInForm() {
  const dispatch = useAppDispatch();
  const signinValuesStore = useAppSelector(signinValues);
  const { login, password } = signinValuesStore;
  const [signIn] = useSigninMutation();

  const loginUser = async (value: Inputs) => {
    try {
      const response: ResponseSignIn = await signIn(value).unwrap();
      if (response.token) {
        toast.success(`Hello, ${login}`);
      } else {
        throw new Error();
      }
    } catch (err) {
      const error = err as ErrorSignIn;
      switch (error.status) {
        case 403:
          toast.error('User was not founded!');
          break;
        default:
          toast.error('Unknown error');
      }
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<Inputs>({ mode: 'onSubmit' });

  useEffect(() => {
    watch((value) => {
      dispatch(setSigninValues(value));
    });
  }, []);

  const onSubmit = (data: Inputs) => loginUser(data);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        sx={{
          '& .MuiInputBase-input': {
            color: '#1740A9',
          },
        }}
        size="small"
        id="login"
        label={errors.login ? '⚠Login is required' : 'Login'}
        variant="outlined"
        error={errors.login ? true : false}
        value={login}
        {...register('login', {
          required: true,
        })}
      />
      <TextField
        sx={{
          '& .MuiInputBase-input': {
            color: '#1740A9',
          },
        }}
        size="small"
        type="password"
        id="password"
        label={errors.password ? '⚠Password is required' : 'Password'}
        variant="outlined"
        error={errors.password ? true : false}
        value={password}
        {...register('password', {
          required: true,
        })}
      />
      <MuiButton type="submit" variant="contained">
        Sign In
      </MuiButton>
      <div className={styles.line}>
        <hr />
        OR
        <hr />
      </div>
    </form>
  );
}

export default SignInForm;