import React from 'react';
import { Navigate } from 'react-router-dom';

import AppLayout from 'components/AppLayout';
import ExistBoard from './components/ExistBoard';
import NewBoard from './components/NewBoard';

import { PATH } from 'components/AppRoutes/types';

import styles from './index.module.scss';

const { boardsWrapper } = styles;

const Boards = () => {
  // if (!localStorage.getItem('KanBanToken')) return <Navigate to={PATH.WELCOME} />;

  return (
    <AppLayout>
      <div className={boardsWrapper}>
        <ExistBoard />
        <NewBoard />
      </div>
    </AppLayout>
  );
};

export default Boards;
