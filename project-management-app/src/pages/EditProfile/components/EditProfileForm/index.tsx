import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TextField from '@mui/material/TextField';
import Spiner from '@mui/material/CircularProgress';
import { Button } from '@mui/material';

import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss';
import { muiInputStyle } from 'data/styles';

import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from 'store/services/userApi';

import '../../../../utils/i18next';

import { ErrorSignUp, Inputs } from './types';
import { PATH } from 'components/AppRoutes/types';

function EditProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data } = useGetUsersQuery();
  const [deleteUserApi] = useDeleteUserMutation();
  const [updateUserApi] = useUpdateUserMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ mode: 'onSubmit' });

  const getUserId = () => {
    const user = data?.find((user) => user.login === localStorage.getItem('KanBanLogin'));
    return user && user.id;
  };

  const deleteUser = async () => {
    const userId = getUserId();
    try {
      setIsLoading(true);
      await deleteUserApi(userId!).unwrap();
      localStorage.removeItem('KanBanToken');
      localStorage.removeItem('KanBanLogin');
      setIsLoading(false);
      navigate(PATH.WELCOME);
    } catch (err) {
      const error = err as ErrorSignUp;
      setIsLoading(false);
      switch (error.status) {
        case 404:
          toast.error('User was not found!');
          break;
        default:
          toast.error('Unknown error');
      }
    }
  };

  const updateUser = async (value: Inputs) => {
    const userId = getUserId();
    try {
      setIsLoading(true);
      await updateUserApi({ id: userId!, body: value }).unwrap();
      localStorage.setItem('KanBanLogin', value.login);
      window.dispatchEvent(new Event('storage')); //!Спросить можно ли так обновлять логин
      setIsLoading(false);
      toast.success('User data was updated!');
    } catch (err) {
      const error = err as ErrorSignUp;
      setIsLoading(false);
      switch (error.status) {
        case 404:
          toast.error('User was not found!');
          break;
        default:
          toast.error('Unknown error');
      }
    }
  };

  const onSubmit = (data: Inputs) => updateUser(data);

  return isLoading ? (
    <Spiner color="inherit" />
  ) : (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div onClick={() => navigate(-1)} className={'icon-back-arrow'} />
      <TextField
        sx={muiInputStyle}
        size="medium"
        id="name"
        label={errors.name ? t('editForm.nameError') : t('editForm.name')}
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
        label={errors.login ? t('editForm.loginError') : t('editForm.login')}
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
        label={errors.password ? t('editForm.passwordError') : t('editForm.password')}
        variant="outlined"
        error={errors.password ? true : false}
        {...register('password', {
          required: true,
        })}
      />
      <div className={styles.linkWrapper}>
        <Button variant="contained" type="submit" color="success">
          {t('editForm.confirmBtn')}
        </Button>
        <Button onClick={deleteUser} variant="outlined" color="error">
          {t('editForm.deleteBtn')}
        </Button>
      </div>
    </form>
  );
}

export default EditProfileForm;
