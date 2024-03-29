import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import jwt_decode from 'jwt-decode';

import TextField from '@mui/material/TextField';
import Loader from 'components/Loading/components/Loader';

import SignBtn from 'components/SignBtn';

import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss';
import { muiInputStyle } from 'data/styles';

import { useSigninMutation, useSignupMutation } from 'store/services/authApi';
import { useAppDispatch } from 'store/hooks';
import { setLogin } from 'store/reducers/authSlice';

import '../../../../utils/i18next';

import { Inputs, ResponseSignUp } from './types';
import { PATH } from 'components/AppRoutes/types';
import { ResponseSignIn } from '../../../SignIn/components/SignInForm/types';
import { TError } from 'types';

function SignUpForm() {
  const [signIn] = useSigninMutation();
  const [signUp] = useSignupMutation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
          const id = jwt_decode(response.token) as { userId: string };
          localStorage.setItem('KanBanId', id.userId);
          dispatch(setLogin(value.login));
          toast.success(`${t('toastContent.userGreetings')}, ${value.login}!`);
          navigate(`${PATH.BOARDS}`);
        } else {
          throw new Error();
        }
      }
    } catch (err) {
      const error = err as TError;
      setIsLoading(false);
      switch (error.status || error.data.statusCode) {
        case 409:
          toast.error(t('toastContent.userExist'));
          break;
        case 403:
          toast.error(t('toastContent.userError'));
          break;
        default:
          toast.error(t('toastContent.serverError'));
      }
    }
  };

  const onSubmit = (data: Inputs) => createUser(data);

  return isLoading ? (
    <Loader />
  ) : (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <NavLink to={PATH.WELCOME} className={`icon-back-arrow ${styles.arrow}`} />
      <TextField
        sx={muiInputStyle}
        size="medium"
        id="name"
        label={errors.name ? t('signUpForm.nameError') : t('signUpForm.name')}
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
        label={errors.login ? t('signUpForm.loginError') : t('signUpForm.login')}
        variant="outlined"
        autoComplete="username"
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
        label={errors.password ? t('signUpForm.passwordError') : t('signUpForm.password')}
        variant="outlined"
        autoComplete="new-password"
        error={errors.password ? true : false}
        {...register('password', {
          required: true,
        })}
      />
      <div className={styles.linkWrapper}>
        <SignBtn>{t('signUpForm.signUpBtn')}</SignBtn>
        <div className={styles.line}>
          <hr />
          {t('signUpForm.or')}
          <hr />
        </div>
        <NavLink className={styles.link} to={PATH.SIGN_IN}>
          {t('signUpForm.variant')}
        </NavLink>
      </div>
    </form>
  );
}

export default SignUpForm;
