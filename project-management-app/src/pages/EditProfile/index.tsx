import React from 'react';

import AppLayout from 'components/AppLayout';
import EditProfileForm from './components/EditProfileForm';

import styles from './index.module.scss';
import MainPaper from 'components/MainPaper';

const { wrapper, content } = styles;

const EditProfile = () => {
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
