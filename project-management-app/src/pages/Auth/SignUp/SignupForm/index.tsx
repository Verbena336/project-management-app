import React, { useEffect } from 'react';

import styles from './SignupForm.module.scss';

import MuiButton from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setSignupValues, signupValues } from 'store/reducers/authSlice';
import { useSignupMutation } from 'store/services/authApi';

import { useForm } from 'react-hook-form';

import { Inputs, ResponseUser } from './types';

function SignupForm() {
  const dispatch = useAppDispatch();
  const signupValuesStore = useAppSelector(signupValues);
  const { name, login, password } = signupValuesStore;
  const [signup] = useSignupMutation();

  const createUser = async (value: Inputs) => {
    try {
      const response: ResponseUser = await signup(value).unwrap();
      if (response.id) {
        toast.success(`Hello, ${response.login}`);
      }
    } catch (e) {
      const error = e as ResponseUser;
      switch (error.status) {
        case 409:
          toast.error('User already exist');
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
      const { name, login, password } = value;
      dispatch(setSignupValues({ name, login, password }));
    });
  }, []);

  const onSubmit = (data: Inputs) => {
    createUser(data);
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
            id="name"
            label={errors.name ? '⚠Name is required' : 'Name'}
            variant="outlined"
            error={errors.name ? true : false}
            value={name}
            {...register('name', {
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
            Sign Up
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

export default SignupForm;
