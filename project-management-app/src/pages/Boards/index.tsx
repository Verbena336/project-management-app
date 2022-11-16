import React from 'react';
import { Navigate } from 'react-router-dom';

import AppLayout from 'components/AppLayout';
import ExistBoard from './components/ExistBoard';
import NewBoardOrColumn from '../../components/NewBoardOrColumn';

import { PATH } from 'components/AppRoutes/types';

import styles from './index.module.scss';

const { boardsWrapper } = styles;

const Boards = () => {
  if (!localStorage.getItem('KanBanToken')) return <Navigate to={PATH.WELCOME} />;

  return (
    <AppLayout>
      <div className={boardsWrapper}>
        <ExistBoard />
        <NewBoardOrColumn iconClass="icon-add-board" />
      </div>
    </AppLayout>
  );
};

export default Boards;
