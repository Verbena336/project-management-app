import React, { useEffect } from 'react';

import styles from './SignInForm.module.scss';

import MuiButton from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setSigninValues, signinValues } from 'store/reducers/authSlice';
import { useSigninMutation } from 'store/services/authApi';

import { useForm } from 'react-hook-form';

import { Inputs, ResponseUser } from './types';

function SigninForm() {
  const dispatch = useAppDispatch();
  const signinValuesStore = useAppSelector(signinValues);
  const { login, password } = signinValuesStore;
  const [signin] = useSigninMutation();

  const loginUser = async (value: Inputs) => {
    try {
      const response: ResponseUser = await signin(value).unwrap();
      if (response.token) {
        toast.success(`Hello, ${login}`);
      } else {
        throw new Error();
      }
    } catch (e) {
      const error = e as ResponseUser;
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

  const onSubmit = (data: Inputs) => {
    loginUser(data);
  };

  return (
    <div className={styles.pageWrap}>
      <ToastContainer style={{ fontSize: '15px' }} />
      <Paper sx={{ borderRadius: '10px', backgroundColor: '#fbfbfb' }} elevation={3}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <svg
            className={styles.backIcon}
            width="33"
            height="33"
            viewBox="0 0 33 33"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_447_126)">
              <path
                d="M6.875 16.5H26.125"
                stroke="#616161"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.875 16.5L15.125 24.75"
                stroke="#616161"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.875 16.5L15.125 8.25"
                stroke="#616161"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
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
      </Paper>
    </div>
  );
}

export default SigninForm;
