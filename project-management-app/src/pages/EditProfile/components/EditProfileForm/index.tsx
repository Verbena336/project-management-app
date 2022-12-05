import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TextField from '@mui/material/TextField';
import Loader from 'components/Loading/components/Loader';

import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss';
import { muiInputStyle } from 'data/styles';

import DeleteModal from 'components/Modals/DeleteModal';
import SaveButton from 'components/Modals/SaveButton';
import DeleteButton from 'components/Modals/DeleteButton';

import {
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from 'store/services/userApi';
import { useAppDispatch } from 'store/hooks';
import { setLogin } from 'store/reducers/authSlice';

import '../../../../utils/i18next';

import { Inputs } from './types';
import { PATH } from 'components/AppRoutes/types';
import { TError } from 'types';

function EditProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [deleteUserApi] = useDeleteUserMutation();
  const [updateUserApi] = useUpdateUserMutation();
  const dispatch = useAppDispatch();
  const [isModal, setIsModal] = useState(false);
  const { data } = useGetUserByIdQuery(localStorage.getItem('KanBanId')!);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ mode: 'onSubmit' });

  const deleteUser = async () => {
    try {
      setIsLoading(true);
      await deleteUserApi(localStorage.getItem('KanBanId')!).unwrap();
      localStorage.removeItem('KanBanToken');
      localStorage.removeItem('KanBanLogin');
      localStorage.removeItem('KanBanId');
      dispatch(setLogin(''));
      setIsLoading(false);
      toast.success(t('toastContent.deleteUser'));
      navigate(PATH.WELCOME);
    } catch (err) {
      const error = err as TError;
      setIsLoading(false);
      switch (error.status || error.data.statusCode) {
        case 404:
          toast.error(t('toastContent.userError'));
          break;
        case 401:
          toast.error(t('toastContent.unauthorized'));
          localStorage.removeItem('KanBanToken');
          localStorage.removeItem('KanBanLogin');
          localStorage.removeItem('KanBanId');
          navigate(PATH.WELCOME);
          break;
        default:
          toast.error(t('toastContent.serverError'));
      }
    }
  };

  const updateUser = async (value: Inputs) => {
    try {
      setIsLoading(true);
      await updateUserApi({ id: localStorage.getItem('KanBanId')!, body: value }).unwrap();
      localStorage.setItem('KanBanLogin', value.login);
      dispatch(setLogin(value.login));
      setIsLoading(false);
      toast.success(t('toastContent.updateUser'));
    } catch (err) {
      const error = err as TError;
      setIsLoading(false);
      switch (error.status || error.data.statusCode) {
        case 404:
          toast.error(t('toastContent.userError'));
          break;
        case 401:
          toast.error(t('toastContent.unauthorized'));
          localStorage.removeItem('KanBanToken');
          localStorage.removeItem('KanBanLogin');
          localStorage.removeItem('KanBanId');
          navigate(PATH.WELCOME);
          break;
        case 500:
          toast.error(t('toastContent.loginExist'));
          break;
        default:
          toast.error(t('toastContent.serverError'));
      }
    }
  };

  const onSubmit = (data: Inputs) => updateUser(data);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {isModal && <DeleteModal handler={deleteUser} closeHandler={() => setIsModal(!isModal)} />}
      {data && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <a onClick={() => navigate(-1)} className={`icon-back-arrow ${styles.arrow}`} />
          <TextField
            sx={muiInputStyle}
            size="medium"
            id="name"
            label={errors.name ? t('editForm.nameError') : t('editForm.name')}
            variant="standard"
            defaultValue={data?.name}
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
            variant="standard"
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
            label={errors.password ? t('editForm.passwordError') : t('editForm.password')}
            variant="standard"
            autoComplete="new-password"
            error={errors.password ? true : false}
            {...register('password', {
              required: true,
            })}
          />
          <div className={styles.linkWrapper}>
            <SaveButton textContent={t('editForm.confirmBtn')} />
            <DeleteButton textContent={t('editForm.deleteBtn')} handler={() => setIsModal(true)} />
          </div>
        </form>
      )}
    </>
  );
}

export default EditProfileForm;
