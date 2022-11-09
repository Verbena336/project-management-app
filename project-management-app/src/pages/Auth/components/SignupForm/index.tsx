import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import MuiButton from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import 'react-toastify/dist/ReactToastify.css';
import styles from './SignupForm.module.scss';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setSignupValues, signupValues } from 'store/reducers/authSlice';
import { useSignupMutation } from 'store/services/authApi';

import { ErrorSignUp, Inputs, ResponseSignUp } from './types';

function SignUpForm() {
  const dispatch = useAppDispatch();
  const signupValuesStore = useAppSelector(signupValues);
  const { name, login, password } = signupValuesStore;
  const [signUp] = useSignupMutation();

  const createUser = async (value: Inputs) => {
    try {
      const response: ResponseSignUp = await signUp(value).unwrap();
      if (response.id) {
        toast.success(`Hello, ${response.login}`);
      }
    } catch (err) {
      const error = err as ErrorSignUp;
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
      dispatch(setSignupValues(value));
    });
  }, []);

  const onSubmit = (data: Inputs) => createUser(data);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
  );
}

export default SignUpForm;
