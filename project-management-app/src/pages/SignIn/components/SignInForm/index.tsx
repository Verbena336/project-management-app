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
import styles from './SignInForm.module.scss';
import { muiInputStyle } from 'data/styles';

import { useSigninMutation } from 'store/services/authApi';
import { setLogin } from 'store/reducers/authSlice';
import { useAppDispatch } from 'store/hooks';

import '../../../../utils/i18next';

import { Inputs, ResponseSignIn } from './types';
import { PATH } from 'components/AppRoutes/types';
import { TError } from 'types';

function SignInForm() {
  const [signIn] = useSigninMutation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ mode: 'onSubmit' });

  const loginUser = async (value: Inputs) => {
    try {
      setIsLoading(true);
      const response: ResponseSignIn = await signIn(value).unwrap();
      setIsLoading(false);
      if (response.token) {
        localStorage.setItem('KanBanToken', response.token);
        localStorage.setItem('KanBanLogin', value.login);
        const id = jwt_decode(response.token) as { userId: string };
        localStorage.setItem('KanBanId', id.userId);
        dispatch(setLogin(value.login));
        toast.success(`${t('toastContent.userGreetings')}, ${value.login}!`);
        navigate('/boards');
      } else {
        throw new Error();
      }
    } catch (err) {
      const error = err as TError;
      setIsLoading(false);
      switch (error.status || error.data.statusCode) {
        case 403:
          toast.error(t('toastContent.userError'));
          break;
        default:
          toast.error(t('toastContent.serverError'));
      }
    }
  };

  const onSubmit = (data: Inputs) => loginUser(data);

  return isLoading ? (
    <Loader />
  ) : (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <NavLink to={PATH.WELCOME} className={`icon-back-arrow ${styles.arrow}`} />
      <TextField
        sx={muiInputStyle}
        size="medium"
        id="login"
        label={errors.login ? t('signInForm.loginError') : t('signInForm.login')}
        variant="outlined"
        autoComplete="username"
        error={!!errors.login}
        {...register('login', {
          required: true,
        })}
      />
      <TextField
        sx={muiInputStyle}
        size="medium"
        type="password"
        id="password"
        label={errors.password ? t('signInForm.passwordError') : t('signInForm.password')}
        variant="outlined"
        autoComplete="current-password"
        error={!!errors.password}
        {...register('password', {
          required: true,
        })}
      />

      <div className={styles.linkWrapper}>
        <SignBtn>{t('signInForm.signInBtn')}</SignBtn>
        <div className={styles.line}>
          <hr />
          {t('signInForm.or')}
          <hr />
        </div>
        <NavLink className={styles.link} to={PATH.SIGN_UP}>
          {t('signInForm.variant')}
        </NavLink>
      </div>
    </form>
  );
}

export default SignInForm;
