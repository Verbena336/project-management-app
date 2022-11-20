import React from 'react';
import { Navigate } from 'react-router-dom';

import AppLayout from 'components/AppLayout';
import EditProfileForm from './components/EditProfileForm';

import styles from './index.module.scss';
import MainPaper from 'components/MainPaper';

import { PATH } from 'components/AppRoutes/types';

const { wrapper, content } = styles;

const EditProfile = () => {
  if (!localStorage.getItem('KanBanToken')) return <Navigate to={PATH.WELCOME} />;
  return (
    <AppLayout>
      <div className={wrapper}>
        <MainPaper>
          <div className={content}>
            <EditProfileForm />
          </div>
        </MainPaper>
      </div>
    </AppLayout>
  );
};

export default EditProfile;
